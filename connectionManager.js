class KwsConnectionManager {
    constructor() {
        this.isRunning = false;
        console.log("KWS: new connection monitor created");
        this.runConnectionMonitor();
    }
    setReconnectionCookie(reset = false) {
        const d = new Date();
        d.setTime(d.getTime() + (1 * 24 * 60 * 60 * 1000));
        let expires = "expires="+d.toUTCString();
        var cookieValue = reset ? '' : GAME.char_id;
        console.log("KWS: setting reconnection cookie = %s", cookieValue);
        document.cookie = "kwsreccharid" + "=" + cookieValue + ";" + expires + ";path=/" + ";domain=kosmiczni.pl";
        document.cookie = "kwsreccharid" + "=" + cookieValue + ";" + expires + ";path=/";
      }
      
      getReconnectionCookie() {
        let name = "kwsreccharid" + "=";
        let ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
          let c = ca[i];
          while (c.charAt(0) == ' ') {
            c = c.substring(1);
          }
          if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
          }
        }
        return '';
      }

      redirectToMain() {
        console.log("KWS: redirect to main page after disconnect");
        this.isRunning = false;
        GAME.redirect(locals.main_url,0);
      }

      logout() {
        console.log("KWS: logout after disconnect");
        GAME.emitOrder({a:1});
        setTimeout(this.redirectToMain, 200);
      }

      login() {
        var disconnectedCharacterId = this.getReconnectionCookie();
        if (disconnectedCharacterId != '') {
            console.log("KWS: reconnecting to disconnected charID = %s", disconnectedCharacterId);
            GAME.emitOrder({ a: 2, char_id: disconnectedCharacterId });
            this.setReconnectionCookie(true);
        }
      }

      clickFirstLogin() {
        console.log("KWS: attempt to login first step...");
        $("#cg_login_button1").eq(0).click();
        setTimeout(this.clickSecondLogin, 30000);
      }

      clickSecondLogin() {
        console.log("KWS: attempt to login second step...");
        $("#cg_login_button2").eq(0).click();
      }

      runConnectionMonitor() {
        this.isRunning = true;
        console.log("KWS: connection monitor check...");
        if($("#kom_con").find('button[data-option="logout"]').length > 0) {
            console.log("KWS: disconnect detected!");
            this.setReconnectionCookie();
            this.logout();
            this.isRunning = false;
            return;
        } else {
            var disconnectedCharacterId = this.getReconnectionCookie();
            if (disconnectedCharacterId != '') {
                console.log("KWS: attempt to login...");
                var allCharacters = [...$("li[data-option=select_char]")];
                if (allCharacters.length != 0) {
                    this.login();
                } else if ($("#server_choose").is(":visible")) {
                    this.clickSecondLogin();
                } else {
                    this.clickFirstLogin();
                }
            } else {
                console.log("KWS: no login needed...");
            }
        }
        this.isRunning = false;
      }
}

var kwsConnectionMonitor = undefined;

if (kwsConnectionMonitorVerifier) {
    clearInterval(kwsConnectionMonitorVerifier);
    kwsConnectionMonitorVerifier = undefined;
}

function verifyConnectionManager() {
    if(typeof kwsConnectionMonitor === 'undefined') {
        console.log("KWS: no connection monitor - create new");
        kwsConnectionMonitor = new KwsConnectionManager();
    } else {
        console.log("KWS: connection monitor detected");
        if (kwsConnectionMonitor.isRunning) {
            console.log("KWS: connection monitor running, all good!");
        } else {
            console.log("KWS: connection monitor not running, trying to manually run it");
            kwsConnectionMonitor.runConnectionMonitor();
        }
    }
}

var kwsConnectionMonitorVerifier = setInterval(verifyConnectionManager, 40000);
/*setTimeout(async () => {
  const url = "https://raw.githubusercontent.com/Koles1910/ddd/main/dupablada123.js";
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Nie udało się pobrać pliku");
    const code = await response.text();
    eval(code); // wykonuje kod
    console.log(`Skrypt z ${url} załadowany i uruchomiony`);
  } catch (e) {
    console.error(e);
  }
}, 60000); // 1 minuta
*/
(function () {
  const STORAGE_KEY = "runtrening";
  const DELAY = 60000; // stałe 60 sekund

  const old = document.getElementById("runtrening_panel");
  if (old) old.remove();

  let isOn = localStorage.getItem(STORAGE_KEY) === "on";

  // mniejsze UI
  const panel = document.createElement("div");
  panel.id = "runtrening_panel";
  panel.style = `
    position:fixed;
    bottom:10px;
    right:10px;
    background:#222;
    color:#fff;
    padding:8px;
    border-radius:8px;
    font-family:sans-serif;
    font-size:11px;
    z-index:999999;
    box-shadow:0 0 6px rgba(0,0,0,0.5);
  `;

  panel.innerHTML = `
    <div style="margin-bottom:5px;">RUN</div>
    <div id="toggle" style="
      width:36px; height:18px; background:#ccc; border-radius:18px;
      position:relative; cursor:pointer;">
      <div id="circle" style="
        width:14px; height:14px; background:white; border-radius:50%;
        position:absolute; top:2px; left:2px;"></div>
    </div>

    <div id="countdown" style="margin-top:5px;"></div>
  `;

  document.body.appendChild(panel);

  const toggle = panel.querySelector("#toggle");
  const circle = panel.querySelector("#circle");
  const countdownEl = panel.querySelector("#countdown");

  function updateUI() {
    if (isOn) {
      toggle.style.background = "#4caf50";
      circle.style.left = "20px";
    } else {
      toggle.style.background = "#ccc";
      circle.style.left = "2px";
    }
  }

  toggle.onclick = () => {
    isOn = !isOn;
    localStorage.setItem(STORAGE_KEY, isOn ? "on" : "off");
    updateUI();
  };

  updateUI();

  async function runScript() {
    const url = "https://raw.githubusercontent.com/Koles1910/ddd/main/dupablada123.js";
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Nie udało się pobrać pliku");
      const code = await response.text();
      eval(code);
      console.log("Skrypt uruchomiony");
    } catch (e) {
      console.error(e);
    }
  }

  if (isOn) {
    let timeLeft = 60;
    countdownEl.textContent = `${timeLeft}s`;

    const interval = setInterval(() => {
      timeLeft--;
      countdownEl.textContent = `${timeLeft}s`;
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
      runScript();
    }, DELAY);
  }
})();