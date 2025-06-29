var onp = document.getElementById("open");
onp.addEventListener("click",notepad);
function notepad(){
    window.close();
    var url = chrome.extension.getURL("notepad/notepad.html");
    window.open(url,"","toolbar=no,menubar=no,titlebar=no,directories=no, status=no,  scrollbars=no, resizable=no,left=500, copyhistory=no, width=840, height=720");
}