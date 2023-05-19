// let count = chunkSize / 128;

class Chunk {
  constructor(x, y) {
    this.x = x - worldSize * 0.5;
    this.y = y - worldSize * 0.5;
    this.generated = false;
    // this.treeCount = 5 * max(noise(this.x * 0.1, this.y * 0.2) - 0.3, 0);
    // this.rockCount = 2 * max(noise(this.x * 0.5, this.y * 0.5) - 0.2, 0);
    this.treeCount = 8 * noise(this.x * 0.2, this.y * 0.2);
    // this.treeCount = 1;
    this.rockCount = random(2);
    this.features = [];
    this.items = [];
    this.biome = noise(this.x * 0.1, this.y * 0.1);
  }

  generate() {
    if (!this.generated) {
      //   if (this.x == 0 && this.y == 0) {

      //   for (let i = 0; i < 12; i++) {
      //     let angle = map(i, 0, 12, 0, TWO_PI);
      //     let x = cos(angle) * 100 + chunkSize / 2;
      //     let y = sin(angle) * 100 + chunkSize / 2;
      //     this.features.push(new Tree(x, y, this.x * chunkSize, this.y * chunkSize));
      //   }
      // }

      for (let i = 0; i < this.treeCount; i++) {
        this.features.push(new Tree(random(chunkSize), random(chunkSize), this.x * chunkSize, this.y * chunkSize));
      }
      for (let i = 0; i < this.rockCount; i++) {
        this.features.push(new Rock(random(chunkSize), random(chunkSize), this.x * chunkSize, this.y * chunkSize));
      }
    }
    this.generated = true;
  }

  load0() {
    push();
    noStroke();
    // fill(0);
    // for (let feature of this.features) {
    //   circle(feature.position.x, feature.position.y, feature.radius * 2)
    // }
    // fill(map(this.treeCount, 0, 50, 0, 255));
    // fill(255 * (abs(this.x + this.y) % 2), 0);
    // fill(round(noise(this.x * chunkSize * 0.002, this.y * chunkSize * 0.002)) * 255);
    // fill(this.biome * 255);
    // rect(this.x * chunkSize, this.y * chunkSize, chunkSize, chunkSize);
    strokeWeight(1);
    stroke(255, 0, 0, 100);
    line(
      this.x * chunkSize,
      this.y * chunkSize,
      (this.x + 1) * chunkSize,
      this.y * chunkSize
    );
    stroke(0, 0, 255, 100);
    line(
      this.x * chunkSize,
      this.y * chunkSize,
      this.x * chunkSize,
      (this.y + 1) * chunkSize
    );
    translate(chunkSize * 0.5, chunkSize * 0.5);
    noStroke();
    fill(255, 0, 0, 100);
    textSize(16);
    textAlign(CENTER);
    text(this.x + ",  " + this.y, this.x * chunkSize, this.y * chunkSize + 4);
    pop();
  }

  load1() {
    push();
    // translate(this.x * chunkSize, this.y * chunkSize);
    for (let feature of this.features) {
      if (feature.type == "rock") {
        feature.display();
      }
    }
    for (let item of this.items) {
      if (item.velocity.mag() > 0.125) {
        for (let dx of [-0.5, 0.5]) {
          for (let dy of [-0.5, 0.5]) {
            let x = floor(player.position.x / chunkSize + worldSize * 0.5 + dx);
            let y = floor(player.position.y / chunkSize + worldSize * 0.5 + dy);
            if (x >= 0 && x < worldSize && y >= 0 && y < worldSize) {
              for (let feature of chunks[x][y].features) {
                item.collide(feature);
              }
            }
          }
        }
      }
      item.update();
      item.display();
    }
    pop();
  }

  load2() {
    push();
    // translate(this.x * chunkSize, this.y * chunkSize);
    // for (let i = 0; i < this.trees.length; i++) {
    //   this.trees[i].display("trunk");
    // }
    // for (let i = 0; i < this.items.length; i++) {
    //   this.items[i].display();
    // }
    // for (let i = 0; i < this.trees.length; i++) {
    //   this.trees[i].display("leaves");
    // }

    for (let feature of this.features) {
      if (feature.type == "tree") {
        feature.display("trunk");
      }
      if (feature.type == "tree") {
        feature.display("leaves");
      }
    }
    pop();
  }

  /*
  punch(w, h, x, y) {
    chunkx = floor(worldSize * 0.5 - x / chunkSize);
    chunky = floor(worldSize * 0.5 - y / chunkSize);

    // punch trees
    for (let i = 0; i < this.trees.length; i++) {
      if (
        this.trees[i].hover(
          mouseX - x - this.x * chunkSize - w,
          mouseY - y - this.y * chunkSize - h
        ) &&
        dist(
          this.trees[i].x,
          this.trees[i].y,
          -x - this.x * chunkSize,
          -y - this.y * chunkSize
        ) <
        50 + this.trees[i].s * 0.5
      ) {
        this.trees[i].s -= 1;
        if (this.trees[i].s < 20) {
          let count = random(this.trees[i].m / 10);
          for (let c = 0; c < count; c++) {
            this.items.push(new Item(this.trees[i].x, this.trees[i].y, "wood"));
          }
          this.trees.splice(i, 1);
        }
      }
    }

    // punch rocks
    for (let i = 0; i < this.rocks.length; i++) {
      if (
        this.rocks[i].hover(
          mouseX - x - this.x * chunkSize - w,
          mouseY - y - this.y * chunkSize - h
        ) &&
        dist(
          this.rocks[i].x,
          this.rocks[i].y,
          -x - this.x * chunkSize,
          -y - this.y * chunkSize
        ) <
        50 + this.rocks[i].s * 0.5
      ) {
        this.rocks[i].s -= 1;
        if (this.rocks[i].s < 30) {
          let count = random(this.rocks[i].m / 10);
          for (let c = 0; c < count; c++) {
            this.items.push(
              new Item(this.rocks[i].x, this.rocks[i].y, "stone")
            );
          }
          this.rocks.splice(i, 1);
        }
      }
    }
  }

  collect(x, y) {
    for (let i = 0; i < this.items.length; i++) {
      if (
        dist(
          this.items[i].pos.x,
          this.items[i].pos.y,
          -x - this.x * chunkSize,
          -y - this.y * chunkSize
        ) < 30 &&
        this.items[i].time > 30
      ) {
        let slotnum = 0;
        let full = false;
        while (slotnum < 8) {
          if (
            (slots[slotnum].item === this.items[i].item ||
              slots[slotnum].count == 0) &&
            slots[slotnum].count < maxStack
          ) {
            slots[slotnum].item = this.items[i].item;
            slots[slotnum].count++;
            break;
          } else {
            slotnum++;
          }
          if (slotnum == 8) {
            full = true;
          }
        }
        if (full === false) {
          plusone.push(new PlusOne(this.items[i].item));
          this.items.splice(i, 1);
        }
      }
    }
  }

  collide() {
    for (let i = 0; i < this.trees.length; i++) {
      let a = atan2(
        this.trees[i].y + y + vel.y + this.y * chunkSize,
        this.trees[i].x + x + vel.x + this.x * chunkSize
      );
      let d = dist(
        this.trees[i].x,
        this.trees[i].y,
        -x - vel.x - this.x * chunkSize,
        -y - vel.y - this.y * chunkSize
      );
      let s = 15 + this.trees[i].s * 0.5;
      if (d < s) {
        x += cos(a) * (s - d);
        y += sin(a) * (s - d);
      }
    }

    for (let i = 0; i < this.rocks.length; i++) {
      let a = atan2(
        this.rocks[i].y + y + vel.y + this.y * chunkSize,
        this.rocks[i].x + x + vel.x + this.x * chunkSize
      );
      let d = dist(
        this.rocks[i].x,
        this.rocks[i].y,
        -x - vel.x - this.x * chunkSize,
        -y - vel.y - this.y * chunkSize
      );
      let s = 15 + this.rocks[i].s * 0.5;
      if (d < s) {
        x += cos(a) * (s - d);
        y += sin(a) * (s - d);

        vel.set(0, 0);
      }
    }
  }
  */
}
