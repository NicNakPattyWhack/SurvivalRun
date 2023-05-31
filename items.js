class Item {
  // constructor(name, x, y, chunkX, chunkY, v) {
  constructor(name, chunk, p, v) {
    this.chunk = chunk;
    this.position = p.copy();
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
      this.velocity.add(p5.Vector.mult(force, dt));
    }
  }

  update() {
    if (this.velocity.mag() > 0.1) {
      this.position.add(p5.Vector.mult(this.velocity, dt));
      this.velocity.mult(halfFrictionTime);
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