// ============================================================
// KONFIGURACJA - ZMIEŃ NA SWOJE WARTOŚCI
// ============================================================
var CONFIG = {
    SECRET:       'ZmienNaSwojTajnyKlucz!@#2024',  // <<< ZMIEŃ
    ADMIN_PASS:   'AdminHaslo123!',                 // <<< ZMIEŃ
    STORAGE_KEYS: 'cdkey_history',
    STORAGE_AUTH: 'cdkey_admin_auth',
    STORAGE_BANS: 'cdkey_banned'
};

// ============================================================
// HASH FUNKCJA - IDENTYCZNA JAK W BOCIE
// ============================================================
function simpleHMAC(message) {
    var str   = CONFIG.SECRET + ':' + message + ':' + CONFIG.SECRET;
    var hash  = 0;
    var hash2 = 5381;

    for (var i = 0; i < str.length; i++) {
        var chr = str.charCodeAt(i);
        hash    = ((hash << 5) - hash) + chr;
        hash    = hash & hash;
        hash2   = ((hash2 << 5) + hash2) + chr;
        hash2   = hash2 & hash2;
    }

    var h1 = Math.abs(hash).toString(16).toUpperCase().padStart(8, '0');
    var h2 = Math.abs(hash2).toString(16).toUpperCase().padStart(8, '0');
    return (h1 + h2).substring(0, 16);
}

// ============================================================
// LOSOWY HEX
// ============================================================
function randomHex(bytes) {
    var result = '';
    var chars  = '0123456789ABCDEF';
    for (var i = 0; i < bytes * 2; i++) {
        result += chars[Math.floor(Math.random() * 16)];
    }
    return result;
}

// ============================================================
// LOGOWANIE ADMINA
// ============================================================
function adminLogin() {
    var pass = document.getElementById('admin_password').value;
    var msg  = document.getElementById('login_msg');

    if (pass === CONFIG.ADMIN_PASS) {
        sessionStorage.setItem(CONFIG.STORAGE_AUTH, JSON.stringify({
            expires: Date.now() + (8 * 3600 * 1000)
        }));
        document.getElementById('login_panel').style.display = 'none';
        document.getElementById('main_panel').style.display  = 'block';
        renderHistory();
        renderBanList();
        updateBanJSON();
    } else {
        msg.style.display = 'block';
        msg.className     = 'msg msg_error';
        msg.textContent   = '❌ Nieprawidłowe hasło!';
        document.getElementById('admin_password').style.borderColor = 'rgba(220,60,60,0.7)';
        setTimeout(function () {
            document.getElementById('admin_password').style.borderColor = '';
        }, 1500);
    }
}

// Sprawdź sesję przy załadowaniu
window.addEventListener('load', function () {
    try {
        var auth = JSON.parse(sessionStorage.getItem(CONFIG.STORAGE_AUTH));
        if (auth && Date.now() < auth.expires) {
            document.getElementById('login_panel').style.display = 'none';
            document.getElementById('main_panel').style.display  = 'block';
            renderHistory();
            renderBanList();
            updateBanJSON();
        }
    } catch (e) {}
});

// ============================================================
// TWORZENIE KLUCZA
// ============================================================
function createKey(daysValid) {
    var expiry     = Math.floor(Date.now() / 1000) + (daysValid * 86400);
    var randomPart = randomHex(8);
    var expiryHex  = expiry.toString(16).toUpperCase().padStart(8, '0');
    var signature  = simpleHMAC(randomPart + expiry.toString()).substring(0, 8);
    var rawKey     = randomPart + expiryHex + signature;
    var formatted  = rawKey.match(/.{1,5}/g).join('-');

    return {
        key:       formatted,
        expiry:    expiry,
        expiryStr: new Date(expiry * 1000).toLocaleString('pl-PL'),
        days:      daysValid
    };
}

// ============================================================
// WERYFIKACJA KLUCZA
// ============================================================
function verifyKeyData(inputKey) {
    var clean = inputKey.replace(/[\s\-]/g, '').toUpperCase();

    if (clean.length !== 32) {
        return { valid: false, reason: 'Nieprawidłowa długość (' + clean.length + '/32)' };
    }

    var randomPart = clean.substring(0, 16);
    var expiryHex  = clean.substring(16, 24);
    var signature  = clean.substring(24, 32);
    var expiry     = parseInt(expiryHex, 16);
    var now        = Math.floor(Date.now() / 1000);

    if (isNaN(expiry) || expiry <= 0) {
        return { valid: false, reason: 'Uszkodzony klucz' };
    }

    if (isKeyBanned(inputKey)) {
        return { valid: false, reason: '🚫 Klucz jest zbanowany!' };
    }

    if (now > expiry) {
        return { valid: false, reason: 'Klucz wygasł: ' + new Date(expiry * 1000).toLocaleString('pl-PL') };
    }

    var expectedSig = simpleHMAC(randomPart + expiry.toString()).substring(0, 8);

    if (signature !== expectedSig) {
        return { valid: false, reason: 'Nieprawidłowy podpis klucza!' };
    }

    var remaining = expiry - now;
    return {
        valid:     true,
        expiry:    new Date(expiry * 1000).toLocaleString('pl-PL'),
        timestamp: expiry,
        daysLeft:  Math.floor(remaining / 86400),
        hoursLeft: Math.floor((remaining % 86400) / 3600),
        minsLeft:  Math.floor((remaining % 3600) / 60)
    };
}

// ============================================================
// HISTORIA
// ============================================================
function getHistory() {
    try { return JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEYS)) || []; }
    catch (e) { return []; }
}

function saveToHistory(keys) {
    var history = getHistory();
    keys.forEach(function (k) {
        history.unshift({
            key:       k.key,
            expiry:    k.expiry,
            expiryStr: k.expiryStr,
            days:      k.days,
            note:      k.note || '',
            createdAt: k.createdAt || Date.now(),
            banned:    false
        });
    });
    localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history.slice(0, 500)));
}

// ============================================================
// BANY
// ============================================================
function getBanList() {
    try { return JSON.parse(localStorage.getItem(CONFIG.STORAGE_BANS)) || []; }
    catch (e) { return []; }
}

function saveBanList(list) {
    localStorage.setItem(CONFIG.STORAGE_BANS, JSON.stringify(list));
    updateBanJSON();
}

function isKeyBanned(key) {
    var clean = key.replace(/[\s\-]/g, '').toUpperCase();
    return getBanList().some(function (b) {
        return b.key.replace(/[\s\-]/g, '').toUpperCase() === clean;
    });
}

function banKey(key, reason) {
    if (isKeyBanned(key)) {
        showToast('⚠️ Klucz już jest zbanowany!', 'warn');
        return;
    }

    var list = getBanList();
    list.unshift({ key: key, reason: reason || 'Brak powodu', bannedAt: Date.now() });
    saveBanList(list);

    // Oznacz w historii
    var history = getHistory();
    history.forEach(function (item) {
        if (item.key === key) item.banned = true;
    });
    localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history));

    renderHistory();
    renderBanList();
    updateBanJSON();

    // Pokaż alert z przypomnieniem o wgraniu pliku
    document.getElementById('ban_export_alert').style.display = 'block';

    // Przewiń do sekcji eksportu
    document.getElementById('ban_export_card').scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    showToast('🚫 Klucz zbanowany! Pobierz banned.json i wgraj na CBA!', 'success');

    // Auto-pobierz plik
    setTimeout(function () {
        downloadBanJSON();
    }, 800);
}

function unbanKey(key) {
    var list = getBanList().filter(function (b) { return b.key !== key; });
    saveBanList(list);

    var history = getHistory();
    history.forEach(function (item) {
        if (item.key === key) item.banned = false;
    });
    localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history));

    renderHistory();
    renderBanList();
    showToast('✅ Klucz został odbanowany!', 'success');
}

function clearAllBans() {
    if (!confirm('Czy na pewno usunąć WSZYSTKIE bany?')) return;
    localStorage.removeItem(CONFIG.STORAGE_BANS);
    var history = getHistory();
    history.forEach(function (item) { item.banned = false; });
    localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history));
    renderHistory();
    renderBanList();
    updateBanJSON();
    showToast('✅ Wszystkie bany usunięte!', 'success');
}

function renderBanList() {
    var list      = getBanList();
    var container = document.getElementById('ban_list');

    if (list.length === 0) {
        container.innerHTML = '<div class="empty_state">✅ Brak zbanowanych kluczy</div>';
        return;
    }

    container.innerHTML = '';
    list.forEach(function (item) {
        var div       = document.createElement('div');
        div.className = 'ban_item';
        div.innerHTML =
            '<div class="ban_info">' +
                '<div class="history_key ban_key">' + item.key + '</div>' +
                '<div class="history_meta">Zbanowano: ' + new Date(item.bannedAt).toLocaleString('pl-PL') + '</div>' +
                (item.reason ? '<div class="history_note">Powód: ' + item.reason + '</div>' : '') +
            '</div>' +
            '<button class="key_copy_btn btn_unban" onclick="unbanKey(\'' + item.key + '\')">✅ Odbanuj</button>';
        container.appendChild(div);
    });
}

// ============================================================
// EKSPORT BANNED.JSON
// ============================================================
function updateBanJSON() {
    var bannedKeys = getBanList().map(function (b) { return b.key; });
    var json = JSON.stringify({ banned: bannedKeys, updated: new Date().toISOString() }, null, 2);
    var el = document.getElementById('ban_json_output');
    if (el) el.value = json;
}

function copyBanJSON() {
    updateBanJSON();
    var el = document.getElementById('ban_json_output');
    el.select();
    try {
        document.execCommand('copy');
        showToast('✅ JSON skopiowany! Zapisz jako banned.json na CBA.', 'success');
    } catch (e) {
        showToast('Zaznacz tekst ręcznie i skopiuj Ctrl+C', 'warn');
    }
}

function downloadBanJSON() {
    updateBanJSON();
    var content = document.getElementById('ban_json_output').value;
    downloadFile(content, 'banned.json');
    showToast('✅ Plik banned.json pobrany! Wgraj na CBA.', 'success');
}

// ============================================================
// MODALS
// ============================================================
function showBanModal(key) {
    document.getElementById('ban_key_display').textContent  = key;
    document.getElementById('ban_reason_input').value       = '';
    document.getElementById('ban_modal').style.display      = 'flex';
    setTimeout(function () { document.getElementById('ban_reason_input').focus(); }, 100);
}

function closeBanModal() {
    document.getElementById('ban_modal').style.display = 'none';
}

function confirmBan() {
    var key    = document.getElementById('ban_key_display').textContent;
    var reason = document.getElementById('ban_reason_input').value.trim();
    banKey(key, reason);
    closeBanModal();
}

function showEditModal(key, expiry) {
    document.getElementById('edit_key_display').textContent = key;
    document.getElementById('edit_key_store').value         = key;
    var daysLeft = Math.max(1, Math.floor((expiry - Math.floor(Date.now()/1000)) / 86400));
    document.getElementById('edit_days_input').value        = daysLeft;
    document.getElementById('edit_modal').style.display     = 'flex';
    setTimeout(function () { document.getElementById('edit_days_input').focus(); }, 100);
}

function closeEditModal() {
    document.getElementById('edit_modal').style.display = 'none';
}

function confirmEdit() {
    var key     = document.getElementById('edit_key_store').value;
    var newDays = parseInt(document.getElementById('edit_days_input').value);

    if (!newDays || newDays < 1 || newDays > 3650) {
        showToast('⚠️ Wpisz liczbę dni od 1 do 3650!', 'warn');
        return;
    }

    var history    = getHistory();
    var newExpiry  = Math.floor(Date.now() / 1000) + (newDays * 86400);
    var found      = false;

    history.forEach(function (item) {
        if (item.key === key) {
            item.expiry    = newExpiry;
            item.expiryStr = new Date(newExpiry * 1000).toLocaleString('pl-PL');
            item.days      = newDays;
            item.editedAt  = Date.now();
            found          = true;
        }
    });

    if (found) {
        localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history));
        renderHistory();
        closeEditModal();
        showToast('✅ Ważność klucza zmieniona na ' + newDays + ' dni!', 'success');
    } else {
        showToast('❌ Nie znaleziono klucza w historii!', 'error');
    }
}

// ============================================================
// USUWANIE KLUCZA Z HISTORII
// ============================================================
function deleteKey(key) {
    if (!confirm('Usunąć ten klucz z historii?\n\n' + key)) return;
    var history = getHistory().filter(function (item) { return item.key !== key; });
    localStorage.setItem(CONFIG.STORAGE_KEYS, JSON.stringify(history));
    renderHistory();
    showToast('🗑️ Klucz usunięty z historii!', 'success');
}

// ============================================================
// GENEROWANIE KLUCZY
// ============================================================
var generatedKeys = [];

function generateKeys() {
    var count = Math.min(Math.max(parseInt(document.getElementById('key_count').value) || 1, 1), 50);
    var days  = Math.min(Math.max(parseInt(document.getElementById('key_days').value)  || 30, 1), 3650);
    var note  = document.getElementById('key_note').value.trim();

    var btn      = document.getElementById('generate_btn');
    btn.disabled = true;
    btn.textContent = '⏳ Generuję...';

    generatedKeys = [];

    for (var i = 0; i < count; i++) {
        var k       = createKey(days);
        k.note      = note;
        k.createdAt = Date.now();
        generatedKeys.push(k);
    }

    saveToHistory(generatedKeys);
    renderGeneratedKeys(generatedKeys);

    var card = document.getElementById('keys_output_card');
    card.style.display = 'block';
    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    renderHistory();
    updateBanJSON();

    btn.disabled    = false;
    btn.textContent = '✨ Generuj klucze';

    showToast('✅ Wygenerowano ' + count + ' kluczy!', 'success');
}

function renderGeneratedKeys(keys) {
    var output = document.getElementById('keys_output');
    output.innerHTML = '';

    keys.forEach(function (k) {
        var div       = document.createElement('div');
        div.className = 'key_item';
        div.innerHTML =
            '<div>' +
                '<div class="key_text">' + k.key + '</div>' +
                '<div class="key_meta">' +
                    'Ważny: ' + k.days + ' dni &nbsp;·&nbsp; Wygasa: ' + k.expiryStr +
                    (k.note ? ' &nbsp;·&nbsp; <span style="color:#aaccff;">📝 ' + k.note + '</span>' : '') +
                '</div>' +
            '</div>' +
            '<button class="key_copy_btn" onclick="copySingleKey(this, \'' + k.key + '\')">📋 Kopiuj</button>';
        output.appendChild(div);
    });
}

// ============================================================
// RENDER HISTORII
// ============================================================
function renderHistory() {
    var history   = getHistory();
    var searchVal = (document.getElementById('search_input') ? document.getElementById('search_input').value : '').toLowerCase().trim();
    var filterVal = document.getElementById('filter_status') ? document.getElementById('filter_status').value : 'all';
    var container = document.getElementById('history_list');
    var now       = Math.floor(Date.now() / 1000);

    if (searchVal) {
        history = history.filter(function (item) {
            return item.key.toLowerCase().includes(searchVal) ||
                   (item.note && item.note.toLowerCase().includes(searchVal));
        });
    }

    if (filterVal === 'active')  history = history.filter(function (i) { return now <= i.expiry && !i.banned; });
    if (filterVal === 'expired') history = history.filter(function (i) { return now > i.expiry; });
    if (filterVal === 'banned')  history = history.filter(function (i) { return i.banned; });

    var all     = getHistory();
    var active  = all.filter(function (i) { return now <= i.expiry && !i.banned; }).length;
    var expired = all.filter(function (i) { return now > i.expiry; }).length;
    var banned  = all.filter(function (i) { return i.banned; }).length;

    var statsEl = document.getElementById('history_stats');
    if (statsEl) {
        statsEl.innerHTML =
            '<span class="stat_item stat_total">📋 Wszystkie: <b>' + all.length + '</b></span>' +
            '<span class="stat_item stat_active">✅ Aktywne: <b>' + active + '</b></span>' +
            '<span class="stat_item stat_expired">⏰ Wygasłe: <b>' + expired + '</b></span>' +
            '<span class="stat_item stat_banned">🚫 Zbanowane: <b>' + banned + '</b></span>';
    }

    if (history.length === 0) {
        container.innerHTML = '<div class="empty_state">📭 ' + (searchVal ? 'Brak wyników' : 'Brak historii kluczy') + '</div>';
        return;
    }

    container.innerHTML = '';

    history.forEach(function (item) {
        var isExpired  = now > item.expiry;
        var isBanned   = item.banned || isKeyBanned(item.key);
        var createdStr = new Date(item.createdAt).toLocaleString('pl-PL');
        var daysLeft   = isExpired ? 0 : Math.floor((item.expiry - now) / 86400);

        var badge = isBanned
            ? '<span class="badge badge_banned">🚫 Zbanowany</span>'
            : isExpired
                ? '<span class="badge badge_expired">⏰ Wygasł</span>'
                : '<span class="badge badge_active">✅ Aktywny</span>';

        var div       = document.createElement('div');
        div.className = 'history_item' + (isBanned ? ' item_banned' : '');
        div.innerHTML =
            '<div class="history_info">' +
                '<div class="history_key">' + item.key + '</div>' +
                '<div class="history_meta">' +
                    'Wygenerowano: ' + createdStr +
                    ' &nbsp;·&nbsp; Wygasa: ' + item.expiryStr +
                    (!isExpired && !isBanned ? ' &nbsp;·&nbsp; Zostało: <b style="color:#aaddff;">' + daysLeft + ' dni</b>' : '') +
                    (item.editedAt ? ' &nbsp;·&nbsp; <span style="color:#ffcc44;">✏️ Edytowano</span>' : '') +
                '</div>' +
                (item.note ? '<div class="history_note">📝 ' + item.note + '</div>' : '') +
            '</div>' +
            '<div class="action_buttons">' +
                badge +
                '<button class="key_copy_btn" title="Kopiuj" onclick="copySingleKey(this,\'' + item.key + '\')">📋</button>' +
                (!isBanned ? '<button class="key_copy_btn btn_edit" title="Zmień ważność" onclick="showEditModal(\'' + item.key + '\',' + item.expiry + ')">✏️</button>' : '') +
                (isBanned
                    ? '<button class="key_copy_btn btn_unban" title="Odbanuj" onclick="unbanKey(\'' + item.key + '\')">✅</button>'
                    : '<button class="key_copy_btn btn_ban" title="Zbanuj" onclick="showBanModal(\'' + item.key + '\')">🚫</button>') +
                '<button class="key_copy_btn btn_delete" title="Usuń z historii" onclick="deleteKey(\'' + item.key + '\')">🗑️</button>' +
            '</div>';
        container.appendChild(div);
    });
}

// ============================================================
// KOPIOWANIE
// ============================================================
function copySingleKey(btn, key) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(key).then(function () { showCopied(btn); }).catch(function () { fallbackCopy(btn, key); });
    } else {
        fallbackCopy(btn, key);
    }
}

function fallbackCopy(btn, key) {
    var ta            = document.createElement('textarea');
    ta.value          = key;
    ta.style.position = 'fixed';
    ta.style.top      = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); showCopied(btn); }
    catch (e) { alert('Skopiuj ręcznie:\n' + key); }
    document.body.removeChild(ta);
}

function showCopied(btn) {
    var orig = btn.innerHTML;
    btn.innerHTML = '✅';
    btn.classList.add('copied');
    setTimeout(function () { btn.innerHTML = orig; btn.classList.remove('copied'); }, 1800);
}

function copyAllKeys() {
    if (generatedKeys.length === 0) return;
    var text = generatedKeys.map(function (k) {
        return k.key + (k.note ? ' (' + k.note + ')' : '') + ' | Wygasa: ' + k.expiryStr;
    }).join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
            var msg = document.getElementById('copy_msg');
            msg.style.display = 'block';
            setTimeout(function () { msg.style.display = 'none'; }, 2000);
        });
    } else {
        fallbackCopy({ innerHTML: '📋' }, text);
    }
}

// ============================================================
// POBIERANIE PLIKÓW
// ============================================================
function downloadKeys() {
    if (generatedKeys.length === 0) return;
    var text = '=== WYGENEROWANE KLUCZE CD-KEY ===\n';
    text += 'Data: ' + new Date().toLocaleString('pl-PL') + '\n';
    text += '='.repeat(45) + '\n\n';
    generatedKeys.forEach(function (k, idx) {
        text += '[' + (idx + 1) + '] ' + k.key + '\n';
        text += '    Wygasa: ' + k.expiryStr + ' (' + k.days + ' dni)\n';
        if (k.note) text += '    Notatka: ' + k.note + '\n';
        text += '\n';
    });
    downloadFile(text, 'cdkeys_' + Date.now() + '.txt');
}

function downloadHistory() {
    var history = getHistory();
    if (history.length === 0) { showToast('Brak historii!', 'warn'); return; }
    var now  = Math.floor(Date.now() / 1000);
    var text = '=== HISTORIA KLUCZY CD-KEY ===\n';
    text += 'Pobrano: ' + new Date().toLocaleString('pl-PL') + '\n';
    text += '='.repeat(50) + '\n\n';
    history.forEach(function (item, idx) {
        text += '[' + (idx + 1) + '] ' + item.key + '\n';
        text += '    Status:    ' + (item.banned ? 'ZBANOWANY' : now > item.expiry ? 'WYGASŁ' : 'AKTYWNY') + '\n';
        text += '    Wygasa:    ' + item.expiryStr + '\n';
        text += '    Ważność:   ' + item.days + ' dni\n';
        if (item.note) text += '    Notatka:   ' + item.note + '\n';
        text += '    Utworzono: ' + new Date(item.createdAt).toLocaleString('pl-PL') + '\n\n';
    });
    downloadFile(text, 'historia_kluczy_' + Date.now() + '.txt');
}

function downloadFile(content, filename) {
    var blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    var url  = URL.createObjectURL(blob);
    var a    = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// ============================================================
// WERYFIKACJA
// ============================================================
function formatVerifyInput(input) {
    var val   = input.value.replace(/[^A-Za-z0-9]/g, '').toUpperCase();
    var parts = val.match(/.{1,5}/g);
    input.value = parts ? parts.join('-') : val;
}

function verifyKey() {
    var input  = document.getElementById('verify_input').value.trim();
    var result = document.getElementById('verify_result');

    if (!input) {
        result.style.display = 'block';
        result.className     = 'verify_box invalid';
        result.innerHTML     = '⚠️ Wpisz klucz do weryfikacji!';
        return;
    }

    var data = verifyKeyData(input);
    result.style.display = 'block';

    if (data.valid) {
        result.className = 'verify_box valid';
        result.innerHTML =
            '<div style="font-size:15px;font-weight:bold;margin-bottom:10px;">✅ Klucz jest WAŻNY</div>' +
            '<div class="verify_row"><span class="verify_label">Wygasa:</span><span>' + data.expiry + '</span></div>' +
            '<div class="verify_row"><span class="verify_label">Zostało:</span><span><b>' + data.daysLeft + ' dni</b> ' + data.hoursLeft + ' h ' + data.minsLeft + ' min</span></div>' +
            '<div class="verify_row"><span class="verify_label">Status:</span><span style="color:#44ff88;">🟢 Aktywny</span></div>';
    } else {
        result.className = 'verify_box invalid';
        result.innerHTML =
            '<div style="font-size:15px;font-weight:bold;margin-bottom:10px;">❌ Klucz NIEPRAWIDŁOWY</div>' +
            '<div class="verify_row"><span class="verify_label">Powód:</span><span>' + data.reason + '</span></div>';
    }
}

// ============================================================
// WYCZYŚĆ WYGENEROWANE
// ============================================================
function clearGenerated() {
    generatedKeys = [];
    document.getElementById('keys_output').innerHTML = '';
    document.getElementById('keys_output_card').style.display = 'none';
    document.getElementById('key_note').value = '';
}

function clearHistory() {
    if (!confirm('Wyczyścić CAŁĄ historię kluczy?\nTej operacji nie można cofnąć!')) return;
    localStorage.removeItem(CONFIG.STORAGE_KEYS);
    renderHistory();
    showToast('🗑️ Historia wyczyszczona!', 'success');
}

// ============================================================
// TOAST POWIADOMIENIA
// ============================================================
function showToast(message, type) {
    var existing = document.getElementById('toast_main');
    if (existing) existing.remove();

    var colors = {
        success: 'background:linear-gradient(135deg,#1a8844,#146636);border:1px solid #22aa66;',
        error:   'background:linear-gradient(135deg,#882222,#661616);border:1px solid #aa3333;',
        warn:    'background:linear-gradient(135deg,#886622,#664d1a);border:1px solid #aa8833;'
    };

    var div       = document.createElement('div');
    div.id        = 'toast_main';
    div.className = 'toast_notif';
    div.style.cssText += colors[type] || colors.success;
    div.textContent = message;
    document.body.appendChild(div);

    setTimeout(function () {
        div.style.animation = 'toast_out 0.3s ease forwards';
        setTimeout(function () { if (div.parentNode) div.remove(); }, 300);
    }, 2800);
}