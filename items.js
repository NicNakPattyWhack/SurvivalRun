class Item {
  constructor(name, x, y, chunkX, chunkY, v) {
    this.x = x;
    this.y = y;
    this.chunkX = chunkX;
    this.chunkY = chunkY;
    this.position = createVector(chunkX + x, chunkY + y);
    this.velocity = v.copy();
    this.data = itemData[name];
    this.time = 0;
  }

  update() {
    if (this.velocity.mag() > 0.1) {
      this.position.add(this.velocity);
      this.velocity.mult(0.9);
    }

    this.time++;
  }

  display() {
    push();
    translate(this.x, this.y);
    this.data.display();
    pop();
  }
}

function displayItem(type) {
  switch (type) {
    case "wood": displayWoodItem(); break;
    case "stone": displayStoneItem(); break;
  }
}