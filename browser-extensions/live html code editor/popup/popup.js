document.getElementById("btn").addEventListener("click",openeditor);

function openeditor(){
    window.close();
    var wd = screen.width-200;
    var ht = screen.height-100;
    var url = chrome.extension.getURL("editor/editor.html");
    window.open(url,"",`scrollbar=no,toolbar=no,menubar=no,titlebar=no,directories=no,status=no,copyhistory=no,left=100px,width=${wd},height=${ht}`);
}