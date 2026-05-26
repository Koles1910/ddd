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
let stopReplay      = false;
let replayAlreadyRan = false;

// ★ ŚLEDZONE KLASY RESP — to sa KLASY (resp_button + resp_bh1)
const TRACKED_RESP_CLASSES = [
    "resp_bh1",  "resp_bh2",  "resp_bh3",  "resp_bh4",  "resp_bh5",
    "resp_bh6",  "resp_bh7",  "resp_bh8",  "resp_bh9",  "resp_bh10",
    "resp_bh11", "resp_bh12", "resp_bh13", "resp_bh14", "resp_bh15",
    "resp_bh16", "resp_bh17", "resp_bh18",
    "resp_on",   "resp_off"
];

// ★ ZWYKLE PRZYCISKI Z KLAS
const TRACKED_BUTTON_CLASSES = [
    'gh_button',
    'pvp_button',
    'lpvm_button',
    'res_button',
    'code_button',
    'manage_auto_abyss',
    'manage_auto_arena',
    'manage_autoExpeditions'
];

// ====== ODTWARZANIE KLIKNIĘĆ ======
function replaySavedClicks() {

    if (replayAlreadyRan) {
        console.log('Replay juz wykonany — pomijam.');
        return;
    }
    replayAlreadyRan = true;

    console.log('Attempting to replay saved clicks...');

    const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (savedClicks.length === 0 || stopReplay) {
        console.log('No saved clicks or stopped.');
        return;
    }

    console.log('Found saved clicks (w kolejnosci):', savedClicks);

    savedClicks.forEach((entry, index) => {
        setTimeout(() => {
            if (stopReplay) return;

            // ★ Format: "resp:resp_bh1" lub "btn:gh_button"
            const [type, value] = entry.split(':');

            let element = null;

            if (type === 'resp') {
                // Szukaj resp_button z odpowiednia klasa (np. .resp_button.resp_bh1)
                element = document.querySelector(`.resp_button.${value}`);
            } else if (type === 'btn') {
                element = document.querySelector(`.${value}`);
            }

            if (element) {
                console.log(`[REPLAY ${index + 1}/${savedClicks.length}] Klikam ${type}:`, value);
                element.click();
            } else {
                console.warn(`[REPLAY ${index + 1}] Brak elementu: ${entry}`);
            }
        }, index * 2000);
    });
}

// ====== START / STOP ======
function startRecording() {
    enableLocalStorage();
    intervalId = setInterval(checkMainPanel, 1000);
    console.log('Started recording clicks.');
    recordingEnabled = true;
    localStorage.setItem('recordingEnabled', true);
}

function stopRecording() {
    clearInterval(intervalId);
    localStorage.removeItem('savedClicks');
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
}

// ★ Zapis klikniecia przycisku z klasami (gh_button itp)
function handleButtonClickByClass(event) {
    const target = event.currentTarget;
    const classList = Array.from(target.classList);

    // Znajdz pierwsza pasujaca klase
    const matched = classList.find(c => TRACKED_BUTTON_CLASSES.includes(c));
    if (!matched) return;

    const entry = `btn:${matched}`;
    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (!savedClicks.includes(entry)) {
        savedClicks.push(entry);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}] BTN:`, matched);
    }
}

// ★ Zapis klikniecia resp_button — wykrywa ktora klase resp_bh* ma
function handleRespButtonClick(event) {
    const target = event.currentTarget;
    const classList = Array.from(target.classList);

    // Znajdz pasujaca klase resp_bh*/on/off
    const matched = classList.find(c => TRACKED_RESP_CLASSES.includes(c));
    if (!matched) return;

    const entry = `resp:${matched}`;
    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (!savedClicks.includes(entry)) {
        savedClicks.push(entry);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}] RESP:`, matched);
    }
}

function enableLocalStorage() {
    // Standardowe przyciski
    TRACKED_BUTTON_CLASSES.forEach(cls => {
        const buttons = document.querySelectorAll(`.${cls}`);
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClickByClass);
            button.addEventListener('click', handleButtonClickByClass);
        });
    });

    // Resp buttons
    enableRespButtonListeners();
}

// ★ Rejestracja listenerow na wszystkie resp_button z odpowiednia klasa
function enableRespButtonListeners() {
    TRACKED_RESP_CLASSES.forEach(cls => {
        const buttons = document.querySelectorAll(`.resp_button.${cls}`);
        buttons.forEach(btn => {
            btn.removeEventListener('click', handleRespButtonClick);
            btn.addEventListener('click', handleRespButtonClick);
        });
    });
}

// ====== PRZYCISK ON/OFF ======
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

// ★ MutationObserver — gdy panelBlogo lub resp_buttons sa dodawane do DOM,
// automatycznie podpinaj im listenery
const domObserver = new MutationObserver(() => {
    enableRespButtonListeners();
});

domObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// ★ Dodatkowy interval — co 2s sprawdza czy sa nowe resp_button
setInterval(() => {
    enableRespButtonListeners();
}, 2000);

// ============================================================
// ★ SEKWENCJA:
//   T = 40s  →  GAME.page_switch('game_map')
//   T = 43s  →  klawisz "0"
//   T = 45s  →  klik .qlink.load_afo  (otwiera panel BŁOGO)
//   T = 55s  →  replay zapisanych klikow (panel sie musi zaladowac)
// ============================================================
const savedClicksRaw = JSON.parse(localStorage.getItem('savedClicks'));
const hasSavedClicks = Array.isArray(savedClicksRaw) && savedClicksRaw.length > 0;

if (hasSavedClicks) {
    console.log('Znaleziono zapisane kliknięcia:', savedClicksRaw);
    console.log('Start sekwencji za 40s...');

    // ──────── KROK 1 (40s): przełączenie na game_map ────────
    setTimeout(() => {
        console.log('[1/4] GAME.page_switch(\'game_map\')');
        GAME.page_switch('game_map');
    }, 40000);

    // ──────── KROK 2 (43s): naciśnięcie klawisza "0" ────────
    setTimeout(() => {
        console.log('[2/4] Symuluje nacisniecie klawisza 0');
        const keyboardEvent = new KeyboardEvent('keydown', {
            key: '0',
            code: 'Digit0',
            keyCode: 48,
            which: 48,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(keyboardEvent);
    }, 43000);

    // ──────── KROK 3 (45s): klik w .qlink.load_afo (otwiera panel BŁOGO) ────────
    setTimeout(() => {
        console.log('[3/4] Klikam .qlink.load_afo');
        const elementToClick = document.querySelector('.qlink.load_afo');
        if (elementToClick) {
            elementToClick.click();
        } else {
            console.warn('Nie znaleziono .qlink.load_afo');
        }
    }, 45000);

    // ──────── KROK 4 (55s): replay — czeka 10s na utworzenie panelu BŁOGO ────────
    setTimeout(() => {
        console.log('[4/4] Odtwarzanie zapisanych klikniec...');
        enableLocalStorage();
        replaySavedClicks();
    }, 55000);

} else {
    console.log('Nie znaleziono zapisanych kliknięć w localStorage.');
}