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

// ★ KLASY RESP_BUTTON (w panelu BŁOGO)
const TRACKED_RESP_CLASSES = [
    "resp_bh1",  "resp_bh2",  "resp_bh3",  "resp_bh4",  "resp_bh5",
    "resp_bh6",  "resp_bh7",  "resp_bh8",  "resp_bh9",  "resp_bh10",
    "resp_bh11", "resp_bh12", "resp_bh13", "resp_bh14", "resp_bh15",
    "resp_bh16", "resp_bh17", "resp_bh18",
    "resp_on",   "resp_off"
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
                // Resp button — szukaj resp_button z konkretną klasą
                element = document.querySelector(`.resp_button.${value}`);
            } else if (type === 'btn') {
                // Zwykły przycisk z listy TRACKED_BUTTON_CLASSES
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

    const respPanel = document.getElementById("resp_Panel");
    if (respPanel) {
        enableRespButtonListeners();
    }
}

// ★ Zapis klikniecia zwyklego przycisku
function handleButtonClickByClass(event) {
    const target = event.currentTarget;
    const classList = Array.from(target.classList);

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

// ★ Zapis klikniecia resp_button — wykrywa ktora klase resp_bh*/on/off ma
function handleRespButtonClick(event) {
    const target = event.currentTarget;
    const classList = Array.from(target.classList);

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

// ★ Rejestracja listenerow na resp_button
function enableRespButtonListeners() {
    TRACKED_RESP_CLASSES.forEach(cls => {
        const buttons = document.querySelectorAll(`.resp_button.${cls}`);
        buttons.forEach(btn => {
            btn.removeEventListener('click', handleRespButtonClick);
            btn.addEventListener('click', handleRespButtonClick);
        });
    });
}

function enableLocalStorage() {
    // Zwykłe przyciski
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

// ★ MutationObserver — automatycznie podpinaj listenery do nowo dodanych resp_button
const domObserver = new MutationObserver(() => {
    enableRespButtonListeners();
});

domObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// ★ Dodatkowy interval — co 2s sprawdza nowo dodane resp_button (po otwarciu panelu BŁOGO)
setInterval(() => {
    if (recordingEnabled || !replayAlreadyRan) {
        enableRespButtonListeners();
    }
}, 2000);

// ============================================================
// ★ SEKWENCJA:
//   T = 40s  →  GAME.page_switch('game_map')
//   T = 43s  →  klawisz "0"
//   T = 45s  →  klik .qlink.load_afo  (otwiera panel BŁOGO)
//   T = 55s  →  replay zapisanych klikow (czeka 10s na panel)
// ============================================================

// Obsluga obu formatow — tablica i stary obiekt
let savedClicksRaw = JSON.parse(localStorage.getItem('savedClicks'));
let hasSavedClicks = false;

if (Array.isArray(savedClicksRaw)) {
    hasSavedClicks = savedClicksRaw.length > 0;
} else if (savedClicksRaw && typeof savedClicksRaw === 'object') {
    // Stary format obiektu — konwertuj na tablice z prefixem btn:
    const converted = Object.keys(savedClicksRaw).map(k => {
        // Sprobuj rozpoznac czy to resp czy btn
        const cleanClass = k.replace(/\./g, ' ').trim().split(' ').pop();
        if (TRACKED_RESP_CLASSES.includes(cleanClass)) {
            return `resp:${cleanClass}`;
        }
        const btnMatch = TRACKED_BUTTON_CLASSES.find(c => k.includes(c));
        if (btnMatch) {
            return `btn:${btnMatch}`;
        }
        return `btn:${cleanClass}`;
    });

    if (converted.length > 0) {
        localStorage.setItem('savedClicks', JSON.stringify(converted));
        hasSavedClicks = true;
        console.log('Skonwertowano stary format na tablice:', converted);
    }
}

if (hasSavedClicks) {
    console.log('Znaleziono zapisane kliknięcia. Start sekwencji za 40s...');

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

    // ──────── KROK 4 (55s): replay — 10s po otwarciu panelu BŁOGO ────────
    setTimeout(() => {
        console.log('[4/4] Odtwarzanie zapisanych klikniec...');
        enableLocalStorage();
        replaySavedClicks();
    }, 55000);

} else {
    console.log('Nie znaleziono zapisanych kliknięć w localStorage.');
}