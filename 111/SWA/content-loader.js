(function bootstrapSwaLoader() {
  const bootScript = document.currentScript;
  const configUrl = bootScript ? bootScript.dataset.configUrl : '';
  const branch = (bootScript && bootScript.dataset.branch) || 'main';

  window.__SWA_BRANCH__ = branch;

  const fallbackModules = [
    { id: 'characters-manager', path: 'game-scripts/characters-manager.js' },
    { id: 'ball-exp',           path: 'game-scripts/ball-exp.js' },
    { id: 'ball-upgrade',       path: 'game-scripts/ball-upgrade.js' },
    { id: 'ball-reset',         path: 'game-scripts/ball-reset.js' },
    { id: 'ball-manager',       path: 'game-scripts/ball-manager.js' },
    { id: 'assistant-core',     path: 'game-scripts/assistant-core.js' }
  ];

  function buildModuleUrl(moduleConfig) {
    if (moduleConfig.url) return moduleConfig.url;
    return 'https://raw.githubusercontent.com/Koles1910/ddd/' + branch + '/111/' + moduleConfig.path;
  }

  function injectModuleCode(moduleId, code) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.dataset.swaModule = moduleId;
    script.textContent = code;

    (document.head || document.documentElement).appendChild(script);
    script.remove();
  }

  async function fetchModuleCode(moduleConfig) {
    const url = buildModuleUrl(moduleConfig);
    console.log('[SWA] Pobieranie:', url);

    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(moduleConfig.id + ' HTTP ' + response.status + ' na adresie: ' + url);
    }

    let code = await response.text();

    // ★ AUTOMATYCZNA NAPRAWA LINKÓW W JAKICHKOLWIEK PLIKACH ★
    // Zamienia stary adres autorski na Twój własny folder na GitHubie
    const oldRepo = 'https://raw.githubusercontent.com/SWAssistant1/SWAssistant/' + branch + '/';
    const newRepo = 'https://raw.githubusercontent.com/Koles1910/ddd/' + branch + '/111/';

    code = code.split(oldRepo).join(newRepo);

    return code;
  }

  async function runLoader() {
    try {
      let modules = fallbackModules;

      for (const moduleConfig of modules) {
        try {
          const code = await fetchModuleCode(moduleConfig);
          injectModuleCode(moduleConfig.id, code);
          console.info('[SWA] Module injected:', moduleConfig.id);
        } catch (error) {
          console.error('[SWA] Module load failed:', moduleConfig.id, error);
        }
      }
    } catch (error) {
      console.error('[SWA] Loader bootstrap failed:', error);
    }
  }

  if (document.readyState !== 'complete') {
    window.addEventListener('load', () => {
      void runLoader();
    }, { once: true });
  } else {
    void runLoader();
  }
})();