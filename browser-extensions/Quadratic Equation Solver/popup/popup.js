let btn = document.getElementById("btn");
let clbtn = document.getElementById("close");
btn.addEventListener("click",calc);
clbtn.addEventListener("click",cls);
function calc(){
    var a,b,c,rts,ft,r1,r2;
    a = document.getElementById('x1').value;
    b = document.getElementById('x2').value;
    c = document.getElementById('n').value;
    r1 = document.getElementById('root1');
    r2 = document.getElementById('root2');
    ft = document.getElementById('fctrs');
    rts = Math.sqrt(b**2-4*a*c);
    d = (rts-b)/(2*a);
    e = (-rts-b)/(2*a);              
    r1.value = parseFloat(d.toFixed(2));
    r2.value = parseFloat(e.toFixed(2));
    
    if(r1.value>0 && r2.value>0){
        ft.value = '('+'X'+r1.value*(-1)+')'+'('+'X'+r2.value*(-1)+')';
    }
    else if(r1.value<0 && r2.value<0){
        ft.value = '('+'X+'+r1.value*(-1)+')'+'('+'X+'+r2.value*(-1)+')';
    }
    else if(r1.value>0 && r2.value<0){
        ft.value = '('+'X'+r1.value*(-1)+')'+'('+'X+'+r2.value*(-1)+')';
    }
    else if(r1.value<0 && r2.value>0){
        ft.value = '('+'X+'+r1.value*(-1)+')'+'('+'X'+r2.value*(-1)+')';
    }
    else if(r1.value == 0 && r2.value == 0 ){
        ft.value = 'X^2';
    }else if(r1.value == 0 && r2.value !==0){
        if(r2.value > 0){
            ft.value = 'X(X'+r2.value*(-1)+')';
        }else{
            ft.value = 'X(X+'+r2.value*(-1)+')';
        }
    }else if(r2.value == 0 && r1.value !==0){
        if(r1.value > 0){
            ft.value = 'X(X'+r1.value*(-1)+')';
        }else{
            ft.value = 'X(X+'+r1.value*(-1)+')';
        }
    }
    if(a != 1){
        ft.value = a+ft.value;
    }
    if(a=='' || a==0){
        alert("It is not a quadratic equation");
        r1.value = '';
        r2.value = '';
        ft.value = '';
    }
    if(isNaN(r1.value) || isNaN(r2.value)){
        alert("This equation doesn't have real roots!")
        r1.value = '';
        r2.value = '';
        ft.value = '';
    }
}
function cls(){
    window.close();
}