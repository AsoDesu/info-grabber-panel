var bootstrap: any;

var ws = new WebSocket("ws://127.0.0.1:81");

ws.addEventListener("error", () => {
	var ErrorModal = new bootstrap.Modal(document.getElementById("ErrorModal"), {});
	ErrorModal.toggle();
});

ws.addEventListener("close", () => {
	var ErrorModal = new bootstrap.Modal(document.getElementById("ErrorModal"), {});
	ErrorModal.toggle();
});

var info: infoFile;

function SendInfo() {
	ws.send(JSON.stringify(info));
}
