document.getElementById("run").addEventListener("click",Run);
document.getElementById("save").addEventListener("click",saveAs);
document.getElementById("mode").addEventListener("click",changeMode);
document.getElementById("format").addEventListener("click",format);
document.getElementById("show_code").addEventListener("click",showcode);
document.getElementById("show_result").addEventListener("click",showresult);
document.getElementById("both").addEventListener("click",showboth);

function Run(){
    //var code = document.getElementById("code");
   // var js_code = document.getElementById("js_code");
    //let s = document.createElement('script');
    //s.textContent = js_code.value;
    //(document.head || document.documentElement).appendChild(s);
    var  frm = document.getElementById("output");
    var output = frm.contentWindow.document || frm.contentDocument.document;
    output.open();
    output.writeln(code.value);
    //output.getElementsByTagName("body")[0].appendChild(s)
    output.close();
}
function showcode(){
    document.getElementById("code").style.display = "initial";
    document.getElementById("output").style.display = "none";
    document.getElementById("code").style.width = "97%";
}
function showresult(){
    document.getElementById("output").style.display = "initial";
    document.getElementById("code").style.display = "none";
    document.getElementById("output").style.left = "1%";
    document.getElementById("output").style.width = "97%";
}
function showboth(){
    document.getElementById("output").style.display = "initial";
    document.getElementById("code").style.display = "initial";
    document.getElementById("code").style.width = "48%";
    document.getElementById("output").style.left = "51%";
    document.getElementById("output").style.width = "48%";
}
function format(){
    document.getElementById("code").style.whiteSpace = "pre";
}
function changeMode(){
    var txtmd = document.getElementById("mode");
    if(txtmd.innerText == "◑"){
        document.body.style.backgroundColor = "black";
        document.getElementById("code").style.backgroundColor = "rgb(32, 39, 47)";
        document.getElementById("code").style.color = "white";
        txtmd.innerText = "◐";
    }else if(txtmd.innerText == "◐"){
        document.body.style.backgroundColor = " rgba(150, 150, 150, 0.376)";
        document.getElementById("code").style.backgroundColor = "white";
        document.getElementById("code").style.color = "black";
        txtmd.innerText = "◑";       
    }

}
function saveAs(){
    var text = document.getElementById("code").value;
    var filename = "demo";
    download(filename,text);
}
function download(file,text){
    var element = document.createElement('a'); 
    element.setAttribute('href', 
    'data:text/html;charset=utf-8, ' 
    + encodeURIComponent(text)); 
    element.setAttribute('download', file); 

    document.body.appendChild(element); 
    element.click(); 

    document.body.removeChild(element); 
}