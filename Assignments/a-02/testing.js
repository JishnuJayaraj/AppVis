'use strict';

import * as SampleSolution from "./mapping_solution.js"
import * as StudentSolution from "./mapping.js"

import { randInt } from "../../js/random.js"
import { readAsText } from "../../js/util_files.js"

let thisSolution = StudentSolution;
if (showSampleSolution) {
    thisSolution = SampleSolution;
}

// stringifies 1D-array.
function arrayToString(array) {
    let arrayString = "";
    for (let i = 0; i < array.length; ++i) {
        arrayString += array[i] + " ";
    }
    return arrayString;
}

// stringifies 2D-matrix
function matrixToString(matrix) {
    let matrixString = "";
    for (let i = 0; i < matrix.length; ++i) {
        for (let j = 0; j < matrix[i].length; ++j) {
            matrixString += matrix[i][j] + " ";
        }
        matrixString += "<br>";
    }
    return matrixString;
}

// creates random matrix.
function createRandomMatrixArray() {
    // set up matrix and array to contain the same random values
    let matrix = [];
    let array = [];
    let r = randInt(2, 7);
    let c = randInt(2, 7);
    for (let i = 0; i < r; ++i) {
        let row = [];
        for (let j = 0; j < c; ++j) {
            let randomInt = randInt(0, 9);
            row.push(randomInt);
            array.push(randomInt);
        }
        matrix.push(row);
    }
    return { matrix: matrix, array: array, r: r, c: c };
}

// prints the result for assignment 2.3 a)
function printA() {
    let printArea = document.getElementById("printAreaA");

    let randomized = createRandomMatrixArray();

    let areaString = "Matrix:<br>" + matrixToString(randomized.matrix);
    let to2d = thisSolution.convert1dTo2d(randomized.array, randomized.r, randomized.c);
    if (to2d.length === 0) {
        areaString += "<br>Yours:<br>" + "Seems like 'convert1dTo2d' has not been implemented yet!";
    } else {
        areaString += "<br>Yours:<br>" + matrixToString(to2d);
    }
    areaString += "<br>";
    areaString += "<br>Array:<br>" + arrayToString(randomized.array);
    let to1d = thisSolution.convert2dTo1d(randomized.matrix, randomized.r, randomized.c);
    if (to1d.length === 0) {
        areaString += "<br>Yours:<br>" + "Seems like 'convert2dTo1d' has not been implemented yet!";
    } else {
        areaString += "<br>Yours:<br>" + arrayToString(to1d);
    }

    printArea.innerHTML = areaString;
}

// prints the result for assignment 2.3 b)
function printB() {
    let printArea = document.getElementById("printAreaB");

    let randomized = createRandomMatrixArray();

    let n = randInt(0, randomized.r * randomized.c - 1);

    let areaString = "Matrix:<br>" + matrixToString(randomized.matrix);
    areaString += "<br>Array[" + n + "] = " + randomized.array[n];
    let solution = thisSolution.addressMatrixWith1dIndex(randomized.matrix, n, randomized.r, randomized.c)

    if (solution === undefined) {
        solution = "Seems like 'addressMatrixWith1dIndex' has not been implemented yet!"
        console.log(solution);

    }
    areaString += "<br>Yours: " + solution;
    printArea.innerHTML = areaString;
}

// prints the result for assignment 2.3 c)
function printC() {
    let printArea = document.getElementById("printAreaC");

    readAsText("./image.txt", function (fileContents, nrow, ncol) {
        let string = thisSolution.printImage(fileContents, nrow, ncol);
        if (string.length === 0) {
            string = "Seems like 'printImage' has not been implemented yet!"
            console.log(string);
        }
        printArea.innerHTML = string;
    });
}

export {
    printA,
    printB,
    printC
}