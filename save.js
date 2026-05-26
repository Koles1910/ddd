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

// ★ ZWYKŁE PRZYCISKI (poza panelem BŁOGO)
const TRACKED_BUTTON_CLASSES = [
    { selector: '.gh_button',                          key: 'gh_button' },
    { selector: '.pvp_button',                         key: 'pvp_button' },
    { selector: '.lpvm_button',                        key: 'lpvm_button' },
    { selector: '.res_button',                         key: 'res_button' },
    { selector: '.code_button',                        key: 'code_button' },
    { selector: '.resp_button',                        key: 'resp_button' },
    { selector: '.qlink.manage_auto_abyss',            key: 'manage_auto_abyss' },
    { selector: '.qlink.manage_auto_arena',            key: 'manage_auto_arena' },
    { selector: '.qlink.manage_autoExpeditions',       key: 'manage_autoExpeditions' }
];

// ★ KLASY RESP_BUTTON (w panelu BŁOGO)
const TRACKED_RESP_CLASSES = [
    "resp_bh1",  "resp_bh2",  "resp_bh3",  "resp_bh4",  "resp_bh5",
    "resp_bh6",  "resp_bh7",  "resp_bh8",  "resp_bh9",  "resp_bh10",
    "resp_bh11", "resp_bh12", "resp_bh13", "resp_bh14", "resp_bh15",
    "resp_bh16", "resp_bh17", "resp_bh18",
    "resp_on",   "resp_off"
];

// ====== POMOCNICZE — klik pojedynczego wpisu ======
function clickEntry(entry, currentNum, totalNum) {
    if (stopReplay) return;

    const [type, value] = entry.split(':');
    let element = null;

    if (type === 'resp') {
        element = document.querySelector(`.resp_button.${value}`);
    } else if (type === 'btn') {
        const def = TRACKED_BUTTON_CLASSES.find(b => b.key === value);
        element = def ? document.querySelector(def.selector) : document.querySelector(`.${value}`);
    }

    if (element) {
        console.log(`[REPLAY ${currentNum}/${totalNum}] Klikam ${type}:`, value);

        try { element.click(); } catch (e) {}
        if (typeof $ !== 'undefined') {
            try { $(element).trigger('click'); } catch (e) {}
        }
    } else {
        console.warn(`[REPLAY ${currentNum}/${totalNum}] Brak elementu: ${entry}`);
    }
}

// ====== ODTWARZANIE KLIKNIĘĆ — najpierw setup, potem 2 fazy ======
function replaySavedClicks() {

    if (replayAlreadyRan) {
        console.log('Replay juz wykonany — pomijam.');
        return;
    }
    replayAlreadyRan = true;

    const savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (savedClicks.length === 0 || stopReplay) {
        console.log('No saved clicks or stopped.');
        return;
    }

    console.log('Found saved clicks (w kolejnosci):', savedClicks);

    // ★ Podzial na fazy
    const btnClicks  = savedClicks.filter(e => e.startsWith('btn:'));
    const respClicks = savedClicks.filter(e => e.startsWith('resp:'));

    console.log(`Faza 1 (btn): ${btnClicks.length} klikow`);
    console.log(`Faza 2 (resp): ${respClicks.length} klikow`);

    let timeline = 0;
    const total = savedClicks.length;
    let clickNum = 0;

    // ────────── KROK A: GAME.page_switch('game_map') ──────────
    setTimeout(() => {
        console.log('[SEQ A] GAME.page_switch(\'game_map\')');
        try {
            GAME.page_switch('game_map');
        } catch (e) {
            console.warn('GAME.page_switch nieudane:', e);
        }
    }, timeline);
    timeline += 3000;

    // ────────── KROK B: klawisz "0" ──────────
    setTimeout(() => {
        console.log('[SEQ B] Klawisz 0');
        const ke = new KeyboardEvent('keydown', {
            key: '0',
            code: 'Digit0',
            keyCode: 48,
            which: 48,
            bubbles: true,
            cancelable: true
        });
        document.dispatchEvent(ke);
    }, timeline);
    timeline += 2000;

    // ────────── KROK C: klik .qlink.load_afo ──────────
    setTimeout(() => {
        console.log('[SEQ C] Klik .qlink.load_afo');
        const el = document.querySelector('.qlink.load_afo');
        if (el) {
            el.click();
            if (typeof $ !== 'undefined') $(el).trigger('click');
        } else {
            console.warn('Brak .qlink.load_afo');
        }
    }, timeline);
    timeline += 10000;  // ★ 10s na otwarcie panelu BŁOGO

    // ────────── FAZA 1: btn (gh, pvp, manage_auto_* itp) co 3s ──────────
    btnClicks.forEach(entry => {
        clickNum++;
        const num = clickNum;
        setTimeout(() => clickEntry(entry, num, total), timeline);
        timeline += 3000;
    });

    // ────────── FAZA 2: resp_bh*/on/off co 3s ──────────
    respClicks.forEach(entry => {
        clickNum++;
        const num = clickNum;
        setTimeout(() => clickEntry(entry, num, total), timeline);
        timeline += 3000;
    });

    console.log(`[SEQ] Calkowity czas sekwencji: ${timeline / 1000}s`);
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

    const matched = TRACKED_BUTTON_CLASSES.find(def => {
        const requiredClasses = def.selector.split('.').filter(c => c);
        return requiredClasses.every(c => classList.includes(c));
    });

    if (!matched) return;

    const entry = `btn:${matched.key}`;
    let savedClicks = JSON.parse(localStorage.getItem('savedClicks')) || [];

    if (!savedClicks.includes(entry)) {
        savedClicks.push(entry);
        localStorage.setItem('savedClicks', JSON.stringify(savedClicks));
        console.log(`Click saved [${savedClicks.length}] BTN:`, matched.key);
    }
}

// ★ Zapis klikniecia resp_button
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
    TRACKED_BUTTON_CLASSES.forEach(def => {
        const buttons = document.querySelectorAll(def.selector);
        buttons.forEach(button => {
            button.removeEventListener('click', handleButtonClickByClass);
            button.addEventListener('click', handleButtonClickByClass);
        });
    });

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

// ★ MutationObserver
const domObserver = new MutationObserver(() => {
    if (recordingEnabled || !replayAlreadyRan) {
        enableLocalStorage();
    }
});

domObserver.observe(document.body, {
    childList: true,
    subtree: true
});

setInterval(() => {
    if (recordingEnabled || !replayAlreadyRan) {
        enableLocalStorage();
    }
}, 2000);

// ============================================================
// ★ SEKWENCJA — start 40s po odswiezeniu
// ============================================================

let savedClicksRaw = JSON.parse(localStorage.getItem('savedClicks'));
let hasSavedClicks = false;

if (Array.isArray(savedClicksRaw)) {
    hasSavedClicks = savedClicksRaw.length > 0;
} else if (savedClicksRaw && typeof savedClicksRaw === 'object') {
    const converted = Object.keys(savedClicksRaw).map(k => {
        const cleanClass = k.replace(/\./g, ' ').trim().split(' ').pop();

        if (TRACKED_RESP_CLASSES.includes(cleanClass)) {
            return `resp:${cleanClass}`;
        }

        const btnMatch = TRACKED_BUTTON_CLASSES.find(def => k.includes(def.key));
        if (btnMatch) {
            return `btn:${btnMatch.key}`;
        }

        return `btn:${cleanClass}`;
    });

    if (converted.length > 0) {
        localStorage.setItem('savedClicks', JSON.stringify(converted));
        hasSavedClicks = true;
        console.log('Skonwertowano stary format:', converted);
    }
}

if (hasSavedClicks) {
    console.log('Znaleziono zapisane kliknięcia. Start za 40s...');

    setTimeout(() => {
        console.log('[REPLAY] Start sekwencji...');
        enableLocalStorage();
        replaySavedClicks();
    }, 40000);

} else {
    console.log('Nie znaleziono zapisanych kliknięć w localStorage.');
}