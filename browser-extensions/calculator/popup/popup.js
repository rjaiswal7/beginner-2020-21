/*adding functions to inputs */

document.getElementById("cls").addEventListener("click",cls);
document.getElementById("solve").addEventListener("click",solve);
document.getElementById("cut").addEventListener("click",cut);
document.getElementById("sqrt").addEventListener("click",sqrRt);
document.getElementById("div").addEventListener("click",function(){insert('/')});
document.getElementById("mp").addEventListener("click",function(){insert('*')});
document.getElementById("mn").addEventListener("click",function(){insert('-')});
document.getElementById("pl").addEventListener("click",function(){insert('+')});
document.getElementById("dt").addEventListener("click",function(){insert('.')});
document.getElementById("one").addEventListener("click",function(){insert('1')});
document.getElementById("two").addEventListener("click",function(){insert('2')});
document.getElementById("thr").addEventListener("click",function(){insert('3')});
document.getElementById("fr").addEventListener("click",function(){insert('4')});
document.getElementById("fv").addEventListener("click",function(){insert('5')});
document.getElementById("sx").addEventListener("click",function(){insert('6')});
document.getElementById("sv").addEventListener("click",function(){insert('7')});
document.getElementById("et").addEventListener("click",function(){insert('8')});
document.getElementById("nn").addEventListener("click",function(){insert('9')});
document.getElementById("zr").addEventListener("click",function(){insert('0')});
document.getElementById("dbzr").addEventListener("click",function(){insert('00')});

/*adding numbers */
function insert(v){
    var op = document.getElementById("opbx");
    if(op.value==0){
        op.value='';
    }
        op.value+=v;          
}

/*square root */
function sqrRt(){
    let el = document.getElementById('opbx');
    el.value = Math.sqrt(calculate(parseCalculationString(el.value)));
}

/*deleting last number */
function cut(){
    var op = document.getElementById('opbx');
    var vl = String(op.value);
    var lst_term = vl.length-1;
    op.value = vl.slice(0,lst_term);
    if(op.value == ''){
        op.value = 0;
    }
    
}

/*clearing textbox */
function cls(){
    document.getElementById("opbx").value = 0;
}

/*calculating*/
function solve(){
    var op = document.getElementById("opbx");
    if(op.value==""){
        op.value = "0";
    }else if(op.value == undefined ){
        op.value = "error!";
    }else{
        op.value = calculate(parseCalculationString(op.value));
    }
}

//evaluating expression
function parseCalculationString(s) {
    // --- Parse a calculation string into an array of numbers and operators
    var calculation = [],
        current = '';
    for (var i = 0, ch; ch = s.charAt(i); i++) {
        if ('^*/+-'.indexOf(ch) > -1) {
            if (current == '' && ch == '-') {
                current = '-';
            } else {
                calculation.push(parseFloat(current), ch);
                current = '';
            }
        } else {
            current += s.charAt(i);
        }
    }
    if (current != '') {
        calculation.push(parseFloat(current));
    }
    return calculation;
}

function calculate(calc) {
    // --- Perform a calculation expressed as an array of operators and numbers
    var ops = [{'^': (a, b) => Math.pow(a, b)},
               {'*': (a, b) => a * b, '/': (a, b) => a / b},
               {'+': (a, b) => a + b, '-': (a, b) => a - b}],
        newCalc = [],
        currentOp;
    for (var i = 0; i < ops.length; i++) {
        for (var j = 0; j < calc.length; j++) {
            if (ops[i][calc[j]]) {
                currentOp = ops[i][calc[j]];
            } else if (currentOp) {
                newCalc[newCalc.length - 1] = 
                    currentOp(newCalc[newCalc.length - 1], calc[j]);
                currentOp = null;
            } else {
                newCalc.push(calc[j]);
            }
            console.log(newCalc);
        }
        calc = newCalc;
        newCalc = [];
    }
    if (calc.length > 1) {
        console.log('Error: unable to resolve calculation');
        return calc;
    } else {
        return calc[0];
    }
}
