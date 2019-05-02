"use strict";

// generates random float in range [min, max].
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}

// generates random int in range [min, max].
function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export {
    randInt,
    randFloat
};