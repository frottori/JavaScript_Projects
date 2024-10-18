let video;
let bodyPose;
let connections;
let poses = [];
let lx = 0, ly = 0;

// P5.js function: Code to run before the rest of the sketch.
function preload() {
  bodyPose = ml5.bodyPose("BlazePose",{flipped: true}); // Load the BodyPose model (MoveNet, BlazePose)
}

// P5.js function: Code to run when the mouse is pressed.
function mousePressed() {
  console.log(poses);
} 

function gotPoses(results) {
  poses = results; 
}

// P5.js function: Code to run when the sketch is created.
function setup() {
  createCanvas(640, 380);
  video = createCapture(VIDEO, {flipped: true});
  video.hide();

  // detectStart() -> continuous detection from video (else detect())
  bodyPose.detectStart(video, gotPoses) // callback function when it gets result from the model
  connections = bodyPose.getSkeleton(); // Get the connections between the keypoints
  console.log(connections); 
}

// P5.js function: Code to run every frame.
function draw() {
  image(video, 0, 0);
  if (poses.length > 0){
    // Get first pose and coordinates of the nose
    let pose = poses[0]; 
    let x = pose.nose.x;
    let y = pose.nose.y;
    // Smooth animation of circle
    lx = lerp(lx, x, 0.3);
    ly = lerp(ly, y, 0.3);
    // Draw a circle at the nose
    fill(255, 0, 0);
    circle(lx, ly, 30);

    // clap(pose);
    //drawKeypoints(pose);
    drawSkeleton(pose);
   }
}

function clap(pose){
  let rightx = pose.right_wrist.x;
  let righty = pose.right_wrist.y;
  let leftx = pose.left_wrist.x;
  let lefty = pose.left_wrist.y;
  let d = dist(rightx, righty, leftx, lefty);
  if(d < 100){
    fill(255,255,255);
    textSize(32);
    text("Clap", 10, 30);  
  }
}

function drawKeypoints(pose){
  for(let i = 0; i < pose.keypoints.length; i++){
    let keypoint = pose.keypoints[i];
    fill(0,255,0);
    noStroke();
    if(keypoint.confidence > 0.1){
      circle(keypoint.x, keypoint.y, 10); 
    }
  }
}

function drawSkeleton(pose){
  for(let i = 0; i < connections.length; i++){
    let connection = connections[i];
    let p1 = pose.keypoints[connection[0]];
    let p2 = pose.keypoints[connection[1]];
    stroke(0,0,255);
    strokeWeight(8);
    if(p1.confidence > 0.1 && p2.confidence > 0.1){
      line(p1.x, p1.y, p2.x, p2.y);
    }
  }
}