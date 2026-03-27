// ─── AUTO KLIK ─────────────────────────────────────────────
setTimeout(() => {
  console.log("Czekam 40s...");

  // klik ZAPISZ
  const saveBtn = document.getElementById('tr-save');
  if (saveBtn) {
    saveBtn.click();
    console.log("Kliknięto Zapisz");
  } else {
    console.warn("Brak #tr-save");
  }

}, 45000);
(() => {
  'use strict';

  // ─── Integrity check ──────────────────────────────────────────────────────────
  const _credits = 'Created by yasoen for Tralalelu';
  const _chk     = Array.from(_credits).reduce((a, c) => (a * 31 + c.charCodeAt(0)) & 0xFFFFFFFF, 0x45A3F1B2);
  if (_chk !== 0x8E56B6F) {
    console.error('Odezwij sie na dc do: Yasoen.   :)');
    return;
  }

  // ─── Constants ────────────────────────────────────────────────────────────────
  const WAIT_MS        = 3000;
  const SCAN_WAIT_MS   = 3000;
  const RECONNECT_MS   = 10_000;
  const LOGOUT_WAIT_MS = 15_000;
  const MIN_MINUTE     = 2;
  const CODE_APUD      = 'vzaaa';
  const SSJ_MIN_REBORN = 4;

  const STATS = [
    { value: 'siła',         label: 'Siła'       },
    { value: 'szybkość',     label: 'Szybkość'   },
    { value: 'wytrzymałość', label: 'Wytrzymałość'},
    { value: 'Energia Ki',   label: 'Ki'         },
    { value: 'Siła Woli',    label: 'Siła Woli'  },
  ];

  const EMIT = {
    GET_RENTED    :                     { a: 39, type: 47 },
    USE_CHAR      : (target)         => ({ a: 39, type: 48, target }),
    TRAINING_START: (stat, duration) => ({ a: 8,  type: 2, stat, duration }),
    TRAINING_CODE :                     { a: 8,  type: 5, apud: CODE_APUD },
    SSJ_START     : (techId)         => ({ a: 18, type: 5, tech_id: techId }),
    SSJ_STOP      :                       { a: 18, type: 6 },
    LOGOUT        : (charId)         => ({ a: 2,  char_id: charId }),
  };

  // ─── State ────────────────────────────────────────────────────────────────────
  const state = {

    running          : false,
    step             : 0,
    stat             : null,
    duration         : null,
    allowedNicks     : [],
    includeMainChar  : false,
    charQueue        : [],
    queueIndex       : 0,
    charNames        : {},
    charTimers       : [],
    mainCharId       : null,
    mainCharName     : null,
    monitorMode      : false,
    monitorInterval  : null,
    trainingStartedAt: null,
    countdownTimer   : null,
  };
// ─── STORAGE ─────────────────────────────────────────────
const STORAGE_KEY = 'trainer_settings_v1';
const POWER_KEY   = 'trainer_power_v1';

function saveToStorage() {
  const data = {
    stat: state.stat,
    duration: state.duration,
    allowedNicks: state.allowedNicks,
    includeMainChar: state.includeMainChar
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadFromStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;

    const data = JSON.parse(raw);

    state.stat = data.stat ?? null;
    state.duration = data.duration ?? null;
    state.allowedNicks = data.allowedNicks ?? [];
    state.includeMainChar = data.includeMainChar ?? false;

    setTimeout(() => {
      if (state.stat) {
        const radio = document.querySelector(`input[name="tr-stat"][value="${state.stat}"]`);
        if (radio) radio.checked = true;
      }

      const dur = document.getElementById('tr-duration');
      if (dur && state.duration) dur.value = state.duration;

      const nicks = document.getElementById('tr-nicks');
      if (nicks && state.allowedNicks.length) {
        nicks.value = state.allowedNicks.join(';');
      }

      const toggle = document.getElementById('tr-main-toggle');
      if (toggle) toggle.checked = state.includeMainChar;

      setInfo('✓ Wczytano zapisane ustawienia');
    }, 100);

  } catch (e) {
    console.warn('[Trainer] storage error', e);
  }
}
function savePowerState() {
  localStorage.setItem(POWER_KEY, state.running ? 'on' : 'off');
}

function loadPowerState() {
  return localStorage.getItem(POWER_KEY); // 'on' | 'off' | null
}
  // ─── Helpers ──────────────────────────────────────────────────────────────────
  const emit  = (order) => GAME.socket.emit('ga', order);
  const delay = (fn, ms = WAIT_MS) => window.setTimeout(fn, ms);
  const log   = (...args) => console.log('[Trainer]', ...args);

  function formatMs(ms) {
    if (ms <= 0) return '00:00:00';
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return [h, m, s].map(v => String(v).padStart(2, '0')).join(':');
  }

  function getMainCharId() {
    try {
      return document.getElementById('char_list_con').children[0].attributes[2].value;
    } catch {
      console.error('[Trainer] Cannot read main char ID');
      return null;
    }
  }

  function getRentedChars() {
    const container = document.getElementById('clan_rented');
    if (!container) return [];
    return Array.from(container.children).map(child => {
      try {
        const el   = child.children[0].children[1];
        const id   = parseInt(el.getAttribute('data-char_id'));
        const name = el.textContent.trim();
        return { id, name };
      } catch { return null; }
    }).filter(Boolean).filter(c => !isNaN(c.id));
  }

  function getServerMinute() {
    const [, minutes] = $('#server_time').text().split(':');
    return parseInt(minutes);
  }

  function captureEndTime() {
    const $timer = $('#train_uptime span.timer');
    if (!$timer.length) return null;
    const text = $timer.text().trim();
    if (!text || text === '--:--:--') return null;
    const parts = text.split(':').map(Number);
    if (parts.length !== 3 || parts.some(isNaN)) return null;
    return Date.now() + (parts[0] * 3600 + parts[1] * 60 + parts[2]) * 1000;
  }

  function updateCharTimer() {
    const charId = state.charQueue[state.queueIndex - 1];
    if (charId == null) return;
    const endWallTime = captureEndTime();
    if (!endWallTime) { log('⚠ Nie udało się odczytać czasu treningu'); return; }
    const name = state.charNames[charId] || `#${charId}`;
    const idx  = state.charTimers.findIndex(t => t.id === charId);
    if (idx >= 0) { state.charTimers[idx].endWallTime = endWallTime; }
    else          { state.charTimers.push({ id: charId, name, endWallTime }); }
    log(`Timer zapisany dla "${name}": wygasa o ${new Date(endWallTime).toLocaleTimeString()}`);
  }

  function buildFullQueue(filtered) {
    const rentedIds = filtered.map(c => c.id);
    if (state.includeMainChar && state.mainCharId) return [state.mainCharId, ...rentedIds];
    return rentedIds;
  }

  // ─── Countdown ────────────────────────────────────────────────────────────────
  function startCountdown(wakeAt) {
    if (state.countdownTimer) clearInterval(state.countdownTimer);
    function update() {
      const rem = wakeAt - Date.now();
      if (rem <= 0) { clearInterval(state.countdownTimer); setStatus(''); return; }
      setStatus(`SYNC  ${formatMs(rem)}`);
    }
    update();
    state.countdownTimer = setInterval(update, 1000);
  }

  function stopCountdown() {
    if (state.countdownTimer) { clearInterval(state.countdownTimer); state.countdownTimer = null; }
    setStatus('');
  }

  // ─── Monitor mode ─────────────────────────────────────────────────────────────
  function startMonitoring() {
    if (!state.running) return;
    stopMonitoring();
    stopCountdown();
    renderTimerList();
    document.getElementById('tr-timers').style.display = 'block';
    state.monitorInterval = setInterval(() => {
      if (!state.running) { stopMonitoring(); return; }
      renderTimerList();
      checkExpiredTimers();
    }, 1000);
    log('Tryb monitorowania aktywny.');
  }

  function stopMonitoring() {
    if (state.monitorInterval) { clearInterval(state.monitorInterval); state.monitorInterval = null; }
  }

  function renderTimerList() {
    const now    = Date.now();
    const sorted = [...state.charTimers].sort((a, b) => a.endWallTime - b.endWallTime);
    const el     = document.getElementById('tr-timer-list');
    if (!el) return;

    if (!sorted.length) {
      el.innerHTML = '<div class="tr-empty">brak danych</div>';
      return;
    }

    el.innerHTML = sorted.map(t => {
      const rem     = t.endWallTime - now;
      const expired = rem <= 0;
      return `
        <div class="tr-timer-row${expired ? ' tr-expired' : ''}">
          <span class="tr-timer-name" title="${t.name}">${t.name}</span>
          <span class="tr-timer-val${expired ? ' tr-blink' : ''}">${expired ? '▶ RUN' : formatMs(rem)}</span>
        </div>`;
    }).join('');
  }

  function checkExpiredTimers() {
    const now     = Date.now();
    const expired = state.charTimers
      .filter(t => t.endWallTime <= now)
      .sort((a, b) => a.endWallTime - b.endWallTime);
    if (!expired.length) return;

    const target = expired[0];
    log(`Timer wygasł dla: "${target.name}" — startuję sekwencję`);
    stopMonitoring();
    state.charTimers        = state.charTimers.filter(t => t.id !== target.id);
    renderTimerList();
    state.charQueue         = [target.id];
    state.queueIndex        = 0;
    state.trainingStartedAt = null;
    goToStep(3, WAIT_MS);
  }

  // ─── UI helpers ───────────────────────────────────────────────────────────────
  function setStatus(msg) {
    const el = document.getElementById('tr-status-text');
    if (el) el.textContent = msg;
    const bar = document.getElementById('tr-status-bar');
    if (bar) bar.style.display = msg ? 'flex' : 'none';
  }

  function setInfo(msg) {
    const el = document.getElementById('tr-info');
    if (el) el.textContent = msg;
  }

  function setPanelCollapsed(collapsed) {
    const el = document.getElementById('tr-settings');
    if (el) el.style.display = collapsed ? 'none' : 'block';
    const btn = document.getElementById('tr-settings-btn');
    if (btn) btn.classList.toggle('tr-btn-active', !collapsed);
  }

  // ─── UI build ─────────────────────────────────────────────────────────────────
  function buildUI() {
    // ── Google Fonts ──
    if (!document.getElementById('tr-fonts')) {
      const link = document.createElement('link');
      link.id   = 'tr-fonts';
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Rajdhani:wght@400;500;600&display=swap';
      document.head.appendChild(link);
    }

    // ── CSS ──
    const css = `
      /* ── Reset scope ── */
      #tr-panel, #tr-panel * { box-sizing: border-box; }

      /* ── Fonts ── */
      #tr-panel {
        font-family: 'Rajdhani', sans-serif;
      }
      .tr-mono {
        font-family: 'Share Tech Mono', monospace;
      }

      /* ── Panel ── */
      #tr-panel {
        position: fixed;
        top: 60px;
        right: 0;
        width: 178px;
        z-index: 9998;
        background: rgba(9, 11, 16, 0.96);
        border: 1px solid rgba(180, 140, 30, 0.35);
        border-radius: 6px;
        overflow: hidden;
        box-shadow:
          0 0 0 1px rgba(180,140,30,0.08),
          0 8px 32px rgba(0,0,0,0.7),
          inset 0 1px 0 rgba(255,220,80,0.06);
        transition: box-shadow 0.2s;
        user-select: none;
      }
      #tr-panel:hover {
        box-shadow:
          0 0 0 1px rgba(180,140,30,0.18),
          0 8px 32px rgba(0,0,0,0.8),
          inset 0 1px 0 rgba(255,220,80,0.08);
      }

      /* ── Header ── */
      #tr-header {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 8px 7px 10px;
        background: rgba(180,140,30,0.07);
        border-bottom: 1px solid rgba(180,140,30,0.18);
        cursor: grab;
      }
      #tr-header:active { cursor: grabbing; }
      #tr-drag-dots {
        display: flex;
        flex-direction: column;
        gap: 2px;
        opacity: 0.4;
        flex-shrink: 0;
        margin-right: 2px;
      }
      #tr-drag-dots span {
        display: flex;
        gap: 2px;
      }
      #tr-drag-dots i {
        width: 2px; height: 2px;
        border-radius: 50%;
        background: #c9a227;
        display: block;
      }
      #tr-title {
        flex: 1;
        font-family: 'Rajdhani', sans-serif;
        font-weight: 600;
        font-size: 11px;
        letter-spacing: 2.5px;
        color: #c9a227;
        text-transform: uppercase;
      }
      .tr-hbtn {
        width: 18px; height: 18px;
        border: 1px solid rgba(180,140,30,0.25);
        border-radius: 3px;
        background: transparent;
        color: rgba(180,140,30,0.5);
        font-size: 11px;
        line-height: 1;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        transition: all 0.15s;
        flex-shrink: 0;
        padding: 0;
      }
      .tr-hbtn:hover {
        background: rgba(180,140,30,0.12);
        color: #c9a227;
        border-color: rgba(180,140,30,0.5);
      }
      .tr-hbtn.tr-btn-active {
        background: rgba(180,140,30,0.15);
        color: #f0c040;
        border-color: rgba(180,140,30,0.6);
      }

      /* Power indicator dot in header */
      #tr-power-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        background: #374151;
        flex-shrink: 0;
        transition: background 0.3s, box-shadow 0.3s;
      }
      #tr-power-dot.on {
        background: #22c55e;
        box-shadow: 0 0 6px rgba(34,197,94,0.7);
        animation: tr-pulse 2s infinite;
      }
      #tr-power-dot.off {
        background: #ef4444;
        box-shadow: 0 0 4px rgba(239,68,68,0.4);
      }
      @keyframes tr-pulse {
        0%, 100% { box-shadow: 0 0 6px rgba(34,197,94,0.7); }
        50%       { box-shadow: 0 0 12px rgba(34,197,94,0.9); }
      }

      /* ── Body ── */
      #tr-body { overflow: hidden; }

      /* ── Settings ── */
      #tr-settings {
        padding: 10px 10px 8px;
        border-bottom: 1px solid rgba(180,140,30,0.1);
      }

      .tr-field-label {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(180,140,30,0.5);
        margin-bottom: 5px;
      }

      /* Stat radios — jedna kolumna */
      #tr-stats {
        display: flex;
        flex-direction: column;
        gap: 3px;
        margin-bottom: 9px;
      }
      .tr-stat-label {
        display: flex;
        align-items: center;
        gap: 5px;
        cursor: pointer;
        padding: 4px 5px;
        border-radius: 4px;
        border: 1px solid rgba(180,140,30,0.12);
        transition: all 0.15s;
        font-size: 11.5px;
        font-weight: 500;
        color: #6b7280;
      }
      .tr-stat-label:hover {
        border-color: rgba(180,140,30,0.3);
        color: #9ca3af;
        background: rgba(180,140,30,0.05);
      }
      .tr-stat-label input { display: none; }
      .tr-radio-dot {
        width: 7px; height: 7px;
        border-radius: 50%;
        border: 1px solid #4b5563;
        flex-shrink: 0;
        transition: all 0.15s;
        background: transparent;
      }
      .tr-stat-label input:checked ~ .tr-radio-dot {
        background: #c9a227;
        border-color: #c9a227;
        box-shadow: 0 0 5px rgba(201,162,39,0.5);
      }
      .tr-stat-label input:checked ~ span {
        color: #f0c040;
      }
      /* Wytrzymałość label spans full width */
      .tr-stat-full { grid-column: 1 / -1; }

      /* Inputs */
      .tr-inputs { display: block; margin-bottom: 7px; }
      .tr-input-wrap { width: 100%; }
      .tr-input-wrap small {
        display: block;
        font-size: 8.5px;
        letter-spacing: 1px;
        text-transform: uppercase;
        color: rgba(180,140,30,0.4);
        margin-bottom: 2px;
      }
      #tr-panel input[type="number"],
      #tr-panel input[type="text"] {
        width: 100%;
        padding: 4px 6px;
        background: rgba(255,255,255,0.03);
        border: 1px solid rgba(180,140,30,0.2);
        border-radius: 4px;
        color: #e5e7eb;
        font-family: 'Rajdhani', sans-serif;
        font-size: 12px;
        outline: none;
        transition: border-color 0.15s;
      }
      #tr-panel input[type="number"]:focus,
      #tr-panel input[type="text"]:focus {
        border-color: rgba(180,140,30,0.55);
        background: rgba(180,140,30,0.04);
      }
      #tr-panel input::placeholder { color: #374151; }
      /* Remove number input arrows */
      #tr-panel input[type="number"]::-webkit-inner-spin-button,
      #tr-panel input[type="number"]::-webkit-outer-spin-button { -webkit-appearance: none; margin: 0; }

      /* Main char toggle row */
      #tr-main-toggle-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 5px 0;
        margin-bottom: 7px;
      }
      #tr-main-toggle-row span {
        font-size: 11.5px;
        font-weight: 500;
        color: #6b7280;
      }
      .tr-switch {
        position: relative;
        display: inline-block;
        width: 30px; height: 16px;
        flex-shrink: 0;
      }
      .tr-switch input { opacity: 0; width: 0; height: 0; }
      .tr-track {
        position: absolute; inset: 0;
        background: rgba(255,255,255,0.07);
        border: 1px solid rgba(180,140,30,0.2);
        border-radius: 16px;
        cursor: pointer;
        transition: all 0.2s;
      }
      .tr-track:before {
        content: '';
        position: absolute;
        width: 10px; height: 10px;
        left: 2px; top: 2px;
        border-radius: 50%;
        background: #4b5563;
        transition: all 0.2s;
      }
      .tr-switch input:checked + .tr-track {
        background: rgba(201,162,39,0.2);
        border-color: rgba(201,162,39,0.6);
      }
      .tr-switch input:checked + .tr-track:before {
        background: #c9a227;
        transform: translateX(14px);
        box-shadow: 0 0 5px rgba(201,162,39,0.5);
      }

      /* Save button */
      #tr-save {
        width: 100%;
        padding: 6px;
        background: rgba(180,140,30,0.1);
        border: 1px solid rgba(180,140,30,0.3);
        border-radius: 4px;
        color: #c9a227;
        font-family: 'Rajdhani', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.15s;
        margin-bottom: 6px;
      }
      #tr-save:hover {
        background: rgba(180,140,30,0.2);
        border-color: rgba(180,140,30,0.6);
        color: #f0c040;
      }
      #tr-save:active {
        background: rgba(180,140,30,0.28);
        transform: translateY(1px);
      }

      /* Info text */
      #tr-info {
        font-size: 10.5px;
        color: rgba(180,140,30,0.55);
        min-height: 13px;
        word-break: break-word;
        line-height: 1.3;
      }

      /* ── Status bar ── */
      #tr-status-bar {
        display: none;
        align-items: center;
        gap: 6px;
        padding: 5px 10px;
        background: rgba(180,140,30,0.04);
        border-bottom: 1px solid rgba(180,140,30,0.1);
      }
      #tr-status-dot-sm {
        width: 5px; height: 5px;
        border-radius: 50%;
        background: #c9a227;
        flex-shrink: 0;
        animation: tr-pulse 1.5s infinite;
      }
      #tr-status-text {
        font-family: 'Share Tech Mono', monospace;
        font-size: 10px;
        color: #c9a227;
        letter-spacing: 0.5px;
      }

      /* ── Timer list ── */
      #tr-timers {
        padding: 8px 10px;
      }
      .tr-queue-label {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        color: rgba(180,140,30,0.4);
        margin-bottom: 5px;
      }
      #tr-timer-list { display: flex; flex-direction: column; gap: 2px; }
      .tr-timer-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 3px 5px;
        border-radius: 3px;
        border: 1px solid transparent;
        transition: background 0.2s;
      }
      .tr-timer-row.tr-expired {
        background: rgba(239,68,68,0.07);
        border-color: rgba(239,68,68,0.15);
      }
      .tr-timer-name {
        font-size: 11px;
        font-weight: 500;
        color: #9ca3af;
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .tr-timer-val {
        font-family: 'Share Tech Mono', monospace;
        font-size: 10px;
        color: #22c55e;
        white-space: nowrap;
      }
      .tr-timer-val.tr-blink {
        color: #ef4444;
        animation: tr-blink 0.7s step-end infinite;
      }
      @keyframes tr-blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.2; }
      }
      .tr-empty {
        font-size: 10px;
        color: #374151;
        text-align: center;
        padding: 4px 0;
      }

      /* ── Footer / power button ── */
      #tr-footer {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 7px 10px;
        border-top: 1px solid rgba(180,140,30,0.1);
        background: rgba(0,0,0,0.2);
      }
      #tr-power {
        flex: 1;
        padding: 5px;
        border-radius: 4px;
        border: 1px solid rgba(239,68,68,0.35);
        background: rgba(239,68,68,0.07);
        color: #f87171;
        font-family: 'Rajdhani', sans-serif;
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 2px;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.15s;
      }
      #tr-power:hover {
        background: rgba(239,68,68,0.15);
        border-color: rgba(239,68,68,0.55);
      }
      #tr-power.tr-power-on {
        border-color: rgba(34,197,94,0.4);
        background: rgba(34,197,94,0.08);
        color: #4ade80;
      }
      #tr-power.tr-power-on:hover {
        background: rgba(34,197,94,0.16);
        border-color: rgba(34,197,94,0.6);
      }
      #tr-power:active { transform: translateY(1px); }

      #tr-credits {
        width: 16px; height: 16px;
        border: 1px solid rgba(180,140,30,0.2);
        border-radius: 50%;
        background: transparent;
        color: rgba(180,140,30,0.4);
        font-size: 9px;
        cursor: pointer;
        display: flex; align-items: center; justify-content: center;
        flex-shrink: 0;
        transition: all 0.15s;
        font-family: 'Rajdhani', sans-serif;
        position: relative;
      }
      #tr-credits:hover {
        color: #c9a227;
        border-color: rgba(180,140,30,0.5);
      }
      #tr-credits-tip {
        display: none;
        position: absolute;
        bottom: 20px;
        right: 0;
        width: 140px;
        background: rgba(9,11,16,0.98);
        border: 1px solid rgba(180,140,30,0.3);
        border-radius: 4px;
        padding: 6px 8px;
        font-family: 'Share Tech Mono', monospace;
        font-size: 9px;
        color: rgba(180,140,30,0.7);
        white-space: normal;
        line-height: 1.5;
        pointer-events: none;
        z-index: 99999;
      }
      #tr-credits:hover #tr-credits-tip { display: block; }

      /* ── Minimize state ── */
      #tr-panel.tr-minimized #tr-body { display: none; }
      #tr-panel.tr-minimized #tr-footer { display: none; }
      #tr-panel.tr-minimized { border-bottom-left-radius: 6px; border-bottom-right-radius: 6px; }
    `;

    const styleEl = document.createElement('style');
    styleEl.id = 'tr-styles';
    styleEl.textContent = css;
    document.head.appendChild(styleEl);

    // ── HTML ──
    const statRadios = STATS.map(({ value, label }) => `
      <label class="tr-stat-label">
        <input type="radio" name="tr-stat" value="${value}" />
        <span class="tr-radio-dot"></span>
        <span>${label}</span>
      </label>`).join('');

    const html = `
      <div id="tr-panel">

        <!-- Header -->
        <div id="tr-header">
          <div id="tr-drag-dots">
            <span><i></i><i></i><i></i></span>
            <span><i></i><i></i><i></i></span>
          </div>
          <span id="tr-title">Trainer</span>
          <div id="tr-power-dot" class="off"></div>
          <button class="tr-hbtn tr-btn-active" id="tr-settings-btn" title="Ustawienia">⚙</button>
          <button class="tr-hbtn" id="tr-minimize-btn" title="Minimalizuj">−</button>
        </div>

        <!-- Body -->
        <div id="tr-body">

          <!-- Settings -->
          <div id="tr-settings">
            <div class="tr-field-label">Statystyka</div>
            <div id="tr-stats">${statRadios}</div>

            <div class="tr-inputs">
              <div class="tr-input-wrap">
                <small>Czas (h)</small>
                <input type="number" id="tr-duration" placeholder="2" min="1" />
              </div>
              <div class="tr-input-wrap" style="margin-top:5px;">
                <small>Nicki</small>
                <input type="text" id="tr-nicks" placeholder="A;B" />
              </div>
            </div>

            <div id="tr-main-toggle-row">
              <span>Główna postać</span>
              <label class="tr-switch">
                <input type="checkbox" id="tr-main-toggle" />
                <span class="tr-track"></span>
              </label>
            </div>

            <button id="tr-save">Zapisz</button>
            <div id="tr-info"></div>
          </div>

          <!-- Status bar -->
          <div id="tr-status-bar">
            <div id="tr-status-dot-sm"></div>
            <span id="tr-status-text" class="tr-mono"></span>
          </div>

          <!-- Timer list -->
          <div id="tr-timers" style="display:none;">
            <div class="tr-queue-label">Kolejka</div>
            <div id="tr-timer-list"></div>
          </div>

        </div>

        <!-- Footer -->
        <div id="tr-footer">
          <button id="tr-power">■ OFF</button>
          <div id="tr-credits">?<div id="tr-credits-tip">${_credits}</div></div>
        </div>

      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', html);

    // ── Drag ──
    const panel  = document.getElementById('tr-panel');
    const header = document.getElementById('tr-header');
    let dragging = false, ox = 0, oy = 0;

    header.addEventListener('mousedown', e => {
      if (e.target.closest('button, .tr-hbtn')) return;
      dragging = true;
      panel.style.right = 'auto';
      ox = e.clientX - panel.getBoundingClientRect().left;
      oy = e.clientY - panel.getBoundingClientRect().top;
      e.preventDefault();
    });
    document.addEventListener('mousemove', e => {
      if (!dragging) return;
      let x = e.clientX - ox;
      let y = e.clientY - oy;
      x = Math.max(0, Math.min(window.innerWidth  - panel.offsetWidth,  x));
      y = Math.max(0, Math.min(window.innerHeight - panel.offsetHeight, y));
      panel.style.left = x + 'px';
      panel.style.top  = y + 'px';
    });
    document.addEventListener('mouseup', () => { dragging = false; });

    // ── Minimize ──
    document.getElementById('tr-minimize-btn').addEventListener('click', () => {
      const minimized = panel.classList.toggle('tr-minimized');
      document.getElementById('tr-minimize-btn').textContent = minimized ? '+' : '−';
    });

    // ── Settings toggle ──
    document.getElementById('tr-settings-btn').addEventListener('click', () => {
      const settings = document.getElementById('tr-settings');
      const visible  = settings.style.display !== 'none';
      settings.style.display = visible ? 'none' : 'block';
      document.getElementById('tr-settings-btn').classList.toggle('tr-btn-active', !visible);
    });

    // ── Save & Power ──
    document.getElementById('tr-save').addEventListener('click', onSave);
    document.getElementById('tr-power').addEventListener('click', onToggle);

    // ── Keyboard shortcut ──
  }

  // ─── onSave ───────────────────────────────────────────────────────────────────
  function onSave() {
    const stat          = document.querySelector('input[name="tr-stat"]:checked')?.value;
    const duration      = document.getElementById('tr-duration').value.trim();
    const allowedNicks  = document.getElementById('tr-nicks').value
      .split(';').map(n => n.trim()).filter(n => n.length > 0);
    const includeMainChar = document.getElementById('tr-main-toggle').checked;

    if (!stat)                         { setInfo('⚠ Wybierz statystykę.');  return; }
    if (!duration || isNaN(+duration)) { setInfo('⚠ Podaj czas treningu.'); return; }

    state.stat            = stat;
    state.duration        = duration;
    state.allowedNicks    = allowedNicks;
    state.includeMainChar = includeMainChar;

    const statLabel = STATS.find(s => s.value === stat)?.label ?? stat;
    const nickInfo  = allowedNicks.length > 0 ? allowedNicks.join(', ') : 'wszyscy';
    const mainInfo  = includeMainChar ? ' +główna' : '';

    log('Konfiguracja:', { stat, duration, allowedNicks, includeMainChar });
    setInfo(`✓ ${statLabel} · ${duration}h · ${nickInfo}${mainInfo}`);
	saveToStorage();
  }

  // ─── onToggle ─────────────────────────────────────────────────────────────────
  function onToggle() {
  state.running = !state.running;
  const btn = document.getElementById('tr-power');
  const dot = document.getElementById('tr-power-dot');

  if (state.running) {
    btn.textContent = '▶ ON';
    btn.classList.add('tr-power-on');
    dot.className = 'on';
    setPanelCollapsed(true);
    state.step              = 0;
    state.queueIndex        = 0;
    state.charQueue         = [];
    state.charTimers        = [];
    state.charNames         = {};
    state.monitorMode       = false;
    state.trainingStartedAt = null;
    stopMonitoring();
    stopCountdown();
    document.getElementById('tr-timers').style.display = 'none';
    log('Start');
    tick();
  } else {
    btn.textContent = '■ OFF';
    btn.classList.remove('tr-power-on');
    dot.className = 'off';
    setPanelCollapsed(false);
    stopCountdown();
    stopMonitoring();
    setStatus('');
    log('Stop');
  }

  // 🔥 ZAPIS STANU
  savePowerState();
}

  // ─── Step machine ─────────────────────────────────────────────────────────────
  //
  //  RUNDA 1 — trenowanie:
  //  0  checkServerTime
  //  1  fetchRented
  //  2  buildCharQueue
  //  3  loginChar
  //  4  activateSSJ         ← SSJ najpierw
  //  5  startTraining
  //  6  enterCode
  //  7  logout              ← następna → 3 | koniec → runda skanująca (8)
  //
  //  RUNDA SKANUJĄCA:
  //  8  scanLogin
  //  9  scanReadTimer       ← SCAN_WAIT_MS, odczyt timera
  //  10 scanLogout          ← następna → 8 | koniec → monitorMode
  //
  //  MONITOR → wygasły timer → krok 3 (jednoelemntowa kolejka) → … → monitorMode
  //
  const STEPS = [
    checkServerTime,  // 0
    fetchRented,      // 1
    buildCharQueue,   // 2
    loginChar,        // 3
    activateSSJ,      // 4
    startTraining,    // 5
    enterCode,        // 6
    logout,           // 7
    scanLogin,        // 8
    scanReadTimer,    // 9
    scanLogout,       // 10
  ];

  function tick() {
    if (!state.running) return;
    if (GAME.is_loading) return delay(tick);
    const fn = STEPS[state.step];
    if (fn) fn();
  }

  function nextStep(ms = WAIT_MS) { state.step++; delay(tick, ms); }
  function goToStep(n, ms = WAIT_MS) { state.step = n; delay(tick, ms); }

  // ─── Steps ────────────────────────────────────────────────────────────────────
  function checkServerTime() {
    const minute = getServerMinute();
    if (minute >= MIN_MINUTE) { nextStep(); return; }
    log(`Minuta serwera: ${minute} — oczekiwanie`);
    emit(EMIT.LOGOUT(state.mainCharId));
    delay(waitForSync, RECONNECT_MS);
  }

  function waitForSync() {
    if (getServerMinute() >= MIN_MINUTE) { nextStep(); }
    else { delay(waitForSync, RECONNECT_MS); }
  }

  function fetchRented() {
    emit(EMIT.GET_RENTED);
    nextStep();
  }

  function buildCharQueue() {
    const chars    = getRentedChars();
    const filtered = state.allowedNicks.length > 0
      ? chars.filter(c => state.allowedNicks.some(n => n.toLowerCase() === c.name.toLowerCase()))
      : chars;

    const newNames = {};
    filtered.forEach(c => { newNames[c.id] = c.name; });
    if (state.includeMainChar && state.mainCharId) {
      newNames[state.mainCharId] = state.mainCharName || `#${state.mainCharId}`;
    }

    state.charQueue  = buildFullQueue(filtered);
    state.charNames  = { ...state.charNames, ...newNames };
    state.queueIndex = 0;

    log('Kolejka:', state.charQueue.map(id => `${state.charNames[id] || id}(${id})`));

    if (state.allowedNicks.length > 0 && filtered.length === 0 && !state.includeMainChar) {
      setInfo('⚠ Nie znaleziono podanych postaci.');
    }
    nextStep();
  }

  function loginChar() {
    const { charQueue, queueIndex } = state;
    if (queueIndex >= charQueue.length) { log('⚠ Pusta kolejka'); goToStep(0); return; }
    const charId = charQueue[queueIndex];
    log(`[Trening] ${queueIndex + 1}/${charQueue.length}: ${state.charNames[charId] || charId}`);
    emit(EMIT.USE_CHAR(charId));
    state.queueIndex++;
    nextStep();
  }

  function activateSSJ() {
    const { ssj } = GAME.quick_opts ?? {};
    if (!ssj || GAME.char_data.reborn < SSJ_MIN_REBORN) { nextStep(); return; }
    const barHidden = $('#ssj_bar')[0]?.attributes[2]?.value === 'display: none;';
    if (barHidden) { emit(EMIT.SSJ_START(ssj[0])); delay(tick); return; }
    if ($('#ssj_status').text() === '--:--:--') { emit(EMIT.SSJ_STOP); delay(activateSSJ); }
    else { nextStep(); }
  }

  function startTraining() {
    if (GAME.is_training) { nextStep(); return; }
    if (!state.trainingStartedAt) {
      state.trainingStartedAt = Date.now();
      log(`Trening startuje o ${new Date().toLocaleTimeString()}`);
    }
    emit(EMIT.TRAINING_START(state.stat, state.duration));
    nextStep();
  }

  function enterCode() {
    const trainingExpired = GAME.is_training && GAME.char_data.train_ucd - GAME.getTime() <= 0;
    if (trainingExpired) emit(EMIT.TRAINING_CODE);
    nextStep();
  }

  function logout() {
    emit(EMIT.LOGOUT(state.mainCharId));
    if (state.queueIndex < state.charQueue.length) {
      log(`Wylogowano, następna za ${LOGOUT_WAIT_MS / 1000}s`);
      goToStep(3, LOGOUT_WAIT_MS);
      return;
    }
    log('Runda treningowa zakończona → runda skanująca');
    state.queueIndex = 0;
    goToStep(8, LOGOUT_WAIT_MS);
  }

  // ─── Runda skanująca ──────────────────────────────────────────────────────────
  function scanLogin() {
    const { charQueue, queueIndex } = state;
    if (queueIndex >= charQueue.length) { delay(startMonitoring, LOGOUT_WAIT_MS); return; }
    const charId = charQueue[queueIndex];
    log(`[Skan] ${queueIndex + 1}/${charQueue.length}: ${state.charNames[charId] || charId}`);
    setStatus(`SKAN  ${queueIndex + 1}/${charQueue.length}`);
    emit(EMIT.USE_CHAR(charId));
    state.queueIndex++;
    nextStep();
  }

  function scanReadTimer() {
    setStatus('ODCZYT TIMERA...');
    delay(() => {
      updateCharTimer();
      nextStep();
    }, SCAN_WAIT_MS);
  }

  function scanLogout() {
    emit(EMIT.LOGOUT(state.mainCharId));
    if (state.queueIndex < state.charQueue.length) {
      goToStep(8, LOGOUT_WAIT_MS);
      return;
    }
    log('Runda skanująca zakończona → monitor');
    state.monitorMode = true;
    setStatus('');
    delay(startMonitoring, LOGOUT_WAIT_MS);
  }

  // ─── Init ─────────────────────────────────────────────────────────────────────
  function init() {
    state.mainCharId   = getMainCharId();
    state.mainCharName = GAME.char_data?.nick ?? null;
    GAME.emitOrder     = (order) => GAME.socket.emit('ga', order);
    buildUI();
	loadFromStorage();
	const savedPower = loadPowerState();

if (savedPower === 'on') {
  console.log("Przywracanie ON za 50s...");

  setTimeout(() => {
    const btn = document.getElementById('tr-power');
    if (btn && !state.running) {
      btn.click();
      console.log("Auto ON po odświeżeniu");
    }
  }, 48000);
}
    $('script').last().remove();
    console.log(
      '%c[Trainer] Skrypt załadowany!',
      'color:#0d0f14; background:#c9a227; padding:5px 12px; font-size:14px; font-weight:bold;'
    );
  }

  init();
})();
