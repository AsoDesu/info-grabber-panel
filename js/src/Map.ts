var code = document.getElementById("song-code") as HTMLInputElement;

var save_btn = document.getElementById("save") as HTMLButtonElement;
var open_btn = document.getElementById("open") as HTMLButtonElement;
var load_btn = document.getElementById("load") as HTMLButtonElement;
var diff_btn = document.getElementById("difficulty-btn") as HTMLButtonElement;

var diffBtns = document.getElementsByClassName("diff-btn") as HTMLCollectionOf<HTMLButtonElement>;

hideAllInContainer("diff-menu");

code.addEventListener("input", (e) => {
	if (code.value.includes("!bsr")) {
		code.value = code.value.replaceAll(" ", "").replaceAll("!bsr", "");
	} else if ("beatsaver.com") {
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
	if (!info.song) info.song = { bsr: "", diff: "" };
	info.song.bsr = code.value;
	info.song.diff = !diff_btn.innerText.includes("Difficulty") ? diff_btn.innerText : "";
	SendInfo();

	save_btn.classList.add("hidden");
});

open_btn.addEventListener("click", () => {
	window.open(`https://beatsaver.com/beatmap/${code.value}`);
});

load_btn.addEventListener("click", async () => {
	LoadMap(code.value);
});

for (let i = 0; i < diffBtns.length; i++) {
	console.log(diffBtns[i]);
	diffBtns[i].addEventListener("click", () => {
		diff_btn.innerHTML = diffBtns[i].innerHTML;
		save_btn.classList.remove("hidden");
	});
}

ws.addEventListener("message", async (msg) => {
	var data = (await JSON.parse(msg.data)) as infoFile;
	if (!info && data.song && data.song.bsr) {
		info = data;
		if (data.song.failed) {
			document.getElementById("card").classList.add("border-3", "border-danger");
		}
		LoadMap(data.song.bsr);
	}
	info = data;

	if (info.song && info.song.bsr) {
		code.value = info.song.bsr;
	}
});

async function LoadMap(id: string) {
	document.getElementById("card").classList.remove("border-3", "border-danger");
	var MapData = (await (await fetch(`https://beatsaver.com/api/maps/detail/${id}`)).json().catch(() => {
		document.getElementById("card").classList.add("border-3", "border-danger");
		return null;
	})) as BSMap;

	if (MapData == null) return;

	var diffs = MapData.metadata.difficulties;
	hideAllInContainer("diff-menu");

	if (diffs.easy) {
		show("e");
	}
	if (diffs.normal) {
		show("n");
	}
	if (diffs.hard) {
		show("h");
	}
	if (diffs.expert) {
		show("ex");
	}
	if (diffs.expertPlus) {
		show("exp");
	}
}

function show(id: string) {
	document.getElementById(id).classList.remove("hidden");
}

function hideAllInContainer(id: string) {
	var container = document.getElementById(id);
	for (let i = 0; i < container.children.length; i++) {
		container.children[i].classList.add("hidden");
	}
}
