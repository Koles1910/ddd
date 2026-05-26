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

    logoutButton.addEventListener('mouseenter', () => showStartStopButton());
    logoutButton.addEventListener('mouseleave', () => hideStartStopButton());

    startStopButton.addEventListener('mouseenter', () => {
        clearTimeout(startStopHideTimer);
        showStartStopButton();
    });
    startStopButton.addEventListener('mouseleave', () => hideStartStopButton());

    let startStopHideTimer;
}

let intervalId;
let recordingEnabled = JSON.parse(localStorage.getItem('recordingEnabled')) || false;
let stopReplay       = false;

// ★ FIX — flaga żeby replay nie odpalił się dwa razy
let replayDone = false;

// ====== REPLAY ======
function replaySavedClicks() {

    // ★ FIX — jeśli już replay był, nie rób ponownie
    if (replayDone) {
        console.log('[REPLAY] Już wykonano — pomijam.');
        return;
    }
    replayDone = true;

    console.log('[REPLAY] Start...');
    const savedClicks  = JSON.parse(localStorage.getItem('savedClicks')) || {};
    const clickClasses = Object.keys(savedClicks);

    if (clickClasses.length === 0 || stopReplay) {
        console.log('[REPLAY] Brak zapisanych kliknięć lub zatrzymano.');
        return;
    }

    console.log('[REPLAY] Znalezione klasy:', clickClasses);

    clickClasses.forEach((buttonClass, index) => {
        setTimeout(() => {
            if (stopReplay) return;

            // ★ FIX — sprawdź czy już kliknięty
            const freshClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};
            if (freshClicks[buttonClass] && freshClicks[buttonClass].clicked) {
                console.log('[REPLAY] Już kliknięty — pomijam:', buttonClass);
                return;
            }

            const buttons = document.querySelectorAll(`.${buttonClass}`);
            if (buttons.length === 0) {
                console.warn('[REPLAY] Nie znaleziono przycisku:', buttonClass);
                return;
            }

            // ★ FIX — kliknij tylko PIERWSZY znaleziony przycisk
            const button = buttons[0];
            console.log('[REPLAY] Klikam:', buttonClass);
            button.click();

            // Zapisz że kliknięty
            freshClicks[buttonClass] = { clicked: true };
            localStorage.setItem('savedClicks', JSON.stringify(freshClicks));

        }, index * 2000);
    });
}

// ====== NAGRYWANIE ======
function startRecording() {
    enableLocalStorage();
    intervalId   = setInterval(checkMainPanel, 1000);
    recordingEnabled = true;
    localStorage.setItem('recordingEnabled', true);
    console.log('[REC] Start nagrywania.');
}

function stopRecording() {
    clearInterval(intervalId);
    localStorage.removeItem('savedClicks');
    recordingEnabled = false;
    localStorage.setItem('recordingEnabled', false);
    stopReplay = true;
    console.log('[REC] Stop nagrywania, dane wyczyszczone.');
}

// ====== PANEL CHECK ======
// ★ FIX — checkMainPanel NIE wywołuje replaySavedClicks
// żeby uniknąć podwójnego replay
function checkMainPanel() {
    const mainPanel = document.getElementById('main_Panel');
    if (mainPanel) {
        enableLocalStorage();
        clearInterval(intervalId);
        console.log('[CHECK] main_Panel znaleziony — rejestruję przyciski.');
    }
    const respPanel = document.getElementById('resp_Panel');
    if (respPanel) {
        enableLocalStorageWithClass('.resp_button');
    }
}

// ====== KLIK HANDLER ======
function handleButtonClick(event) {
    const buttonClass = event.target.className.replace(/\s+/g, '.');
    let savedClicks   = JSON.parse(localStorage.getItem('savedClicks')) || {};
    if (!savedClicks[buttonClass]) {
        savedClicks[buttonClass] = { clicked: false };
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log('[REC] Zapisano kliknięcie:', buttonClass);
    }
}

function enableLocalStorageWithClass(className) {
    document.querySelectorAll(className).forEach(div => {
        div.addEventListener('click', handleButtonClick);
    });
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
        document.querySelectorAll(className).forEach(button => {
            button.addEventListener('click', handleButtonClick);
        });
    });
}

// ====== PRZYCISK START/STOP ======
const startStopButton       = document.createElement('button');
startStopButton.textContent = recordingEnabled ? 'Off' : 'On';
startStopButton.id          = 'startStopButton';

Object.assign(startStopButton.style, {
    position:     'fixed',
    top:          '22px',
    right:        '5px',
    background:   '#333',
    borderRadius: '5px',
    borderWidth:  '5px 6px 5px 6px',
    display:      'block',
    color:        'gold',
    borderColor:  'rgba(0,0,0,0.9)'
});

startStopButton.addEventListener('click', () => {
    if (recordingEnabled) {
        stopRecording();
    } else {
        startRecording();
    }
    startStopButton.textContent = recordingEnabled ? 'Off' : 'On';
});

document.body.appendChild(startStopButton);
setTimeout(() => runCodeWithDelay(), 1000);

// ====== GŁÓWNA SEKWENCJA ======
const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || {};

if (Object.keys(savedClicks).length > 0) {
    console.log('[SEQ] Znaleziono zapisane kliknięcia — czekam 40s...');

    // t = 40s — page_switch
    setTimeout(() => {
        console.log('[SEQ] t=40s → page_switch game_map');
        GAME.page_switch('game_map');
    }, 40000);

    // t = 43s — Klawisz '0' (+3s)
    setTimeout(() => {
        console.log('[SEQ] t=43s → Klawisz 0');
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key:        '0',
            keyCode:    48,
            bubbles:    true,
            cancelable: true
        }));
    }, 43000);

    // t = 45s — .qlink.load_afo (+2s)
    setTimeout(() => {
        const el = document.querySelector('.qlink.load_afo');
        if (el) {
            console.log('[SEQ] t=45s → Klikam .qlink.load_afo');
            el.click();
        } else {
            console.warn('[SEQ] t=45s → Nie znaleziono .qlink.load_afo');
        }
    }, 45000);

    // t = 50s — replaySavedClicks (+5s)
    // ★ FIX — tylko JEDNO wywołanie replay
    setTimeout(() => {
        console.log('[SEQ] t=50s → replaySavedClicks');
        replaySavedClicks();
    }, 50000);

    // t = 52s — checkMainPanel (+2s)
    // ★ FIX — checkMainPanel już NIE wywołuje replay
    setTimeout(() => {
        console.log('[SEQ] t=52s → checkMainPanel');
        checkMainPanel();
    }, 52000);

} else {
    console.log('[SEQ] Brak zapisanych kliknięć w localStorage.');
}