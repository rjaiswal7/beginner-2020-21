(function () {
    const Graph = {
        "pieChart":
            class {
                constructor(div, w, data, labels, title = "My Chart") {
                    this.div = div;
                    this.w = w;
                    this.data = data;
                    this.labels = labels;
                    this.title = title;
                    this.getArcPath = (c_x, c_y, r, stAng, endAng) => {
                        let s_x = c_x + r * Math.cos(stAng);
                        let s_y = c_y + r * Math.sin(stAng);
                        let e_x = c_x + r * Math.cos(endAng);
                        let e_y = c_y + r * Math.sin(endAng);
                        let largeArcFlag = (endAng - stAng) <= Math.PI ? "0" : "1";
                        let d = ["M", s_x, s_y, "A", r, r, 0, largeArcFlag, 1, e_x, e_y, "L", c_x, c_y, "Z"].join(" ");
                        return d;
                    }
                }

                draw() {
                    let total = 0;
                    let ang = [];

                    //getting total of data
                    for (let i in this.data) {
                        total += Number(this.data[i]);
                    }

                    //creating angle set for data
                    for (let j in this.data) {
                        ang.push(2 * Math.PI * this.data[j] / total);
                    }

                    //getting all text length
                    let wd = ""
                    for (let k in this.labels) {
                        wd += " " + this.labels[k];
                    }

                    let wd_row = Math.ceil((Graph.getTextWidth(wd) + 30 * this.labels.length) / this.w);
                    let svg = Graph.setupSvg(this.div, this.w, this.w + wd_row * 20 + 60);
                    this.svg = svg;
                    let x = 0;
                    let y = 40;
                    let endAng = 0;
                    let stAng = -Math.PI / 2;
                    let lb_x = x + 20;
                    let lb_y = y + this.w + 20;
                    let o_x = x + this.w / 2;
                    let o_y = y + this.w / 2;
                    let r = this.w / 2;
                    //adding title
                    svg.innerHTML += `<text x="${(this.w - Graph.getTextWidth(this.title)) / 2 - 16}" y="${16}" style="font-size:20px;">${this.title}</text>`
                    //for drwaing chart
                    for (let n in ang) {
                        endAng = stAng + ang[n];

                        //for drawing piechart with data
                        let fill_arc = '#' + Math.ceil(Math.random() * 1000000);
                        let path = this.getArcPath(o_x, o_y, r, stAng, endAng);
                        let arc = `<path d="${path}" fill="${fill_arc}"></path>`
                        svg.innerHTML += arc;

                        //for adding tooltip
                        let s_x = o_x + r / 2 * Math.cos(stAng + ang[n] / 2);
                        let s_y = o_y + r / 2 * Math.sin(stAng + ang[n] / 2);
                        let span = `<text x="${s_x}" y="${s_y}" fill="white" opacity="0">${Math.round(this.data[n] / total * 100) + "%"}</text>`;
                        svg.innerHTML += span;

                        //for adding labels
                        if ((lb_x + Graph.getTextWidth(this.labels[n])) >= (x + this.w - 20)) {
                            lb_y = lb_y + 20;
                            lb_x = x + 20;

                        } else {
                            lb_y = lb_y;
                            lb_x = lb_x;
                        }
                        svg.innerHTML += `<rect x="${lb_x}" y="${lb_y}" width="${15}" height="${15}" fill="${fill_arc}"></rect>`
                        svg.innerHTML += `<text x="${lb_x + 16}" y="${lb_y + 16}">${this.labels[n]}</text>`
                        lb_x += Graph.getTextWidth(this.labels[n]) + 21;

                        stAng = endAng;
                    }
                    //displaying tooltip
                    let arcs = svg.getElementsByTagName("path");
                    for (let r = 0; r < arcs.length; r++) {
                        arcs[r].onmouseover = () => { arcs[r].setAttribute("opacity", "0.75"); arcs[r].nextElementSibling.setAttribute("opacity", "1") };
                        arcs[r].onmouseleave = () => { arcs[r].setAttribute("opacity", "1"); arcs[r].nextElementSibling.setAttribute("opacity", "0") };
                    }

                }
            },
        "barGraph": class {
            constructor(div, w, h, data, labels, title = "My Chart") {
                this.div = div;
                this.w = w;
                this.h = h;
                this.data = data;
                this.labels = labels;
                this.title = title;
            }
            draw() {
                let svg = Graph.setupSvg(this.div, this.w, this.h);
                this.svg = svg;
                //getting max number in data
                let mx = 0;
                for (let i = 0; i < this.data.length; i++) {
                    mx = Math.max(mx, this.data[i]);
                }

                //getting max label length
                let max_label_ln = 0, wd = "";
                for (let j = 0; j < this.data.length; j++) {
                    wd = max_label_ln <= Graph.getTextWidth(this.labels[j]) ? this.labels[j] : wd;
                    max_label_ln = Math.max(max_label_ln, Graph.getTextWidth(this.labels[j]));
                }
                //getting max label width
                mx = (mx).toExponential(mx.toString().length - 2) * 1;
                let factor = Number(mx.toString().slice(0, -1));
                let iter = mx / factor;

                //getting max number width
                let tw = Graph.getTextWidth(mx);
                let x = 0;
                let y = 40;
                this.h = this.h - max_label_ln - 40;
                let o_y = y + this.h;//bottom y
                let o_x = x + tw; //bottom x 

                //drawing horizontal and vertical lines and title
                let gh_title = `<text x="${(this.w - Graph.getTextWidth(this.title)) / 2 - 16}" y="${16}" style="font-size:20px">${this.title}</text>`;
                let hr_l = `<line x1="${x}" y1="${o_y}" x2="${this.w + 10}" y2="${o_y}" style="stroke:black;stroke-width:1"></line>`;
                let vt_l = `<line x1="${o_x}" y1="${o_y}" x2="${o_x}" y2="${y - 16}" style="stroke:black;stroke-width:1"></line>`;
                svg.innerHTML += gh_title + hr_l + vt_l;


                //displaying numbers and lines
                let n_h = o_y;
                for (let i = 0; i < iter + 1; i++) {
                    svg.innerHTML += `<text x="${0}" y="${n_h}" style="fill:black;">${i * factor}</text>`;
                    svg.innerHTML += `<line x1="${o_x}" y1="${n_h}" x2="${this.w + 10}" y2="${n_h}" style="stroke:grey;stroke-width:0.5"></line>`
                    n_h -= (this.h) / iter;
                }

                //displaying bar 
                let f_clr = '#' + Math.ceil(Math.random() * 1000000);
                f_clr = f_clr.length === 6 ? '#' + Math.ceil(Math.random() * 1000000) : f_clr;
                let h_clr = '#' + Math.ceil(Math.random() * 1000000);
                h_clr = f_clr === h_clr || h_clr.length === 6 ? '#' + Math.ceil(Math.random() * 1000000) : h_clr;
                let h_fac = (this.h) / mx;
                let bar_x = o_x;
                let bar_w = (this.w - o_x) / this.data.length
                for (let d = 0; d < this.data.length; d++) {
                    svg.innerHTML += `<rect x="${bar_x}" y="${o_y - this.data[d] * h_fac}" width="${bar_w}" height="${this.data[d] * h_fac}" style="fill:${f_clr};stroke-width:1;stroke:white" />`;
                    bar_x += bar_w;
                }

                //displaying labels
                for (let i = 0; i < this.data.length; i++) {
                    let tx = (i) * bar_w + o_x + tw + (bar_w - 16) / 2;
                    let ty = o_y + max_label_ln;
                    let txt = ` <text x="${tx}" y="${ty}" transform="rotate(-90 ${tx} ${ty})" style ="fill:${f_clr};font-weight:bolder">${this.labels[i]}</text>`;
                    svg.innerHTML += txt;
                }

                //setting tooltip
                let span = Graph.setupToolTip(svg);
                let rects = svg.getElementsByTagName("rect");
                for (let r = 0; r < rects.length; r++) {
                    let vl = this.data[r];
                    rects[r].onmouseover = (event) => {
                        let e_x = Number(event.target.getAttribute("x")) + (Number(event.target.getAttribute("width")) - Graph.getTextWidth(vl)) / 2;
                        let e_y = Number(event.target.getAttribute("y")) + Number(event.target.getAttribute("height")) / 2;
                        Graph.displayTooltip(e_x, e_y, span, vl);
                        rects[r].style.fill = h_clr;
                    };
                    rects[r].onmouseleave = () => { Graph.hideToolTip(span); rects[r].style.fill = f_clr };
                }
            }
        },
        "lineGraph": class {
            constructor(div, w, h, data, labels, title = "My Chart") {
                this.div = div;
                this.w = w;
                this.h = h;
                this.data = data;
                this.labels = labels;
                this.title = title;
            }
            draw() {
                let svg = Graph.setupSvg(this.div, this.w, this.h);
                this.svg = svg;
                //getting max number in data
                let mx = 0;
                for (let i = 0; i < this.data.length; i++) {
                    mx = Math.max(mx, this.data[i]);
                }

                //getting max label length
                let max_label_ln = 0, wd = "";
                for (let j = 0; j < this.data.length; j++) {
                    wd = max_label_ln <= Graph.getTextWidth(this.labels[j]) ? this.labels[j] : wd;
                    max_label_ln = Math.max(max_label_ln, Graph.getTextWidth(this.labels[j]));
                }
                //getting max label width
                mx = (mx).toExponential(mx.toString().length - 2) * 1;
                let factor = Number(mx.toString().slice(0, -1));
                let iter = mx / factor;

                //getting max number width
                let tw = Graph.getTextWidth(mx);
                let x = 0;
                let y = 40;
                this.h = this.h - max_label_ln - 40;
                let o_y = y + this.h;//bottom y
                let o_x = x + tw; //bottom x 

                //drawing horizontal and vertical lines and title
                let gh_title = `<text x="${(this.w - Graph.getTextWidth(this.title)) / 2 - 16}" y="${16}" style="font-size:20px">${this.title}</text>`;
                let hr_l = `<line x1="${x}" y1="${o_y}" x2="${this.w + 10}" y2="${o_y}" style="stroke:black;stroke-width:1"></line>`;
                let vt_l = `<line x1="${o_x}" y1="${o_y}" x2="${o_x}" y2="${y - 16}" style="stroke:black;stroke-width:1"></line>`;
                svg.innerHTML += gh_title + hr_l + vt_l;


                //displaying numbers and lines
                let n_h = o_y;
                for (let i = 0; i < iter + 1; i++) {
                    svg.innerHTML += `<text x="${0}" y="${n_h}" style="fill:black;">${i * factor}</text>`;
                    svg.innerHTML += `<line x1="${o_x}" y1="${n_h}" x2="${this.w + 10}" y2="${n_h}" style="stroke:grey;stroke-width:0.5"></line>`
                    n_h -= (this.h) / iter;
                }

                //displaying lines 
                let f_clr = '#' + Math.ceil(Math.random() * 1000000);
                f_clr = f_clr.length === 6 ? '#' + Math.ceil(Math.random() * 1000000) : f_clr;
                let h_clr = '#' + Math.ceil(Math.random() * 1000000);
                h_clr = f_clr === h_clr || h_clr.length === 6 ? '#' + Math.ceil(Math.random() * 1000000) : h_clr;
                let h_fac = (this.h) / mx;
                let bar_x = o_x;
                let bar_w = (this.w - o_x) / this.data.length
                for (let d = 0; d < this.data.length - 1; d++) {
                    svg.innerHTML += `<circle cx="${bar_x + bar_w / 2}" cy="${o_y - this.data[d] * h_fac}" r="5" style="fill:${f_clr};stroke-width:1;stroke:${f_clr};"></circle>`;
                    svg.innerHTML += `<line x1="${bar_x + bar_w / 2}" y1="${o_y - this.data[d] * h_fac}" x2="${bar_x + bar_w * 3 / 2}" y2="${o_y - this.data[d + 1] * h_fac}" style="fill:${f_clr};stroke-width:1;stroke:${f_clr};"></line>`;
                    bar_x += bar_w;
                }
                svg.innerHTML += `<circle cx="${bar_x + bar_w / 2}" cy="${o_y - this.data[this.data.length - 1] * h_fac}" r="5" style="fill:${f_clr};stroke-width:1;stroke:${f_clr};"></circle>`;
                //displaying labels
                for (let i = 0; i < this.data.length; i++) {
                    let tx = (i) * bar_w + o_x + tw + (bar_w - 16) / 2;
                    let ty = o_y + max_label_ln;
                    let txt = ` <text x="${tx}" y="${ty}" transform="rotate(-90 ${tx} ${ty})" style ="fill:${f_clr};font-weight:bolder">${this.labels[i]}</text>`;
                    svg.innerHTML += txt;
                }
                //setting tooltip
                let span = Graph.setupToolTip(svg, "red");
                let circles = svg.getElementsByTagName("circle");
                for (let c = 0; c < circles.length; c++) {
                    let vl = this.data[c];
                    circles[c].onmouseover = (event) => {
                        let e_x = Number(event.target.getAttribute("cx")) + 5;
                        let e_y = Number(event.target.getAttribute("cy")) + 5;

                        Graph.displayTooltip(e_x, e_y, span, vl); circles[c].style.fill = h_clr
                    }
                    circles[c].onmouseleave = () => { Graph.hideToolTip(span); circles[c].style.fill = f_clr };
                }
            }
        },
        "setupSvg": function (div, w, h) {
            let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("width", w);
            svg.setAttribute("height", h);
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            svg.style.boxShadow = "0px 0px 9px 1px grey";
            svg.style.fontSize = "16px";
            svg.style.padding = "10px";
            svg.style.margin = "10px";
            div.style.display = "inline-flex";
            div.append(svg);
            return svg;
        },
        "getTextWidth": function (txt) {
            let cnv = document.createElement("canvas");
            let ctx = cnv.getContext("2d");
            ctx.font = "16px arial";
            let metrics = ctx.measureText(txt);
            return metrics.width;
        },
        "displayTooltip": function (e_x, e_y, span, vl) {
            span.setAttribute("x", e_x);
            span.setAttribute("y", e_y);
            span.innerHTML = vl;
        },
        "hideToolTip": function (span) {
            span.innerHTML = "";
        },
        "setupToolTip": function (svg, color) {
            let span = document.createElementNS("http://www.w3.org/2000/svg", "text");
            svg.append(span);
            span.style.position = "aboslute";
            span.style.stroke = color || "white";
            //span.style.fill = color || "white";
            return span;
        },
        "download": function (chart, file_name = "myChart") {
            const data = chart.svg.outerHTML;
            let file = new Blob([data], { type: "image/svg+xml" });
            let a = document.createElement("a");
            a.href = URL.createObjectURL(file);
            a.setAttribute("download", file_name)
            a.click();
        }



    }
    window.Graph = Graph;
})();



// function plotPints(div, w, h, x, y, title = "My Chart") {
//     let svg = setupSvg(div, w, h);

// }





