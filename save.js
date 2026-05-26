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

// ====== ODTWARZANIE KLIKNIĘĆ ======
function replaySavedClicks() {

    if (replayAlreadyRan) {
        console.log('Replay juz wykonany — pomijam.');
        return;
    }
    replayAlreadyRan = true;

    console.log('Attempting to replay saved clicks...');

    // ★ TABLICA — zachowuje kolejność klikania
    const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (savedClicks.length === 0 || stopReplay) {
        console.log('No saved clicks or stopped.');
        return;
    }

    console.log('Found saved clicks (w kolejnosci):', savedClicks);

    savedClicks.forEach((buttonClass, index) => {
        setTimeout(() => {
            if (stopReplay) return;

            const buttons = document.querySelectorAll(`.${buttonClass}`);
            buttons.forEach(button => {
                console.log(`[REPLAY ${index + 1}/${savedClicks.length}] Klikam: ${buttonClass}`);
                button.click();
            });
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
    }
}

// ★ POPRAWIONE — dodaje do TABLICY w kolejności klikania
function handleButtonClick(event) {
    const buttonClass = event.target.className.replace(/\s+/g, '.');

    // Wczytaj jako tablice
    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    // Sprawdz czy juz jest w tablicy (zeby nie duplikowac)
    if (!savedClicks.includes(buttonClass)) {
        savedClicks.push(buttonClass);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}]:`, buttonClass);
    }
}

function enableLocalStorageWithClass(className) {
    const divs = document.querySelectorAll(className);
    divs.forEach(div => {
        div.removeEventListener('click', handleButtonClick);
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
        const buttons = document.querySelectorAll(className);
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClick);
            button.addEventListener('click', handleButtonClick);
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

// ============================================================
// ★ SEKWENCJA:
//   T = 40s  →  GAME.page_switch('game_map')
//   T = 43s  →  klawisz "0"
//   T = 45s  →  klik .qlink.load_afo
//   T = 50s  →  replay zapisanych klikow (co 2s)
// ============================================================

// ★ Obsluga obu formatow — tablica i stary obiekt
let savedClicksRaw = JSON.parse(localStorage.getItem('savedClicks'));
let hasSavedClicks = false;

if (Array.isArray(savedClicksRaw)) {
    hasSavedClicks = savedClicksRaw.length > 0;
} else if (savedClicksRaw && typeof savedClicksRaw === 'object') {
    // Stary format — konwertuj na tablice
    const converted = Object.keys(savedClicksRaw);
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