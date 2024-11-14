
let canvas = document.createElement('canvas')
let ctx = canvas.getContext("2d");
let time = 0;
let uploadButton = document.getElementById('btn')
let image;

const grayscaleChars = ["@", "#", "%", "&", "8", "O", "X", "o", "=", "+", "*", "~", "-", ":", ",", "^", "\"", "'", ".", " "];


function onClickUpload() {
    var input = document.createElement('input')
    input.type = "file"
    input.onchange = (e) => {

        image = input.files[0];
        var imgEle = document.getElementById('imgEle')

        var reader = new FileReader();
        reader.readAsDataURL(image)
        reader.onload = () => {
            document.querySelector('.main').style.display = "flex"
            imgEle.src = reader.result
            imgEle.onload = () => {
                canvas.height = 300
                canvas.width = 300
                ctx.drawImage(imgEle, 0, 0, 300, 300);
                processImage()
                document.querySelector('.unicode').style.background = "white"
                document.querySelector('.container').style.display = "grid"
                document.querySelector('.unicode').style.display = "block"
                document.querySelectorAll('.loading').forEach((e) => {
                    e.remove();
                })
                document.querySelector('.cnvs').appendChild(canvas)
            }

        }

    }
    input.click()
}
function mouseMoveDetector(e) {

    var x, y;
    x = e.clientX;
    y = e.clientY;
    document.querySelector('td#x').innerText = x | 0;
    document.querySelector('td#y').innerText = y | 0;

    uploadButton.style.top = y + "px";
    uploadButton.style.left = x + "px";

}
let timerID;

function onMouseUp(e) {
    if (!(time > 300)) {
        onClickUpload()
    }
    clearInterval(timerID)
    time = 0
    e.preventDefault()
    document.removeEventListener('mousemove', mouseMoveDetector)
    uploadButton.removeEventListener('mouseup', this)
}


uploadButton.addEventListener('mousedown', (e) => {

    timerID = setInterval(() => {
        time += 100;
    }, 100);

    uploadButton.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mousemove', mouseMoveDetector)
})

let grArray = []

function processImage() {
    let imageData = ctx.getImageData(0, 0, 300, 300)
    console.log(imageData);

    let data = imageData.data

    console.log(data);
    const container = document.querySelector('.container');
    container.innerHTML = ""
    for (let index = 0; index < data.length; index += 4) {
        const element = data[index];
        let r = data[index]
        let g = data[index + 1]
        let b = data[index + 2]
        let a = data[index + 3]

        let avg = Math.floor(((r + g + b) / 4) / 12.75);

        const pixel = document.createElement('div');
        pixel.className = 'items';
        container.appendChild(pixel);
        pixel.innerText = grayscaleChars[avg]
    }

} 