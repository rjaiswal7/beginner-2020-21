document.getElementById("btn").addEventListener("click",getId);
function getId() {
    let url = document.getElementById("inp").value;
    if (url.includes("https://us02web.zoom.us/j/")) {
        url = url.replace("/j", "/wc/join");
        let a = document.createElement("a");
        a.href = url;
        a.setAttribute("target", "_blank");
        document.body.append(a);
        a.click();
    } else {
        document.getElementById("op").innerHTML = `&#x26a0; Invalid Url!`
    }
}
let inp = document.getElementById("inp");
inp.addEventListener("click", () => {
  let auto_comp = document.getElementById("auto_com");
  auto_comp.focus();
  auto_comp.click();
  // inp.value = "";
  // a = document.createElement("DIV");
  // a.setAttribute("id", this.id + "autocomplete-list");
  // a.setAttribute("class", "autocomplete-items");
  // inp.parentNode.appendChild(a);
  // b = document.createElement("DIV");
  // navigator.clipboard.readText()
  // .then((text) => {
  //  b.innerHTML += text;
  //  b.innerHTML += "<input type='text' hidden value='"+text+"'>";
  //   console.log('clipboard contents', text)
  // })
  // a.append(b)
  auto_comp.value = ""
  document.execCommand("paste");
  document.getElementById("item").innerText += auto_comp.value;

});