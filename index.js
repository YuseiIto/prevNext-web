const path = 'ws://server.nextprev.yuseiito.com/'
const sock = new WebSocket(path);

let log = null;
let logBtn = null;

window.onload = function() {
    log = document.getElementById('log');
    logBtn = document.getElementById('expandLogs');
}

sock.addEventListener('open', function(e) {
    console.log('Socket connection suceed');
    log.innerHTML += "Connection established to <code>" + path + "</code><br/>";
});

function sendNext() {
    sock.send('next');
    log.innerHTML += "Next<br/>";
}

function sendPrev() {
    sock.send('prev');
    log.innerHTML += "Prev<br/>";
}

function switchLogs() {
    if (log.style.display == 'none') {
        log.style.display = "inline-block";
        logBtn.innerText = "-"
    } else {
        log.style.display = "none";
        logBtn.innerText = "+"
    }
}