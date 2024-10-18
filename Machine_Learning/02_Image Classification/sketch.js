let classifier;
//let img;
let video;
let label = "loading..";
let conf = 0;

function preload() {
  // Try DoodleNet and you can train your own model
  classifier = ml5.imageClassifier('MobileNet', {flipped: true});  // MoileNet a pre-trained model (ImageNet for Mobile Phones)
  // img = loadImage('images/iphone.jpeg');
}
function gotResult(results) {
    // console.log(results);
    label = results[0].label.split(', ')[0]; // get the label of the image
    conf = results[0].confidence; // get the confidence of the image
}
function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, {flipped: true});
  // classifier.classify(img, gotResult);
  video.hide();
  classifier.classifyStart(video, gotResult); // classify the video (continuous)
}

function draw() {
  background(220);
  //image(img, 0, 0, width, height);
  image(video, 0, 0, width, height);

  fill(0);
  rect(0, height - 50, width, 50); // (x, y, width, height)
  textSize(25);
  textAlign(CENTER, CENTER); // (horizontal, vertical)
  fill(255);
  noStroke();
  text(label + " - " + conf.toFixed(2), width / 2, height - 25); // (text, x, y)
}