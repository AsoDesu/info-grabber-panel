"use strict";
var code = document.getElementById("song-code");
var save_btn = document.getElementById("save");
var open_btn = document.getElementById("open");
var load_btn = document.getElementById("load");
code.addEventListener("input", (e) => {
    if (code.value.includes("!bsr")) {
        code.value = code.value.replaceAll(" ", "").replaceAll("!bsr", "");
    }
    else if ("beatsaver.com") {
        code.value = code.value
            .replaceAll("https", "")
            .replaceAll("http", "")
            .replaceAll(":", "")
            .replaceAll("/", "")
            .replaceAll(".", "")
            .replaceAll("beatsavercom", "")
            .replaceAll("beatmap", "");
    }
    save_btn.classList.remove("hidden");
});
save_btn.addEventListener("click", (e) => {
    if (!info.song)
        info.song = { bsr: "", diff: "" };
    info.song.bsr = code.value;
    SendInfo();
    save_btn.classList.add("hidden");
});
open_btn.addEventListener("click", () => {
    window.open(`https://beatsaver.com/beatmap/${code.value}`);
});
ws.addEventListener("message", async (msg) => {
    var data = (await JSON.parse(msg.data));
    if (!info && data.song && data.song.bsr) {
        info = data;
        if (data.song.failed) {
            document.getElementById("card").classList.add("border-3", "border-danger");
        }
    }
    info = data;
    if (info.song && info.song.bsr) {
        code.value = info.song.bsr;
    }
});
