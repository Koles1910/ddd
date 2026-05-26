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
let stopReplay = false;

// ====== REPLAY ======
function replaySavedClicks() {
    console.log('[REPLAY] Start...');
    const savedClicks  = JSON.parse(localStorage.getItem('savedClicks')) || {};
    const clickClasses = Object.keys(savedClicks);

    if (clickClasses.length > 0 && !stopReplay) {
        console.log('[REPLAY] Znalezione klasy:', clickClasses);
        clickClasses.forEach((buttonClass, index) => {
            setTimeout(() => {
                if (!stopReplay) {
                    const buttons = document.querySelectorAll(`.${buttonClass}`);
                    buttons.forEach(button => {
                        console.log('[REPLAY] Klikam:', buttonClass);
                        button.click();
                        savedClicks[buttonClass] = { clicked: true };
                        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
                    });
                }
            }, index * 2000);
        });
    } else {
        console.log('[REPLAY] Brak zapisanych kliknięć lub zatrzymano.');
    }
}

// ====== NAGRYWANIE ======
function startRecording() {
    enableLocalStorage();
    intervalId = setInterval(checkMainPanel, 1000);
    console.log('[REC] Start nagrywania.');
    recordingEnabled = true;
    localStorage.setItem('recordingEnabled', true);
}

function stopRecording() {
    clearInterval(intervalId);
    localStorage.removeItem('savedClicks');
    console.log('[REC] Stop nagrywania, dane wyczyszczone.');
    recordingEnabled = false;
    localStorage.setItem('recordingEnabled', false);
    stopReplay = true;
}

// ====== PANEL CHECK ======
function checkMainPanel() {
    const mainPanel = document.getElementById('main_Panel');
    if (mainPanel) {
        enableLocalStorage();
        clearInterval(intervalId);
        replaySavedClicks();
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

    // ★ t = 40s — page_switch
    setTimeout(() => {
        console.log('[SEQ] t=40s → page_switch game_map');
        GAME.page_switch('game_map');
    }, 40000);

    // ★ t = 43s — Klawisz '0' (+3s po page_switch)
    setTimeout(() => {
        console.log('[SEQ] t=43s → Klawisz 0');
        document.dispatchEvent(new KeyboardEvent('keydown', {
            key:        '0',
            keyCode:    48,
            bubbles:    true,
            cancelable: true
        }));
    }, 43000);

    // ★ t = 45s — Kliknij .qlink.load_afo (+2s)
    setTimeout(() => {
        const el = document.querySelector('.qlink.load_afo');
        if (el) {
            console.log('[SEQ] t=45s → Klikam .qlink.load_afo');
            el.click();
        } else {
            console.warn('[SEQ] t=45s → Nie znaleziono .qlink.load_afo');
        }
    }, 45000);

    // ★ t = 50s — replaySavedClicks (+5s)
    setTimeout(() => {
        console.log('[SEQ] t=50s → replaySavedClicks');
        replaySavedClicks();
    }, 50000);

    // ★ t = 52s — checkMainPanel (+2s)
    setTimeout(() => {
        console.log('[SEQ] t=52s → checkMainPanel');
        checkMainPanel();
    }, 52000);

} else {
    console.log('[SEQ] Brak zapisanych kliknięć w localStorage.');
}