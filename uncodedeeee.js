if (typeof GAME === 'undefined') {} else {
    
    let Pog = setInterval(() => {
            clearInterval(Pog);

            function createPanel() {
            const css = ` #main_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 115px; right: 5px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #main_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #main_Panel .gh_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #main_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #main_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#main_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;}	#afo_settings_reset{ text-align: center; color: #ffffff; text-shadow: 0 0 5px #ffffff, 0 0 10px #ffffff, 0 0 15px #000000; cursor: pointer; }	#afo_settings_reset:hover{ color: red; text-shadow: 0 0 5px rgb(255, 83, 40), 0 0 10px rgb(255, 83, 40), 0 0 15px #000000; }`;
            const csspvp = ` #pvp_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 276px; right: 5px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #pvp_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #pvp_Panel .pvp_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #pvp_Panel .pvp_buttonn {text-align:center; border-bottom:solid gray 1px; color: orange;} #pvp_Panel .gamee_input{text-align:center; border-bottom:solid gray 1px; color: white;} #pvp_Panel .gamee_input input::placeholder {color: #4b4b4b;}#pvp_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #pvp_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#pvp_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;}`;
            const cssresp = ` #resp_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 115px; right: 155px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #resp_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #resp_Panel .resp_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #resp_Panel .resp_buttonn {text-align:center; border-bottom:solid gray 1px; color: orange;} #resp_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #resp_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#resp_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;}	#bless_Panel{background: rgba(0,0,0,0.9); position: fixed; top: 115px; right: 305px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; display: none;} #bless_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #bless_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#bless_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;}`;
            const csscode = ` #code_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 480px; right: 5px; z-index: 9999; width: 180px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #code_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 180px; cursor: all-scroll; } #code_Panel .code_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #code_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #code_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#code_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;} `;
            const cssres = ` #res_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 691px; right: 5px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #res_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #res_Panel .res_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #res_Panel ul {margin-left:-30px; color:white; margin:7px 0px 5px 0px; padding: 0px; text-align: center;} #res_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #res_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#res_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;} `;
            const csslpvm = ` #lpvm_Panel { background: rgba(0,0,0,0.9); position: fixed; top: 586px; right: 155px; z-index: 9999; width: 150px; padding: 1px; border-radius: 5px; border-style: solid; border-width: 7px 8px 7px 7px; display:block; user-select: none; color: #333333; } #lpvm_Panel .sekcja { position: absolute; top: -27px; left: -7px; background: rgba(0,0,0,0.9); filter: hue-rotate(196deg); background-size: 100% 100%; width: 150px; cursor: all-scroll; } #lpvm_Panel .lpvm_button {cursor:pointer;text-align:center; border-bottom:solid gray 1px; color: white;} #lpvm_Panel .pvm_killed {cursor:pointer;text-align:center; border-LGtom:solid gray 1px;text-align:center; color:white;} #lpvm_Panel .pvm_tp {text-align:center; border-LGtom:solid gray 1px;text-align:center; color:white;} #lpvm_Panel .gamee_input{text-align:center; border-bottom:solid gray 1px; color: white;} #lpvm_Panel .drag-handle.left {position: absolute;top: 0;bottom: 0;left: -10px;width: 20px;cursor: all-scroll;background: transparent;} #lpvm_Panel .drag-handle.right {position: absolute;top: 0;bottom: 0;right: -10px;width: 20px;cursor: all-scroll;background: transparent;}#lpvm_Panel .drag-handle.bottom {position: absolute;left: 0;right: 0;bottom: -15px;height: 15px;cursor: all-scroll;background: transparent;} `;
            const html = ` <div id="main_Panel"> <div class="sekcja panel_dragg">ALL FOR ONE</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class='gh_button gh_resp'>PVM<b class='gh_status red'>Off</b></div> <div class='gh_button gh_pvp'>PVP<b class='gh_status red'>Off</b></div> <div class='gh_button gh_lpvm'>Listy<b class='gh_status red'>Off</b></div> <div class='gh_button gh_res'>Zbierajka<b class='gh_status red'>Off</b></div> <div class='gh_button gh_code'>Kody<b class='gh_status red'>Off</b></div> <div id="afo_settings_reset">Zresetuj ustawienia</div> </div> `;
            const PVP_panel = ` <div id="pvp_Panel"> <div class="sekcja pvp_dragg">PVP</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class='pvp_button pvp_pvp'>PVP<b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_planet'>Planetarne<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_normal'>GÅÄbia<b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_Code'>Kody<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_Code_multi'>Multi kody<b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_WI'>Wojny Imp<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_WK'>Wojny Klanowe<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_rr'> RR <b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_god'>Bogowie<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_demon'>Demony<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_monke'>Saiyan<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_buff_imp'>Bufy IMP<b class='pvp_status green'>On</b></div> <div class='pvp_button pvp_buff_clan'>Bufy KLAN<b class='pvp_status red'>Off</b></div> <div class='pvp_button pvp_bh1'>100% SÅawy<b class='pvp_status red'>Off</b></div> <div class="pvp_buttonn" <b>SzybkoÅÄ</b></div> <div id="pvp_speed_val" style="position: absolute; bottom: 65px; left: 50%; transform: translateX(-50%); padding: 5px 10px; background: #333; color: #fff; border-radius: 4px; font-size: 12px; white-space: nowrap; display:none;">50</div><input type="range" id="pvp_speed" min="10" max="100" step="1" value="50"> <div class="pvp_buttonn" <b>Lista Wojen</b></div> <div class='gamee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Lista wojen" name='pvp_capt' value='' /></div> </div> </div> `;
            const RESP_panel = ` <div id="resp_Panel"> <div class="sekcja resp_dragg">SPAWN MOBKÃ³W</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class="resp_button resp_resp">RESP<b class="resp_status red">Off</b></div> <div class="resp_button resp_code">Kody<b class="resp_status green">On</b></div> <div class="resp_button resp_code_multi">Multi kody<b class="resp_status red">Off</b></div> <div class="resp_button resp_sub">Subka<b class="resp_status green">On</b></div> <div class="resp_button resp_ost">Jaka<b class="resp_status green">Ost</b></div> <div class="resp_button resp_multi">Multiwalka<b class="resp_status green">On</b></div> <div class="resp_button resp_ssj">SSJ<b class="resp_status green">On</b></div> <div class="resp_button resp_buff_imp">Bufki IMP<b class="resp_status green">On</b></div> <div class="resp_button resp_buff_clan">Bufki KLAN<b class="resp_status red">Off</b></div> <div class="resp_button resp_magic">WyciÄg<b class="resp_status red">Off</b></div> <div class="resp_button resp_blue">BLUE<b class="resp_status green">On</b></div> <div class="resp_button resp_green">GREEN<b class="resp_status red">Off</b></div> <div class="resp_button resp_purple">PURPLE<b class="resp_status red">Off</b></div> <div class="resp_button resp_yellow">YELLOW<b class="resp_status red">Off</b></div> <div class="resp_button resp_red">RED<b class="resp_status green">On</b></div> <div class="resp_button resp_dark">DARK<b class="resp_status red">Off</b></div> <div class="resp_button resp_bless">BÅOGO<b class="resp_status red">Off</b></div> <div class="resp_button resp_limit">Limit Blue<b class="resp_status red">Off</b></div> <div class="resp_button resp_next">STOP & NEXT<b class="resp_status red">Off</b></div> <div class="resp_button resp_pvp">PVP<b class="resp_status red">Off</b></div> <div class="resp_button resp_expe">Wyprawa<b class="resp_status red">Off</b></div> <div class="resp_button resp_know">Wiedza<b class="resp_status red">Off</b></div><div id="bless_Panel"><div class="sekcja bless_dragg">BUFFKI</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div><div class="resp_button resp_on">WÅÄcz All EXP<b class="resp_status green">On</b></div> <div class="resp_button resp_off">WyÅÄcz All EXP<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh1" bless_number="1">SMOK<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh2" bless_number="2">5% EXP<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh3" bless_number="3">5% MOC<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh4" bless_number="4">150K MAX<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh5" bless_number="5">5% MOC<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh6" bless_number="6">5% PSK<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh7" bless_number="7">200% EXP<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh8" bless_number="8">500 LVL<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh9" bless_number="9">500% EXP<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh10" bless_number="10">25% MOC<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh19" bless_number="19">5% Legenda<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh20" bless_number="20">5% MAX PA<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh11" bless_number="11">100% Limit<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh14" bless_number="14">100% Limit<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh12" bless_number="12">200% Przyrost<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh13" bless_number="13">300% Przyrost<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh15" bless_number="15">5% kod<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh16" bless_number="16">5 Min cd pvp <b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh17" bless_number="17">15% szybsze zbieranie<b class="resp_status red">Off</b></div> <div class="resp_button resp_bh resp_bh18" bless_number="18">15% wiÄcej szansy na zebranie<b class="resp_status red">Off</b></div></div><div class="resp_buttonn" <b>% max pa</b></div> <div id="pa_bar_val" style="position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 5px 10px; background: #333; color: #fff; border-radius: 4px; font-size: 12px; white-space: nowrap; display:none;">70</div><input type="range" id="pa_bar" min="1" max="100" step="1" value="70"></div> </div> `;
            const CODE_panel = ` <div id="code_Panel"> <div class="sekcja code_dragg">Kody</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class="code_button code_code">KODY<b class="code_status red">Off</b></div> <div class="code_button code_multi">MULTI<b class="code_status red">Off</b></div> <div class="code_button code_acc">Konto<b class="code_status red">Off</b></div> <div class="code_button code_zast">ZastÄpstwa<b class="code_status red">Off</b></div> <div class="code_button code_bh1">BÅogo 250% tren<b class="code_status red">Off</b></div> <div class="code_button code_bh2">BÅogo 5% kod<b class="code_status red">Off</b></div> <div class="code_button code_bh3">BÅogo 5% rezultat<b class="code_status red">Off</b></div> <div class="code_button code_imp">Buff IMP<b class="code_status red">Off</b></div> <div class="code_button code_clan">Buff KLAN<b class="code_status red">Off</b></div> <label class='select_input'><select id='bot_what_to_train'><option value='1'>SiÅa</option><option value='2'>SzybkoÅÄ</option><option value='3'>WytrzymaÅoÅÄ</option><option value='4'>SiÅa Woli</option><option value='5'>Energia Ki</option><option value='6'>Wtajemniczenie</option></select></label> <label class='select_input'><select id='bot_what_to_traintime'><option value='1'>1 godz.</option><option value='2'>2 godz.</option><option value='3'>3 godz.</option><option value='4'>4 godz.</option><option value='5'>5 godz.</option><option value='6'>6 godz.</option><option value='7'>7 godz.</option><option value='8'>8 godz.</option><option value='9'>9 godz.</option><option value='10'>10 godz.</option><option value='11'>11 godz.</option><option value='12'>12 godz.</option></label> </div> `;
            const RES_panel = ` <div id="res_Panel"> <div class="sekcja res_dragg">SUROWCE</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class="res_button res_res">ZBIERAJ<b class="res_status red">Off</b></div> <div class="res_button res_code">Kody<b class="res_status green">On</b></div> <div class="res_button res_b1">15% szybsze zbieranie<b class="res_status red">Off</b></div> <div class="res_button res_b2">15% wiÄcej szansy na zebranie <b class="res_status red">Off</b></div> <div class="bt_cool" style="text-align:center; color:white;"></div> <ul></ul> </div> `;
            const LPVM_panel = ` <div id="lpvm_Panel"> <div class="sekcja lpvm_dragg">LISTY GOÅCZE</div> <div class="drag-handle left"></div> <div class="drag-handle right"></div> <div class="drag-handle bottom"></div> <div class='pvm_tp'>Pkt TP: <b class="orange">0</b></div> <div class='pvm_killed'>Wykonane listy: <b class="orange">0</b></div> <div class="lpvm_button lpvm_lpvm">START<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_g">G-Born<b class="lpvm_status green">On</b></div> <div class="lpvm_button lpvm_u">U-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_s">S-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_h">H-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_m">M-Born<b class="lpvm_status red">Off</b></div> <div class="lpvm_button lpvm_code">Kody<b class="lpvm_status green">On</b></div> <div class="lpvm_button lpvm_limit">Limit<b class="lpvm_status red">Off</b></div> <div class='gamee_input'><input style='width:120px; margin-left:-2px; background:grey;text-align:center;font-size:16;' type='text' placeholder="Enter text" name='lpvm_capt' value='60' /></div> </div> `;
            $("body").append(`<style>${css}</style>${html}`);
            $("body").append(`<style>${csspvp}</style>${PVP_panel}`);
            $("body").append(`<style>${cssresp}</style>${RESP_panel}`);
            $("body").append(`<style>${csscode}</style>${CODE_panel}`);
            $("body").append(`<style>${cssres}</style>${RES_panel}`);
            $("body").append(`<style>${csslpvm}</style>${LPVM_panel}`);
            $("#pvp_Panel").hide();
            $("#resp_Panel").hide();
            $("#code_Panel").hide();
            $("#res_Panel").hide();
            $("#lpvm_Panel").hide();
            $("#main_Panel").draggable({
                handle: ".panel_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#pvp_Panel").draggable({
                handle: ".pvp_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#resp_Panel").draggable({
                handle: ".resp_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#res_Panel").draggable({
                handle: ".res_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#bless_Panel").draggable({
                handle: ".bless_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#lpvm_Panel").draggable({
                handle: ".lpvm_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("#code_Panel").draggable({
                handle: ".code_dragg, .drag-handle.left, .drag-handle.right, .drag-handle.bottom"
            });
            $("body").on("click", "#resp_Panel, #pvp_Panel, #lpvm_Panel, #res_Panel, #code_Panel", () => {
                if (!AFO.loading && !$("#activity-panel button").hasClass("disabled") && LPVM.Stop && $("#lpvm_Panel .lpvm_lpvm .lpvm_status").hasClass("red")) {
                    AFO.updateData();
                }
            });
            $('#kws_pa_max, .kws_spawner_check').change((e) => {
                if (!AFO.loading && !$("#activity-panel button").hasClass("disabled") && LPVM.Stop && $("#lpvm_Panel .lpvm_lpvm .lpvm_status").hasClass("red")) {
                    AFO.updateData();
                }
            });
            $("body").on("click", "#afo_settings_reset", () => {
                AFO.resetSettings();
            });
            $('#main_Panel .gh_pvp').click(() => {
                if ($(".gh_pvp .gh_status").hasClass("red")) {
                    $(".gh_pvp .gh_status").removeClass("red").addClass("green").html("On");
                    $("#pvp_Panel").show();
                } else {
                    $(".gh_pvp .gh_status").removeClass("green").addClass("red").html("Off");
                    $("#pvp_Panel").hide();
                    PVP.off();
                }
            });
            $('#main_Panel .gh_resp').click(() => {
                if ($(".gh_resp .gh_status").hasClass("red")) {
                    $(".gh_resp .gh_status").removeClass("red").addClass("green").html("On");
                    $("#resp_Panel").show();
                } else {
                    $(".gh_resp .gh_status").removeClass("green").addClass("red").html("Off");
                    $("#resp_Panel").hide();
                    RESP.off();
                }
            });
            $('#main_Panel .gh_res').click(() => {
                if ($(".gh_res .gh_status").hasClass("red")) {
                    $(".gh_res .gh_status").removeClass("red").addClass("green").html("On");
                    $("#res_Panel").show();
                } else {
                    $(".gh_res .gh_status").removeClass("green").addClass("red").html("Off");
                    $("#res_Panel").hide();
                    RES.off();
                }
            });
            $('#main_Panel .gh_lpvm').click(() => {
                if ($(".gh_lpvm .gh_status").hasClass("red")) {
                    $(".gh_lpvm .gh_status").removeClass("red").addClass("green").html("On");
                    $("#lpvm_Panel").show();
                } else {
                    $(".gh_lpvm .gh_status").removeClass("green").addClass("red").html("Off");
                    $("#lpvm_Panel").hide();
                    LPVM.off();
                }
            });
            $('#main_Panel .gh_code').click(() => {
                if ($(".gh_code .gh_status").hasClass("red")) {
                    $(".gh_code .gh_status").removeClass("red").addClass("green").html("On");
                    $("#code_Panel").show();
                } else {
                    $(".gh_code .gh_status").removeClass("green").addClass("red").html("Off");
                    $("#code_Panel").hide();
                    CODE.off();
                }
            });
            $('#pvp_Panel .pvp_pvp').click(() => {
                if (PVP.stop) {
                    PVP.on();
                    CODE.off();
                    RES.off();
                    RESP.off();
                    LPVM.off();
                } else {
                    PVP.off();
                }
            });
            $('#pvp_Panel .pvp_Code').click(() => {
                if (PVP.code) {
                    $(".pvp_Code .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.code = false;
                } else {
                    $(".pvp_Code .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.code = true;
                }
            });
            $('#pvp_Panel .pvp_Code_multi').click(() => {
                if (PVP.multi_code) {
                    $(".pvp_Code_multi .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.multi_code = false;
                } else {
                    $(".pvp_Code_multi .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.multi_code = true;
                }
            });
            $('#pvp_Panel .pvp_WI').click(() => {
                if (PVP.wi) {
                    $(".pvp_WI .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.wi = false;
                } else {
                    $(".pvp_WI .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.wi = true;
                }
            });
            $('#pvp_Panel .pvp_buff_imp').click(() => {
                if (PVP.buff_imp) {
                    $(".pvp_buff_imp .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.buff_imp = false;
                } else {
                    $(".pvp_buff_imp .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.buff_imp = true;
                }
            });
            $('#pvp_Panel .pvp_buff_clan').click(() => {
                if (PVP.buff_clan) {
                    $(".pvp_buff_clan .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.buff_clan = false;
                } else {
                    $(".pvp_buff_clan .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.buff_clan = true;
                }
            });
            $('#pvp_Panel .pvp_WK').click(() => {
                if (PVP.wk) {
                    $(".pvp_WK .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.wk = false;
                } else {
                    $(".pvp_WK .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.wk = true;
                }
            });
            $('#pvp_Panel .pvp_rr').click(() => {
                if (PVP.rr) {
                    $(".pvp_rr .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.rr = false;
                } else {
                    $(".pvp_rr .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.rr = true;
                }
            });
            $('#pvp_Panel .pvp_god').click(() => {
                if (PVP.god) {
                    $(".pvp_god .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.god = false;
                } else {
                    $(".pvp_god .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.god = true;
                }
            });
            $('#pvp_Panel .pvp_demon').click(() => {
                if (PVP.demon) {
                    $(".pvp_demon .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.demon = false;
                } else {
                    $(".pvp_demon .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.demon = true;
                }
            });
            $('#pvp_Panel .pvp_monke').click(() => {
                if (PVP.monke) {
                    $(".pvp_monke .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.monke = false;
                } else {
                    $(".pvp_monke .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.monke = true;
                }
            });
            $('#pvp_Panel .pvp_planet').click(() => {
                if (PVP.planet) {
                    $(".pvp_planet .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.planet = false;
                } else {
                    $(".pvp_planet .pvp_status").removeClass("red").addClass("green").html("On");
                    $(".pvp_normal .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.planet = true;
                    PVP.normal = false;
                }
            });
            $('#pvp_Panel .pvp_normal').click(() => {
                if (PVP.normal) {
                    $(".pvp_normal .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.normal = false;
                } else {
                    $(".pvp_normal .pvp_status").removeClass("red").addClass("green").html("On");
                    $(".pvp_planet .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.normal = true;
                    PVP.planet = false;
                }
            });
            $('#pvp_Panel .pvp_bh1').click(() => {
                if (PVP.b1) {
                    $(".pvp_bh1 .pvp_status").removeClass("green").addClass("red").html("Off");
                    PVP.b1 = false;
                } else {
                    $(".pvp_bh1 .pvp_status").removeClass("red").addClass("green").html("On");
                    PVP.b1 = true;
                }
            });
            $("#pvp_Panel input[name=pvp_capt]").val(PVP.clan_list);
            $("body").on('input', '#pvp_speed', (event) => {
                const value = $(event.target).val();
                const inputWidth = $(event.target).width();
                const inputMin = event.target.min;
                const inputMax = event.target.max;
                const relativePosition = (value - inputMin) / (inputMax - inputMin);
                const tooltip = $('#pvp_speed_val');
                tooltip.text(value).css({
                    left: `${relativePosition * inputWidth}px`
                });
                tooltip.fadeIn(200);
            });
            $("body").on('mouseenter', '#pvp_speed', (event) => {
                const value = $(event.target).val();
                const inputWidth = $(event.target).width();
                const inputMin = event.target.min;
                const inputMax = event.target.max;
                const relativePosition = (value - inputMin) / (inputMax - inputMin);
                const tooltip = $('#pvp_speed_val');
                tooltip.text(value).css({
                    left: `${relativePosition * inputWidth}px`
                });
                tooltip.fadeIn(200);
            }).on('mouseleave', '#pvp_speed', () => {
                $('#pvp_speed_val').fadeOut(200);
            });
            $("body").on('mouseup change', '#pvp_speed', () => {
                $('#pvp_speed_val').fadeOut(200);
            });
            $(document).bind('keydown', '1', function () {
                if (JQS.chm.is(":focus") == false) {
                    if ($(".gh_resp .gh_status").hasClass("green")) {
                        $('#resp_Panel .resp_resp').click();
                    }
                }
                return false;
            });
            $('#resp_Panel .resp_resp').click(() => {
                if (RESP.stop && GAME.field_mobs) {
                    RESP.on();
                    PVP.off();
                    CODE.off();
                    LPVM.off();
                } else {
                    RESP.off();
                }
            });
            $('#resp_Panel .resp_bless').click(() => {
                if (RESP.bless) {
                    $(".resp_bless .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.bless = false;
                    $('#resp_Panel #bless_Panel').hide();
                } else {
                    $(".resp_bless .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.bless = true;
                    $('#resp_Panel #bless_Panel').show();
                }
            });
            $('#resp_Panel .resp_code').click(() => {
                if (RESP.code) {
                    $(".resp_code .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.code = false;
                } else {
                    $(".resp_code .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.code = true;
                }
            });
            $('#resp_Panel .resp_code_multi').click(() => {
                if (RESP.multi_code) {
                    $(".resp_code_multi .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.multi_code = false;
                } else {
                    $(".resp_code_multi .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.multi_code = true;
                }
            });
            $('#resp_Panel .resp_sub').click(() => {
                if (RESP.checkOST) {
                    $(".resp_sub .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.checkOST = false;
                    $('#resp_Panel .resp_ost').hide();
                } else {
                    $(".resp_sub .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.checkOST = true;
                    $('#resp_Panel .resp_ost').show();
                }
            });
            $('#resp_Panel .resp_ost').click(() => {
                if (RESP.zmiana) {
                    $(".resp_ost .resp_status").html("Ost");
                    RESP.zmiana = false;
                    RESP.jaka = 0;
                } else {
                    $(".resp_ost .resp_status").html("x20");
                    RESP.zmiana = true;
                    RESP.jaka = 1;
                }
            });
            $('#resp_Panel .resp_multi').click(() => {
                if (RESP.multifight) {
                    $(".resp_multi .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.multifight = false;
                } else {
                    $(".resp_multi .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.multifight = true;
                }
            });
            $('#resp_Panel .resp_ssj').click(() => {
                if (RESP.checkSSJ) {
                    $(".resp_ssj .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.checkSSJ = false;
                } else {
                    $(".resp_ssj .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.checkSSJ = true;
                }
            });
            $('#resp_Panel .resp_red').click(() => {
                if (RESP.use_red) {
                    $(".resp_red .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_red = false;
                } else {
                    $(".resp_red .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_red = true;
                }
            });
            $('#resp_Panel .resp_dark').click(() => {
                if (RESP.use_dark) {
                    $(".resp_dark .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_dark = false;
                } else {
                    $(".resp_dark .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_dark = true;
                }
            });
            $('#resp_Panel .resp_blue').click(() => {
                if (RESP.use_blue) {
                    $(".resp_blue .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_blue = false;
                } else {
                    $(".resp_blue .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_blue = true;
                }
            });
            $('#resp_Panel .resp_green').click(() => {
                if (RESP.use_green) {
                    $(".resp_green .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_green = false;
                } else {
                    $(".resp_green .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_green = true;
                }
            });
            $('#resp_Panel .resp_purple').click(() => {
                if (RESP.use_purple) {
                    $(".resp_purple .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_purple = false;
                } else {
                    $(".resp_purple .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_purple = true;
                }
            });
            $('#resp_Panel .resp_yellow').click(() => {
                if (RESP.use_yellow) {
                    $(".resp_yellow .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_yellow = false;
                } else {
                    $(".resp_yellow .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_yellow = true;
                }
            });
            $('#resp_Panel .resp_magic').click(() => {
                if (RESP.use_magic) {
                    $(".resp_magic .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.use_magic = false;
                } else {
                    $(".resp_magic .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.use_magic = true;
                }
            });
            $("body").on("click", "button[data-quick=1]:not(.initial_hide_forced)", (el) => {
                setTimeout(() => {
                    $(el.target).remove();
                }, 2000);
            });
            let allowedBlessNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 20];
            $('#resp_Panel .resp_on').click(() => {
                allowedBlessNumbers.forEach(num => {
                    $(`.resp_bh[bless_number="${num}"] .resp_status`).removeClass("red").addClass("green").html("On");
                    RESP[`b${num}`] = true;
                });
            });
            $('#resp_Panel .resp_off').click(() => {
                allowedBlessNumbers.forEach(num => {
                    $(`.resp_bh[bless_number="${num}"] .resp_status`).removeClass("green").addClass("red").html("Off");
                    RESP[`b${num}`] = false;
                });
            });
            $('#resp_Panel .resp_buff_imp').click(() => {
                if (RESP.buff_imp) {
                    $(".resp_buff_imp .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.buff_imp = false;
                } else {
                    $(".resp_buff_imp .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.buff_imp = true;
                }
            });
            $('#resp_Panel .resp_buff_clan').click(() => {
                if (RESP.buff_clan) {
                    $(".resp_buff_clan .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.buff_clan = false;
                } else {
                    $(".resp_buff_clan .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.buff_clan = true;
                }
            });
            $('#resp_Panel .resp_expe').click(() => {
                if (RESP.what_next_expe) {
                    $(".resp_expe .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_expe = false;
                } else {
                    $(".resp_expe .resp_status").removeClass("red").addClass("green").html("On");
                    $(".resp_pvp .resp_status").removeClass("green").addClass("red").html("Off");
                    $(".resp_know .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_expe = true;
                    RESP.what_next_pvp = false;
                    RESP.what_next_know = false;
                }
            });
            $('#resp_Panel .resp_pvp').click(() => {
                if (RESP.what_next_pvp) {
                    $(".resp_pvp .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_pvp = false;
                } else {
                    $(".resp_pvp .resp_status").removeClass("red").addClass("green").html("On");
                    $(".resp_expe .resp_status").removeClass("green").addClass("red").html("Off");
                    $(".resp_know .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_pvp = true;
                    RESP.what_next_expe = false;
                    RESP.what_next_know = false;
                }
            });
            $('#resp_Panel .resp_know').click(() => {
                if (RESP.what_next_know) {
                    $(".resp_know .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_know = false;
                } else {
                    $(".resp_know .resp_status").removeClass("red").addClass("green").html("On");
                    $(".resp_expe .resp_status").removeClass("green").addClass("red").html("Off");
                    $(".resp_pvp .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.what_next_know = true;
                    RESP.what_next_expe = false;
                    RESP.what_next_pvp = false;
                }
            });
            $('#resp_Panel .resp_next').click(() => {
                if (RESP.do_next) {
                    $(".resp_next .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.do_next = false;
                    $('#resp_Panel .resp_pvp').hide();
                    $('#resp_Panel .resp_expe').hide();
                    $('#resp_Panel .resp_know').hide();
                } else {
                    $(".resp_next .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.do_next = true;
                    $('#resp_Panel .resp_pvp').show();
                    $('#resp_Panel .resp_expe').show();
                    $('#resp_Panel .resp_know').show();
                }
            });
            $('#resp_Panel .resp_limit').click(() => {
                if (RESP.limit) {
                    $(".resp_limit .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.limit = false;
                } else {
                    $(".resp_limit .resp_status").removeClass("red").addClass("green").html("On");
                    RESP.limit = true;
                }
            });
            $('#resp_Panel .resp_bh').click((e) => {
                let bless = parseInt($(e.currentTarget).attr("bless_number"));
                if (RESP[`b${bless}`]) {
                    $(`.resp_bh[bless_number="${bless}"] .resp_status`).removeClass("green").addClass("red").html("Off");
                    RESP[`b${bless}`] = false;
                } else {
                    $(`.resp_bh[bless_number="${bless}"] .resp_status`).removeClass("red").addClass("green").html("On");
                    RESP[`b${bless}`] = true;
                }
            });
            $("body").on('input', '#pa_bar', (event) => {
                const value = $(event.target).val();
                const inputWidth = $(event.target).width();
                const inputMin = event.target.min;
                const inputMax = event.target.max;
                const relativePosition = (value - inputMin) / (inputMax - inputMin);
                const tooltip = $('#pa_bar_val');
                tooltip.text(value).css({
                    left: `${relativePosition * inputWidth}px`
                });
                tooltip.fadeIn(200);
            });
            $("body").on('mouseenter', '#pa_bar', (event) => {
                const value = $(event.target).val();
                const inputWidth = $(event.target).width();
                const inputMin = event.target.min;
                const inputMax = event.target.max;
                const relativePosition = (value - inputMin) / (inputMax - inputMin);
                const tooltip = $('#pa_bar_val');
                tooltip.text(value).css({
                    left: `${relativePosition * inputWidth}px`
                });
                tooltip.fadeIn(200);
            }).on('mouseleave', '#pa_bar', () => {
                $('#pa_bar_val').fadeOut(200);
            });
            $("body").on('mouseup change', '#pa_bar', () => {
                $('#pa_bar_val').fadeOut(200);
            });
            $('#lpvm_Panel .lpvm_lpvm').click(() => {
                if (LPVM.Stop) {
                    LPVM.on();
                    PVP.off();
                    RESP.off();
                    RES.off();
                    CODE.off();
                } else {
                    LPVM.off();
                }
            });
            $('#lpvm_Panel .pvm_killed').click(() => {
                LPVM.made = 0;
                LPVM.updateStats(LPVM.made);
            });
            $('#lpvm_Panel .lpvm_g').click(() => {
                if ($(".lpvm_g .lpvm_status").hasClass("red")) {
                    $(".lpvm_g .lpvm_status").removeClass("red").addClass("green").html("On");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 2;
                    $('.lpvm_u .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_s .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_h .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_m .lpvm_status').removeClass("green").addClass("red").html("Off");
                } else {
                    $(".lpvm_g .lpvm_status").removeClass("green").addClass("red").html("Off");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 0;
                }
            });
            $('#lpvm_Panel .lpvm_u').click(() => {
                if ($(".lpvm_u .lpvm_status").hasClass("red")) {
                    $(".lpvm_u .lpvm_status").removeClass("red").addClass("green").html("On");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 3;
                    $('.lpvm_g .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_s .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_h .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_m .lpvm_status').removeClass("green").addClass("red").html("Off");
                } else {
                    $(".lpvm_u .lpvm_status").removeClass("green").addClass("red").html("Off");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 0;
                }
            });
            $('#lpvm_Panel .lpvm_s').click(() => {
                if ($(".lpvm_s .lpvm_status").hasClass("red")) {
                    $(".lpvm_s .lpvm_status").removeClass("red").addClass("green").html("On");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 4;
                    $('.lpvm_g .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_u .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_h .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_m .lpvm_status').removeClass("green").addClass("red").html("Off");
                } else {
                    $(".lpvm_s .lpvm_status").removeClass("green").addClass("red").html("Off");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 0;
                }
            });
            $('#lpvm_Panel .lpvm_h').click(() => {
                if ($(".lpvm_h .lpvm_status").hasClass("red")) {
                    $(".lpvm_h .lpvm_status").removeClass("red").addClass("green").html("On");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 5;
                    $('.lpvm_g .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_u .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_s .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_m .lpvm_status').removeClass("green").addClass("red").html("Off");
                } else {
                    $(".lpvm_h .lpvm_status").removeClass("green").addClass("red").html("Off");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 0;
                }
            });
            $('#lpvm_Panel .lpvm_m').click(() => {
                if ($(".lpvm_m .lpvm_status").hasClass("red")) {
                    $(".lpvm_m .lpvm_status").removeClass("red").addClass("green").html("On");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 6;
                    $('.lpvm_g .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_u .lpvm_status.lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_s .lpvm_status').removeClass("green").addClass("red").html("Off");
                    $('.lpvm_h .lpvm_status').removeClass("green").addClass("red").html("Off");
                } else {
                    $(".lpvm_m .lpvm_status").removeClass("green").addClass("red").html("Off");
                    $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.Stop = true;
                    LPVM.Born = 0;
                }
            });
            $('#lpvm_Panel .lpvm_limit').click(() => {
                if (LPVM.limit) {
                    $(".lpvm_limit .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.limit = false;
                } else {
                    $(".lpvm_limit .lpvm_status").removeClass("red").addClass("green").html("On");
                    LPVM.limit = true;
                }
            });
            $('#lpvm_Panel .lpvm_code').click(() => {
                if (LPVM.code) {
                    $(".lpvm_code .lpvm_status").removeClass("green").addClass("red").html("Off");
                    LPVM.code = false;
                } else {
                    $(".lpvm_code .lpvm_status").removeClass("red").addClass("green").html("On");
                    LPVM.code = true;
                }
            });
            const reborn = GAME?.char_data?.reborn;
            if (reborn >= 2 && reborn <= 6) {
                const classMap = {
                    2: 'lpvm_g',
                    3: 'lpvm_u',
                    4: 'lpvm_s',
                    5: 'lpvm_h',
                    6: 'lpvm_m'
                };
                const activeClass = classMap[reborn];
                ['lpvm_g', 'lpvm_u', 'lpvm_s', 'lpvm_h', 'lpvm_m'].forEach(cls => {
                    $(`.${cls} .lpvm_status`).removeClass("green").addClass("red").html("Off");
                });
                $(`.${activeClass} .lpvm_status`).removeClass("red").addClass("green").html("On");
                LPVM.Born = reborn;
            };
            $('#res_Panel .res_res').click(() => {
                if (RES.stop && Object.entries(GAME.map_mines.mine_data).length > 0) {
                    RES.on();
                    PVP.off();
                    LPVM.off();
                    CODE.off();
                } else {
                    RES.off();
                }
            });
            $("body").on("click", "#res_Panel .select_mine", function () {
                if (RES.stop) {
                    RES.mined_id = [];
                    $('.select_mine').prop('checked', false);
                    $(this).prop('checked', true);
                    RES.mined_id = parseInt($(this).val());
                } else {
                    $(this).click();
                    GAME.komunikat("Zatrzymaj najpierw skrypt!");
                }
            });
            $('#res_Panel .res_code').click(() => {
                if (RES.code) {
                    $(".res_code .res_status").removeClass("green").addClass("red").html("Off");
                    RES.code = false;
                } else {
                    $(".res_code .res_status").removeClass("red").addClass("green").html("On");
                    RES.code = true;
                }
            });
            $('#res_Panel .res_b1').click(() => {
                if (RES.b1) {
                    $(".res_b1 .res_status").removeClass("green").addClass("red").html("Off");
                    RES.b1 = false;
                } else {
                    $(".res_b1 .res_status").removeClass("red").addClass("green").html("On");
                    RES.b1 = true;
                }
            });
            $('#res_Panel .res_b2').click(() => {
                if (RES.b2) {
                    $(".res_b2 .res_status").removeClass("green").addClass("red").html("Off");
                    RES.b2 = false;
                } else {
                    $(".res_b2 .res_status").removeClass("red").addClass("green").html("On");
                    RES.b2 = true;
                }
            });
            $('#code_Panel .code_code').click(() => {
                if (CODE.stop) {
                    CODE.char = GAME.char_id;
                    CODE.on();
                    PVP.off();
                    RESP.off();
                    RES.off();
                    LPVM.off();
                } else {
                    CODE.off();
                }
            });
            $('#code_Panel .code_multi').click(() => {
                if (CODE.multi_code) {
                    $(".code_multi .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.multi_code = false;
                } else {
                    $(".code_multi .code_status").removeClass("red").addClass("green").html("On");
                    $(".code_acc .code_status").removeClass("green").addClass("red").html("Off");
                    $(".code_zast .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.multi_code = true;
                    CODE.acc = false;
                    CODE.zast = false;
                }
            });
            $('#code_Panel .code_acc').click(() => {
                if (CODE.acc) {
                    $(".code_acc .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.acc = false;
                } else {
                    $(".code_acc .code_status").removeClass("red").addClass("green").html("On");
                    $(".code_multi .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.acc = true;
                    CODE.multi_code = false;
                }
            });
            $('#code_Panel .code_zast').click(() => {
                if (CODE.zast) {
                    $(".code_zast .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.zast = false;
                } else {
                    $(".code_zast .code_status").removeClass("red").addClass("green").html("On");
                    $(".code_multi .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.zast = true;
                    CODE.multi_code = false;
                }
            });
            $('#code_Panel .code_bh1').click(() => {
                if (CODE.b1) {
                    $(".code_bh1 .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.b1 = false;
                } else {
                    $(".code_bh1 .code_status").removeClass("red").addClass("green").html("On");
                    CODE.b1 = true;
                }
            });
            $('#code_Panel .code_bh2').click(() => {
                if (CODE.b2) {
                    $(".code_bh2 .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.b2 = false;
                } else {
                    $(".code_bh2 .code_status").removeClass("red").addClass("green").html("On");
                    CODE.b2 = true;
                }
            });
            $('#code_Panel .code_bh3').click(() => {
                if (CODE.b3) {
                    $(".code_bh3 .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.b3 = false;
                } else {
                    $(".code_bh3 .code_status").removeClass("red").addClass("green").html("On");
                    CODE.b3 = true;
                }
            });
            $('#code_Panel .code_imp').click(() => {
                if (CODE.buff_imp) {
                    $(".code_imp .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.buff_imp = false;
                } else {
                    $(".code_imp .code_status").removeClass("red").addClass("green").html("On");
                    CODE.buff_imp = true;
                }
            });
            $('#code_Panel .code_clan').click(() => {
                if (CODE.buff_clan) {
                    $(".code_clan .code_status").removeClass("green").addClass("red").html("Off");
                    CODE.buff_clan = false;
                } else {
                    $(".code_clan .code_status").removeClass("red").addClass("green").html("On");
                    CODE.buff_clan = true;
                }
            });
            $('#bot_what_to_train').change((e) => {
                CODE.what_to_train = parseInt($(e.target).val());
            });
            $('#bot_what_to_traintime').change((e) => {
                CODE.what_to_traintime = parseInt($(e.target).val());
            });
            $('#lpvm_Panel .gamee_input').change((e) => {
                LPVM.limit2 = parseInt($(e.target).val());
            });
            $('#pvp_Panel .gamee_input').change((e) => {
                PVP.war = $(e.target).val();
                PVP.save_clan_list();
            });
            $('#pa_bar').change((e) => {
                localStorage.setItem('pa_bar', parseInt($(e.target).val()));
            });
            $('#pvp_speed').change((e) => {
                localStorage.setItem('pvp_speed', parseInt($(e.target).val()));
            });
            $(".resp_button.resp_bh[bless_number=18]").hide();
            $(".resp_button.resp_bh[bless_number=17]").hide();
            $('#resp_Panel .resp_pvp').hide();
            $('#resp_Panel .resp_expe').hide();
            $('#resp_Panel .resp_know').hide();
        };
        if (!GAME.hasOwnProperty('mapcell')) {
            Object.defineProperty(GAME, 'mapcell', {
                get: () => {
                    const key = Object.keys(GAME).find(key => {
                        const value = GAME[key];
                        return value?. ['1_1'] && value['1_1'].hasOwnProperty('t') && value['1_1'].hasOwnProperty('m') && value['1_1'].hasOwnProperty('cc');
                    });
                    return key ? GAME[key] : null;
                }
            });
        }
        var PVP = {
            stop: true,
            wi: true,
            code: true,
            wk: true,
            caseNumber: 0,
            wait: 1,
            wait2: 20,
            czekajpvp: 130,
            licznik: 0,
            dogory: false,
            dogory1: false,
            move1: false,
            move2: false,
            move3: false,
            loc: 0,
            adimp: false,
            g: 1,
            tele: false,
            tele1: false,
            tabb: [],
            x: 1,
            y: 1,
            war: false,
            buff_imp: true,
            buff_clan: false,
            multi_code: false,
            rr: true,
            god: true,
            demon: true,
            monke: true,
            planet: true,
            normal: false,
            b1: false,
            spr: 0,
            queue: false,
            res_loaded: true
        };
        PVP.checkkkk = () => {
            let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
            let emp = GAME.char_data.empire;
            let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
            let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
            let who_win = $("#gne_satus").text().includes("ZÅO");
            let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
            let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
            let isRed = $("#clan_buffs button[data-option='activate_war_buff']").parents("tr").find("td.red");
            if (GAME.quick_opts.ssj && $("#ssj_bar").css("display") === "none" && PVP.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 18,
                        type: 5,
                        tech_id: GAME.quick_opts.ssj[0]
                    });
                }, 1100);
                return true;
            } else if ($('#ssj_status').text() == "--:--:--" && PVP.code && GAME.quick_opts.ssj && typeof sioDKkLVvgRozYP !== 'undefined') {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 18,
                        type: 6
                    });
                }, 1100);
                return true;
            } else if ($('#ssj_status').text() <= '00:00:05' && PVP.code && GAME.quick_opts.ssj) {
                return true;
            } else if ((GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !GAME.is_training && PVP.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 2,
                        stat: 1,
                        duration: 1
                    });
                }, 200);
                return true;
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) <= 0 && PVP.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 5,
                        multi: PVP.multi_code,
                        apud: 'vzaaa'
                    });
                }, 200);
                return true;
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) > 0 && PVP.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                return true;
            } else if (GAME.is_training && PVP.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                return true;
            } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 4) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                return true;
            } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 1 || emp == 3) && who_win)) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                return true;
            } else if (imp == GAME.char_id && PVP.buff_imp && buff && buff_id < 7 && ((emp == 2 || emp == 4) && !who_win)) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                return true;
            } else if ((PVP.buff_clan || PVP.buff_imp) && $("#server_time").text() > '00:05:00' && $("#server_time").text() < '02:00:00' && typeof this.loaded == 'undefined') {
                this.loaded = true;
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 0,
                        empire: GAME.char_data.empire
                    });
                }, 300);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 0
                    });
                }, 600);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 23
                    });
                }, 900);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 28
                    });
                }, 1200);
                return true;
            } else if (RESP.has_clan_law && GAME.hasClanLaw('buffer') && PVP.buff_clan && GAME.klan_data != undefined && abut.length && !isDisabled && !isRed.length) {
                $(" .newBtn.activate_all_clan_buffs").click();
                return true;
            }
            return false;
        };
        PVP.start = async () => {
            if (!PVP.stop && typeof HssmScPihluPJeL !== 'undefined') {
                if (!PVP.queue) {
                    PVP.queue = true;
                    await RESP.delay(5);
                    PVP.queue = false;
                    clearTimeout(PVP.failMOVE);
                    clearTimeout(PVP.failMOVE2);
                    PVP.action();
                } else {
                    PVP.failMOVE = setTimeout(() => {
                        PVP.start();
                    }, 5000 * 2);
                }
            }
        };
        PVP.action = () => {
            switch (PVP.caseNumber) {
            case 0:
                PVP.caseNumber++;
                PVP.check_waits();
                break;
            case 1:
                PVP.caseNumber++;
                PVP.check();
                break;
            case 2:
                PVP.caseNumber++;
                PVP.check_players();
                break;
            case 3:
                PVP.caseNumber++;
                PVP.check2();
                break;
            case 4:
                PVP.caseNumber++;
                PVP.wojny1();
                break;
            case 5:
                PVP.caseNumber++;
                PVP.check_location();
                break;
            case 6:
                PVP.caseNumber++;
                PVP.dec_wars();
                break;
            case 7:
                PVP.caseNumber++;
                PVP.kill_players1();
                break;
            case 8:
                PVP.caseNumber = 0;
                PVP.go();
            default:
            }
        };
        PVP.check_waits = () => {
            PVP.wait = 1 / PVP.WSPP();
            PVP.wait2 = 40 / PVP.WSPP();
            if (PVP.WSPP() == 2) PVP.wait2 = 1;
            PVP.czekajpvp = 1 / PVP.WSPP();
            PVP.x = parseInt($("#map_x").text());
            PVP.y = parseInt($("#map_y").text());
            window.setTimeout(PVP.start, 0);
        };
        PVP.check_players = () => {
            let time = $("#player_list_con .player").eq(0).find(".timer").text();
            let y = GAME.char_data.y;
            if (time == '') {
                window.setTimeout(PVP.start, PVP.wait);
            } else if (time <= '00:01:30' && y == 2 && time != '' || time <= '00:00:15' && time != '') {
                window.setTimeout(PVP.check_players1, PVP.czekajpvp);
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.check_players1 = () => {
            let time = $("#player_list_con .player").eq(0).find(".timer").text();
            let y = GAME.char_data.y;
            if (time <= '00:01:30' && y == 2 && time != '' && (PVP.loc == 1 || PVP.loc == 2 || PVP.loc == 3 || PVP.loc == 4 || PVP.loc == 5) || time <= '00:01:30' && y == 1 && time != '' && PVP.loc == 6 || time <= '00:00:15' && time != '') {
                window.setTimeout(PVP.check_players1, 1000);
            } else if (y == 2) {
                window.setTimeout(PVP.start, 5000);
            } else {
                window.setTimeout(PVP.start, 1000);
            }
        };
        PVP.kill_players1 = () => {
            clearTimeout(PVP.fail_pvp);
            PVP.fail_pvp = setTimeout(() => {
                PVP.kill_players1();
            }, 3000);
            let opponents = $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)");
            let len = $("#player_list_con .player").length;
            let last_time = $("#player_list_con .player").eq(len - 4).find(".timer").text();
            PVP.czekajpvp = 1 / PVP.WSPP();
            if (!PVP.stop) {
                if ($("#player_list_con").find("[data-option=load_more_players]").length != 0) {
                    $("button[data-option='load_more_players']").click();
                } else if ($("#ewar_list").text().includes("--:--:--")) {
                    PVP.caseNumber = 1;
                    setTimeout(() => {
                        PVP.check();
                    }, 300);
                } else if (is_loading) {
                    setTimeout(() => {
                        PVP.kill_players1();
                    }, 5);
                } else if (!PVP.res_loaded) {
                    PVP.res_loaded = true;
                    setTimeout(() => {
                        PVP.kill_players1();
                    }, 1000);
                } else if (opponents.length > 0) {
                    PVP.czekajpvp = 100 / PVP.WSPP();
                    opponents.eq(0).click();
                    if (opponents.length != 1) {
                        GAME.socket.emit('ga', {
                            a: 4,
                            dir: 9,
                            vo: GAME.map_options.vo
                        });
                    }
                } else if (len >= 7 && last_time <= '00:00:25' && last_time != '') {
                    setTimeout(() => {
                        PVP.kill_players1();
                    }, 50);
                } else {
                    kom_clear();
                    PVP.res_loaded = false;
                    setTimeout(() => {
                        PVP.start();
                    }, PVP.wait);
                }
            }
        };
        PVP.check_imp = () => {
            var tab = [];
            for (var i = 0; i < 3; i++) {
                tab[i] = parseInt($("#empire_heroes .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
            }
            return tab;
        };
        PVP.check_imp2 = () => {
            var tab = [];
            for (var i = 0; i < 3; i++) {
                tab[i] = parseInt($("#empire_efrags .activity").eq(i).find("[data-option=show_player]").attr("data-char_id"));
            }
            return tab;
        };
        PVP.wojny1 = () => {
            if (PVP.wi) {
                var aimp = $("#e_admiral_player").find("[data-option=show_player]").attr("data-char_id");
                var imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
                if (!PVP.adimp) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 0,
                        empire: GAME.char_data.empire
                    });
                    PVP.adimp = true;
                    window.setTimeout(PVP.wojny1, 500);
                } else if (!GAME.emp_enemies.includes(1) && ![GAME.char_data.empire].includes(1) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 1
                    });
                    window.setTimeout(PVP.wojny1, 500);
                } else if (!GAME.emp_enemies.includes(2) && ![GAME.char_data.empire].includes(2) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 2
                    });
                    window.setTimeout(PVP.wojny1, 500);
                } else if (!GAME.emp_enemies.includes(3) && ![GAME.char_data.empire].includes(3) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 3
                    });
                    window.setTimeout(PVP.wojny1, 500);
                } else if (!GAME.emp_enemies.includes(4) && ![GAME.char_data.empire].includes(4) && (PVP.check_imp().includes(GAME.char_id) || PVP.check_imp2().includes(GAME.char_id) || imp == GAME.char_id || aimp == GAME.char_id)) {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 7,
                        target: 4
                    });
                    window.setTimeout(PVP.wojny1, 500);
                } else {
                    window.setTimeout(PVP.start, PVP.wait);
                }
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.zejdz = () => {
            GAME.socket.emit('ga', {
                a: 16
            });
            window.setTimeout(PVP.teleport, 2000);
        };
        PVP.zejdz1 = () => {
            GAME.socket.emit('ga', {
                a: 16
            });
            window.setTimeout(PVP.teleport1, 2000);
        };
        PVP.go = () => {
            clearTimeout(PVP.fail_pvp);
            PVP.failMOVE2 = setTimeout(() => {
                PVP.start();
            }, 10000);
            var x = GAME.char_data.x;
            var y = GAME.char_data.y;
            if (PVP.planet && (PVP.loc == 1 || PVP.loc == 2 || PVP.loc == 3 || PVP.loc == 4)) {
                if (x == 14 && y == 14 && PVP.loc === 1) {
                    PVP.zejdz();
                    PVP.g = 2;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 2) {
                    PVP.zejdz();
                    PVP.g = 3;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 3) {
                    PVP.zejdz();
                    PVP.g = 4;
                    PVP.tele = true;
                } else if (x == 14 && y == 14 && PVP.loc === 4) {
                    PVP.zejdz();
                    PVP.g = 1;
                    PVP.tele = true;
                } else if (PVP.loc === 7) {
                    PVP.zejdz();
                    PVP.tele = true;
                } else if (x == 8 && y == 4 && PVP.loc == 4 || x == 8 && y == 6 && PVP.loc == 4 || x == 12 && y == 7 && PVP.loc == 1 || x == 12 && y == 9 && PVP.loc == 1 || x == 4 && y == 8 && PVP.loc == 1 || x == 4 && y == 10 && PVP.loc == 1 || x == 7 && y == 13 && PVP.loc == 3 || x == 8 && y == 5 && PVP.loc == 2 || x == 8 && y == 7 && PVP.loc == 2) {
                    PVP.go_down();
                } else if (x == 8 && y == 5 && PVP.loc == 4 || x == 8 && y == 7 && PVP.loc == 4) {
                    PVP.go_left();
                } else if (x == 5 && y == 11 && PVP.loc == 1 || x == 5 && y == 10 && PVP.loc == 1 || x == 5 && y == 9 && PVP.loc == 1 || x == 5 && y == 8 && PVP.loc == 1) {
                    PVP.go_up();
                } else if (x == 8 && y == 6 && PVP.loc == 2 || x == 8 && y == 8 && PVP.loc == 2) {
                    PVP.go_right();
                } else if (x == 2 && y == 11 && PVP.loc == 3) {
                    PVP.cofanie();
                } else if (x < 14 && y % 2 == 0 && PVP.loc < 5) {
                    PVP.go_right();
                } else if (y % 2 !== 0 && x > 2 && PVP.loc < 6) {
                    PVP.go_left();
                } else if (x == 14 || x == 2 && PVP.loc < 5) {
                    PVP.go_down();
                } else {
                    PVP.rewerse = false;
                    window.setTimeout(PVP.start, PVP.wait);
                }
            } else if (PVP.normal && (PVP.loc == 5 || PVP.loc == 6)) {
                if (x == 11 && y == 11 && PVP.dogory1 && PVP.loc == 5) {
                    PVP.cofanie3();
                } else if (x == 15 && y == 15 && PVP.move3 && PVP.loc == 6) {
                    PVP.cofanie4();
                } else if (x == 2 && y == 11 && PVP.loc == 5 && PVP.move1) {
                    setTimeout(() => {
                        PVP.przejdz();
                    }, 500);
                    window.setTimeout(PVP.go_right, 1000);
                } else if (x == 1 && y == 1 && PVP.loc == 6 && PVP.move3) {
                    setTimeout(() => {
                        PVP.przejdz();
                    }, 500);
                    window.setTimeout(PVP.go_right, 1000);
                } else if (x == 7 && y == 7 && PVP.loc == 6 && PVP.move2 || x == 9 && y == 7 && PVP.loc == 6 && PVP.move2) {
                    PVP.prawodol();
                } else if (x == 8 && y == 8 && PVP.loc == 6 && PVP.move2 || x == 10 && y == 8 && PVP.loc == 6 && PVP.move2) {
                    PVP.prawogora();
                } else if (x == 10 && y == 11 && PVP.loc == 5) {
                    PVP.dogory1 = true;
                    PVP.go_right();
                } else if (x == 10 && y == 2 && PVP.loc == 5) {
                    PVP.dogory1 = false;
                    PVP.go_left();
                } else if (x == 5 && y == 10 && PVP.loc == 5) {
                    PVP.move1 = true;
                    PVP.go_left();
                } else if (x == 10 && y == 10 && PVP.loc == 5) {
                    PVP.move1 = true;
                    PVP.go_left();
                } else if (x == 3 && y == 1 && PVP.loc == 6) {
                    PVP.move1 = false;
                    PVP.go_right();
                } else if (x == 3 && y == 10 && PVP.loc == 5) {
                    PVP.lewodol();
                } else if (x == 2 && y == 8 && PVP.loc == 5) {
                    PVP.prawodol();
                } else if (x == 11 && y == 11 && PVP.loc == 5 || x == 15 && y == 15 && PVP.loc == 6) {
                    PVP.go_up();
                } else if (x == 5 && y == 7 && PVP.loc == 6) {
                    PVP.move2 = true;
                    PVP.go_right();
                } else if (x == 13 && y == 7 && PVP.loc == 6) {
                    PVP.move2 = false;
                    PVP.go_right();
                } else if (x == 12 && y == 15 && PVP.loc == 6) {
                    PVP.move3 = true;
                    PVP.go_right();
                } else if (x == 5 && y == 11 && PVP.loc == 5) {
                    PVP.move3 = false;
                    PVP.go_right();
                } else if (x == 10 && y == 15 && PVP.loc == 6) {
                    PVP.move3 = true;
                    PVP.go_right();
                } else if (x == 7 && y == 11 && PVP.loc == 5) {
                    PVP.move3 = false;
                    PVP.go_right();
                } else if (x == 7 && y == 7 && PVP.loc == 6) {
                    PVP.go_down();
                } else if (x < 11 && y % 2 !== 0 && PVP.loc == 5 || x < 15 && y % 2 !== 0 && PVP.loc == 6) {
                    PVP.go_right();
                } else if (x > 2 && y % 2 == 0 && PVP.loc == 5 || x > 1 && y % 2 == 0 && PVP.loc == 6) {
                    PVP.go_left();
                } else if (x == 11 && PVP.loc == 5 || x == 2 && PVP.loc == 5 || x == 3 && y == 9 && PVP.loc == 5 || x == 1 && PVP.loc == 6 || x == 15 && PVP.loc == 6 || x == 7 && y == 7 && PVP.loc == 6) {
                    PVP.go_down();
                } else {
                    PVP.rewerse = false;
                    window.setTimeout(PVP.start, PVP.wait);
                }
            } else if (PVP.planet) {
                PVP.zejdz();
                PVP.tele = true;
            } else if (PVP.normal) {
                PVP.zejdz1();
                PVP.tele1 = true;
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.teleport = () => {
            if (!PVP.rr && PVP.g == 1) {
                PVP.g = 2;
                window.setTimeout(PVP.teleport, 50);
            } else if (!PVP.god && PVP.g == 2) {
                PVP.g = 3;
                window.setTimeout(PVP.teleport, 50);
            } else if (!PVP.demon && PVP.g == 3) {
                PVP.g = 4;
                window.setTimeout(PVP.teleport, 50);
            } else if (!PVP.monke && PVP.g == 4) {
                PVP.g = 1;
                window.setTimeout(PVP.teleport, 50);
            } else if (PVP.tele) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 5,
                    e: PVP.g
                });
                window.setTimeout(PVP.start, 2000);
                PVP.tele = false;
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.teleport1 = () => {
            if (PVP.tele1) {
                if (GAME.char_data.loc != 84 && GAME.char_data.loc != 230) {
                    GAME.socket.emit('ga', {
                        a: 12,
                        type: 18,
                        loc: 84
                    });
                }
                PVP.tele = false;
                window.setTimeout(PVP.start, 2000);
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.check_location = () => {
            if (GAME.char_data.loc == 351) {
                PVP.loc = 4;
            } else if (GAME.char_data.loc == 350) {
                PVP.loc = 3;
            } else if (GAME.char_data.loc == 349) {
                PVP.loc = 2;
            } else if (GAME.char_data.loc == 348) {
                PVP.loc = 1;
            } else if (GAME.char_data.loc == 84) {
                PVP.loc = 5;
            } else if (GAME.char_data.loc == 230) {
                PVP.loc = 6;
            } else {
                PVP.loc = 7;
            }
            window.setTimeout(PVP.start, PVP.wait);
        };
        PVP.cofanie = () => {
            PVP.x = GAME.char_data.x;
            if (PVP.x >= 7) {
                PVP.rewerse = false;
                window.setTimeout(PVP.go_down, 200);
            } else {
                PVP.rewerse = true;
                GAME.socket.emit('ga', {
                    a: 4,
                    dir: 7,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.cofanie, 150);
            }
        };
        PVP.cofanie4 = () => {
            y = GAME.char_data.y;
            if (y <= 1) {
                PVP.rewerse = false;
                window.setTimeout(PVP.start, PVP.wait);
            } else {
                PVP.rewerse = true;
                GAME.socket.emit('ga', {
                    a: 4,
                    dir: 6,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.cofanie4, 150);
            }
        };
        PVP.cofanie3 = () => {
            y = GAME.char_data.y;
            if (y <= 2) {
                PVP.rewerse = false;
                window.setTimeout(PVP.start, PVP.wait);
            } else {
                PVP.rewerse = true;
                PVP.move1 = true;
                GAME.socket.emit('ga', {
                    a: 4,
                    dir: 2,
                    vo: GAME.map_options.vo
                });
                window.setTimeout(PVP.cofanie3, 150);
            }
        };
        PVP.prawodol = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 3,
                vo: GAME.map_options.vo
            });
        };
        PVP.prawogora = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 5,
                vo: GAME.map_options.vo
            });
        };
        PVP.lewodol = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 4,
                vo: GAME.map_options.vo
            });
        };
        PVP.go_up = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 2,
                vo: GAME.map_options.vo
            });
        };
        PVP.go_down = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 1,
                vo: GAME.map_options.vo
            });
        };
        PVP.go_left = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 8,
                vo: GAME.map_options.vo
            });
        };
        PVP.go_right = () => {
            GAME.socket.emit('ga', {
                a: 4,
                dir: 7,
                vo: GAME.map_options.vo
            });
        };
        PVP.przejdz = () => {
            GAME.socket.emit('ga', {
                a: 6,
                tpid: 0
            });
            PVP.move3 = false;
            PVP.move1 = false;
        };
        PVP.check = () => {
            var błogo1 = $("#ekw_page_items").find("div[data-base_item_id=1744]").attr("data-item_id");
            if (GAME.ekw_page != 10 && typeof eDWOkPnDpHwiKFA !== 'undefined' && PVP.b1 || (!błogo1 && PVP.spr < 3 && PVP.b1)) {
                PVP.spr++;
                GAME.ekw_page = 10;
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 12,
                        page: GAME.ekw_page,
                        page2: GAME.ekw_page2,
                        used: 1
                    });
                }, 300);
                window.setTimeout(PVP.check, 1500);
            } else if (($("#char_buffs").find("[data-buff=73]").length != 1 || $("#char_buffs").find("[data-buff=73]").find(".timer").text() <= '00:00:04') && PVP.b1 && błogo1) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo1),
                    page: 10
                });
                window.setTimeout(PVP.check, 1500);
            } else if ($("#ewar_list").text().includes("--:--:--")) {
                window.setTimeout(PVP.check, 300);
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.check2 = () => {
            if (PVP.checkkkk()) {
                window.setTimeout(PVP.check2, 1200);
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.clan_list = () => {
            var list = localStorage.getItem('clan_list');
            if (list === undefined) {
                list = "";
            }
            return list;
        };
        PVP.save_clan_list = () => {
            localStorage.setItem('clan_list', PVP.war);
        };
        PVP.dec_wars = () => {
            var wars = $("#pvp_Panel input[name=pvp_capt]").val();
            var count = wars ? wars.split(";").length : 0;
            if ((GAME.hasClanLaw('warlord') || "clan_laws" in GAME && GAME.clan_laws != undefined && "warlord" in GAME.clan_laws && GAME.clan_laws.warlord) && count > 0 && PVP.wk && GAME.char_data.klan_id != 0 && GAME.char_data.klan_rent == 0 && GAME.clan_wars.length < count) {
                GAME.socket.emit('ga', {
                    a: 39,
                    type: 24,
                    shorts: wars
                });
                window.setTimeout(PVP.start, PVP.wait);
            } else {
                window.setTimeout(PVP.start, PVP.wait);
            }
        };
        PVP.pvp_speed = () => {
            let list = localStorage.getItem('pvp_speed');
            if (list === undefined) {
                list = 50;
            }
            return list;
        };
        PVP.WSPP = () => {
            let speed = parseInt($("#pvp_speed").val());
            if (speed < 10) speed = 10;
            if (speed > 100) speed = 100;
            return speed / 50;
        };
        var RESP = {
            wait1: () => {
                return $("#res_Panel .res_status").eq(0).hasClass("green") ? 140 : 65;
            },
            wait2: 0,
            spawn_cd: 55,
            atack_cd: 10,
            stop: true,
            checkOST: true,
            checkSSJ: true,
            jaka: 0,
            zmiana: false,
            multifight: true,
            reload: false,
            multi_code: false,
            blue: 1244,
            green: 1242,
            purple: 1259,
            yellow: 1260,
            red: 1243,
            magic: 1309,
            dark: 2229,
            use_blue: true,
            use_green: false,
            use_purple: false,
            use_yellow: false,
            use_red: true,
            use_dark: false,
            use_magic: false,
            blue_amount: () => {
                return (Math.floor((GAME.getCharMaxPr() - GAME.char_data.pr) / 100)) * 0.01 * parseInt($("#pa_bar").val());
            },
            purple_amount: () => {
                return (Math.floor((GAME.getCharMaxPr() - GAME.char_data.pr) / (GAME.getCharMaxPr() * 0.03 + 5000))) * 0.01 * parseInt($("#pa_bar").val());
            },
            green_amount: () => {
                return (Math.floor((GAME.getCharMaxPr() - GAME.char_data.pr) / 2000)) * 0.01 * parseInt($("#pa_bar").val());
            },
            yellow_amount: () => {
                return Math.floor((GAME.getCharMaxPr() - GAME.char_data.pr) / (GAME.getCharMaxPr() * 0.15 + 10000)) * 0.01 * parseInt($("#pa_bar").val());
            },
            blue_amount1: Math.floor(GAME.getCharMaxPr() / 100 * 0.99),
            purple_amount1: Math.floor(GAME.getCharMaxPr() / (GAME.getCharMaxPr() * 0.03 + 5000) * 0.99),
            green_amount1: Math.floor(GAME.getCharMaxPr() / 2000 * 0.99),
            yellow_amount1: Math.floor(GAME.getCharMaxPr() / (GAME.getCharMaxPr() * 0.15 + 10000) * 0.99),
            bless: false,
            checkOST_timer: 0,
            code: true,
            b1: false,
            b2: false,
            b3: false,
            b4: false,
            b5: false,
            b6: false,
            b7: false,
            b8: false,
            b9: false,
            b10: false,
            b11: false,
            b12: false,
            b13: false,
            b14: false,
            b15: false,
            b16: false,
            b17: false,
            b18: false,
            b18: false,
            b19: false,
            buff_imp: true,
            buff_clan: false,
            loc: GAME.char_data.loc,
            what_next_expe: false,
            what_next_pvp: false,
            what_next_know: false,
            do_next: false,
            limit: false,
            spr: 0,
            spr1: false,
            used_senzu: false,
            has_clan_law: true
        };
        RESP.min_pa = () => {
            if (GAME.char_data.doubler_rate && GAME.char_data.doubler_rate > 19) {
                var cal_sub = GAME.char_data.doubler_rate;
                var spawner = GAME.spawner[0];
                var pa_mult = cal_sub * RESP.mobsOnField() + parseInt(spawner);
                return pa_mult;
            } else {
                var spawner = GAME.spawner[0];
                var pa_mult = parseInt(spawner);
                return pa_mult;
            }
        };
        RESP.delay = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
        };
        RESP.check_fast_use = () => {
            let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
            let emp = GAME.char_data.empire;
            let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
            let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
            let who_win = $("#gne_satus").text().includes("ZÅO");
            let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
            let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
            let isRed = $("#clan_buffs button[data-option='activate_war_buff']").parents("tr").find("td.red");
            var błogo1 = $("#ekw_page_items").find("div[data-base_item_id=1801]").attr("data-item_id");
            var błogo2 = $("#ekw_page_items").find("div[data-base_item_id=1628]").attr("data-item_id");
            var błogo3 = $("#ekw_page_items").find("div[data-base_item_id=1630]").attr("data-item_id");
            var błogo4 = $("#ekw_page_items").find("div[data-base_item_id=1796]").attr("data-item_id");
            var błogo5 = $("#ekw_page_items").find("div[data-base_item_id=1794]").attr("data-item_id");
            var błogo6 = $("#ekw_page_items").find("div[data-base_item_id=1792]").attr("data-item_id");
            var błogo7 = $("#ekw_page_items").find("div[data-base_item_id=1790]").attr("data-item_id");
            var błogo8 = $("#ekw_page_items").find("div[data-base_item_id=1745]").attr("data-item_id");
            var błogo9 = $("#ekw_page_items").find("div[data-base_item_id=1608]").attr("data-item_id");
            var błogo10 = $("#ekw_page_items").find("div[data-base_item_id=1559]").attr("data-item_id");
            var błogo19 = $("#ekw_page_items").find("div[data-base_item_id=2233]").attr("data-item_id");
            var błogo20 = $("#ekw_page_items").find("div[data-base_item_id=2232]").attr("data-item_id");
            var błogo11 = $("#ekw_page_items").find("div[data-base_item_id=1795]").attr("data-item_id");
            var błogo12 = $("#ekw_page_items").find("div[data-base_item_id=1793]").attr("data-item_id");
            var błogo13 = $("#ekw_page_items").find("div[data-base_item_id=1753]").attr("data-item_id");
            var błogo14 = $("#ekw_page_items").find("div[data-base_item_id=1752]").attr("data-item_id");
            var błogo15 = $("#ekw_page_items").find("div[data-base_item_id=1751]").attr("data-item_id");
            var błogo16 = $("#ekw_page_items").find("div[data-base_item_id=1742]").attr("data-item_id");
            var błogo17 = $("#ekw_page_items").find("div[data-base_item_id=1747]").attr("data-item_id");
            var błogo18 = $("#ekw_page_items").find("div[data-base_item_id=1746]").attr("data-item_id");
            if (RESP.do_next && RESP.drag_con()) {
                if ($(".resp_resp .resp_status").hasClass("green")) {
                    $("#resp_Panel .resp_button.resp_resp").click();
                    setTimeout(() => {
                        if (RESP.what_next_pvp) {
                            if ($(".gh_pvp .gh_status").hasClass("red")) {
                                $("#main_Panel .gh_pvp").click();
                            }
                            if ($(".pvp_Code_multi .pvp_status").hasClass("red") && RESP.multi_code) {
                                $("#pvp_Panel .pvp_button.pvp_Code_multi").click();
                            }
                            $("#pvp_Panel .pvp_button.pvp_pvp").click();
                        } else if (RESP.what_next_expe) {
                            if (!$("#aeCodes_multi").is(":checked") && RESP.multi_code) {
                                $("#aeCodes_multi").click();
                            }
                            $(".sideIcons.manage_autoExpeditions").click();
                        } else if (RESP.what_next_know) {
                            if (!$('#kws_know_panel input[name="kws_know"]').is(":checked")) {
                                $(`.know_label [value="382"]`).click();
                            }
                            if (!$('#kws_know_panel input[name="know_kody"]').is(':checked') && RESP.code) {
                                $('.newCheckbox label[for="know_kody"]').click();
                            }
                            if (!$('#kws_know_panel input[name="know_kody_multi"]').is(':checked') && RESP.multi_code) {
                                $('.newCheckbox label[for="know_kody_multi"]').click();
                            }
                            $("#kws_know_panel .gold_button").click();
                        }
                    }, 1800);
                }
                return false;
            } else if (RESP.limit && GAME.char_data.senzu_limit >= GAME.senzu_limit()) {
                if ($(".resp_resp .resp_status").hasClass("green")) {
                    $("#resp_Panel .resp_button.resp_resp").click();
                }
                return false;
            } else if (GAME.char_data.pr <= RESP.min_pa()) {
                return false;
            } else if (RESP.checkSSJ && GAME.quick_opts.ssj && $("#ssj_bar").css("display") === "none") {
                return false;
            } else if ($('#ssj_status').text() == "--:--:--" && GAME.quick_opts.ssj) {
                return false;
            } else if (RESP.checkSSJ && $('#ssj_status').text() <= '00:00:03' && GAME.quick_opts.ssj) {
                return false;
            } else if (RESP.checkOST && $("#doubler_bar").css("display") === "none" && typeof fhbKwjhKsoohJpH !== 'undefined') {
                return false;
            } else if (RESP.checkOST && $('#doubler_status').text() <= '00:00:03') {
                return false;
            } else if ((!RESP.checkOST && RESP.checkOST_timer <= GAME.getTime()) || (RESP.jaka == 1 && RESP.checkOST_timer <= GAME.getTime()) || (!RESP.multifight && RESP.checkOST_timer <= GAME.getTime())) {
                return false;
            } else if ((GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !GAME.is_training && (RESP.code || (!RES.stop && RES.code))) {
                return false;
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) <= 0 && (RESP.code || (!RES.stop && RES.code))) {
                return false;
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) > 0 && (RESP.code || (!RES.stop && RES.code))) {
                return false;
            } else if (GAME.is_training && (RESP.code || (!RES.stop && RES.code))) {
                return false;
            } else if (imp == GAME.char_id && RESP.buff_imp && buff && buff_id < 4) {
                RESP.use_imp_buff = true;
                return false;
            } else if (imp == GAME.char_id && RESP.buff_imp && buff && buff_id < 7 && ((emp == 1 || emp == 3) && who_win)) {
                RESP.use_aditional_evil_imp_buff = true;
                return false;
            } else if (imp == GAME.char_id && RESP.buff_imp && buff && buff_id < 7 && ((emp == 2 || emp == 4) && !who_win)) {
                RESP.use_aditional_good_imp_buff = true;
                return false;
            } else if ((RESP.buff_clan || RESP.buff_imp) && $("#server_time").text() > '00:05:00' && $("#server_time").text() < '01:00:00' && typeof this.loaded == 'undefined') {
                this.loaded = true;
                RESP.load_info = true;
                return false;
            } else if (RESP.has_clan_law && GAME.hasClanLaw('buffer') && RESP.buff_clan && GAME.klan_data != undefined && abut.length && !isDisabled && !isRed.length) {
                RESP.use_clan_buff = true;
                return false;
            } else if (GAME.ekw_page != 10 && typeof eDWOkPnDpHwiKFA !== 'undefined' && RESP.bless || (!błogo1 && RESP.spr < 3 && RESP.bless) || (RESP.bless && !RESP.spr1)) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=100]").length != 1 || $("#char_buffs").find("[data-buff=100]").find(".timer").text() <= '00:00:04') && RESP.b1 && błogo1 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=53]").length != 1 || $("#char_buffs").find("[data-buff=53]").find(".timer").text() <= '00:00:04') && RESP.b2 && błogo2 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=55]").length != 1 || $("#char_buffs").find("[data-buff=55]").find(".timer").text() <= '00:00:04') && RESP.b3 && błogo3 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=96]").length != 1 || $("#char_buffs").find("[data-buff=96]").find(".timer").text() <= '00:00:04') && RESP.b4 && błogo4 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=94]").length != 1 || $("#char_buffs").find("[data-buff=94]").find(".timer").text() <= '00:00:04') && RESP.b5 && błogo5 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=92]").length != 1 || $("#char_buffs").find("[data-buff=92]").find(".timer").text() <= '00:00:04') && RESP.b6 && błogo6 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=90]").length != 1 || $("#char_buffs").find("[data-buff=90]").find(".timer").text() <= '00:00:04') && RESP.b7 && błogo7 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=74]").length != 1 || $("#char_buffs").find("[data-buff=74]").find(".timer").text() <= '00:00:04') && RESP.b8 && błogo8 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=52]").length != 1 || $("#char_buffs").find("[data-buff=52]").find(".timer").text() <= '00:00:04') && RESP.b9 && błogo9 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=50]").length != 1 || $("#char_buffs").find("[data-buff=50]").find(".timer").text() <= '00:00:04') && RESP.b10 && błogo10 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=112]").length != 1 || $("#char_buffs").find("[data-buff=112]").find(".timer").text() <= '00:00:04') && RESP.b19 && błogo19 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=111]").length != 1 || $("#char_buffs").find("[data-buff=111]").find(".timer").text() <= '00:00:04') && RESP.b20 && błogo20 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=95]").length != 1 || $("#char_buffs").find("[data-buff=95]").find(".timer").text() <= '00:00:04') && RESP.b11 && błogo11 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=93]").length != 1 || $("#char_buffs").find("[data-buff=93]").find(".timer").text() <= '00:00:04') && RESP.b12 && błogo12 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=82]").length != 1 || $("#char_buffs").find("[data-buff=82]").find(".timer").text() <= '00:00:04') && RESP.b13 && błogo13 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=81]").length != 1 || $("#char_buffs").find("[data-buff=81]").find(".timer").text() <= '00:00:04') && RESP.b14 && błogo14 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=80]").length != 1 || $("#char_buffs").find("[data-buff=80]").find(".timer").text() <= '00:00:04') && RESP.b15 && błogo15 && RESP.bless) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=71]").length != 1 || $("#char_buffs").find("[data-buff=71]").find(".timer").text() <= '00:00:04') && błogo16 && $("#aaBuff").is(":checked") && $(".sideIcons.manage_auto_arena").hasClass("kws_active_icon")) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=76]").length != 1 || $("#char_buffs").find("[data-buff=76]").find(".timer").text() <= '00:00:04') && RES.b1 && błogo17 && $("#res_Panel .res_res .res_status").hasClass("green")) {
                RESP.use_blessing = true;
                return false;
            } else if (($("#char_buffs").find("[data-buff=75]").length != 1 || $("#char_buffs").find("[data-buff=75]").find(".timer").text() <= '00:00:04') && RES.b2 && błogo18 && $("#res_Panel .res_res .res_status").hasClass("green")) {
                RESP.use_blessing = true;
                return false;
            } else {
                return true;
            }
        };
        RESP.action = async (mobs = 0) => {
            if (!RESP.stop && typeof GlhMotqwMyAWbnY !== 'undefined') {
                if (!RESP.queue) {
                    RESP.queue = true;
                    await RESP.delay(1);
                    RESP.queue = false;
                    clearTimeout(RESP.failAction);
                    if (RESP.check_fast_use() && typeof gjyFgmtHkAFxDCm !== 'undefined') {
                        if (mobs > 0 || RESP.mobsOnField() > 0) {
                            RESP.fight();
                        } else {
                            RESP.spawn();
                        }
                    } else if (GAME.char_data.pr <= RESP.min_pa() && !RESP.used_senzu) {
                        await RESP.delay(1800);
                        RESP.useSenzu();
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.checkSSJ && GAME.quick_opts.ssj && $("#ssj_bar").css("display") === "none") {
                        await RESP.delay(1000);
                        GAME.socket.emit(`ga`, {
                            a: 18,
                            type: 5,
                            tech_id: GAME.quick_opts.ssj[0]
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if ($('#ssj_status').text() == "--:--:--" && GAME.quick_opts.ssj) {
                        await RESP.delay(500);
                        GAME.socket.emit(`ga`, {
                            a: 18,
                            type: 6
                        });
                        await RESP.delay(100);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.checkOST && $("#doubler_bar").css("display") === "none" && typeof fhbKwjhKsoohJpH !== 'undefined') {
                        await RESP.delay(1000);
                        GAME.socket.emit(`ga`, {
                            a: 12,
                            type: 14,
                            iid: GAME.quick_opts.sub[RESP.jaka].id,
                            page: GAME.ekw_page,
                            am: 1
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if ((!RESP.checkOST && RESP.checkOST_timer <= GAME.getTime()) || (RESP.jaka == 1 && RESP.checkOST_timer <= GAME.getTime()) || (!RESP.multifight && RESP.checkOST_timer <= GAME.getTime())) {
                        await RESP.delay(2000);
                        RESP.checkOST_timer = GAME.getTime() + 60;
                        await RESP.delay(100);
                        RESP.action();
                        kom_clear();
                    } else if ((GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !GAME.is_training && RESP.code && RES.stop) {
                        await RESP.delay(1000);
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 2,
                            stat: 1,
                            duration: 1
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) <= 0 && RESP.code && RES.stop) {
                        await RESP.delay(1000);
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 5,
                            multi: RESP.multi_code,
                            apud: 'vzaaa'
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) > 0 && RESP.code && RES.stop) {
                        await RESP.delay(500);
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 3
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (GAME.is_training && RESP.code && RES.stop) {
                        await RESP.delay(500);
                        GAME.socket.emit('ga', {
                            a: 8,
                            type: 3
                        });
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.use_imp_buff) {
                        await RESP.delay(500);
                        let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 6,
                            buff: buff_id
                        });
                        RESP.use_imp_buff = false;
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.use_aditional_evil_imp_buff) {
                        await RESP.delay(500);
                        let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 6,
                            buff: buff_id
                        });
                        RESP.use_aditional_evil_imp_buff = false;
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.use_aditional_good_imp_buff) {
                        await RESP.delay(500);
                        let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 6,
                            buff: buff_id
                        });
                        RESP.use_aditional_good_imp_buff = false;
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    } else if (RESP.load_info) {
                        await RESP.delay(300);
                        GAME.socket.emit('ga', {
                            a: 50,
                            type: 0,
                            empire: GAME.char_data.empire
                        });
                        await RESP.delay(300);
                        GAME.socket.emit('ga', {
                            a: 39,
                            type: 0
                        });
                        await RESP.delay(300);
                        GAME.socket.emit('ga', {
                            a: 39,
                            type: 23
                        });
                        await RESP.delay(300);
                        GAME.socket.emit('ga', {
                            a: 39,
                            type: 28
                        });
                        await RESP.delay(300);
                        RESP.load_info = false;
                        RESP.action();
                        kom_clear();
                    } else if (RESP.use_clan_buff) {
                        await RESP.delay(300);
                        $(" .newBtn.activate_all_clan_buffs").click();
                        await RESP.delay(2000);
                        RESP.use_clan_buff = false;
                        RESP.action();
                        kom_clear();
                    } else if (RESP.use_blessing && GAME?.fight_reward?.length != 7) {
                        await RESP.delay(300);
                        RESP.check_bless();
                        await RESP.delay(1000);
                        RESP.use_blessing = false;
                        RESP.action();
                        kom_clear();
                    } else {
                        await RESP.delay(500);
                        RESP.action();
                        kom_clear();
                    }
                } else {
                    RESP.failAction = setTimeout(() => {
                        RESP.action();
                    }, 5000);
                }
            }
        };
        RESP.HandleResponse = async (res) => {
            if (!RESP.stop) {
                if (res.a === 3 && RESP.loc != GAME.char_data.loc) {
                    RESP.off();
                }
                if (res.a === 2) {
                    RESP.has_clan_law = true;
                    RESP.spr1 = false;
                }
                let rate = 1;
                if (res?.a === 7 && res?.result && res?.result?.reward && res?.result?.reward?.base_doubler) {
                    rate = res.result.reward.base_doubler;
                    if (rate > 40) rate = 40;
                }
                if ([444].includes(res?.a)) {
                    RESP.action();
                } else if (res.a === 602) {
                    RESP.action(res?.mobs?.suma);
                } else if (res?.a === 7 && res?.e === 0 && res?.mm === 1 && res?.me === 9 || res?.a === 7 && res?.e === 0 && res?.me === 7) {
                    GAME.field_mob_id = 0;
                    await RESP.delay(RESP.wait1() * 2);
                    RESP.spawn();
                } else if (res?.a === 7) {
                    if (res?.e === 0 && res?.quick === 1 && res?.result && res?.remove_mob?.length) {
                        RESP.action();
                    } else if (res?.e === 0 && res?.quick === 2 && res?.result && res?.remove_mob?.length && res?.mm != 1 && RESP.multifight && GAME.field_mob_types == 1) {
                        await RESP.delay(RESP.wait1() * 2);
                        RESP.spawn();
                    } else if (res?.result && res?.result?.reward && res?.result?.reward?.amount >= rate && res?.quick == 1 && RESP.multifight && GAME.field_mob_types >= 1) {} else if (res?.pvp_cd) {} else {
                        RESP.action();
                    }
                }
            }
        };
        GAME.socket.on('gr', function (res) {
            RESP.HandleResponse(res);
        });
        RESP.fight = async () => {
            let first_mf = GAME?.field_mobs?.findIndex(mob => mob?.ranks?.some(rank => rank > 0)) ?? -1;
            if (RESP.multifight) {
                if ((GAME?.field_mf?. [first_mf] ?? 0) < RESP.lastMobOnField()) {
                    await RESP.delay(RESP.wait1());
                    GAME.socket.emit('ga', {
                        a: 7,
                        order: 2,
                        quick: 1,
                        fo: GAME.map_options.ma
                    });
                } else {
                    await RESP.delay(RESP.wait2);
                    GAME.socket.emit('ga', {
                        a: 13,
                        mob_num: GAME.field_mob_id,
                        fo: GAME.map_options.ma
                    });
                }
            } else {
                await RESP.delay(RESP.wait1());
                GAME.socket.emit('ga', {
                    a: 7,
                    order: 2,
                    quick: 1,
                    fo: GAME.map_options.ma
                });
            }
        };
        RESP.mobsOnField = () => {
            return GAME.field_mobs?.reduce((total, mob) => {
                return total + (mob?.ranks?.reduce((acc, curr, index) => {
                    if (GAME.map_options.ma[index] === 0) {
                        return acc;
                    }
                    return acc + curr;
                }, 0) ?? 0);
            }, 0) ?? 0;
        };
        RESP.lastMobOnField = () => {
            return GAME?.field_mobs?.find(mob => mob?.ranks?.some((rank, index) => rank > 0 && GAME.map_options.ma[index] !== 0))?.ranks?.findLastIndex((rank, index) => rank > 0 && GAME.map_options.ma[index] !== 0) ?? -1;
        };
        RESP.spawn = async () => {
            await RESP.delay(RESP.wait1());
            GAME.socket.emit('ga', {
                a: 444,
                max: GAME.spawner[0],
                ignore: GAME.spawner[1]
            });
        };
        RESP.drag_con = () => {
            let green_quest = [];
            $('#drag_con .green').each(function () {
                let quest = $(this).closest('[id^="track_quest_"]');
                if (quest.css("display") != "none") {
                    if (quest.length) {
                        let quest_id = quest.attr('id');
                        let questNumber = quest_id.match(/\d+/)?. [0];
                        if (questNumber) {
                            green_quest.push(questNumber);
                        }
                    }
                }
            });
            if (green_quest.length) {
                return true;
            } else {
                return false;
            }
        };
        RESP.check_bless = () => {
            var błogo1 = $("#ekw_page_items").find("div[data-base_item_id=1801]").attr("data-item_id");
            var błogo2 = $("#ekw_page_items").find("div[data-base_item_id=1628]").attr("data-item_id");
            var błogo3 = $("#ekw_page_items").find("div[data-base_item_id=1630]").attr("data-item_id");
            var błogo4 = $("#ekw_page_items").find("div[data-base_item_id=1796]").attr("data-item_id");
            var błogo5 = $("#ekw_page_items").find("div[data-base_item_id=1794]").attr("data-item_id");
            var błogo6 = $("#ekw_page_items").find("div[data-base_item_id=1792]").attr("data-item_id");
            var błogo7 = $("#ekw_page_items").find("div[data-base_item_id=1790]").attr("data-item_id");
            var błogo8 = $("#ekw_page_items").find("div[data-base_item_id=1745]").attr("data-item_id");
            var błogo9 = $("#ekw_page_items").find("div[data-base_item_id=1608]").attr("data-item_id");
            var błogo10 = $("#ekw_page_items").find("div[data-base_item_id=1559]").attr("data-item_id");
            var błogo19 = $("#ekw_page_items").find("div[data-base_item_id=2233]").attr("data-item_id");
            var błogo20 = $("#ekw_page_items").find("div[data-base_item_id=2232]").attr("data-item_id");
            var błogo11 = $("#ekw_page_items").find("div[data-base_item_id=1795]").attr("data-item_id");
            var błogo12 = $("#ekw_page_items").find("div[data-base_item_id=1793]").attr("data-item_id");
            var błogo13 = $("#ekw_page_items").find("div[data-base_item_id=1753]").attr("data-item_id");
            var błogo14 = $("#ekw_page_items").find("div[data-base_item_id=1752]").attr("data-item_id");
            var błogo15 = $("#ekw_page_items").find("div[data-base_item_id=1751]").attr("data-item_id");
            var błogo16 = $("#ekw_page_items").find("div[data-base_item_id=1742]").attr("data-item_id");
            var błogo17 = $("#ekw_page_items").find("div[data-base_item_id=1747]").attr("data-item_id");
            var błogo18 = $("#ekw_page_items").find("div[data-base_item_id=1746]").attr("data-item_id");
            if (GAME.ekw_page != 10 && typeof eDWOkPnDpHwiKFA !== 'undefined' && RESP.bless || (!błogo1 && RESP.spr < 3 && RESP.bless) || (RESP.bless && !RESP.spr1)) {
                RESP.spr1 = true;
                RESP.spr++;
                GAME.ekw_page = 10;
                GAME.socket.emit('ga', {
                    a: 12,
                    page: GAME.ekw_page,
                    page2: GAME.ekw_page2,
                    used: 1
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=100]").length != 1 || $("#char_buffs").find("[data-buff=100]").find(".timer").text() <= '00:00:04') && RESP.b1 && błogo1 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo1),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=53]").length != 1 || $("#char_buffs").find("[data-buff=53]").find(".timer").text() <= '00:00:04') && RESP.b2 && błogo2 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo2),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=55]").length != 1 || $("#char_buffs").find("[data-buff=55]").find(".timer").text() <= '00:00:04') && RESP.b3 && błogo3 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo3),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=96]").length != 1 || $("#char_buffs").find("[data-buff=96]").find(".timer").text() <= '00:00:04') && RESP.b4 && błogo4 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo4),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=94]").length != 1 || $("#char_buffs").find("[data-buff=94]").find(".timer").text() <= '00:00:04') && RESP.b5 && błogo5 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo5),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=92]").length != 1 || $("#char_buffs").find("[data-buff=92]").find(".timer").text() <= '00:00:04') && RESP.b6 && błogo6 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo6),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=90]").length != 1 || $("#char_buffs").find("[data-buff=90]").find(".timer").text() <= '00:00:04') && RESP.b7 && błogo7 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo7),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=74]").length != 1 || $("#char_buffs").find("[data-buff=74]").find(".timer").text() <= '00:00:04') && RESP.b8 && błogo8 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo8),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=52]").length != 1 || $("#char_buffs").find("[data-buff=52]").find(".timer").text() <= '00:00:04') && RESP.b9 && błogo9 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo9),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=50]").length != 1 || $("#char_buffs").find("[data-buff=50]").find(".timer").text() <= '00:00:04') && RESP.b10 && błogo10 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo10),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=112]").length != 1 || $("#char_buffs").find("[data-buff=112]").find(".timer").text() <= '00:00:04') && RESP.b19 && błogo19 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo19),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=111]").length != 1 || $("#char_buffs").find("[data-buff=111]").find(".timer").text() <= '00:00:04') && RESP.b20 && błogo20 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo20),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=95]").length != 1 || $("#char_buffs").find("[data-buff=95]").find(".timer").text() <= '00:00:04') && RESP.b11 && błogo11 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo11),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=93]").length != 1 || $("#char_buffs").find("[data-buff=93]").find(".timer").text() <= '00:00:04') && RESP.b12 && błogo12 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo12),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=82]").length != 1 || $("#char_buffs").find("[data-buff=82]").find(".timer").text() <= '00:00:04') && RESP.b13 && błogo13 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo13),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=81]").length != 1 || $("#char_buffs").find("[data-buff=81]").find(".timer").text() <= '00:00:04') && RESP.b14 && błogo14 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo14),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=80]").length != 1 || $("#char_buffs").find("[data-buff=80]").find(".timer").text() <= '00:00:04') && RESP.b15 && błogo15 && RESP.bless) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo15),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=71]").length != 1 || $("#char_buffs").find("[data-buff=71]").find(".timer").text() <= '00:00:04') && błogo16 && $("#aaBuff").is(":checked") && $(".sideIcons.manage_auto_arena").hasClass("kws_active_icon")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo16),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=76]").length != 1 || $("#char_buffs").find("[data-buff=76]").find(".timer").text() <= '00:00:04') && RES.b1 && błogo17 && $("#res_Panel .res_res .res_status").hasClass("green")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo17),
                    page: 10
                });
                return true;
            } else if (($("#char_buffs").find("[data-buff=75]").length != 1 || $("#char_buffs").find("[data-buff=75]").find(".timer").text() <= '00:00:04') && RES.b2 && błogo18 && $("#res_Panel .res_res .res_status").hasClass("green")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo18),
                    page: 10
                });
                return true;
            }
            return false;
        };
        RESP.finder = (x) => {
            if ("senzus" in GAME.quick_opts && GAME.quick_opts.senzus.length > 0) {
                let table = GAME.quick_opts.senzus;
                return table.filter(item => item.item_id === x).map(item => item.stack)[0];
            } else {
                return false;
            }
        };
        RESP.finder_id = (x) => {
            if ("senzus" in GAME.quick_opts && GAME.quick_opts.senzus.length > 0) {
                let table = GAME.quick_opts.senzus;
                return table.filter(item => item.item_id === x).map(item => item.id)[0];
            } else {
                return false;
            }
        };
        RESP.useSenzu = () => {
            if (!RESP.used_senzu) {
                RESP.used_senzu = true;
                RESP.failSENZU = setTimeout(() => {
                    RESP.used_senzu = false;
                }, 5000);
                const blue = RESP.finder(RESP.blue);
                const purple = RESP.finder(RESP.purple);
                const magic = RESP.finder(RESP.magic);
                const green = RESP.finder(RESP.green);
                const yellow = RESP.finder(RESP.yellow);
                const red = RESP.finder(RESP.red);
                const dark = RESP.finder(RESP.dark);
                RESP.checkOST_timer = GAME.getTime() + 60;
                if (RESP.do_next && RESP.drag_con()) {
                    if ($(".resp_resp .resp_status").hasClass("green")) {
                        $("#resp_Panel .resp_button.resp_resp").click();
                        setTimeout(() => {
                            if (RESP.what_next_pvp) {
                                if ($(".gh_pvp .gh_status").hasClass("red")) {
                                    $("#main_Panel .gh_pvp").click();
                                }
                                if ($(".pvp_Code_multi .pvp_status").hasClass("red") && RESP.multi_code) {
                                    $("#pvp_Panel .pvp_button.pvp_Code_multi").click();
                                }
                                $("#pvp_Panel .pvp_button.pvp_pvp").click();
                            } else if (RESP.what_next_expe) {
                                if (!$("#aeCodes_multi").is(":checked") && RESP.multi_code) {
                                    $("#aeCodes_multi").click();
                                }
                                $(".sideIcons.manage_autoExpeditions").click();
                            } else if (RESP.what_next_know) {
                                if (!$('#kws_know_panel input[name="kws_know"]').is(":checked")) {
                                    $(`.know_label [value="382"]`).click();
                                }
                                if (!$('#kws_know_panel input[name="know_kody"]').is(':checked') && RESP.code) {
                                    $('.newCheckbox label[for="know_kody"]').click();
                                }
                                if (!$('#kws_know_panel input[name="know_kody_multi"]').is(':checked') && RESP.multi_code) {
                                    $('.newCheckbox label[for="know_kody_multi"]').click();
                                }
                                $("#kws_know_panel .gold_button").click();
                            }
                        }, 500);
                    }
                } else if (RESP.limit && GAME.char_data.senzu_limit >= GAME.senzu_limit()) {
                    if ($(".resp_resp .resp_status").hasClass("green")) {
                        $("#resp_Panel .resp_button.resp_resp").click();
                    }
                } else if (RESP.use_magic && magic && !RESP.stop) {
                    RESP.useMagic();
                } else if (RESP.use_blue && blue && !RESP.stop) {
                    RESP.useBlue(Math.min(RESP.blue_amount(), blue, RESP.blue_amount1));
                } else if (RESP.use_green && green && !RESP.stop) {
                    RESP.useGreen(Math.min(RESP.green_amount(), green, RESP.green_amount1));
                } else if (RESP.use_purple && purple && !RESP.stop) {
                    RESP.usePurple(Math.min(RESP.purple_amount(), purple, RESP.purple_amount1));
                } else if (RESP.use_yellow && yellow && !RESP.stop) {
                    RESP.useYellow(Math.min(RESP.yellow_amount(), yellow, RESP.yellow_amount1));
                } else if (RESP.use_red && red && !RESP.stop) {
                    RESP.useRed();
                } else if (RESP.use_dark && dark && !RESP.stop) {
                    RESP.useDark();
                } else {
                    $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
                    RESP.stop = true;
                }
            }
        };
        RESP.useBlue = (amount = RESP.blue_amount()) => {
            const blue = RESP.finder_id(RESP.blue);
            if (!blue) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: blue,
                page: GAME.ekw_page,
                am: amount
            });
        };
        RESP.useGreen = (amount = RESP.green_amount()) => {
            const green = RESP.finder_id(RESP.green);
            if (!green) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: green,
                page: GAME.ekw_page,
                am: amount
            });
        };
        RESP.usePurple = (amount = RESP.purple_amount()) => {
            const purple = RESP.finder_id(RESP.purple);
            if (amount < 1) amount = 1;
            if (!purple) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: purple,
                page: GAME.ekw_page,
                am: amount
            });
        };
        RESP.useYellow = (amount = RESP.yellow_amount()) => {
            const yellow = RESP.finder_id(RESP.yellow);
            if (amount < 1) amount = 1;
            if (!yellow) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: yellow,
                page: GAME.ekw_page,
                am: amount
            });
        };
        RESP.useRed = () => {
            const red = RESP.finder_id(RESP.red);
            if (!red) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: red,
                page: GAME.ekw_page,
                am: 1
            });
        };
        RESP.useDark = () => {
            const dark = RESP.finder_id(RESP.dark);
            if (!dark) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: dark,
                page: GAME.ekw_page,
                am: 1
            });
        };
        RESP.useMagic = () => {
            const magic = RESP.finder_id(RESP.magic);
            if (!magic) return;
            GAME.socket.emit('ga', {
                a: 12,
                type: 14,
                iid: magic,
                page: GAME.ekw_page,
                am: 1
            });
        };
        RESP.pa_bar = () => {
            let list = localStorage.getItem('pa_bar');
            if (list === undefined || list == null) {
                list = 70;
            }
            return list;
        };
        var LPVM = {
            Stop: true,
            made: 0,
            wait: 50,
            es: new EasyStar.js(),
            Born: 2,
            path: [],
            limit: false,
            limit2: 60,
            code: true
        };
        LPVM.es.enableDiagonals();
        LPVM.es.setAcceptableTiles([1]);
        LPVM.updateStats = (made) => {
            $("#lpvm_Panel .pvm_killed b").text(made);
        };
        LPVM.Start = () => {
            if (!LPVM.Stop && $("#main_Panel .gh_lpvm .gh_status").hasClass("green")) {
                GAME.socket.emit('ga', {
                    a: 32,
                    type: 0
                });
            } else {
                LPVM.off();
            }
        };
        LPVM.createGrid = () => {
            LPVM.grid = [];
            const {
                max_x,
                max_y
            } = GAME.map;
            for (let y = 0; y < max_y; y++) {
                LPVM.grid.push([]);
                for (let x = 0; x < max_x; x++) {
                    const mapCell = GAME.mapcell[`${x + 1}_${y + 1}`];
                    const value = (mapCell && mapCell.m === 1 && mapCell.f != 7003 && mapCell.f != 7000 && mapCell.f != 7002 && mapCell.f != 7001 && mapCell.f != 7004) ? 1 : 0;
                    LPVM.grid[y].push(value);
                }
            }
        };
        LPVM.killWanted = () => {
            if (GAME.field_wanted) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 32,
                        type: 1,
                        wanted_id: LPVM.Born,
                        quick: 1
                    });
                }, 100);
            }
        };
        LPVM.collectPrize = () => {
            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 32,
                    type: 2,
                    wanted: LPVM.Born
                });
            }, 100);
        };
        LPVM.teleportation = (loc_id) => {
            if ((GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !GAME.is_training && LPVM.code && !LPVM.Stop) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 2,
                        stat: 1,
                        duration: 1
                    });
                }, 200);
                setTimeout(() => {
                    LPVM.teleportation(loc_id);
                }, 1500);
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) <= 0 && LPVM.code && !LPVM.Stop) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 5,
                        multi: PVP.multi_code,
                        apud: 'vzaaa'
                    });
                }, 200);
                setTimeout(() => {
                    LPVM.teleportation(loc_id);
                }, 1500);
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) > 0 && LPVM.code && !LPVM.Stop) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                setTimeout(() => {
                    LPVM.teleportation(loc_id);
                }, 1500);
            } else if (GAME.is_training && LPVM.code) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                setTimeout(() => {
                    LPVM.teleportation(loc_id);
                }, 1500);
            } else if ((LPVM.made >= parseInt(LPVM.limit2) && LPVM.limit && typeof XrhxRSLTNAqpWgT !== 'undefined') || LPVM.Born < 2) {
                $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
                LPVM.Stop = true;
            } else {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 12,
                        type: 18,
                        loc: loc_id
                    });
                }, 100);
            }
        };
        LPVM.go = () => {
            LPVM.es.setGrid(LPVM.grid);
            const charX = GAME.char_data.x - 1;
            const charY = GAME.char_data.y - 1;
            const wantedX = parseInt(GAME.map_wanteds.x) - 1;
            const wantedY = parseInt(GAME.map_wanteds.y) - 1;
            LPVM.es.findPath(charX, charY, wantedX, wantedY, (path) => {
                if (path !== null) {
                    if (path[0].x === charX && path[0].y === charY) {
                        path.shift();
                    }
                    LPVM.path = path;
                    LPVM.move();
                } else {
                    setTimeout(() => {
                        LPVM.Stop = false;
                        LPVM.reset();
                    }, 1000);
                }
            });
            LPVM.es.calculate();
        };
        LPVM.move = () => {
            clearTimeout(LPVM.failMOVE);
            if (!LPVM.Stop && typeof HssmScPihluPJeL !== 'undefined') {
                const dirX = LPVM.path[0].x - (GAME.char_data.x - 1);
                const dirY = LPVM.path[0].y - (GAME.char_data.y - 1);
                const directionMap = {
                    '1_0': 7,
                    '-1_0': 8,
                    '0_1': 1,
                    '0_-1': 2,
                    '1_1': 3,
                    '-1_-1': 6,
                    '1_-1': 5,
                    '-1_1': 4
                };
                const dirKey = dirX + '_' + dirY;
                const dir = directionMap[dirKey];
                if (dir && typeof fhbKwjhKsoohJpH !== 'undefined') {
                    GAME.socket.emit('ga', {
                        a: 4,
                        dir: dir,
                        vo: GAME.map_options.vo
                    });
                } else {
                    setTimeout(() => {
                        LPVM.go();
                    }, 300);
                }
            }
        };
        LPVM.next = () => {
            if (LPVM.path.length - 1 > 0) {
                LPVM.path.shift();
                setTimeout(() => {
                    LPVM.move();
                }, LPVM.wait);
            } else {
                LPVM.killWanted();
            }
        };
        LPVM.reset = () => {
            LPVM.Born--;
            const buttons = {
                2: ".lpvm_g",
                3: ".lpvm_u",
                4: ".lpvm_s",
                5: ".lpvm_h",
                6: ".lpvm_m"
            };
            Object.values(buttons).forEach(selector => {
                $(`${selector} .lpvm_status`).removeClass("green").addClass("red").html("Off");
            });
            if (LPVM.Born >= 2 && LPVM.Born <= 6) {
                const selector = buttons[LPVM.Born];
                $(`${selector} .lpvm_status`).removeClass("red").addClass("green").html("On");
            } else {
                if (GAME.char_data.reborn > 2) {
                    LPVM.Born = GAME.char_data.reborn;
                    const selector = buttons[LPVM.Born];
                    $(`${selector} .lpvm_status`).removeClass("red").addClass("green").html("On");
                } else {
                    LPVM.off();
                }
            }
            setTimeout(() => {
                LPVM.Start();
            }, 1000);
        };
        LPVM.handleSockets = (data) => {
            if (!LPVM.Stop) {
                if (data.a == 12 && data.e == 34 || data.a == 12 && data.e == 33) {
                    LPVM.Stop = true;
                    setTimeout(() => {
                        LPVM.Stop = false;
                        LPVM.reset();
                    }, 1000);
                } else if (data.a == 4 && data.me == 191 && data.char_id == GAME.char_id) {
                    LPVM.Stop = true;
                    setTimeout(() => {
                        LPVM.Stop = false;
                        LPVM.reset();
                    }, 1000);
                } else if (data.a === 4 && data.char_id === GAME.char_data.id && !LPVM.Stop) {
                    LPVM.failMOVE = setTimeout(() => {
                        if (!LPVM.Stop) {
                            LPVM.reset();
                        }
                    }, 10000);
                    LPVM.next();
                } else if (data.a === 32 && data.wanted && !LPVM.Stop) {
                    if (data.done) {
                        LPVM.made++;
                        LPVM.updateStats(LPVM.made);
                    }
                    if (data.wanted[LPVM.Born].killer === GAME.char_data.id && !LPVM.Stop) {
                        LPVM.collectPrize();
                    } else {
                        LPVM.teleportation(data.wanted[LPVM.Born].loc);
                    }
                } else if (data.a === 602 && !data.wanted && !LPVM.Stop) {
                    LPVM.collectPrize();
                } else if (data.a === 12 && typeof gjyFgmtHkAFxDCm !== 'undefined' && !LPVM.Stop) {
                    if ("show_map" in data) {
                        LPVM.createGrid();
                        if (GAME.char_data.x === GAME.map_wanteds.x && GAME.char_data.y === GAME.map_wanteds.y && !LPVM.Stop) {
                            LPVM.killWanted();
                        } else {
                            setTimeout(() => {
                                LPVM.go();
                            }, 400);
                        }
                    } else {
                        setTimeout(() => {
                            GAME.socket.emit('ga', {
                                a: 32,
                                type: 0
                            });
                        }, 100);
                    }
                } else if (data.wanted && !LPVM.Stop) {
                    LPVM.killWanted();
                }
            }
            if ($("#lpvm_Panel").is(":visible") && data && parseInt($("#lpvm_Panel .pvm_tp b").text()) != GAME.char_data.tpp) {
                $("#lpvm_Panel .pvm_tp b").text(GAME.char_data.tpp);
            }
        };
        GAME.socket.on('gr', function (msg) {
            LPVM.handleSockets(msg);
        });
        let RES = {
            stop: true,
            loc: 0,
            path: [],
            mined_id: [],
            mines: [],
            steps: [],
            steps_clone: [],
            speed: 80,
            last_mine: 0,
            b1: false,
            b2: false,
            spr: false,
            es: new EasyStar.js(),
            failsafeCD: null,
            cd: 0,
            code: true
        };
        RES.es.enableDiagonals();
        RES.es.setAcceptableTiles([1]);
        RES.Start = () => {
            RES.createGrid();
            RES.getMinesPos();
            RES.mined_id = parseInt($(".select_mine:checked").val());
            RES.steps_clone = RES.steps.slice();
            if (RES.steps_clone[0][0] == GAME.char_data.x && RES.steps_clone[0][1] == GAME.char_data.y) {
                RES.steps_clone.shift();
            }
            RES.es.setGrid(RES.grid);
            setTimeout(() => {
                RES.go();
            }, 200);
        };
        RES.createGrid = () => {
            RES.grid = [];
            const {
                max_x,
                max_y
            } = GAME.map;
            for (let y = 0; y < max_y; y++) {
                RES.grid.push([]);
                for (let x = 0; x < max_x; x++) {
                    const mapCell = GAME.mapcell2[`${x + 1}_${y + 1}`];
                    const value = (mapCell && mapCell.m === 1 && mapCell.f != 7003 && mapCell.f != 7000 && mapCell.f != 7002 && mapCell.f != 7001 && mapCell.f != 7004) ? 1 : 0;
                    RES.grid[y].push(value);
                }
            }
        };
        RES.listMines = () => {
            let html = "";
            let mines = Object.entries(GAME?.map_mines?.mine_data);
            let mineCoords = Object.entries(GAME.map_mines.coords);
            let counts = {};
            mineCoords.forEach(([_, entries]) => {
                entries.forEach(entry => {
                    let type = entry[1];
                    counts[type] = (counts[type] || 0) + 1;
                });
            });
            for (let i = 0; i < mines.length; i++) {
                let resource = mines[i][1];
                let count = counts[resource.id] || 0;
                if (i === 0) {
                    RES.mined_id = resource.id;
                    html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'>" + "<input class='select_mine' type='checkbox' checked='true' value='" + resource.id + "' " + ((mines.length == 1) ? "disabled" : "") + "> " + resource.name + " (" + count + ")" + "</div>";
                } else {
                    html += "<div style='margin-bottom:5px; border-bottom:solid gray 1px; padding:3px;'>" + "<input class='select_mine' type='checkbox' value='" + resource.id + "'> " + resource.name + " (" + count + ")" + "</div>";
                }
            }
            $("#res_Panel ul").html(html);
            if (mines.length == 0) {
                $("#res_Panel ul").html("Brak zasobÃ³w");
            }
        };
        RES.getMinesPos = () => {
            RES.mines = [];
            const mines = Object.entries(GAME.map_mines.coords).filter(([_, values]) => values.some(entry => entry[1] == RES.mined_id));
            RES.prepareMines(mines);
        };
        RES.prepareMines = (mines) => {
            RES.steps = [];
            let firstMine = false;
            for (const [pos, data] of mines) {
                const [x, y] = pos.split("_").map(Number);
                if (!firstMine) {
                    firstMine = [x, y];
                }
                RES.steps.push([x, y]);
                const matches = data.filter(entry => entry[1] == RES.mined_id).map(entry => entry[0]);
                if (matches.length) {
                    RES.mines[pos] = matches.length === 1 ? matches[0] : matches;
                }
            }
            RES.last_mine = `${firstMine[0]}_${firstMine[1]}`;
            RES.steps.push(firstMine);
        };
        RES.mine = (mid) => {
            GAME.socket.emit('ga', {
                a: 22,
                type: 8,
                mid: mid
            });
            setTimeout(() => {
                RES.going(mid);
            }, 500);
        };
        RES.going = (mid) => {
            if (!RES.stop) {
                let go = $(`#field_opts_con #mining_res_${mid} .timer`).length;
                $(`#mining_btn_${mid}`).remove();
                if (RES.cd) {
                    RES.set_mining = setTimeout(() => {
                        GAME.socket.emit('ga', {
                            a: 22,
                            type: 8
                        }, true);
                        RES.go();
                    }, (RES.cd * 1.05) - 300);
                } else if (!go) {
                    setTimeout(() => {
                        RES.going(mid);
                    }, 1000);
                } else {
                    setTimeout(() => {
                        RES.go();
                    }, 1000);
                }
            }
        };
        RES.go = () => {
            var błogo1 = $("#ekw_page_items").find("div[data-base_item_id=1747]").attr("data-item_id");
            var błogo2 = $("#ekw_page_items").find("div[data-base_item_id=1746]").attr("data-item_id");
            RES.es.setGrid(RES.grid);
            if (GAME.ekw_page != 10 && typeof eDWOkPnDpHwiKFA !== 'undefined' && (RES.b1 || RES.b2) && !RES.stop || (!błogo1 && RES.spr < 3 && (RES.b1 || RES.b2))) {
                RES.spr++;
                GAME.ekw_page = 10;
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 12,
                        page: GAME.ekw_page,
                        page2: GAME.ekw_page2,
                        used: 1
                    });
                }, 300);
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (($("#char_buffs").find("[data-buff=76]").length != 1 || $("#char_buffs").find("[data-buff=76]").find(".timer").text() <= '00:00:04') && RES.b1 && błogo1 && !RES.stop) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo1),
                    page: 10
                });
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (($("#char_buffs").find("[data-buff=75]").length != 1 || $("#char_buffs").find("[data-buff=75]").find(".timer").text() <= '00:00:04') && RES.b2 && błogo2 && !RES.stop) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo2),
                    page: 10
                });
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if ((GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !GAME.is_training && !RES.stop && (RES.code || (!RESP.stop && RESP.code))) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 2,
                        stat: 1,
                        duration: 1
                    });
                }, 200);
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) <= 0 && !RES.stop && (RES.code || (!RESP.stop && RESP.code))) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 5,
                        apud: 'vzaaa'
                    });
                }, 200);
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (GAME.is_training && (GAME.char_data.train_ucd - GAME.getTime()) > 0 && !RES.stop && (RES.code || (!RESP.stop && RESP.code))) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (!RES.stop && GAME.is_training && (RES.code || (!RESP.stop && RESP.code))) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 8,
                        type: 3
                    });
                }, 200);
                setTimeout(() => {
                    RES.go();
                }, 1500);
            } else if (RES.steps_clone.length > 0) {
                const charX = GAME.char_data.x - 1;
                const charY = GAME.char_data.y - 1;
                const mineX = RES.steps_clone[0][0] - 1;
                const mineY = RES.steps_clone[0][1] - 1;
                RES.es.findPath(charX, charY, mineX, mineY, (path) => {
                    if (path !== null && path.length) {
                        if (path[0].x === charX && path[0].y === charY) {
                            path.shift();
                        }
                        RES.path = path;
                        let pos = [parseInt(GAME.char_data.x), parseInt(GAME.char_data.y)];
                        setTimeout(() => {
                            if (!RES.stop) {
                                let mineEntry = RES.mines[`${pos[0]}_${pos[1]}`];
                                let validMid = Array.isArray(mineEntry) ? mineEntry.find(id => $(`button[data-mid="${id}"]`).length === 1) : ($(`button[data-mid="${mineEntry}"]`).length === 1 ? mineEntry : null);
                                if (validMid) {
                                    setTimeout(() => {
                                        RES.mine(validMid);
                                    }, 300);
                                } else {
                                    setTimeout(() => {
                                        RES.move();
                                    }, RES.speed);
                                }
                            }
                        }, 1000);
                    } else {
                        let pos = [parseInt(GAME.char_data.x), parseInt(GAME.char_data.y)];
                        let mineEntry = RES.mines[`${pos[0]}_${pos[1]}`];
                        let validMid = Array.isArray(mineEntry) ? mineEntry.find(id => $(`button[data-mid="${id}"]`).length === 1) : ($(`button[data-mid="${mineEntry}"]`).length === 1 ? mineEntry : null);
                        if ($("button[data-option='start_mine']").length && $("button[data-option='start_mine']").is(":visible") && validMid) {
                            setTimeout(() => {
                                RES.mine(validMid);
                            }, 300);
                        } else if (!RES.stop && RES.last_mine == (GAME.char_data.x + "_" + GAME.char_data.y)) {
                            setTimeout(() => {
                                RES.Start();
                            }, 1000);
                        }
                    }
                });
                RES.es.calculate();
            } else if (!RES.stop && RES.last_mine == (GAME.char_data.x + "_" + GAME.char_data.y)) {
                setTimeout(() => {
                    RES.Start();
                }, 1000);
            }
        };
        RES.move = () => {
            if (!RES.stop) {
                const dirX = RES.path[0].x - (GAME.char_data.x - 1);
                const dirY = RES.path[0].y - (GAME.char_data.y - 1);
                const directionMap = {
                    '1_0': 7,
                    '-1_0': 8,
                    '0_1': 1,
                    '0_-1': 2,
                    '1_1': 3,
                    '-1_-1': 6,
                    '1_-1': 5,
                    '-1_1': 4
                };
                const dirKey = dirX + '_' + dirY;
                const dir = directionMap[dirKey];
                if (dir) {
                    GAME.socket.emit('ga', {
                        a: 4,
                        dir: dir,
                        vo: GAME.map_options.vo
                    });
                } else {
                    RES.go();
                }
            }
        };
        RES.next = () => {
            if (RES.path.length - 1 > 0) {
                RES.path.shift();
                setTimeout(() => {
                    RES.move();
                }, RES.speed);
            } else if (RES.steps_clone.length > 0) {
                RES.steps_clone.shift();
                RES.go();
            }
        };
        RES.reset = () => {
            const checkboxes = document.querySelectorAll('.select_mine');
            const checkboxArray = Array.from(checkboxes);
            const checkedIndex = checkboxArray.findIndex(cb => cb.checked);
            const nextIndex = (checkedIndex + 1) % checkboxArray.length;
            checkboxArray[nextIndex].click();
        };
        RES.HandleResponse = function (res) {
            if (RES.stop && res.a === 3 && typeof GlhMotqwMyAWbnY !== 'undefined') {
                setTimeout(() => {
                    RES.listMines();
                    RES.getMinesPos();
                }, 100);
            }
            if (!RES.stop && res.a === 22 && res.e === 49) {
                RES.off();
                kom_clear();
                GAME.komunikat("Zmieniam wybrany typ zasobu.");
                setTimeout(() => {
                    RES.reset();
                }, 500);
                if ($("#res_Panel ul div").length > 1) {
                    setTimeout(() => {
                        RES.on();
                        kom_clear();
                    }, 1000);
                } else {
                    kom_clear();
                    GAME.komunikat("Brak odpowiednich typÃ³w zasobÃ³w do zebrania. WyÅÄczam zbieranie");
                }
            }
            if (!PVP.stop && res?.a === 4 && res.char_id === GAME.char_id && !PVP.rewerse) {
                setTimeout(() => {
                    PVP.start();
                }, PVP.wait2);
            }
            if (!PVP.stop && res?.a === 24 && res.e === 55) {
                $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)").eq(0).remove();
                setTimeout(() => {
                    PVP.kill_players1();
                }, PVP.czekajpvp);
            }
            if (!PVP.stop && res.a === 7 && res.e === 68 || !PVP.stop && res.a === 7 && res.e === 56) {
                $("#player_list_con").find(".player button" + "[data-quick=1]" + ":not(.initial_hide_forced)").eq(0).remove();
            }
            if (!PVP.stop && res?.a === 24 && res.e === 0 || !PVP.stop && res.a === 7003 && res.more_players) {
                setTimeout(() => {
                    PVP.kill_players1();
                }, PVP.czekajpvp);
            }
            if (!PVP.stop && res?.a === 602) {
                PVP.res_loaded = true;
            }
            if (res.a === 3 && RES.loc != GAME.char_data.loc) {
                RES.off();
            }
            if (res.a === 39 && res.e === 107 && (RESP.buff_clan || PVP.buff_clan || CODE.buff_clan)) {
                RESP.has_clan_law = false;
            }
            if (!RES.stop && res.a === 4 && res.char_id === GAME.char_id) {
                RES.next();
            } else if (!RES.stop && res.mining && res.a === 22 && typeof MctBqXGyIuHMOcj !== 'undefined') {
                let time = (res.mining.expires - res.mining.start);
                RES.cd = time;
            }
        };
        GAME.socket.on('gr', function (res) {
            RES.HandleResponse(res);
        });
        setTimeout(() => {
            if (GAME.maploaded) {
                RES.listMines();
            }
        }, 500);
        var CODE = {
            char: parseInt($("li[data-option=select_char]").eq(0).attr("data-char_id")),
            what_to_train: 1,
            what_to_traintime: 1,
            whatNow: 0,
            licznik: 0,
            licznik2: 0,
            stop: true,
            wait: 1500,
            checkSSJ: true,
            acc: false,
            zast: false,
            b1: false,
            b2: false,
            b3: false,
            multi_code: false,
            buff_clan: false,
            buff_imp: false
        };
        CODE.start = () => {
            if (!CODE.stop) {
                switch (CODE.whatNow) {
                case 0:
                    CODE.whatNow++;
                    CODE.use_char();
                    break;
                case 1:
                    CODE.whatNow++;
                    CODE.checkTR();
                    break;
                case 2:
                    CODE.whatNow++;
                    CODE.tren();
                    break;
                case 3:
                    CODE.whatNow++;
                    CODE.kodyy();
                    break;
                case 4:
                    CODE.whatNow = 0;
                    CODE.out();
                    break;
                default:
                }
            }
        };
        CODE.get_char_acc = () => {
            let chars = [];
            if (parseInt($("#kws_skipUnavailable").val()) == 1) {
                chars = $('#char_list_con li.option').filter(function () {
                    const text = $(this).find('div span').text().trim();
                    return text !== 'PostaÄ klanowa!' && text !== 'Trwa zastÄpstwo!' && !text.includes('Usuwanie...');
                }).map(function () {
                    return parseInt($(this).data('char_id'), 10);
                }).get();
            } else {
                chars = $('#char_list_con li.option').map(function () {
                    return parseInt($(this).data('char_id'), 10);
                }).get();
            }
            return chars;
        };
        CODE.get_char_zast = () => {
            var len = $("#zast_list_con li").length;
            var tabela = [];
            for (var i = 0; i < len; i++) {
                tabela[i] = document.getElementById("zast_list_con").children[i].attributes[2].value;
            }
            return tabela;
        };
        CODE.use_char = () => {
            var length1 = CODE.get_char_acc().length;
            var length2 = CODE.get_char_zast().length;
            if (GAME.ekw_page != 10 && (CODE.b1 || CODE.b2 || CODE.b3)) {
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 12,
                        page: 10,
                        page2: GAME.ekw_page2,
                        used: 1
                    });
                }, 1000);
            }
            if (CODE.licznik < length1 && CODE.acc) {
                GAME.socket.emit('ga', {
                    a: 2,
                    char_id: CODE.get_char_acc()[CODE.licznik]
                });
                CODE.licznik++;
                window.setTimeout(CODE.start, CODE.wait);
            } else if (CODE.licznik2 < length2 && CODE.zast) {
                GAME.socket.emit('ga', {
                    a: 2,
                    char_id: CODE.get_char_zast()[CODE.licznik2],
                    type: 1
                });
                CODE.licznik2++;
                window.setTimeout(CODE.start, CODE.wait);
            } else if (!CODE.acc && !CODE.zast) {
                CODE.licznik = 0;
                CODE.licznik2 = 0;
                window.setTimeout(CODE.start, CODE.wait);
            } else {
                CODE.licznik = 0;
                CODE.licznik2 = 0;
                window.setTimeout(CODE.use_char, CODE.wait);
            }
        };
        CODE.kodyy = () => {
            let błogo2 = $("#ekw_page_items").find("div[data-base_item_id=1751]").attr("data-item_id");
            let kom = $(".kom").text();
            setTimeout(() => {
                GAME.parseTimed();
            }, 100);
            if (GAME.ekw_page != 10 && (CODE.b1 || CODE.b2 || CODE.b3)) {
                GAME.ekw_page = 10;
                GAME.socket.emit('ga', {
                    a: 12,
                    page: GAME.ekw_page,
                    page2: GAME.ekw_page2,
                    used: 1
                });
                window.setTimeout(CODE.kodyy, CODE.wait);
            } else if ($("#char_buffs").find("[data-buff=80]").length != 1 && $("#train_uptime").find('.timer').length == 0 && błogo2 && CODE.b2 && !CODE.stop && !kom.includes("Nie speÅniono warunkÃ³w wymaganych do podjÄcia tej akcji...")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo2),
                    page: 10
                });
                window.setTimeout(CODE.kodyy, CODE.wait);
            } else if ($("#train_uptime").find('.timer').length == 0 && typeof eDWOkPnDpHwiKFA !== 'undefined') {
                GAME.socket.emit('ga', {
                    a: 8,
                    type: 5,
                    multi: CODE.multi_code,
                    apud: 'vzaaa'
                });
                window.setTimeout(CODE.start, CODE.wait);
            } else {
                window.setTimeout(CODE.start, CODE.wait);
            }
        };
        CODE.out = () => {
            if (CODE.acc || CODE.zast) {
                GAME.socket.emit('ga', {
                    a: 5
                });
                window.setTimeout(CODE.start, CODE.wait);
            } else {
                window.setTimeout(CODE.start, CODE.wait);
            }
        };
        CODE.checkTR = () => {
            if (CODE.checkSSJ && GAME.quick_opts.ssj) {
                if ($("#ssj_bar").css("display") == "none") {
                    GAME.socket.emit('ga', {
                        a: 18,
                        type: 5,
                        tech_id: GAME.quick_opts.ssj[0]
                    });
                    window.setTimeout(CODE.start, CODE.wait);
                } else if ($('#ssj_status').text() == "--:--:--") {
                    GAME.socket.emit('ga', {
                        a: 18,
                        type: 6
                    });
                    window.setTimeout(CODE.checkTR, CODE.wait);
                } else window.setTimeout(CODE.start, CODE.wait);
            } else window.setTimeout(CODE.start, CODE.wait);
        };
        CODE.tren = () => {
            let błogo1 = $("#ekw_page_items").find("div[data-base_item_id=1629]").attr("data-item_id");
            let błogo3 = $("#ekw_page_items").find("div[data-base_item_id=2231]").attr("data-item_id");
            let kom = $(".kom").text();
            let imp = $("#leader_player").find("[data-option=show_player]").attr("data-char_id");
            let emp = GAME.char_data.empire;
            let buff = $(".emp_buff .pull-right").find("button").attr("data-option") == "activate_emp_buff";
            let buff_id = $(".emp_buff .pull-right").find("button").attr("data-buff");
            let who_win = $("#gne_satus").text().includes("ZÅO");
            let abut = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`);
            let isRed = $("#clan_buffs button[data-option='activate_war_buff']").parents("tr").find("td.red");
            let isDisabled = $("#clan_buffs").find(`button[data-option="activate_war_buff"]`).parents("tr").hasClass("disabled");
            setTimeout(() => {
                GAME.parseTimed();
            }, 100);
            if (CODE.char == GAME.char_id && imp == GAME.char_id && CODE.buff_imp && buff && buff_id < 4) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                window.setTimeout(CODE.tren, 1200);
            } else if (CODE.char == GAME.char_id && imp == GAME.char_id && CODE.buff_imp && buff && buff_id < 7 && ((emp == 1 || emp == 3) && who_win)) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                window.setTimeout(CODE.tren, 1200);
            } else if (CODE.char == GAME.char_id && imp == GAME.char_id && CODE.buff_imp && buff && buff_id < 7 && ((emp == 2 || emp == 4) && !who_win)) {
                GAME.socket.emit('ga', {
                    a: 50,
                    type: 6,
                    buff: buff_id
                });
                window.setTimeout(CODE.tren, 1200);
            } else if (CODE.char == GAME.char_id && (CODE.buff_clan || CODE.buff_imp) && $("#server_time").text() > '00:05:00' && $("#server_time").text() < '02:00:00' && typeof this.loaded == 'undefined') {
                this.loaded = true;
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 50,
                        type: 0,
                        empire: GAME.char_data.empire
                    });
                }, 300);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 0
                    });
                }, 600);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 23
                    });
                }, 900);
                setTimeout(() => {
                    GAME.socket.emit('ga', {
                        a: 39,
                        type: 28
                    });
                }, 1200);
                window.setTimeout(CODE.tren, 1500);
            } else if (RESP.has_clan_law && GAME.hasClanLaw('buffer') && CODE.char == GAME.char_id && CODE.buff_clan && GAME.klan_data != undefined && abut.length && !isDisabled && !isRed.length) {
                $(" .newBtn.activate_all_clan_buffs").click();
                window.setTimeout(CODE.tren, 1500);
            } else if (GAME.is_training) {
                window.setTimeout(CODE.start, CODE.wait);
            } else if (GAME.ekw_page != 10 && (CODE.b1 || CODE.b2 || CODE.b3)) {
                GAME.ekw_page = 10;
                GAME.socket.emit('ga', {
                    a: 12,
                    page: GAME.ekw_page,
                    page2: GAME.ekw_page2,
                    used: 1
                });
                window.setTimeout(CODE.tren, CODE.wait);
            } else if ($("#char_buffs").find("[data-buff=54]").length != 1 && !GAME.is_training && błogo1 && CODE.b1 && !CODE.stop && !kom.includes("Nie speÅniono warunkÃ³w wymaganych do podjÄcia tej akcji...")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo1),
                    page: 10
                });
                window.setTimeout(CODE.tren, CODE.wait);
            } else if ($("#char_buffs").find("[data-buff=110]").length != 1 && !GAME.is_training && błogo3 && CODE.b3 && !CODE.stop && !kom.includes("Nie speÅniono warunkÃ³w wymaganych do podjÄcia tej akcji...")) {
                GAME.socket.emit('ga', {
                    a: 12,
                    type: 14,
                    iid: parseInt(błogo3),
                    page: 10
                });
                window.setTimeout(CODE.tren, CODE.wait);
            } else {
                GAME.socket.emit('ga', {
                    a: 8,
                    type: 2,
                    stat: CODE.what_to_train,
                    duration: CODE.what_to_traintime
                });
                window.setTimeout(CODE.start, CODE.wait);
            }
        };
        CODE.on = () => {
            $(".code_code .code_status").removeClass("red").addClass("green").html("On");
            CODE.stop = false;
            setTimeout(() => {
                CODE.start();
            }, 5000);
            setTimeout(() => {
                GAME.socket.emit('ga', {
                    a: 12,
                    page: 10,
                    used: 1
                });
            }, 1000);
        };
        CODE.off = () => {
            CODE.stop = true;
            $(".code_code .code_status").removeClass("green").addClass("red").html("Off");
        };
        PVP.on = () => {
            PVP.caseNumber = 0;
            PVP.res_loaded = true;
            PVP.stop = false;
            PVP.start();
            $(".pvp_pvp .pvp_status").removeClass("red").addClass("green").html("On");
        };
        PVP.off = () => {
            PVP.stop = true;
            PVP.spr = 0;
            clearTimeout(PVP.failMOVE);
            clearTimeout(PVP.failMOVE2);
            clearTimeout(PVP.fail_pvp);
            $(".pvp_pvp .pvp_status").removeClass("green").addClass("red").html("Off");
        };
        LPVM.on = () => {
            $(".lpvm_lpvm .lpvm_status").removeClass("red").addClass("green").html("On");
            LPVM.Stop = false;
            LPVM.Start();
        };
        LPVM.off = () => {
            LPVM.Stop = true;
            clearTimeout(LPVM.failMOVE);
            $(".lpvm_lpvm .lpvm_status").removeClass("green").addClass("red").html("Off");
        };
        RES.on = () => {
            $(".res_res .res_status").removeClass("red").addClass("green").html("On");
            RES.cd = 0;
            RES.stop = false;
            RES.loc = GAME.char_data.loc;
            clearTimeout(RES.set_mining);
            RES.Start();
        };
        RES.off = () => {
            clearTimeout(RES.set_mining);
            RES.stop = true;
            RES.spr = 0;
            $(".res_res .res_status").removeClass("green").addClass("red").html("Off");
        };
        RESP.on = () => {
            $(".resp_resp .resp_status").removeClass("red").addClass("green").html("On");
            RESP.used_senzu = false;
            RESP.stop = false;
            RESP.action();
            RESP.loc = GAME.char_data.loc;
            RESP.checkOST_timer = GAME.getTime() + 60;
            RESP.blue_amount1 = Math.floor(GAME.getCharMaxPr() / 100 * 0.99);
            RESP.purple_amount1 = Math.floor(GAME.getCharMaxPr() / (GAME.getCharMaxPr() * 0.03 + 5000));
            RESP.green_amount1 = Math.floor((GAME.getCharMaxPr()) / 2000);
            RESP.yellow_amount1 = Math.floor(GAME.getCharMaxPr() / (GAME.getCharMaxPr() * 0.15 + 10000));
        };
        RESP.off = () => {
            RESP.stop = true;
            RESP.spr = 0;
            clearTimeout(RESP.failSENZU);
            clearTimeout(RESP.failAction);
            $(".resp_resp .resp_status").removeClass("green").addClass("red").html("Off");
        };
        var AFO = {
            lastSettings: localStorage.getItem("AFO_SETTINGS") ? JSON.parse(localStorage.getItem("AFO_SETTINGS")) : {},
            loading: false
        };
        AFO.updateData = () => {
            AFO.lastSettings.pvm = {};
            AFO.lastSettings.pvp = {};
            AFO.lastSettings.wanted = {};
            AFO.lastSettings.res = {};
            AFO.lastSettings.codes = {};
            AFO.lastSettings.spawn = {};
            AFO.lastSettings.spawn.pa = GAME.spawner[0];
            AFO.lastSettings.spawn.ignore = GAME.spawner[1];
            $('#resp_Panel .resp_button').each((index, button) => {
                const $button = $(button);
                const name = $button.attr('class').split(' ').filter(cls => cls !== 'resp_button' && cls !== 'resp_bh').join(' ');
                let status = $button.find('b').text();
                status = status === "On" ? true : false;
                if (name != "resp_resp" && name != "resp_ost") {
                    if (name != "resp_on" && name != "resp_off") {
                        AFO.lastSettings.pvm[name] = status;
                    }
                }
                if (name == "resp_ost") {
                    let status = $button.find('b').text();
                    AFO.lastSettings.pvm[name] = status;
                }
            });
            $('#pvp_Panel .pvp_button').each((index, button) => {
                const $button = $(button);
                const name = $button.attr('class').split(' ').filter(cls => cls !== 'pvp_button').join(' ');
                let status = $button.find('b').text();
                status = status === "On" ? true : false;
                if (name != "pvp_pvp") {
                    AFO.lastSettings.pvp[name] = status;
                }
            });
            $('#lpvm_Panel .lpvm_button').each((index, button) => {
                const $button = $(button);
                const name = $button.attr('class').split(' ').filter(cls => cls !== 'lpvm_button').join(' ');
                let status = $button.find('b').text();
                status = status === "On" ? true : false;
                if (name != "lpvm_lpvm") {
                    AFO.lastSettings.wanted[name] = status;
                }
            });
            AFO.lastSettings.res["res_code"] = $("#res_Panel .res_code .res_status").hasClass("green");
            AFO.lastSettings.res["res_b1"] = $("#res_Panel .res_b1 .res_status").hasClass("green");
            AFO.lastSettings.res["res_b2"] = $("#res_Panel .res_b2 .res_status").hasClass("green");
            $('#code_Panel .code_button').each((index, button) => {
                const $button = $(button);
                const name = $button.attr('class').split(' ').filter(cls => cls !== 'code_button').join(' ');
                let status = $button.find('b').text();
                status = status === "On" ? true : false;
                if (name != "code_code") {
                    AFO.lastSettings.codes[name] = status;
                }
            });
            AFO.lastSettings.codes["stat"] = parseInt($("#bot_what_to_train").val());
            AFO.lastSettings.codes["duration"] = parseInt($("#bot_what_to_traintime").val());
            localStorage.setItem("AFO_SETTINGS", JSON.stringify(AFO.lastSettings));
        };
        AFO.setSettings = () => {
            AFO.loading = true;
            if (Object.keys(AFO.lastSettings).length > 0) {
                GAME.spawner[0] = AFO?.lastSettings?.spawn?.pa ?? 1000;
                GAME.spawner[1] = AFO?.lastSettings?.spawn?.ignore ?? [1, 1, 1, 1, 1, 1];
                $(`#kws_spawn2 input[type="checkbox"]`).each((index, el) => {
                    const $el = $(el);
                    $el.prop('checked', GAME.spawner[1][index] === 1 ?? 'true', 'false');
                });
                $("#kws_pa_max").val(GAME.spawner[0]);
                $('#resp_Panel .resp_button').each((index, button) => {
                    const $button = $(button);
                    const name = $button.attr('class').split(' ').filter(cls => cls !== 'resp_button' && cls !== 'resp_bh').join(' ');
                    let status = $button.find('b').text();
                    if (name != "resp_ost") {
                        status = status.toLowerCase() === "on" ? true : false;
                    }
                    if (name != "resp_on" && name != "resp_off" && name != "resp_resp") {
                        const element = AFO.lastSettings.pvm[name];
                        if (status != element && "resp_on" && name != "resp_off" && element != undefined) {
                            $(`.${name}`).click();
                        }
                    }
                });
                $('#pvp_Panel .pvp_button').each((index, button) => {
                    const $button = $(button);
                    const name = $button.attr('class').split(' ').filter(cls => cls !== 'pvp_button').join(' ');
                    let status = $button.find('b').text();
                    status = status.toLowerCase() === "on" ? true : false;
                    if (name != "pvp_pvp") {
                        const element = AFO.lastSettings.pvp[name];
                        if (status != element && element != undefined) {
                            $(`.${name}`).click();
                        }
                    }
                });
                $('#lpvm_Panel .lpvm_button').each((index, button) => {
                    const $button = $(button);
                    const name = $button.attr('class').split(' ').filter(cls => cls !== 'lpvm_button').join(' ');
                    let status = $button.find('b').text();
                    status = status.toLowerCase() === "on" ? true : false;
                    if (name != "lpvm_lpvm") {
                        const element = AFO.lastSettings.wanted[name];
                        if (status != element && element != undefined) {
                            $(`.${name}`).click();
                        }
                    }
                });
                $('#res_Panel .res_button').each((index, button) => {
                    const $button = $(button);
                    const name = $button.attr('class').split(' ').filter(cls => cls !== 'res_button').join(' ');
                    let status = $button.find('b').text();
                    status = status.toLowerCase() === "on" ? true : false;
                    if (["res_code", "res_b1", "res_b2"].includes(name)) {
                        const element = AFO.lastSettings.res[name];
                        if (status != element && element != undefined) {
                            $(`.${name}`).click();
                        }
                    }
                });
                $('#code_Panel .code_button').each((index, button) => {
                    const $button = $(button);
                    const name = $button.attr('class').split(' ').filter(cls => cls !== 'code_button').join(' ');
                    let status = $button.find('b').text();
                    status = status.toLowerCase() === "on" ? true : false;
                    if (name != "code_code") {
                        const element = AFO.lastSettings.codes[name];
                        if (status != element && element != undefined) {
                            $(`.${name}`).click();
                        }
                    }
                });
                setTimeout(() => {
                    $("#bot_what_to_train").val(AFO?.lastSettings?.codes?.stat).trigger('change');
                    $("#bot_what_to_traintime").val(AFO?.lastSettings?.codes.duration).trigger('change');
                }, 500);
            }
            setTimeout(() => {
                AFO.loading = false;
            }, 1000);
        };
        AFO.resetSettings = () => {
            localStorage.removeItem("AFO_SETTINGS");
            AFO.lastSettings = {};
            AFO.lastSettings = {
                pvm: {
                    resp_code: !0,
                    resp_code_multi: !1,
                    resp_sub: !0,
                    resp_ost: "Ost",
                    resp_multi: !0,
                    resp_ssj: !0,
                    resp_buff_imp: !0,
                    resp_buff_clan: !1,
                    resp_magic: !1,
                    resp_blue: !0,
                    resp_green: !1,
                    resp_purple: !1,
                    resp_yellow: !1,
                    resp_red: !0,
                    resp_dark: !1,
                    resp_bless: !1,
                    resp_limit: !1,
                    resp_next: !1,
                    resp_pvp: !1,
                    resp_expe: !1,
                    resp_know: !1,
                    resp_bh1: !1,
                    resp_bh2: !1,
                    resp_bh3: !1,
                    resp_bh4: !1,
                    resp_bh5: !1,
                    resp_bh6: !1,
                    resp_bh7: !1,
                    resp_bh8: !1,
                    resp_bh9: !1,
                    resp_bh10: !1,
                    resp_bh19: !1,
                    resp_bh20: !1,
                    resp_bh11: !1,
                    resp_bh14: !1,
                    resp_bh12: !1,
                    resp_bh13: !1,
                    resp_bh15: !1,
                    resp_bh16: !1,
                    resp_bh17: !1,
                    resp_bh18: !1
                },
                pvp: {
                    pvp_planet: !0,
                    pvp_normal: !1,
                    pvp_Code: !0,
                    pvp_Code_multi: !1,
                    pvp_WI: !0,
                    pvp_WK: !0,
                    pvp_rr: !0,
                    pvp_god: !0,
                    pvp_demon: !0,
                    pvp_monke: !0,
                    pvp_buff_imp: !0,
                    pvp_buff_clan: !1,
                    pvp_bh1: !1
                },
                wanted: {
                    lpvm_g: !1,
                    lpvm_u: !1,
                    lpvm_s: !1,
                    lpvm_h: !0,
                    lpvm_m: !1,
                    lpvm_code: !0
                },
                res: {
                    res_code: !0,
                    res_b1: !1,
                    res_b2: !1
                },
                codes: {
                    code_multi: !1,
                    code_acc: !1,
                    code_zast: !1,
                    code_bh1: !1,
                    code_bh2: !1,
                    code_bh3: !1,
                    code_imp: !1,
                    code_clan: !1,
                    stat: 1,
                    duration: 1
                },
                spawn: {
                    ignore: [1, 1, 1, 1, 1, 1],
                    pa: 1000
                }
            };
            AFO.setSettings();
            const reborn = GAME?.char_data?.reborn;
            if (reborn >= 2 && reborn <= 6) {
                const classMap = {
                    2: 'lpvm_g',
                    3: 'lpvm_u',
                    4: 'lpvm_s',
                    5: 'lpvm_h',
                    6: 'lpvm_m'
                };
                const activeClass = classMap[reborn];
                ['lpvm_g', 'lpvm_u', 'lpvm_s', 'lpvm_h', 'lpvm_m'].forEach(cls => {
                    $(`.${cls} .lpvm_status`).removeClass("green").addClass("red").html("Off");
                });
                $(`.${activeClass} .lpvm_status`).removeClass("red").addClass("green").html("On");
                LPVM.Born = reborn;
            }
        };
        setTimeout(() => {
            AFO.setSettings();
        }, 250);
        createPanel();
        $("#pa_bar").val(RESP.pa_bar());
        $("#pvp_speed").val(PVP.pvp_speed());
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 50,
                type: 0,
                empire: GAME.char_data.empire
            });
        }, 300);
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 39,
                type: 0
            });
        }, 600);
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 39,
                type: 23
            });
        }, 900);
        setTimeout(() => {
            GAME.socket.emit('ga', {
                a: 39,
                type: 28
            });
        }, 1200);
        setTimeout(() => {
            GAME.ekw_page = 10;
            GAME.socket.emit('ga', {
                a: 12,
                page: 10,
                page2: GAME.ekw_page2,
                used: 1
            });
        }, 1500);
    
}, 10);
}