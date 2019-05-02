function multiply(a, b) {
    if (a.length === undefined) {
        // a is not vector nor matrix
        if (b.length === undefined) {
            // b is not vector nor matrix
            return a * b;
        } else if (b.length > 0 && b[0].length === undefined) {
            // b is a vector
            return multiplyVectorScalar(b, a);
        } else {
            // b is a matrix
            return multiplyMatrixScalar(b, a);
        }
    } else if (a.length > 0 && a[0].length === undefined) {
        // a is a vector
        if (b.length === undefined) {
            // b is a scalar
            return multiplyVectorScalar(a, b);
        } else if (b.length > 0 && b[0].length === undefined) {
            // b is a vector
            return dot(a, b);
        } else {
            // b is a matrix
            return multiplyVectorMatrix(a, b);
        }
    } else {
        // a is a matrix
        if (b.length === undefined) {
            // b is a scalar
            return multiplyMatrixScalar(a, b);
        } else if (b.length > 0 && b[0].length === undefined) {
            // b is a vector
            return multiplyMatrixVector(a, b);
        } else {
            // b is a matrix
            return multiplyMatrices(a, b);
        }
    }
}

function multiplyMatrices(a, b) {
    let aRows = a.length, aCols = a[0].length;
    let bCols = b[0].length;

    var result = new Array(aRows);
    for (let row = 0; row < aRows; ++row) {
        result[row] = new Array(bCols)
        for (let col = 0; col < bCols; ++col) {
            result[row][col] = 0;
            for (let i = 0; i < aCols; ++i) {
                result[row][col] += a[row][i] * b[i][col];
            }
        }
    }

    return result;
}

function multiplyMatrixVector(mat, vec) {
    var vecMat = new Array(vec.length).fill(null).map((ri, i) => [vec[i]]);
    var intermediate = multiplyMatrices(mat, vecMat);
    var result = new Array(intermediate.length).fill(0).map((ri, i) => intermediate[i][0]);
    return result;
}

function multiplyMatrixScalar(mat, scal) {
    var result = new Array(mat.length);
    for (let i = 0; i < mat.length; ++i) {
        result[i] = new Array(mat[i].length);
        for (let j = 0; j < mat[i].length; ++j) {
            result[i][j] = mat[i][j] * scal;
        }
    }
    return result;
}

function multiplyVectorMatrix(vec, mat) {
    var vecMat = new Array(1).fill(null);
    vecMat[0] = new Array(vec.length).fill(0).map((vi, i) => { return vec[i] });
    var intermediate = multiplyMatrices(vecMat, mat);
    var result = new Array(intermediate.length).fill(0).map((ri, i) => intermediate[0][i]);
    return result;
}

// calculates dot product of vectors a and b
function dot(a, b) {
    let result = 0;
    a.forEach((ai, i) => {
        result += ai * b[i];
    });
    return result;
}

function multiplyVectorScalar(vec, scal) {
    var result = new Array(vec.length).fill(0);
    for (let i = 0; i < vec.length; ++i) {
        result[i] = vec[i] * scal;
    }
    return result;
}

function negate(a) {
    if (a.length === undefined) {
        return -a;
    } else if (a.length > 0 && a[0].length === undefined) {
        return negateVector(a);
    } else {
        return negateMatrix(a);
    }
}

function negateVector(vec) {
    return multiplyVectorScalar(vec, -1);
}

function negateMatrix(mat) {
    return multiplyMatrixScalar(mat, -1);
}

function normalize(vec) {
    let length = 0;
    for (let i = 0; i < vec.length; ++i) {
        length += vec[i] ** 2;
    }
    length = Math.sqrt(length);
    let result = new Array(vec.length);
    for (let i = 0; i < vec.length; ++i) {
        result[i] = vec[i] / length;
    }
    return result;
}

export {
    negate,
    multiply,
    normalize
};