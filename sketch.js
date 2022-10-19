let mouseSmoothing = 0.99999;  // Smoothing co-efficient for an FIR filter on mouse position.
let mouseEffectScale = 50;  // Higher values reduce the effect of the mouse position.
let hueInc = 0.1;
let num = 50;
let margin = 0;
let gutter = 5; //distance between each cell

// variable used to store the current frame rate value
let frame_rate_value;
let hue = 0;
let smoothMouseX = 0;
let smoothMouseY = 0;


var cnv;

function centerCanvas() {
  var x = (windowWidth - width) / 3;
  var y = (windowHeight - height) / 3;
  cnv.position(x, y);
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  background(hue%256, 255, 20, 255);

  smooth();
  colorMode(HSB);

  frame_rate_value = 40;
  frameRate(frame_rate_value);
  rectMode(CENTER);
}


function draw() {
  background( hue%256, 255, 20, 255);


  let cellsize = ( width - (2 * margin) - gutter * (num - 4) ) / (num - 4);
  
  hue = (hue + hueInc) % 256;
  
  let circleNumber = 0; // counter
  for (let i=0; i<num; i++) {
    for (let j=0; j<num; j++) {
      circleNumber = (i * num) + j; // different way to calculate the circle number from w2_04

      let tx = margin + cellsize * i + gutter * i;
      let ty = margin + cellsize * j + gutter * j;

      movingCircle(tx, ty, cellsize, circleNumber);
    }
  }
} //end of draw 


function movingCircle(x, y, size, circleNum) {
  
  smoothMouseX = (smoothMouseX * mouseSmoothing) + ((1-mouseSmoothing) * mouseX);
  smoothMouseY = (smoothMouseY * mouseSmoothing) + ((1-mouseSmoothing) * mouseY);
  
  let angleMod = smoothMouseX * circleNum / mouseEffectScale;
  let finalAngle;
  finalAngle = frameCount + angleMod;

  //the rotating angle for each tempX and tempY postion is affected by frameRate and angle;  
  let tempX = x + (size / 2) * sin(PI / frame_rate_value * finalAngle);
  let tempY = y + (size / 2) * cos(PI / frame_rate_value * finalAngle);

  let shapeHue = (hue + (smoothMouseY) + ((smoothMouseY*2*(circleNum-num))/(num*height))) % 256; 
  noStroke();
  
  fill(shapeHue,255,255,100);
  rect(tempX, tempY, size*1, size*1);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  centerCanvas();
}
