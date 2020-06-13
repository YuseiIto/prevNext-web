const path = 'ws://server.nextprev.yuseiito.com/'
const sock = new WebSocket(path);

let log = null;

window.onload = function() {
    log = document.getElementById('log')
}

sock.addEventListener('open', function(e) {
    console.log('Socket connection suceed');
    log.innerHTML += "Connection established to <code>" + path + "</code><br/>"
});

function sendNext() {
    sock.send('next');
    log.innerHTML += "Next<br/>"
}

function sendPrev() {
    sock.send('prev');
    log.innerHTML += "Prev<br/>"
}