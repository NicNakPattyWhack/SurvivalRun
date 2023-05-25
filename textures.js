function displayBackpackSlot(item, selected) {
    rectMode(CENTER);
    textAlign(CENTER);

    if (selected) {
        stroke(88, 120);
        strokeWeight(3);
        noFill();
        rect(0, 0, 43, 43);
        noStroke();
        fill(128, 120);
        rect(0, 0, 40, 40);
    } else {
        stroke(44, 120);
        strokeWeight(3);
        noFill();
        rect(0, 0, 43, 43);
        noStroke();
        fill(64, 120);
        rect(0, 0, 40, 40);
    }

    // if (selected) {
    //     stroke(120);
    //     strokeWeight(6);
    //     noFill();
    //     rect(0, 0, 43, 43);
    //     stroke(200);
    //     strokeWeight(3);
    //     rect(0, 0, 43, 43);
    // }

    if (item.name != null) itemData[item.name].display();

    if (item.count > 0) {
        noStroke();
        fill(200);
        textSize(12);
        text(item.count + 1, 8, 14);
    }
}

function createWoodTexture() {
    const woodx = [-5, 0, 5];
    const woody = [5, -5, 5];

    textures.items.wood.background(0, 0);
    textures.items.wood.translate(20, 20);

    for (let i = 0; i < woodx.length; i++) {
        textures.items.wood.push();
        textures.items.wood.rectMode(CENTER);
        textures.items.wood.translate(woodx[i], woody[i]);

        textures.items.wood.noStroke();
        textures.items.wood.fill(105, 70, 27);
        textures.items.wood.rect(0, 0, 14, 10);
        textures.items.wood.stroke(85, 50, 7);
        textures.items.wood.strokeWeight(3);
        textures.items.wood.arc(7, 0, 10, 10, -PI / 2, PI / 2);
        textures.items.wood.line(-7, -5, 7, -5);
        textures.items.wood.line(-7, 5, 7, 5);
        textures.items.wood.line(3, 0, 7, 0);
        textures.items.wood.fill(163, 118, 62);
        textures.items.wood.circle(-7, 0, 10);
        textures.items.wood.stroke(143, 98, 42);
        textures.items.wood.point(-7, 0);
        textures.items.wood.pop();
    }
}

function createStoneTexture() {
    textures.items.stone.background(0, 0);
    textures.items.stone.translate(20, 20);

    textures.items.stone.stroke(125);
    textures.items.stone.strokeWeight(3);
    textures.items.stone.fill(145);
    textures.items.stone.circle(0, 0, 20);
    textures.items.stone.noStroke();
    textures.items.stone.fill(160);
    textures.items.stone.circle(3, -3, 7);

    textures.items.stone.stroke(125);
    textures.items.stone.strokeWeight(3);
    textures.items.stone.fill(145);
    textures.items.stone.circle(8, 5, 10);
    textures.items.stone.noStroke();
    textures.items.stone.fill(160);
    textures.items.stone.circle(9, 4, 3);
}