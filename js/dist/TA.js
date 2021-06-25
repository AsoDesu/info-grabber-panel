"use strict";
var ip_inp = document.getElementById("ta-ip");
var pass_inp = document.getElementById("ta-pass");
var save_btn = document.getElementById("save");
var dis_btn = document.getElementById("disconnect");
ws.addEventListener("message", async (msg) => {
    var data = (await JSON.parse(msg.data));
    info = data;
    if ((data.taip && data.taip.failed) || !data.taip) {
        document.getElementById("card").classList.add("border-3", "border-danger");
        if (!data.taip)
            return;
    }
    else if (!data.taip.failed) {
        document.getElementById("card").classList.remove("border-3", "border-danger");
    }
    ip_inp.value = data.taip.ip;
    pass_inp.value = data.taip.password;
});
ip_inp.addEventListener("input", () => {
    save_btn.classList.remove("hidden");
});
pass_inp.addEventListener("input", () => {
    save_btn.classList.remove("hidden");
});
save_btn.addEventListener("click", () => {
    info.taip = {
        ip: ip_inp.value,
        password: pass_inp.value,
    };
    SendInfo();
    save_btn.classList.add("hidden");
});
dis_btn.addEventListener("click", () => {
    info.taip = {
        ip: "1",
        password: "1",
    };
    SendInfo();
    save_btn.classList.add("hidden");
    info.taip = {
        ip: ip_inp.value,
        password: pass_inp.value,
    };
});
