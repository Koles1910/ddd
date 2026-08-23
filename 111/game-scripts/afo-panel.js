if (typeof GAME !== 'undefined') {
    (function () {
        var branch = window.__SWA_BRANCH__ || 'main';
        var files = [
            'game-scripts/afo/fixes.js',
            'game-scripts/afo/core.js',
            'game-scripts/afo/kom.js',
            'game-scripts/afo/eq-sets.js',
            'game-scripts/afo/card-sets.js',
            'game-scripts/afo/inne.js',
            'game-scripts/afo/pvp.js',
            'game-scripts/afo/nav.js',
            'game-scripts/afo/resp.js',
            'game-scripts/afo/przyw.js',
            'game-scripts/afo/res.js'
        ];

        var MAX_ATTEMPTS = 4;

        function injectCode(code, fileName) {
            try {
                var script = document.createElement('script');
                script.textContent = code;
                (document.head || document.documentElement).appendChild(script);
                script.remove();
            } catch (err) {
                console.error('[AFO] Błąd wykonania kodu w pliku: ' + fileName, err);
            }
        }

        function fetchFile(file, attempt, onSuccess, onFailure) {
            var url = 'https://raw.githubusercontent.com/Koles1910/ddd/' + branch + '/111/' + file + '?t=' + Date.now();
            
            fetch(url, { cache: 'no-store' })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('HTTP ' + response.status + ' (' + response.statusText + ')');
                    }
                    return response.text();
                })
                .then(data => {
                    onSuccess(data);
                })
                .catch(error => {
                    console.warn('[AFO] Nieudana próba (' + attempt + '/' + MAX_ATTEMPTS + ') dla: ' + file, 'Adres:', url, 'Błąd:', error.message);
                    if (attempt >= MAX_ATTEMPTS) {
                        onFailure(error);
                        return;
                    }
                    setTimeout(() => fetchFile(file, attempt + 1, onSuccess, onFailure), 400 * attempt);
                });
        }

        function loadAll() {
            var remaining = files.length;
            var errors = [];

            function oneDone() {
                remaining--;
                if (remaining === 0) {
                    if (errors.length > 0) {
                        console.error('[AFO] Lista brakujących plików:', errors);
                        GAME.komunikat('Nie udało się załadować plików AFO:\n' + errors.join('\n'));
                    } else {
                        bootstrap();
                    }
                }
            }

            files.forEach(function (file) {
                fetchFile(file, 1, function (data) {
                    injectCode(data, file);
                    console.info('[AFO] Pomyślnie wstrzyknięto:', file);
                    oneDone();
                }, function (err) {
                    console.error('[AFO] BŁĄD POBIERANIA:', file, err);
                    errors.push(file);
                    oneDone();
                });
            });
        }

        function bootstrap() {
            console.log('[AFO] Wszystkie pliki załadowane, uruchamiam panel AFO...');
            setTimeout(() => {
                if (GAME.maploaded && typeof RES !== 'undefined' && RES.listMines) {
                    RES.listMines();
                }
            }, 500);

            if (typeof createPanel === 'function') {
                createPanel();
            } else {
                console.error('[AFO] Funkcja createPanel() nie istnieje! Sprawdź czy core.js się załadował.');
            }

            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 0,
                    empire: GAME.char_data.empire
                });
            }, 300);
            setTimeout(() => {
                GAME.emitOrder({ a: 39, type: 0 });
            }, 600);
            setTimeout(() => {
                GAME.emitOrder({ a: 39, type: 23 });
            }, 900);
        }

        setTimeout(() => loadAll(), 50);
    })();
}