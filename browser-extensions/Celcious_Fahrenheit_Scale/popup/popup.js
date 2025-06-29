var slt = document.getElementById("clfrh");
slt.addEventListener("change",View);
var rng = document.getElementById("vl");
rng.addEventListener("input",vl);
var cls = document.getElementById("close");
cls.addEventListener("click",clsevnt);


function View(){       
    //Adding Celcious scale
    let i1 = 110;
    for(let i1 = 100;i1 >= -40;i1-=10){
        var ctr = document.createElement("tr");
        var scale1 = document.createTextNode(i1+"__");
        ctr.appendChild(scale1);
        document.getElementById("cnm").appendChild(ctr);
    }

    //Adding Fahrenheit Scale
    let i2 = 212;
    for(let i2 = 212;i2 >= -40;i2-=18){
        var ftr = document.createElement("tr");
        var scale2 = document.createTextNode(i2+"__");
        ftr.appendChild(scale2);
        document.getElementById("fnm").appendChild(ftr);
    }
    document.getElementById("Ctube").hidden = false;
    document.getElementById("Ftube").hidden = false;
    document.getElementById("clfrh").hidden = true;    
}


function vl(){
    //setting input values
    var v = document.getElementById("vl").value;
    var fill = 510/150;
    var mx = 370;
    
    if(document.getElementById("clfrh").value == "clTofh"){
        document.getElementById("vl").max = "100";
        sv = v;
        var fv = Number(v*9/5)+32;
        document.getElementById("op").value = v;
        document.getElementById("op1").value = fv;
    }else if(document.getElementById("clfrh").value == "fhTocl"){
        document.getElementById("vl").max = "212";
        sv = (v-32)*5/9;
        document.getElementById("op1").value = v;
        document.getElementById("op").value = sv;
    }else{

    }   
    var st = mx-sv*fill;
    
    var sh = st.toString();

    document.getElementById("Cfl").style.height = `${sh}px`;
    document.getElementById("Ffl").style.height = `${sh}px`;
    
}
function clsevnt(){
    window.close();
}