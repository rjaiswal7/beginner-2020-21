document.getElementById("edit").addEventListener("click",editmode);
document.getElementById("normal").addEventListener("click",normalMode);

/*editing mode */
function editmode(){
    chrome.tabs.executeScript(null,{
        code:"document.body.contentEditable=true;document.designMode='on';document.body.spellcheck=false;"

    });
    window.close();
}
/*disable editing mode or normal mode */
function normalMode(){
    chrome.tabs.executeScript(null,{
        code:"document.body.contentEditable=false;document.designMode='off';"

    });
    window.close();
}
