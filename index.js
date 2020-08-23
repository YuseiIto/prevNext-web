let log = null;
let logBtn = null;
const path = "wss://server.prevnext.yuseiito.com/";
let sock = null;
let reConnection = null; // Interval id

function sendNext() {
  sock.send("next#" + spaceId);
  log.innerHTML += "Next<br/>";
}

function sendPrev() {
  sock.send("prev#" + spaceId);
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

function setSpaceId() {
  spaceId = document.getElementById("spaceId").value;
  log.innerHTML +=
    '<span class="log success">[成功]</span>スペースIDが<code>' +
    spaceId +
    "</code>に設定されました。<br/>";
}

function issueSpaceId() {
  const sid = String(Math.floor(Math.random() * 9999)).padStart(4);
  document.getElementById("spaceId").value = sid;
  setSpaceId();
  return sid;
}

function getUrlQueries() {
  var queryStr = window.location.search.slice(1); // 文頭?を除外
  queries = {};

  // クエリがない場合は空のオブジェクトを返す
  if (!queryStr) {
    return queries;
  }

  // クエリ文字列を & で分割して処理
  queryStr.split("&").forEach(function (queryStr) {
    // = で分割してkey,valueをオブジェクトに格納
    var queryArr = queryStr.split("=");
    queries[queryArr[0]] = queryArr[1];
  });

  return queries;
}

window.onload = function () {
  log = document.getElementById("log");
  logBtn = document.getElementById("expandLogs");

  issueSpaceId();

  const query = getUrlQueries();
  spaceId = query.spaceId;
  connect();

  sock.addEventListener("open", function (e) {
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

  sock.addEventListener("close", function (e) {
    console.log("Socket disconnected.");
    log.innerHTML +=
      '<span class="log error">[エラー]</span>接続が切断されました<br/>';
    const elements = document.getElementsByClassName("btn");
    for (const e of elements) {
      e.style.color = "#555";
    }

    reConnection = setInterval(function () {
      connect();
    }, 3000);
  });
};
