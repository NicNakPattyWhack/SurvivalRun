var itemData = {
    wood: {
        // display: function display() { displayWoodItem(); },
        display: function display() { imageMode(CENTER); image(textures.items.wood, 0, 0); },
    },

    stone: {
        display: function display() { imageMode(CENTER); image(textures.items.stone, 0, 0); },
    }
};