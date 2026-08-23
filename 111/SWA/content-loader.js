(function bootstrapSwaLoader() {
  const bootScript = document.currentScript;
  const configUrl = bootScript ? bootScript.dataset.configUrl : '';
  
  // Ustawiamy branch na 'main'
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
    
    // POPRAWIONA KONSTRUKCJA LINKU:
    // Użytkownik: Koles1910, Repo: ddd, Branch: main, Folder: 111
    return 'https://raw.githubusercontent.com/Koles1910/ddd/' + branch + '/111/SWA/' + moduleConfig.path;
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
    console.log('[SWA] Pobieranie:', url); // Logujemy adres, żeby widzieć czy jest poprawny
    
    const response = await fetch(url, { cache: 'no-store' });

    if (!response.ok) {
      throw new Error(moduleConfig.id + ' HTTP ' + response.status + ' na adresie: ' + url);
    }

    return response.text();
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