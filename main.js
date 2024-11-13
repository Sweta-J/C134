img = "";
status = "";
object = [];

function preload() {
    img = loadImage("dog_cat.jpg");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380, 380);
    video.hide();
}

function start() {
    detector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
}

function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        objectDetector.detect(video, gotResult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Detecting Objects";
            document.getElementById("obj_nums").innerHTML = "Number of objects detected are " + objects.length;
            fill(r,g,b);
            percent = floor(object[i].cofidence * 100);
            text(object[i].label + "" + percent + "%", object[i].x, object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}