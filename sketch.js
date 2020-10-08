let cloudlets = [];
let font;
let pts;
let extraCanvas;

//loads font
function preload() {
  font = loadFont("LeagueGothic-Regular.otf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  //splits text into points
  pts = font.textToPoints('hold the sky up for a few more hours', 0, 0, 70, {
    sampleFactor: 0.9,
    simplifyThreshold: 0
  });
  
  //creates 6000 cloudlets
  for (let i = 0; i < 6000; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(10, 40);
    cloudlets[i] = new Cloudlet(x, y, r);

  }
}

function ns(x, y, z, scale_, min_, max_) {
  return map(
    noise(x * scale_, y * scale_, z * scale_),
    0, 1, min_, max_);
}

let xz = 0;
let yz = 1000;

function draw() {
  background(0, 100, 250);
  for (let i = 0; i < cloudlets.length; i++) {
    cloudlets[i].move();
    cloudlets[i].show();
  }
  //animation of text
  noStroke();
  fill(200, 200, 0);
  push();
  translate(75, 275);
  for (let i = 0; i < pts.length; i++) {
    let xoff = ns(pts[i].x, pts[i].y, xz, 0.005, -50, 50);
    let yoff = ns(pts[i].y, pts[i].x, yz, 0.005, -50, 50);
    ellipse(pts[i].x + xoff, pts[i].y + yoff, 5, 5);
  }
  pop();
  xz += 2;
  yz += 2;
}

class Cloudlet {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }
  //how the cloud objects are moving
  move() {
    this.x = this.x + random(-5, 5);
    this.y = this.y + random(-5, 5);
  }

  //appearance of cloud objexts
  show() {
    noStroke();
    fill(255, 10);
    ellipse(this.x, this.y, this.r * 2);

  }
}
