const path = 'ws://nextprev.yuseiito.com/'
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