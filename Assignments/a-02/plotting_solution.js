'use strict';

/**
 * Assignment 2.4 a)
 * @param {number} x 
 * @param {number} y 
 */
function func(x, y) {
    return x * y;
}

/**
 * Assignment 2.4 b)
 * @param {array} origin 
 * @param {array} index 
 * @param {number} step 
 */
function CtoPSpace(origin, index, step) {
    var x = origin[0] + index[0] * step;
    var y = origin[1] + index[1] * step;
    return [x, y];
}

/**
 * Assingment 2.4 c)
 * @param {number} size 
 * @param {number} x 
 * @param {number} y 
 */
function getIndex(size, x, y) {
    return x + size * y;
}

/**
 * Assignment 2.4 d)
 * @param {number} start 
 * @param {number} end 
 * @param {number} samples 
 */
function evaluateFunc(start, end, samples) {
    var step = (end - start) / (samples - 1.0);

    var values = [];

    for (let i = 0; i < samples; ++i) {
        for (let j = 0; j < samples; ++j) {
            var value = CtoPSpace([start, start], [j, i], step);
            let x = value[0];
            let y = value[1];
            values.push([x, y, func(x, y)]);
        }
    }
    return values;
}

/**
 * Assignment 2.4 e)
 * @param {number} numSamples 
 */
function triangulateSamples(numSamples) {
    var faceIndices = [];
    for (let i = 0; i < numSamples - 1; ++i) {
        for (let j = 0; j < numSamples - 1; ++j) {
            const offset = j * numSamples;
            faceIndices.push([offset + i, offset + i + numSamples + 1, offset + i + 1]);
            faceIndices.push([offset + i, offset + i + numSamples, offset + i + numSamples + 1]);
        }
    }
    return faceIndices;
}

export {
    func,
    CtoPSpace,
    getIndex,
    evaluateFunc,
    triangulateSamples
};