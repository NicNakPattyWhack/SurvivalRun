function displayBackpackSlot(item) {
    rectMode(CENTER);
    textAlign(CENTER);

    stroke(44, 120);
    strokeWeight(3);
    noFill();
    rect(0, 0, 43, 43);
    noStroke();
    fill(64, 120);
    rect(0, 0, 40, 40);

    if (item.name != null) itemData[item.name].display();

    if (item.count > 0) {
        noStroke();
        fill(200);
        textSize(12);
        text(item.count, 8, 14);
    }
}

function displayWoodItem() {
    const woodx = [-5, 0, 5];
    const woody = [5, -5, 5];

    for (let i = 0; i < woodx.length; i++) {
        push();
        rectMode(CENTER);
        translate(woodx[i], woody[i]);

        noStroke();
        fill(105, 70, 27);
        rect(0, 0, 14, 10);
        stroke(85, 50, 7);
        strokeWeight(3);
        arc(7, 0, 10, 10, -PI / 2, PI / 2);
        line(-7, -5, 7, -5);
        line(-7, 5, 7, 5);
        line(3, 0, 7, 0);
        fill(163, 118, 62);
        circle(-7, 0, 10);
        stroke(143, 98, 42);
        point(-7, 0);
        pop();
    }
}

function displayStoneItem() {
    stroke(125);
    strokeWeight(3);
    fill(145);
    circle(0, 0, 20);
    noStroke();
    fill(160);
    circle(3, -3, 7);

    stroke(125);
    strokeWeight(3);
    fill(145);
    circle(8, 5, 10);
    noStroke();
    fill(160);
    circle(9, 4, 3);
}