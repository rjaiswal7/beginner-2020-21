document.getElementById("cnvbtn").addEventListener("click", convert);
document.getElementById("dwnbtn").addEventListener("click", savePdf);
const input = document.getElementById("image_uploads");
const preview = document.querySelector('.preview');
let image_data = [];
let img_dim = []
let doc;
input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay() {
  //removing earlier images
  while (preview.firstChild) {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0) {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  } else {
    document.getElementById("cnv_div").style.display = "block";
    const table = document.createElement('table');
    preview.appendChild(table);

    for (const file of curFiles) {
      const tr = document.createElement('tr');
      const img_td = document.createElement("td");
      const label_td = document.createElement("td");

      if (validFileType(file)) {
        label_td.innerHTML = `File name: ${file.name} <br> File size: ${returnFileSize(file.size)}.`;
        const image = new Image();
        let obj_url = URL.createObjectURL(file);
        image.onload = () => {
          img_dim.push([image.naturalWidth, image.naturalHeight]);
        }
        image.src = obj_url
        img_td.append(image);
        tr.appendChild(img_td);
        tr.appendChild(label_td);
      } else {
        label_td.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        tr.appendChild(img_td);
        tr.appendChild(label_td);
      }

      table.appendChild(tr);
    }
  }
  getdata();
}

// https://developer.mozilla.org/en-US/docs/Web/Media/Formats/Image_types
const fileTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  `image/x-icon`
];

function validFileType(file) {
  return fileTypes.includes(file.type);
}

function returnFileSize(number) {
  if (number < 1024) {
    return number + 'bytes';
  } else if (number > 1024 && number < 1048576) {
    return (number / 1024).toFixed(1) + 'KB';
  } else if (number > 1048576) {
    return (number / 1048576).toFixed(1) + 'MB';
  }
}

function getdata() {
  image_data = [];
  doc = "";
  document.getElementById("pg_bar").style.width = "0px";
  const element = document.getElementById("image_uploads");
  for (var i = 0; i < element.files.length; i++) {
    const file = element.files[i];

    const reader = new FileReader();
    reader.onloadend = function () {
      image_data.push(reader.result);
    }
    reader.readAsDataURL(file);
  }
}

function convert() {
  document.getElementById("cnv_div").style.display = "none";
  document.getElementById("total_image").innerText = image_data.length;
  let pg_bar = document.getElementById("pg_bar");

  doc = new jsPDF("portrait", 'mm', "a4");
  const page_w = doc.internal.pageSize.width - 10;
  const page_h = doc.internal.pageSize.height - 10;
  let w, h;
  const pg_bar_len = 318 / image_data.length;

  let status = setInterval(convert_img, 50);
  let i = 0;
  function convert_img() {
    if (i >= image_data.length) {
      clearInterval(status);
      document.getElementById("save_div").style.display = "block";

    } else {
      w = page_w;
      h = (img_dim[i][1] / img_dim[i][0]) * page_w;
      doc.addPage(w + 10, h + 10);
      doc.addImage(image_data[i], '', 5, 5, w, h);

      //showing progressbar
      pg_bar.style.width = pg_bar_len * (i + 1) + 'px';
      document.getElementById("img_no").innerText = i + 1;
      i++;
    }
  }
  doc.deletePage(1);
  
}
function savePdf() {
  let file_name = document.getElementById("file_name").value;

  if (file_name.toString().trim() == "") {
    doc.save("convertedPdf");
  } else {
    doc.save(file_name);
  }
  window.location.reload(true);
}


