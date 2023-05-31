class Feature {
  constructor(type, chunk, p) {
    this.type = type;
    this.chunk = chunk;
    // this.position = createVector(chunkX + this.x, chunkY + this.y);
    this.position = p.copy();
  }

  punch() {
    let p = createVector(mouseX + player.position.x - width * 0.5, mouseY + player.position.y - height * 0.5);
    if (this.position.dist(player.position) < this.radius + 50 && this.position.dist(p) < this.radius + 12.5) {
      this.radius -= 1 / this.strength;
      sounds.hit.play(0, random(0.8, 1.2));
    }
  }

  // display() {
  //   if (this.type == "tree") {
  //     translate(this.position);
  //     displayTree("trunk");
  //   }
  // }
}

class Tree extends Feature {
  constructor(chunk, p) {
    super("tree", chunk, p);
    this.radius = random(15, 25);
    this.strength = 1;
    this.trunkTint = color(128, 99, 61);
    this.leafTint = color(2, 123, 44);
    this.sway = createVector();
    this.lootTable = [
      { quantity: this.radius / 5, name: "wood" }
    ];
  }

  display(treePiece) {
    let x = (frameCount * 0.05 + this.x) * 0.1;
    let y = (frameCount * 0.05 + this.y) * 0.1;
    this.sway.set(noise(x, y, 0) - 0.5, noise(x, y, 10) - 0.5).mult(16);

    push();
    strokeWeight(4)
    translate(this.position);
    // scale(50 + this.damage * 3);
    if (treePiece == "trunk") {
      displayTrunk(this.trunkTint, this.radius);
    }
    if (treePiece == "leaves") {
      translate(this.sway);
      displayLeaves(this.leafTint, this.radius);
    }
    pop();
  }
}

class Rock extends Feature {
  constructor(x, y, chunkX, chunkY) {
    super("rock", x, y, chunkX, chunkY);
    this.radius = random(20, 45);
    this.strength = 2;
    this.lootTable = [
      { quantity: this.radius / 10, name: "stone" },
    ];
  }

  display() {
    push();
    translate(this.position);
    displayRock(this.radius);
    pop();
  }
}

function displayTrunk(col, size) {
  stroke(118, 79, 39);
  fill(161, 119, 56);
  stroke(col.r, col.g, col.b);
  circle(0, 0, size * 2);
}

function displayLeaves(col, size) {
  noStroke();
  fill(72, 125, 45, 160);
  circle(0, 0, size * 6);
  stroke(52, 105, 35, 160);
  noFill();
  circle(0, 0, size * 6);
}

function displayRock(size) {
  push();
  stroke(115);
  strokeWeight(4);
  fill(135);
  circle(0, 0, size * 2);
  noStroke();
  fill(150);
  circle(size * 0.3, -size * 0.3, size * 0.7);
  pop();
}

/*

class Tree {
  constructor(x, y) {
    // this.x = random(chunkSize);
    // this.y = random(chunkSize);
    // this.chunkX = chunkX;
    // this.chunkY = chunkY;
    this.x = x;
    this.y = y;
    this.damage0 = random(25, 40);
    this.damage = this.damage0;
    this.drop = "wood";
    
    this.sway = createVector();
    this.color =
      noise((this.x + this.chunkX) * 0.005, (this.y + this.chunkY) * 0.005) -
      0.5;

    this.intersects = function (other) {
      let d = dist(this.x, this.y, other.x, other.y);
      if (d < (this.s + other.s) * 0.5) {
        return true;
      }
      return false;
    };
    this.hover = function (mx, my) {
      let d = dist(this.x, this.y, mx, my);
      if (d < this.s * 0.5 + 12) {
        return true;
      }
      return false;
    };
  }

  showtrunk() {
    push();
    translate(this.x, this.y);
    stroke(117 + this.color * 60, 75 + this.color * 45, 25 + this.color * 20);
    fill(137 + this.color * 80, 95 + this.color * 60, 45 + this.color * 30);
    circle(0, 0, this.s);
    pop();
  }

  showleaves() {
    this.sway.set(
      noise((this.x + this.chunkX + time) * 0.005 + 1024),
      noise((this.y + this.chunkY + time) * 0.005 + 1024)
    );
    this.sway.add(-0.5, -0.5);
    this.sway.mult(15);

    push();
    translate(this.x + this.sway.x, this.y + this.sway.y);
    noStroke();
    fill(37 + this.color * 40, 105 + this.color * 80, 65, 150);
    circle(0, 0, this.s * 3);
    stroke(17 + this.color * 30, 85 + this.color * 60, 45, 150);
    noFill();
    circle(0, 0, this.s * 3 + 3);
    pop();
  }
}

class Rock {
  constructor() {
    this.x = random(chunkSize);
    this.y = random(chunkSize);
    this.s = random(40, 100);
    this.m = this.s;
    this.color = random(-1, 1);
    this.intersects = function (other) {
      let d = dist(this.x, this.y, other.x, other.y);
      if (d < (this.s + other.s) * 0.5) {
        return true;
      } else {
        return false;
      }
    };
    this.hover = function (mx, my) {
      let d = dist(this.x, this.y, mx, my);
      if (d < this.s * 0.5 + 12) {
        return true;
      } else {
        return false;
      }
    };
  }

  show() {
    push();
    translate(this.x, this.y);
    stroke(115 + this.color * 4);
    fill(135 + this.color * 6);
    circle(0, 0, this.s);
    noStroke();
    fill(150 + this.color * 8);
    circle(this.s / 6, -this.s / 6, this.s / 3);
    pop();
  }
}

*/