let file = document.querySelector(".file");
let uploadbox = document.querySelector(".uploadbox");
previewImg = uploadbox.querySelector("img"),
    checkbox1 = document.querySelector(".checkbox1"),
    ss = uploadbox.querySelector(".ss"),
    widthInput = document.querySelector(".width "),
    downloadBtn = document.querySelector("button"),
    heightInput = document.querySelector(".height"),
    uploadbox.onclick = () => {
        file.click()

    };
let ratio;
let tmp;
const loadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    tmp = file.type;
    console.log(file.type)
        // getting first user selected file
    if (!file) return; // return if user hasn't selected any file
    previewImg.src = URL.createObjectURL(file);
    console.log(URL.createObjectURL(file)) // passing selected file url to preview img src
    previewImg.addEventListener("load", () => { // once img loaded
        ss.style.display = "none";
        previewImg.style.display = "block";
        widthInput.value = +previewImg.naturalWidth;
        heightInput.value = +previewImg.naturalHeight;
        ratio = previewImg.naturalWidth / previewImg.naturalHeight;
        console.log(ratio)
    });
}
file.addEventListener("change", loadFile);
widthInput.onkeyup = function() {
    if (checkbox1.checked) {
        heightInput.value = Math.floor(widthInput.value / ratio);
    }
}
heightInput.onkeyup = function() {
    if (checkbox1.checked) {
        widthInput.value = Math.floor(heightInput.value * ratio);
    }
}
const resizeAndDownload = () => {
    const canvas = document.createElement("canvas");
    const a = document.createElement("a");
    const ctx = canvas.getContext("2d");

    // if quality checkbox is checked, pass 0.5 to imgQuality else pass 1.0
    // 1.0 is 100% quality where 0.5 is 50% of total. you can pass from 0.1 - 1.0
    // const imgQuality = qualityInput.checked ? 0.5 : 1.0;

    // setting canvas height & width according to the input values
    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    // drawing user selected image onto the canvas
    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

    // passing canvas data url as href value of <a> element
    a.href = canvas.toDataURL(tmp); //orignal type of photo
    a.download = new Date().getTime(); // passing current time as download value
    a.click(); // clicking <a> element so the file download
}

downloadBtn.addEventListener("click", resizeAndDownload);