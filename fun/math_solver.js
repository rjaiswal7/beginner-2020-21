function show(tab){
let el = document.getElementsByClassName("tab_box");
for(let i=0;i < el.length;i++){
el[i].style.display = "none";
}
document.getElementById(tab).style.display="block";
}
//for checking input
function validate_values(x){
let r=true;
for(let i=0;i<x.length;i++){
   if(x[i]<=0){
      r = false;
    }
}
return r;
}

//for calculating area
function calcArea(){
let area = 0;
let vl = document.getElementById("area_inp").value;
let ar_shp = document.getElementById("area_shape").value;
vl = vl.split(",");
if(validate_values(vl)){
let shape = {
	"eq_tri":{
	area:function(args){
	let a = Number(args[0]);
	return Math.sqrt(3)*a*a/4;
	}},
	"sc_tri":{
	area:function(args){
	let a=Number(args[0]),b=Number(args[1]),c=Number(args[2]),s = (a+b+c)/2;
	return Math.sqrt(s*(s-a)*(s-b)*(s-c));
	}},
	"sqr":{
	area:function(args){
	let a = Number(args[0]);
	return a*a;
	}},
	"rect":{
	area:function(args){
	let l = Number(args[0]),b=Number(args[1]);
	return l*b;
	}}
}
area = isNaN(shape[ar_shp].area(vl))?0:shape[ar_shp].area(vl);
}
document.getElementById("area_result").innerText="Area = "+area;
}
//for calculating Perimeter
function calcPeri(){
let peri = 0;
let vl = document.getElementById("peri_inp").value;
let pr_shp = document.getElementById("peri_shape").value;
vl = vl.split(",");
if(validate_values(vl)){
let shape = {
	"eq_tri":{
	peri:function(args){
	let a = Number(args[0]);
	return 3*a;
	}},
	"sc_tri":{
	peri:function(args){
	let a=Number(args[0]),b=Number(args[1]),c=Number(args[2]),s = a+b+c;
	return s;
	}},
	"sqr":{
	peri:function(args){
	let a = Number(args[0]);
	return 4*a;
	}},
	"rect":{
	peri:function(args){
	let l = Number(args[0]),b=Number(args[1]);
	return (l+b)*2;
	}}
}
peri = isNaN(shape[pr_shp].peri(vl))?0:shape[pr_shp].peri(vl);
}
document.getElementById("peri_result").innerText="Perimeter = "+peri;
}

//for calculating volume
function calcVol(){
let vol = 0;
let vl = document.getElementById("vol_inp").value;
let vol_shp = document.getElementById("vol_shape").value;
vl = vl.split(",");
if(validate_values(vl)){
let shape = {
	"cube":{
	vol:function(args){
	let a = Number(args[0]);
	return a*a*a;
	}},
	"cuboid":{
	vol:function(args){
	let a=Number(args[0]),b=Number(args[1]),c=Number(args[2]),s = a*b*c;
	return s;
	}},
	"sphere":{
	vol:function(args){
	let a = Number(args[0]);
	return Math.PI*4*a*a*a/3;
	}},
	"hm_sphere":{
	vol:function(args){
	let a = Number(args[0]);
	return Math.PI*2*a*a*a/3;
	}},
	"cyln":{
	vol:function(args){
	let r = Number(args[0]),h=Number(args[1]);
	return Math.PI*r*r*h;
	}}
}
vol = isNaN(shape[vol_shp].vol(vl))?0:shape[vol_shp].vol(vl);
}
document.getElementById("vol_result").innerText="Volume = "+vol;
}


//for calculating surface area
function calcSurfArea(){
let surf_area = 0;
let vl = document.getElementById("surf_area_inp").value;
let surf_shp = document.getElementById("surf_area_shape").value;
vl = vl.split(",");
if(validate_values(vl)){
let shape = {
	"cube":{
	surf_area:function(args){
	let a = Number(args[0]);
	return 6*a*a;
	}},
	"cuboid":{
	surf_area:function(args){
	let a=Number(args[0]),b=Number(args[1]),c=Number(args[2]);
	s = 2*(a*b+b*c+c*a);
	return s;
	}},
	"sphere":{
	surf_area:function(args){
	let a = Number(args[0]);
	return Math.PI*4*a*a;
	}},
	"hm_sphere_hl":{
	surf_area:function(args){
	let a = Number(args[0]);
	return Math.PI*2*a*a;
	}},
	"hm_sphere_sl":{
	surf_area:function(args){
	let a = Number(args[0]);
	return Math.PI*3*a*a;
	}},
	"cyln_hl":{
	surf_area:function(args){
	let r = Number(args[0]),h=Number(args[1]);
	return Math.PI*r*h*2;
	}},
	"cyln_sl":{
	surf_area:function(args){
	let r = Number(args[0]),h=Number(args[1]);
	return Math.PI*r*2(h+r);
	}}
}

surf_area = isNaN(shape[surf_shp].surf_area(vl))?0:shape[surf_shp].surf_area(vl);
}
document.getElementById("surf_area_result").innerText="Surface Area = "+surf_area;
}

//for calculating no of diagonals
function calcDigNo(el){
let s = el.value;
let d = s*(s-3)/2;
d = isNaN(d) || s<4?0:d;
document.getElementById('dig_no_result').innerText="No. of Diagonals = "+d;
}

//for seperating text and no from a string
function get_no_txt(vl){
let v=vl.split(""),n="",t="";
for(let i=0;i<v.length;i++){
if(!isNaN(Number(v[i]))){
n+=v[i];
}
}
t = vl.replace(n,"");
 return [n,t]
}

//for calculating (a+b)^2
function calc_apb_sq(){
let vl = document.getElementById('apb_sq_inp').value.replaceAll(" ","");
if(vl!=="" && vl.includes("+")){
vl = vl.split("+");
let v1 = get_no_txt(vl[0]);
let v2 = get_no_txt(vl[1]);
let n1 = v1[0]===""?1: Number(v1[0]);
let n2 = v2[0]===""?1:Number(v2[0]);
let a = v1[1];
let b = v2[1];
let ab = 2*n1*n2;

n1 = n1===1 && a!==""?"":n1*n1;
n2 = n2===1 && b!==""?"":n2*n2;
let result = `${n1}${a}${a===""?"":"<sup>2</sup>"} + ${ab}${a+b} + ${n2}${b}${b===""?"":"<sup>2</sup>"}`;
document.getElementById('apb_sq_result').innerHTML = result;
}
}


//for calculating (a+b+c)^2
function calc_abc_sq(){
vl = document.getElementById('abc_sq_inp').value.replaceAll(" ","");
if(vl!=="" && vl.includes("+")){
vl = vl.split("+");
let v1 = get_no_txt(vl[0]);
let v2 = get_no_txt(vl[1]);
let v3 = get_no_txt(vl[2]);
let n1 = v1[0]===""?1:Number(v1[0]);
let n2 = v2[0]===""?1:Number(v2[0]);
let n3 = v3[0]===""?1:Number(v3[0]);
let a = v1[1],b = v2[1],c=v3[1];
let ab = 2*n1*n2,bc = 2*n2*n3,ca=2*n3*n1;

n1 = n1===1 && a!==""?"":n1*n1;
n2 = n2===1 && b!==""?"":n2*n2;
n3 = n3===1 && c!==""?"":n3*n3;

let result = `${n1}${a}${a===""?"":"<sup>2</sup>"} + ${n2}${b}${b===""?"":"<sup>2</sup>"} + ${n3}${c}${c===""?"":"<sup>2</sup>"} + ${ab}${a+b} + ${bc}${b+c} + ${ca}${c+a}`;
document.getElementById('abc_sq_result').innerHTML = result;
}
}


//for calculating (a-b)^2
function calc_amb_sq(){
let vl = document.getElementById('amb_sq_inp').value.replaceAll(" ","");
if(vl!=="" && vl.includes("-")){
vl = vl.split("-");
let v1 = get_no_txt(vl[0]);
let v2 = get_no_txt(vl[1]);
let n1 = v1[0]===""?1: Number(v1[0]);
let n2 = v2[0]===""?1:Number(v2[0]);
let a = v1[1];
let b = v2[1];
let ab = 2*n1*n2;

n1 = n1===1 && a!==""?"":n1*n1;
n2 = n2===1 && b!==""?"":n2*n2;
let result = `${n1}${a}${a===""?"":"<sup>2</sup>"} - ${ab}${a+b} + ${n2}${b}${b===""?"":"<sup>2</sup>"}`;
document.getElementById('amb_sq_result').innerHTML = result;
}
}


//for calculating Linear equation
function calc_ln_eq(){
let vl = document.getElementById('ln_eq_inp').value.replaceAll(" ","");
if(vl!=="" && vl.includes("=")){
vl = vl.split("=");
let lf = vl[0];
let rg = vl[1];
let fo1 =  fox(lf,"1")-fox(rg,"1");
let fo_1 = fox(lf,"(-1)")-fox(rg,"(-1)");
let b = (fo1+fo_1)/2;
let a = (fo1-fo_1)/2;
let x = (-1)*b/a;
let result = `x = ${x}`;
document.getElementById('ln_eq_result').innerHTML = result;
}
}

//calculating f(x)
function fox(vl,x){
let v = vl.replaceAll("+x","+1x");
v = v.replaceAll("-x","-1x");
v = v.replaceAll("*x","*1x");
v = v.replaceAll("/x","/1x");
v = v.replaceAll("(x","(1x");
v = v.replaceAll("{x","{1x");
v = v.replaceAll("[x","[1x");
if(v.indexOf("x")===0){
v = v.replace("x","1x");
}
v = v.replaceAll("x","*"+x);

v = eval(v);
return v;

}





//calculating trigonometry values
function calcTrig(){
let vl = document.getElementById('trig_inp').value;
let func = document.getElementById('trig_func').value;

let result = Math[func](Math.PI/180*vl).toFixed(2);
document.getElementById('trig_result').innerHTML = result;
} 


//calculating inverse trigonometry values
function calcInvTrig(){
let vl = document.getElementById('inv_trig_inp').value;
let func = document.getElementById('inv_trig_func').value;

let result = Math[func](vl);
result = result*180/Math.PI
document.getElementById('inv_trig_result').innerHTML = result;
} 