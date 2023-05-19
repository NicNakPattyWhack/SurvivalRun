var sounds = {};
var audio;
var seed;
var worldSize = 64;
var chunkSize = 256;
var viewDist = 3;
var maxStack = 200;
var player;
var features = [];
var chunks = [];
var chunksSelected = [];
var plusone = [];
var vignette;
var showVignette = false;
var displayDebug = false;
var fs = false;
var maryHadALittleLamb = [3, 2, 1, 2, 3, 3, 3, 0, 2, 2, 2, 0, 3, 3, 3, 0, 3, 2, 1, 2, 3, 3, 3, 0, 2, 2, 3, 2, 1];

function preload() {
  sounds.pop = loadSound("pop.ogg");
  sounds.hit = loadSound("hit.ogg");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  pixelDensity(1);
  // frameRate(60);
  noCursor();

  w = width;
  h = height;

  // seed = floor(random(1000));
  seed = 2;
  noiseDetail(8, 0.5);
  randomSeed(seed);
  noiseSeed(seed);

  player = new Player(0 + 128, 0 + 128);

  for (let i = 0; i < worldSize; i++) {
    chunks[i] = [];
    for (let j = 0; j < worldSize; j++) {
      chunks[i].push(new Chunk(i, j));
    }
  }

  vignette = createImage(w, h);
  vignette.loadPixels();
  // for (let i = 0; i < w * 0.1 + 1; i++) {
  //   for (let j = 0; j < h * 0.1 + 1; j++) {
  //     let d = dist(i, j, w * 0.05, h * 0.05);
  //     vignette.set(i, j, color(0, 0, 0, d * 7));
  //   }
  // }
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < h; j++) {
      let x = map(i, 0, w, -1, 1);
      let y = map(j, 0, h, -1, 1);
      let d = dist(x, y, 0, 0);
      vignette.set(i, j, color(0, 0, 0, d * 255));
    }
  }
  vignette.updatePixels();

  // sounds.pop.play(0, 0.5, 10);
}

//=====================================================

function draw() {
  // /*ARY HAD A LITTLE LAMB*/ if (frameCount % 30 == 0) sounds.hit.play(0, maryHadALittleLamb[floor(frameCount / 30)] * 0.2 + 0.5, +(maryHadALittleLamb[floor(frameCount / 30)] > 0));

  background(82, 148, 44);
  strokeWeight(4);

  if (keyIsPressed === true) {
    if (keyIsDown(87)) {
      player.velocity.y += -1;
    }
    if (keyIsDown(83)) {
      player.velocity.y += 1;
    }
    if (keyIsDown(68)) {
      player.velocity.x += 1;
    }
    if (keyIsDown(65)) {
      player.velocity.x += -1;
    }
    player.velocity.setMag(4);
  }

  chunksSelected = [];
  for (let dx of [-0.5, 0.5]) {
    for (let dy of [-0.5, 0.5]) {
      let x = floor(player.position.x / chunkSize + worldSize * 0.5 + dx);
      let y = floor(player.position.y / chunkSize + worldSize * 0.5 + dy);
      if (x >= 0 && x < worldSize && y >= 0 && y < worldSize) {
        chunksSelected.push(chunks[x][y]);
      }
    }
  }

  for (let chunk of chunksSelected) {
    for (let i = chunk.features.length - 1; i >= 0; i--) {
      let feature = chunk.features[i];

      if (player.velocity.mag() > 0.125) player.collide(feature);

      if (player.armExtensionTime == 0.5625) {
        feature.punch();
        if (feature.radius < 15 && random() < 10) {
          let loot = random(feature.lootTable);
          for (let i = 0; i < max(loot.quantity, 1); i++) {
            chunk.items.push(new Item(loot.name, feature.x, feature.y, feature.chunkX, feature.chunkY, p5.Vector.random2D().mult(random(8))));
          }
          chunk.features.splice(i, 1);
        }
      }
    }

    for (let i = chunk.items.length - 1; i >= 0; i--) {
      let item = chunk.items[i];

      if (player.position.dist(item.position) < 30) {
        player.backpack.addItem(item.name);
        chunk.items.splice(i, 1);
      }
    }
  }

  player.update();

  push();
  translate(-player.position.x + w * 0.5, -player.position.y + h * 0.5);
  for (let i = -viewDist; i <= viewDist; i++) {
    for (let j = -viewDist; j <= viewDist; j++) {
      const x = player.chunk.x + i;
      const y = player.chunk.y + j;
      if (
        x >= 0 &&
        x < worldSize &&
        y >= 0 &&
        y < worldSize
      ) {
        chunks[x][y].generate();
        chunks[x][y].load0();
        chunks[x][y].load1();
      }
    }
  }
  pop();

  player.display();

  push();
  translate(-player.position.x + w * 0.5, -player.position.y + h * 0.5);
  for (let i = -viewDist; i <= viewDist; i++) {
    for (let j = -viewDist; j <= viewDist; j++) {
      if (
        player.chunk.x + i >= 0 &&
        player.chunk.x + i < worldSize &&
        player.chunk.y + j >= 0 &&
        player.chunk.y + j < worldSize
      ) {
        chunks[player.chunk.x + i][player.chunk.y + j].load2();
      }
    }
  }
  pop();

  for (let i = 0; i < plusone.length; i++) {
    plusone[i].show();
    if (plusone[i].t > 80) {
      plusone.splice(i, 1);
    }
  }

  if (showVignette) {
    image(vignette, 0, 0);
  }

  for (let i in player.backpack.slots) {
    let item = player.backpack.slots[i];

    push();
    translate(width / 2 - 161 + 46 * i, height - 23);
    displayBackpackSlot(item);
    pop();
  }

  noStroke();
  fill(200, 50);
  circle(mouseX, mouseY, 20);
  stroke(175, 50);
  noFill();
  circle(mouseX, mouseY, 24);

  if (displayDebug) {
    push();
    noStroke();
    fill(0, 100);
    rect(0, 0, 204, 84);
    noStroke();
    fill(255);
    textSize(15);
    text(`Position: ${nfs(-player.position.x, 0, 2)}, ${nfs(-player.position.y, 0, 2)}`, 4, 16);
    text(`Chunk: ${player.chunk.x - worldSize * 0.5}, ${player.chunk.y - worldSize * 0.5}`, 4, 32);
    text(`Velocity: ${nfs(player.velocity.x, 0, 2)}, ${nfs(player.velocity.y, 0, 2)}`, 4, 48);
    text(`Time: ${frameCount}`, 4, 64);
    text(`FPS: ${round(frameRate(), 1)}`, 4, 80);
    pop();
  }

  // push();
  // translate(200, 200);
  // scale(5);
  // stroke(255);
  // strokeWeight(3);
  // noFill();
  // rect(-20, -20, 40, 40)
  // wood(0, 0, 1);
  // stone(0, 0, 1);
  // pop();
}

//=====================================================

function mousePressed() {
  player.punch();

  // for (let )
}

function keyPressed() {
  if (key == "f") {
    if (fs === false) {
      fullscreen(true);
      fs = true;
      resizeCanvas(dw, dh);
      w = dw;
      h = dh;
    } else {
      fullscreen(false);
      fs = false;
      resizeCanvas(ww, wh);
      w = ww;
      h = wh;
    }
  }

  if (key == "i") {
    displayDebug = !displayDebug;
  }
}

//=====================================================

function calculateCollision(a, b) {
  let delta = p5.Vector.sub(a.position, b.position);
  let distance = delta.mag();
  let angle = atan2(delta.y, delta.x);
  let magnitude = a.radius + b.radius - distance;
  return createVector(cos(angle), sin(angle)).mult(magnitude);
}

//=====================================================

// function nooverlap() {
//   for (let i = trees.length - 1; i >= 0; i--) {
//     // remove trees overlapping trees
//     for (let j = trees.length - 1; j >= i; j--) {
//       if (trees[i].intersects(trees[j]) && i != j) {
//         trees.splice(j, 1);
//       }
//     }
//     // remove rocks overlapping trees
//     for (let j = rocks.length - 1; j >= 0; j--) {
//       if (trees[i].intersects(rocks[j])) {
//         if (trees[i].s > rocks[j].s * 0.5) {
//           rocks.splice(j, 1);
//         }
//       }
//     }
//   }
//   // remove rocks overlapping rocks
//   for (let i = rocks.length - 1; i >= 0; i--) {
//     for (let j = rocks.length - 1; j >= i; j--) {
//       if (rocks[i].intersects(rocks[j]) && i != j) {
//         rocks.splice(j, 1);
//       }
//     }
//     // remove trees overlapping rocks
//     for (let j = trees.length - 1; j >= 0; j--) {
//       if (rocks[i].intersects(trees[j])) {
//         if (rocks[i].s * 0.5 > trees[j].s) {
//           trees.splice(j, 1);
//         }
//       }
//     }
//   }
// }

//=====================================================

// class PlusOne {
//   constructor(item) {
//     this.item = item;
//     this.t = 0;
//     this.off = p5.Vector.random2D();
//     this.off.mult(10);
//   }
//   show() {
//     push();
//     translate(w * 0.5 - x + this.off.x, h * 0.5 - this.t - 30 - y + this.off.y);
//     textAlign(CENTER);
//     noStroke();
//     fill(0, 240, 0, 80 - this.t);
//     text("+1 " + this.item, x, y);
//     pop();

//     this.t++;
//   }
// }

//==================================================

// function Noise(x, y, n) {
//   let sum = 0;
//   let maximum = 0;
//   let scale = 1;
//   for (let i = 0; i < n; i++) {
//     scale *= 0.5;
//     maximum += scale;
//     sum += noise(x / scale + 65535, y / scale + 655365) * scale;
//   }
//   return map(sum, 0, maximum, 0, 1);
// }

// function colorMult(col, n) {
//   return color(red(col) * n, green(col) * n, blue(col) * n);
// }
