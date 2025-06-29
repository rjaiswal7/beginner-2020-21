document.getElementById("inmd").addEventListener("click",inpm);
document.getElementById("fsr").addEventListener("change",changefontsize);
document.getElementById("font_family").addEventListener("change",changefontfamily);
document.getElementById("font_transform").addEventListener("change",caseConvert);
document.getElementById("cls").addEventListener("click",clean);
document.getElementById("font_color").addEventListener("input",changeColor);
/*saving file as file.txt */
function download(file, text,format) {
    let data_type = {
        'txt': 'data:text/plain;charset=utf-8,',
        'html': 'data:text/html;charset=utf-8,',
        'csv' : 'data:text/csv;charset=utf-8,',
        'doc' : 'data:application/vnd.ms-word;charset=utf-8,'
    }
    if(text.trim()==""){ 
        alert("note is empty!");
    }else{
        let element = document.createElement('a'); 
        element.setAttribute('href', 
        data_type[format]
        + encodeURIComponent(text)); 
        element.setAttribute('download', file); 
        document.body.appendChild(element); 
        element.click(); 
        document.body.removeChild(element); 
    }
} 
document.getElementById("btn") 
.addEventListener("click", function() {
    let text_format = {
        'txt' : document.getElementById("text").innerText,
        'html' : `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>${document.getElementById("text").innerHTML}</body></html>`,
        'doc'  :  `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Doc</title></head><body>${document.getElementById("text").innerHTML}</body></html>`,
        'csv' : document.getElementById("text").innerText
    }
    let format = document.getElementById("file_format").value;
    let text = text_format[format] ;
    let filename = {
        'txt':'note.txt',
        'html': 'note.html',
        'doc': 'note.doc',
        'csv' : 'note.csv'
    } 
    download(filename[format], text,format); 
}, false);

/*changing font size */
function changefontsize(){
    let fs = document.getElementById("fsr").value+"px";
    changeText('font-size',fs);
}

/*changing font family */
function changefontfamily(){
    let ff = document.getElementById("font_family").value;
    changeText('font-family',ff);
}

/*changing font case */
function caseConvert(){
    let cc = document.getElementById("font_transform").value;
    changeText('text-transform',cc);
}
//change font color
function changeColor(){
    let clr = document.getElementById("font_color").value;
    changeText('color',clr);
}

/*changing display mode*/
function inpm(){
    let txtmd = document.getElementById("inmd");
    if(txtmd.value == "Dark Mode"){
        document.getElementById("txtbdy").style.backgroundColor = "rgb(12, 9, 9)";
        document.getElementById("txtbdy").style.color = "white";
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        txtmd.value = "Light Mode";
    }else if(txtmd.value == "Light Mode"){
        document.getElementById("txtbdy").style.backgroundColor = "white";
        document.getElementById("txtbdy").style.color = "black";
        document.body.style.backgroundColor = "rgb(179, 179, 179)";
        document.body.style.color = "black";
        txtmd.value = "Dark Mode";       
    }

}
/*clearing text*/
function clean(){
    document.getElementById("text").innerText = "";
}
function changeText(style,vl){
    let sel; 
    if(window.getSelection){
        sel = window.getSelection();
    }else if(document.getSelection){
        sel = document.getSelection();
    }
    if (sel.rangeCount) {
        
        let e = document.createElement('span');
        e.style = `${style}:${vl};`;
        e.innerHTML = sel.toString();
                        
        let range = sel.getRangeAt(0);
        range.deleteContents(); 
        range.insertNode(e); 
    }else{
        document.getElementById("text").style = `${style}:${vl};`;
    }
}
