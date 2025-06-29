document.getElementById("re").addEventListener("click",reset);
document.getElementById("nm").addEventListener("click",newmatch);
document.getElementById("a1").addEventListener("click",function(){play('a1')});
document.getElementById("a2").addEventListener("click",function(){play('a2')});
document.getElementById("a3").addEventListener("click",function(){play('a3')});
document.getElementById("b1").addEventListener("click",function(){play('b1')});
document.getElementById("b2").addEventListener("click",function(){play('b2')});
document.getElementById("b3").addEventListener("click",function(){play('b3')});
document.getElementById("c1").addEventListener("click",function(){play('c1')});
document.getElementById("c2").addEventListener("click",function(){play('c2')});
document.getElementById("c3").addEventListener("click",function(){play('c3')});
document.getElementById("nameSubmit").addEventListener("click",remove);

var turn = 0;
var scoring = true;
function play(vl){
    var i = turn%2;
    if(i===0){
        document.getElementById(vl).value = "X";
        turn++;
    }if(i===1){
        document.getElementById(vl).value = "O";
        turn--;
    }
    document.getElementById(vl).disabled = true;
    var v1,v2,v3,v4,v5,v6,v7,v8,v9;
    v1 = document.getElementById("a1").value;
    v2 = document.getElementById("a2").value;
    v3 = document.getElementById("a3").value;
    v4 = document.getElementById("b1").value;
    v5 = document.getElementById("b2").value;
    v6 = document.getElementById("b3").value;
    v7 = document.getElementById("c1").value;
    v8 = document.getElementById("c2").value;
    v9 = document.getElementById("c3").value;
    pt1 = document.getElementById("pl1");
    pt2 = document.getElementById("pl2");

    if((v1===v2 && v2===v3 && v3==='X') || (v4===v5 && v5===v6 && v6==='X') || (v7===v8 && v8===v9 && v9==='X') || (v1===v4 && v4===v7 && v7==='X') || (v2===v5 && v5===v8 && v8==='X') || (v3===v6 && v6===v9 && v9==='X') || (v1===v5 && v5===v9 && v9==='X') || (v3===v5 && v5===v7 && v7==='X')){
        if(scoring==true){
            pt1.value = Number(pt1.value)+1 ;
        }
        scoring = false;
    }
    if((v1===v2 && v2===v3 && v3==='O') || (v4===v5 && v5===v6 && v6==='O') || (v7===v8 && v8===v9 && v9==='O') || (v1===v4 && v4===v7 && v7==='O') || (v2===v5 && v5===v8 && v8==='O') || (v3===v6 && v6===v9 && v9==='O') || (v1===v5 && v5===v9 && v9==='O') || (v3===v5 && v5===v7 && v7==='O')){
        if(scoring == true){
            pt2.value = Number(pt2.value)+1;
        }
        scoring = false;
    }
}
function reset(){
    turn = 0;
    scoring = true;
    var inputs = ["a1","a2","a3","b1","b2","b3","c1","c2","c3"]
    for(let x=0;x < inputs.length;x++){
        document.getElementById(inputs[x]).value = ' ';
        document.getElementById(inputs[x]).disabled = false;
    }

}
function newmatch(){
    reset();
    document.getElementById("pl1").value = "";
    document.getElementById("pl2").value = "";
    document.getElementById("name").hidden = false;
}
function remove(){
    var x = document.getElementById("player1").value;
    var y = document.getElementById("player2").value;

    if(x=='' && y==''){
        document.getElementById("lb1").innerText = "Player1 : ";
        document.getElementById("lb2").innerText = "Player2 : ";
        
    }else if(x==''){
        document.getElementById("lb1").innerText = "Player1 : ";
        document.getElementById("lb2").innerText = y +" : ";
    }else if(y==''){
        document.getElementById("lb2").innerText = "Player2 : ";
        document.getElementById("lb1").innerText = x +" : ";
    }else{
        document.getElementById("lb1").innerText = x +" : ";
        document.getElementById("lb2").innerText = y +" : ";
    }
    document.getElementById("name").hidden = true;
    
}