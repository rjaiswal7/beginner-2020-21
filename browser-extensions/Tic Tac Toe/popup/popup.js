document.getElementById("btn").addEventListener("click",tictactoewin);
function tictactoewin(){
    window.close();
    var url = chrome.extension.getURL("tictactoe/tictactoe.html");
    window.open(url,"","toolbar=no,menubar=no,titlebar=no,directories=no, status=no,  scrollbars=no, resizable=no,left=500, copyhistory=no, width=720, height=720");
}