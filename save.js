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

// ★ ID DO ŚLEDZENIA (resp_bh1..18, resp_on, resp_off)
const TRACKED_IDS = [
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

    // Tablica zachowuje kolejnosc
    const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (savedClicks.length === 0 || stopReplay) {
        console.log('No saved clicks or stopped.');
        return;
    }

    console.log('Found saved clicks (w kolejnosci):', savedClicks);

    savedClicks.forEach((entry, index) => {
        setTimeout(() => {
            if (stopReplay) return;

            // ★ Rozpoznaj czy to ID czy klasa
            // Format: "id:resp_bh1" lub "class:gh_button"
            const [type, value] = entry.split(':');

            let elements = [];

            if (type === 'id') {
                const el = document.getElementById(value);
                if (el) elements = [el];
            } else if (type === 'class') {
                elements = Array.from(document.querySelectorAll(`.${value}`));
            }

            if (elements.length > 0) {
                elements.forEach(el => {
                    console.log(`[REPLAY ${index + 1}/${savedClicks.length}] Klikam ${type}:`, value);
                    el.click();
                });
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
        enableLocalStorageWithClass('.resp_button');
        enableLocalStorageForIds(); // ★ NOWE
    }
}

// ★ NOWE: zapis kliknięć z klas
function handleButtonClickByClass(event) {
    const buttonClass = event.currentTarget.className.replace(/\s+/g, '.');
    const entry = `class:${buttonClass}`;

    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (!savedClicks.includes(entry)) {
        savedClicks.push(entry);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}] CLASS:`, buttonClass);
    }
}

// ★ NOWE: zapis kliknięć z ID
function handleButtonClickById(event) {
    const elementId = event.currentTarget.id;
    if (!elementId) return;

    const entry = `id:${elementId}`;

    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (!savedClicks.includes(entry)) {
        savedClicks.push(entry);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}] ID:`, elementId);
    }
}

function enableLocalStorageWithClass(className) {
    const divs = document.querySelectorAll(className);
    divs.forEach(div => {
        div.removeEventListener('click', handleButtonClickByClass);
        div.addEventListener('click', handleButtonClickByClass);
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
        const buttons = document.querySelectorAll(className);
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClickByClass);
            button.addEventListener('click', handleButtonClickByClass);
        });
    });

    // ★ NOWE: dodatkowo śledź ID
    enableLocalStorageForIds();
}

// ★ NOWE: rejestracja listenerow dla ID
function enableLocalStorageForIds() {
    TRACKED_IDS.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.removeEventListener('click', handleButtonClickById);
            el.addEventListener('click', handleButtonClickById);
        }
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

// ★ NOWE: obserwator DOM — gdy pojawia się resp_bh1..18 / resp_on / resp_off,
// automatycznie podpina im listener (potrzebne po pojawieniu się resp_Panel)
const idObserver = new MutationObserver(() => {
    if (recordingEnabled || !replayAlreadyRan) {
        enableLocalStorageForIds();
    }
});

idObserver.observe(document.body, {
    childList: true,
    subtree: true
});

// ============================================================
// ★ SEKWENCJA:
//   T = 40s  →  GAME.page_switch('game_map')
//   T = 43s  →  klawisz "0"
//   T = 45s  →  klik .qlink.load_afo
//   T = 50s  →  replay zapisanych klikow (co 2s)
// ============================================================

// Obsluga obu formatow — tablica i stary obiekt
let savedClicksRaw = JSON.parse(localStorage.getItem('savedClicks'));
let hasSavedClicks = false;

if (Array.isArray(savedClicksRaw)) {
    hasSavedClicks = savedClicksRaw.length > 0;
} else if (savedClicksRaw && typeof savedClicksRaw === 'object') {
    const converted = Object.keys(savedClicksRaw).map(k => `class:${k}`);
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

    // ──────── KROK 3 (45s): klik w .qlink.load_afo ────────
    setTimeout(() => {
        console.log('[3/4] Klikam .qlink.load_afo');
        const elementToClick = document.querySelector('.qlink.load_afo');
        if (elementToClick) {
            elementToClick.click();
        } else {
            console.warn('Nie znaleziono .qlink.load_afo');
        }
    }, 45000);

    // ──────── KROK 4 (50s): replay zapisanych klikow ────────
    setTimeout(() => {
        console.log('[4/4] Odtwarzanie zapisanych klikniec...');
        enableLocalStorage();
        replaySavedClicks();
    }, 50000);

} else {
    console.log('Nie znaleziono zapisanych kliknięć w localStorage.');
}