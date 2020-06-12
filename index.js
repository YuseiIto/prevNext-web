const path = 'ws://nextprev.yuseiito.com/'
const sock = new WebSocket(path);

let log = null;

window.onload = function() {
    log = document.getElementById('log')
}

sock.addEventListener('open', function(e) {
    console.log('Socket connection suceed');
    log.innerHTML += "Connection established\n"
});

function sendNext() {
    sock.send('next');
}

function sendPrev() {
    sock.send('prev');
}