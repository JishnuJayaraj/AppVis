'use strict';

// ######################################################################### //
// ### Assignment 2.3 a) ################################################### //
// ######################################################################### //

/**
 * Assignment 2.3 a)
 * @param {array} matrix 
 * @param {number} nrow 
 * @param {number} ncol 
 * @returns a one dimensional matrix containing all elements of the two dimensional array "matrix".
 */
function convert2dTo1d(matrix, nrow, ncol) {
    let result = [];
    for(let i = 0; i < nrow; ++i) {
        for(let j = 0; j < ncol; ++j) {
            result.push(matrix[i][j]);
        }
    }
    return result;
}

/**
 * Assignment 2.3 a)
 * @param {*} array 
 * @param {*} nrow 
 * @param {*} ncol 
 */
function convert1dTo2d(array, nrow, ncol) {
    let result = [];
    if(array.length != nrow*ncol) {
        console.log("Number of rows and columns do not fit array!");
        return result;
    }

    for(let i = 0; i < nrow; ++i) {
        let row = [];
        for(let j = 0; j < ncol; ++j) {
            row.push(array[i*ncol + j]);
        }
        result.push(row);
    }

    return result;
}


// ######################################################################### //
// ### Assignment 2.3 b) ################################################### //
// ######################################################################### //

/**
 * Assignment 2.3 b)
 * @param {*} matrix
 * @param {*} index
 * @param {*} nrow
 * @param {*} ncol
 * @returns the value of matrix 
 */
function addressMatrixWith1dIndex(matrix, index, nrow, ncol) {
    return matrix[Math.floor(index/ncol)][index%ncol];
}


// ######################################################################### //
// ### Assignment 2.3 c) ################################################### //
// ######################################################################### //

/**
 * Assignment 2.3 c)
 * @param {*} array 
 * @param {*} nrow 
 * @param {*} ncol 
 * @returns a string representing the matrix with "<br>" as line breaks
 */
function printImage(array, nrow, ncol) {
    let result = "";
    for(let i = 0; i < nrow; ++i) {
        for(let j = 0; j < ncol; ++j) {
            result += array[i*ncol+j] + " ";
        }
        result += "<br>";
    }
    return result;
}


export {
    addressMatrixWith1dIndex,
    convert1dTo2d,
    convert2dTo1d,
    printImage
};
