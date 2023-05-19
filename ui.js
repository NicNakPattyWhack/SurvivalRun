class Backpack {
  constructor(count) {
    this.slots = [];
    
    for (let i = 0; i < count; i++) {
      this.slots.push({ name: null, count: 0 });
    }
  }

  addItem(item) {
    for (let slot of this.slots) {
      if (slot.name == null) {
        slot.name = item;
        return true;
      } else if (slot.name == item) {
        slot.count++;
        return true;
      }
    }

    return false;
  }

  // display() {
  //   for (let slot of this.slots) {
  //     itemData[slot.name].display();
  //   }
  // }
}