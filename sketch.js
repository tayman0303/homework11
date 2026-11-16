function setup() {
  createCanvas(650, 400);
  rectMode(CENTER);
}

function draw() {
  // Dark purple night sky
  background(33, 1, 36);

  // Moon turning red
  if (mouseY < 200) {
    fill(255, 0, 0);
  } else {
    fill(193, 189, 114);
  }
  ellipse(width / 2, height / 1, 700);

  // Buildings
  fill(64, 4, 78);
  strokeWeight(3);
  rect(width / 12.75, height / 1.1255, width / 6.5, height / 2.5);
  rect(width / 2.358, height * 0.75, width / 3.25, height / 1);
  rect(width / 4, height / 1.2414, width / 5.2, height / 2);
  rect(width / 1.677, height / 1.3, width / 5.2, height / 1.5);
  rect(width / 1.1, height * 0.875, width / 3.75, height / 1);
  rect(width / 1.3, height * 0.8125, width / 6.5, height / 2);

  // bus that follows the mouse
  push();
  translate(mouseX, mouseY);
  fill('blue');
  rect(0, 0, 100, 60);
  fill('black');
  rect(0, -20, 100, 10);
  fill('gold')
  rect(-35,0,15,10)
  pop();
}