document.getElementById("cap").addEventListener("click", ScreenCap);
let code = `
html2canvas(document.body).then(canvas => {
	convertCanvasToImage(canvas);
	console.log("hello");
});
function convertCanvasToImage(canvas) {
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	console.log(image.src);
	return image;
}
`
function ScreenCap() {
	chrome.tabs.captureVisibleTab(null, { format: 'png' }, function (dataURL) {
		//console.log(dataURL);
		insertImage(dataURL)
	});
}
function insertImage(data) {

	let code =
		`function takeMyScreeShot(){
		let ScreenShotBox = document.createElement("div");
	ScreenShotBox.style.left = "0px";
	ScreenShotBox.style.top = "0px";
	ScreenShotBox.style.right = "0px";
	ScreenShotBox.style.bottom = "0px";
	ScreenShotBox.style.width = "100%";
	ScreenShotBox.style.height = "100%";
	ScreenShotBox.style.position = "fixed";
	ScreenShotBox.style.zIndex = 99;
	ScreenShotBox.style.backgroundColor = "#607d8b54";
	let ScreenShotImg = document.createElement("img");
	ScreenShotImg.src = "${data}";
	ScreenShotImg.width = window.innerWidth;
	ScreenShotImg.height = window.innerHeight;
	ScreenShotImg.style.position = "relative";
	ScreenShotImg.style.zIndex = 199;
	ScreenShotBox.append(ScreenShotImg);
	document.body.append(ScreenShotBox);
	ScreenShotBox.append(ScreenShotImg);
	//console.log(ScreenShotBox);
	function flashScreenShot() {
		let pos = 0;
		let width = window.innerWidth;
		let height = window.innerHeight;
		//clearInterval(id);
		let id = setInterval(frame, 5);
		function frame() {
		  if (pos == 100) {
			clearInterval(id);
		  } else {
			pos+=5;
			ScreenShotImg.style.width = width-pos*2+"px";
			ScreenShotImg.style.height = height-pos*2+"px";
			ScreenShotImg.style.left = pos+"px";
	        ScreenShotImg.style.top = pos+"px";
		  }
		}
	  }
	  flashScreenShot();
	    let ssb = document.createElement("button");
		ssb.innerHTML = "<a href='${data}' download='screenShot'>Download</a>";
		ssb.style.backgroundColor = "DodgerBlue";
		ssb.style.color = "white";
		ssb.style.border = "none";
		ssb.style.padding = "12px 30px";
		ssb.style.position = "absolute";
		ssb.style.cursor = "pointer";
		ssb.style.top = window.innerHeight-80+"px";
		ssb.style.left = (window.innerWidth-350)/2+"px";
		ssb.style.marginRight = "20px";
		ScreenShotBox.append(ssb);
		ssb.addEventListener("click",function(){
			ScreenShotBox.parentNode.removeChild(ScreenShotBox);
		})
		let scb = document.createElement("button");
		scb.innerText = "Close";
		scb.style.backgroundColor = "DodgerBlue";
		scb.style.color = "white";
		scb.style.border = "none";
		scb.style.padding = "12px 30px";
		scb.style.position = "absolute";
		scb.style.cursor = "pointer";
		scb.style.top = window.innerHeight-80+"px";
		scb.style.left = (window.innerWidth-50)/2+"px";
		ScreenShotBox.append(scb);
		scb.addEventListener("click",function(){
			ScreenShotBox.parentNode.removeChild(ScreenShotBox);
		})
	}
	takeMyScreeShot();
	;`
	chrome.tabs.executeScript(
		null,
		{ code: code }
	);
	window.close();
}

/*function ScreenCap() {
	chrome.tabs.executeScript(
		{ file: "html2canvas.js" },
		function () {
			chrome.tabs.executeScript({ code: code })
		}
	);
}*/