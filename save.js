function runCodeWithDelay() {
    const logoutButton    = document.querySelector('button[data-option="logout"]');
    const startStopButton = document.getElementById('startStopButton');

    startStopButton.style.display = 'none';

    function showStartStopButton() {
        startStopButton.style.display = 'block';
        startStopButton.style.zIndex  = '9999';
    }

    function hideStartStopButton() {
        startStopButton.style.display = 'none';
    }

    logoutButton.addEventListener('mouseenter', showStartStopButton);
    logoutButton.addEventListener('mouseleave', hideStartStopButton);

    startStopButton.addEventListener('mouseenter', () => {
        clearTimeout(startStopHideTimer);
        showStartStopButton();
    });
    startStopButton.addEventListener('mouseleave', hideStartStopButton);

    let startStopHideTimer;
}

let intervalId;
let recordingEnabled = JSON.parse(localStorage.getItem('recordingEnabled')) || false;
let stopReplay       = false;
let replayAlreadyRan = false;

// ★ NOWE — lista resp klas do nagrywania/odtwarzania
const RESP_CLASSES = [
    "resp_bh1",  "resp_bh2",  "resp_bh3",  "resp_bh4",  "resp_bh5",
    "resp_bh6",  "resp_bh7",  "resp_bh8",  "resp_bh9",  "resp_bh10",
    "resp_bh11", "resp_bh12", "resp_bh13", "resp_bh14",
    "resp_bh15", "resp_bh16", "resp_bh17", "resp_bh18",
    "resp_on",   "resp_off"
];

// ★ NOWE — zapis kliknięcia resp do osobnego klucza w localStorage
function handleRespClick(cls) {
    if (!recordingEnabled) return;

    let savedResp = JSON.parse(localStorage.getItem('savedRespClicks')) || [];

    // Zapisz tylko jeśli jeszcze nie ma
    if (!savedResp.includes(cls)) {
        savedResp.push(cls);
        localStorage.setItem('savedRespClicks', JSON.stringify(savedResp));
        console.log('[REC-RESP] Zapisano:', cls);
    }
}

// ★ NOWE — rejestracja listenerów na resp_bh w panelu
function enableRespListeners() {
    const respTab = document.querySelector('#respTab');
    if (!respTab) return;

    RESP_CLASSES.forEach(cls => {
        const el = respTab.querySelector(`.${cls}`);
        if (el && !el.dataset.respListenerAdded) {
            el.dataset.respListenerAdded = '1';
            el.addEventListener('click', () => handleRespClick(cls));
            console.log('[REC-RESP] Zarejestrowano:', cls);
        }
    });
}

// ★ NOWE — odtwarzanie resp kliknięć po normalnym replay
function replayRespClicks(startDelay) {
    const savedResp = JSON.parse(localStorage.getItem('savedRespClicks')) || [];

    if (savedResp.length === 0) {
        console.log('[REPLAY-RESP] Brak zapisanych resp kliknięć.');
        return;
    }

    console.log('[REPLAY-RESP] Odtwarzam w kolejności:', savedResp);

    savedResp.forEach((cls, index) => {
        setTimeout(() => {
            if (stopReplay) return;

            // Szukaj w #respTab
            let element = null;
            const respTab = document.querySelector('#respTab');

            if (respTab) {
                element = respTab.querySelector(`.${cls}`);
            }

            // Fallback — cała strona
            if (!element) {
                element = document.querySelector(`.${cls}`);
            }

            if (!element) {
                console.warn('[REPLAY-RESP] Nie znaleziono:', cls);
                return;
            }

            element.click();
            console.log('[REPLAY-RESP] ✓ Kliknięto:', cls);

        }, startDelay + (index * 3000));
    });
}

// ====== ODTWARZANIE KLIKNIĘĆ (oryginalne — bez zmian) ======
function replaySavedClicks() {

    if (replayAlreadyRan) {
        console.log('Replay juz wykonany — pomijam.');
        return;
    }
    replayAlreadyRan = true;

    console.log('Attempting to replay saved clicks...');
    const savedClicks  = JSON.parse(localStorage.getItem('savedClicks')) || {};
    const clickClasses = Object.keys(savedClicks);

    if (clickClasses.length > 0 && !stopReplay) {
        console.log('Found saved clicks:', clickClasses);

        clickClasses.forEach((buttonClass, index) => {
            setTimeout(() => {
                if (!stopReplay) {
                    const buttons = document.querySelectorAll(`.${buttonClass}`);
                    buttons.forEach(button => {
                        console.log('Clicking button:', buttonClass);
                        button.click();
                        savedClicks[buttonClass] = { clicked: true };
                        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
                    });
                }
            }, index * 2000);
        });

        // ★ NOWE — po zakończeniu normalnego replay czekaj 10s i odtwórz resp
        const normalReplayDuration = clickClasses.length * 2000;
        const respStartDelay       = normalReplayDuration + 10000;

        console.log(`[REPLAY-RESP] Faza 2 za ${(respStartDelay / 1000).toFixed(0)}s...`);
        replayRespClicks(respStartDelay);

    } else {
        console.log('No saved clicks found in local storage or stopped replaying.');

        // Jeśli nie ma normalnych kliknięć ale są resp — odtwórz samodzielnie po 10s
        const savedResp = JSON.parse(localStorage.getItem('savedRespClicks')) || [];
        if (savedResp.length > 0) {
            console.log('[REPLAY-RESP] Tylko resp kliknięcia — startuje za 10s');
            replayRespClicks(10000);
        }
    }
}

// ====== START / STOP (oryginalne + reset savedRespClicks) ======
function startRecording() {
    enableLocalStorage();
    intervalId       = setInterval(checkMainPanel, 1000);
    console.log('Started recording clicks.');
    recordingEnabled = true;
    localStorage.setItem('recordingEnabled', true);

    // ★ NOWE — co 2s sprawdzaj czy panel pojawił się i rejestruj listenery
    const respCheck = setInterval(() => {
        if (!recordingEnabled) {
            clearInterval(respCheck);
            return;
        }
        enableRespListeners();
    }, 2000);
}

function stopRecording() {
    clearInterval(intervalId);
    localStorage.removeItem('savedClicks');
    localStorage.removeItem('savedRespClicks'); // ★ NOWE — czyść też resp
    console.log('Stopped recording clicks and cleared data.');
    recordingEnabled = false;
    localStorage.setItem('recordingEnabled', false);
    stopReplay = true;
}

function checkMainPanel() {
    const mainPanel = document.getElementById("main_Panel");
    if (mainPanel) {
        enableLocalStorage();
        clearInterval(intervalId);
    }

    const respPanel = document.getElementById("resp_Panel");
    if (respPanel) {
        enableLocalStorageWithClass('.resp_button');
    }
}

function handleButtonClick(event) {
    const buttonClass = event.target.className.replace(/\s+/g, '.');
    let savedClicks   = JSON.parse(localStorage.getItem('savedClicks')) || {};

    if (!savedClicks[buttonClass]) {
        savedClicks[buttonClass] = { clicked: false };
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log('Click saved:', buttonClass);
    }
}

function enableLocalStorageWithClass(className) {
    const divs = document.querySelectorAll(className);
    divs.forEach(div => div.addEventListener('click', handleButtonClick));
}

function enableLocalStorage() {
    const buttonClasses = [
        '.gh_button',
        '.pvp_button',
        '.lpvm_button',
        '.res_button',
        '.code_button',
        '.resp_button',
        '.qlink.manage_auto_abyss',
        '.qlink.manage_auto_arena',
        '.qlink.manage_autoExpeditions'
    ];

    buttonClasses.forEach(className => {
        const buttons = document.querySelectorAll(className);
        buttons.forEach(button => button.addEventListener('click', handleButtonClick));
    });

    // ★ NOWE — rejestruj też resp jeśli panel już istnieje
    enableRespListeners();
}

// ====== PRZYCISK ON/OFF (bez zmian) ======
const startStopButton = document.createElement('button');
startStopButton.textContent = recordingEnabled ? 'Off' : 'On';
startStopButton.id = 'startStopButton';
startStopButton.style.position     = 'fixed';
startStopButton.style.top          = '22px';
startStopButton.style.background   = '#333';
startStopButton.style.borderRadius = '5px';
startStopButton.style.borderWidth  = '5px 6px 5px 6px';
startStopButton.style.display      = 'block';
startStopButton.style.color        = 'gold';
startStopButton.style.borderColor  = 'rgba(0,0,0,0.9)';
startStopButton.style.right        = '5px';

startStopButton.addEventListener('click', () => {
    if (recordingEnabled) {
        stopRecording();
    } else {
        startRecording();
    }
    startStopButton.textContent = recordingEnabled ? 'Off' : 'On';
});

document.body.appendChild(startStopButton);
setTimeout(runCodeWithDelay, 1000);

// ====== GŁÓWNA SEKWENCJA (bez zmian) ======
const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};
const savedResp   = JSON.parse(localStorage.getItem('savedRespClicks')) || [];

if (Object.keys(savedClicks).length > 0 || savedResp.length > 0) {
    console.log('Znaleziono zapisane kliknięcia. Start sekwencji za 40s...');

    // T = 40s → page_switch
    setTimeout(() => {
        console.log('[1/4] GAME.page_switch(\'game_map\')');
        GAME.page_switch('game_map');
    }, 50000);

    // T = 43s → klawisz '0'
    setTimeout(() => {
        console.log('[2/4] Symuluje nacisniecie klawisza 0');
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key: '0', code: 'Digit0', keyCode: 48,
            which: 48, bubbles: true, cancelable: true
        }));
    }, 53000);

    // T = 45s → .qlink.load_afo
    setTimeout(() => {
        console.log('[3/4] Klikam .qlink.load_afo');
        const el = document.querySelector('.qlink.load_afo');
        if (el) el.click();
        else console.warn('Nie znaleziono .qlink.load_afo');
    }, 55000);

    // T = 50s → replay
    setTimeout(() => {
        console.log('[4/4] Odtwarzanie zapisanych klikniec...');
        enableLocalStorage();
        replaySavedClicks();
    }, 60000);

} else {
    console.log('Nie znaleziono zapisanych kliknięć w localStorage.');
}