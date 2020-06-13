let log = null;
let logBtn = null;
const path = "wss://server.nextprev.yuseiito.com/";
let sock = null;
let reConnection = null; // Interval id

function sendNext() {
    sock.send("next");
    log.innerHTML += "Next<br/>";
}

function sendPrev() {
    sock.send("prev");
    log.innerHTML += "Prev<br/>";
}

function switchLogs() {
    if (log.style.display == "none") {
        log.style.display = "inline-block";
        logBtn.innerText = "-";
    } else {
        log.style.display = "none";
        logBtn.innerText = "+";
    }
}

function connect() {
    try {
        sock = new WebSocket(path);
        clearInterval(reConnection);
    } catch (e) {
        log.innerHTML +=
            '<span class="log error">[エラー]</span>WebSocket接続の確立に失敗しました<br/>';
        log.innerHTML += e;
        log.innerHTML += "<br/>";
    }
}

window.onload = function() {
    log = document.getElementById("log");
    logBtn = document.getElementById("expandLogs");

    connect();

    sock.addEventListener("open", function(e) {
        console.log("Socket connection suceed");
        log.innerHTML +=
            '<span class="log success">[成功]</span><code>' +
            path +
            "</code> へのWebsocket接続を確立しました。<br/>";

        const elements = document.getElementsByClassName("btn");
        for (const e of elements) {
            e.style.color = "hsl(141, 53%, 53%)";
        }
    });

    sock.addEventListener("close", function(e) {
        console.log("Socket disconnected.");
        log.innerHTML +=
            '<span class="log error">[エラー]</span>接続が切断されました<br/>';
        const elements = document.getElementsByClassName("btn");
        for (const e of elements) {
            e.style.color = "#555";
        }

        reConnection = setInterval(function() {
            connect();
        }, 3000);
    });
};