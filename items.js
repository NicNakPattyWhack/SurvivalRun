class Item {
  constructor(name, x, y, chunkX, chunkY, v) {
    this.x = x;
    this.y = y;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.position = createVector(chunkX + x, chunkY + y);
    this.velocity = v.copy();
    this.radius = 5;
    this.name = name;
    this.data = itemData[name];
    this.time = 0;
  }

  collide(other) {
    // console.log(other);
    // noLoop();
    let d = this.position.dist(other.position)
    if (d < this.radius + other.radius) {
      let force = calculateCollision(this, other);
      // if (other.type == "rock") force.setMag(0.5);
      this.velocity.add(force);
    }
  }

  update() {
    if (this.velocity.mag() > 0.1) {
      this.position.add(this.velocity);
      this.velocity.mult(0.85);
    }

    this.time++;
  }

  display() {
    push();
    translate(this.position);
    this.data.display();
    pop();
  }
}