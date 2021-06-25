"use strict";
var panelPlayers = document.getElementById("players");
var temp = document.getElementById("template");
var template = temp.outerHTML;
panelPlayers.removeChild(temp);
var ClipboardJS;
new ClipboardJS(".btn");
ws.addEventListener("message", async (msg) => {
    var data = (await JSON.parse(msg.data));
    info = data;
    var players = data.players;
    var html = "";
    panelPlayers.innerHTML = "";
    players.forEach((p) => {
        var index = players.indexOf(p);
        html = template
            .replace("%scoresaber%", p.id)
            .replace("%twitch%", p.twitch)
            .replaceAll("%i%", index.toString())
            .replace("%border%", p.failed && p.failed == true ? "border-3 border-danger" : "");
        panelPlayers.insertAdjacentHTML("beforeend", html);
        var saveBtn = document.getElementById(`save-${index}`);
        var removeBtn = document.getElementById(`remove-${index}`);
        var ss = document.getElementById(`ss-${index}`);
        var twitch = document.getElementById(`twitch-${index}`);
        ss.addEventListener("input", () => {
            if (ss.value.includes("scoresaber.com")) {
                ss.value = ss.value
                    .replaceAll("https", "")
                    .replaceAll("http", "")
                    .replaceAll(":", "")
                    .replaceAll("/", "")
                    .replaceAll("u", "")
                    .replaceAll(".", "")
                    .replaceAll("scoresabercom", "")
                    .replaceAll("new", "");
            }
            saveBtn.classList.remove("hidden");
        });
        twitch.addEventListener("input", () => saveBtn.classList.remove("hidden"));
        saveBtn.addEventListener("click", () => {
            players[index] = {
                id: ss.value,
                twitch: twitch.value,
            };
            var data = { players };
            ws.send(JSON.stringify(data));
        });
        removeBtn.addEventListener("click", () => {
            console.log(index);
            players.splice(index, 1);
            var data = { players };
            ws.send(JSON.stringify(data));
        });
    });
});
document.getElementById("add").addEventListener("click", () => {
    info.players.push({ id: "", twitch: "" });
    var data = { players: info.players };
    ws.send(JSON.stringify(data));
});
