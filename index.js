const path = 'ws://127.0.0.1:50000'
const sock = new WebSocket(path);

sock.addEventListener('open', function(e) {
    console.log('Socket connection suceed');
});

function sendNext() {
    sock.send('next');
}

function sendPrev() {
    sock.send('prev');
}