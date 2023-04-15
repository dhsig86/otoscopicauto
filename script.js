// The link to your model provided by Teachable Machine export panel
const URL = "https://teachablemachine.withgoogle.com/models/kIbxQW2NA/";

let model, maxPredictions;

// Load the image model
async function init() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// Classify image from input file
async function classify() {
    const imageUpload = document.getElementById('imageUpload');
    const img = await loadImage(imageUpload.files[0]);
    const prediction = await model.predict(img);
    displayImage(img.src);
    displayLabels(prediction);
}

// Load image from input file
function loadImage(file) {
    return new Promise(resolve => {
        if (!file || !file.type.match(/image.*/)) return; // Verify if the file is an image
        const reader = new FileReader();
        reader.addEventListener('load', () => resolve(createImage(reader.result)));
        reader.readAsDataURL(file);
    });
}

// Create image element from URL
function createImage(url) {
    return new Promise(resolve => {
        const img = new Image();
        img.addEventListener('load', () => resolve(img));
        img.src = url;
    });
}

// Display image in HTML
function displayImage(url) {
    const imgContainer = document.getElementById('image-container');
    imgContainer.innerHTML = `<img src="${url}" alt="uploaded image">`;
}

// Display class labels in HTML
// Display class labels in HTML
function displayLabels(prediction) {
    const labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";
    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className + ": " + (prediction[i].probability * 100).toFixed(2) + "%";
        labelContainer.appendChild(document.createElement("div")).innerHTML = classPrediction;
    }
}

// Initialize image model
init();

// Add event listener to input for image upload
const imageUpload = document.getElementById('imageUpload');
imageUpload.addEventListener('change', () => {
    classify();
});
