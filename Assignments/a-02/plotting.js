'use strict';

/**
 * Assignment 2.4 a)
 * @param {number} x
 * @param {number} y
 * @returns {number} the value of f at (x,y)
 */
function func(x, y) {
    return undefined;
}

/**
 * Assignment 2.4 b)
 * @param {vec2} origin
 * @param {vec2} index
 * @param {number} step
 * @returns an array [x, y] representing the position in P space
 */
function CtoPSpace(origin, index, step) {
    return undefined;
}

/**
 * Assingment 2.4 c)
 * @param {number} size
 * @param {number} x
 * @param {number} y
 * @returns the index of (x,y) in a 1D array, which is a flattened size*size 2D array.
 */
function getIndex(size, x, y) {
    return undefined;
}

/**
 * Assignment 2.4 d)
 * @param {number} start
 * @param {number} end
 * @param {number} samples
 * @returns an array of samples from (start, start) to (end, end) using "samples"-samples
 *  in each dimension. Use the previously implemented function CtoPSpace to convert between
 *  coordinate systems. The returned array should consist of tuples, that contain [x, y, func(x, y)].
 */
function evaluateFunc(start, end, samples) {
    return [];
}

/**
 * Assignment 2.4 e)
 * @param {number} numSamples 
 * @returns an indexlist representing a triangulation of a numSamples * numSamples grid.
 */
function triangulateSamples(numSamples) {
    return [];
}

export {
    func,
    CtoPSpace,
    getIndex,
    evaluateFunc,
    triangulateSamples
};