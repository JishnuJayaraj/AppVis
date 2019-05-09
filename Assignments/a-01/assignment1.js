'use strict';

/*
*  defines multiply(), negate() and normalize() for matrices and vectors
*/
import {multiply, negate, normalize} from "../../js/util_transforms.js";

/*
 *  Assignment 1.1 a)
 *  ========
 *  return a quadratic identity matrix of size dim+1
 *  example: input:  dim=2
 *		   output: [ [1,0,0],
 *					 [0,1,0],
 *					 [0,0,1] ]
 */
function identityMatrix(dim) {
    let result = [];

    for(let i=0; i< dim+1; ++i) {
        result.push([]);          // so the inner array exists
        for(let j=0; j < dim+1 ; ++j) {
            if(i == j) {
                result [i][j] = 1;

            }
            else {
                result[i][j] = 0;
            }
        }
    }
    return result;
}

/*
 *  Assignment 1.1 b)
 *  ========
 *  return a quadratic scaling matrix of size s.length+1
 *  the values in the tuple 's'  represent the scale factors
 *  of the respective diagolan elements
 *  example: input:  s=[ 2, 4, 7 ]
 *		   output: [ [2,0,0,0],
 *					 [0,4,0,0],
 *					 [0,0,7,0],
 *					 [0,0,0,1] ]
 */
function scaleMatrix(s) {
    let result = [];

    for(let i=0; i< s.length+1; ++i) {
        result.push([]);          // so the inner array exists
        for(let j=0; j < s.length+1 ; ++j) {
            if(i == j) {
                result [i][j] = s[i];
                if(i === s.length) {
                    result[i][j] = 1;
                }

            }
            else {
                result[i][j] = 0;
            }
        }
    }

    return result;
}

/*
 *  Assignment 1.1 c)
 *  ========
 *  return a quadratic translation matrix 
 *  that, when applied to a point, moves it by 'translation'
 *  example: input:  translation=[ 4, 2]
 *		   output: [ [1,0,4],
 *					 [0,1,2],
 *					 [0,0,1] ]
 */
function translationMatrix(t) {
   // let result = [];

    let result = identityMatrix(t.length);
    for(let i=0; i<t.length; ++i) {
        result[i][t.length] = t[i] ;
    }

    return result;
}

/*
 *  Assignment 1.1 d)
 *  ========
 *  return a quadratic rotation matrix for 3D rotations
 *  that, when applied to a point, rotates it by 'angle' around 'axis'
 */
function rotationMatrix(angle, axis) {
    let result = [];

    let mat = identityMatrix(axis.length);
    let axle = normalize(axis);

    let c = Math.cos(angle);
    let t = 1 - c;
    let s = Math.sin(angle);

    let x = axle[0]; let y = axle[1]; let z = axle[2];

    mat[0][0] = x**2*t + c;
    mat[0][1] = x*y*t - z*s;
    mat[0][2] = x*z*t + y*s;
    mat[0][3] = 0;

    mat[1][0] = y*x*t + z*s;
    mat[1][1] = y**2*t + c;
    mat[1][2] = y*z*t - x*s;
    mat[1][3] = 0;

    mat[2][0] = z*x*t - y*s;
    mat[2][1] = z*y*t + x*s;
    mat[2][2] = z**2*t + c;
    mat[2][3] = 0;

    mat[3][0] = 0;
    mat[3][1] = 0;
    mat[3][2] = 0;
    mat[3][3] = 1;
    return mat;

    return result;
}

/*
 *  Assignment 1.2
 *  ========
 *  this method must return a matrix that scales around an 
 *  anchor point 'point'. this can, for instance, be used to 
 *  scale objects relativ to their current center of gravity.
 *  this method can be implemented in 3 lines by using the
 *  'translationMat()' and 'scaleMat()' methods which you implemented
 *  in the previous assignment. 
 *  use this method in the baseline algorithm in 'transformations.py'
 *  to scale a rectangle in-place
 */
function scaleRelativeMat(point, s) {
    

    // translate in negaitve dir
    // then scale
    // then move it back
    // T(p-)S(s)T(p)

    let result = translationMatrix(point);
    result  = multiply(result,scaleMatrix(s));
    result = multiply(result,translationMatrix(negate(point)));

    return result;
}

/*
 *  Assignment 1.3
 *  ========
 *  this method must return a matrix that that maps the
 *  rectangle 'rectFrom' to the rectangle 'rectTo'.
 *  An axis-aligned rectangle is a tuple '( (xMin,yMin), (xMax,yMax))'.
 *  use this method in the baseline algorithm in 'transformations.py'
 *  to map 'rectangle' to the given target rectangle
 */
function mapRectangleMatrix(rectFrom, rectTo) {
    let result = [];

// move the min corner of X to origin
// scale X to size of Y
// then move it to Y
// T(Ymin)S() T(-Ymin)
    let x =rectFrom;
    let y = rectTo;

    result = translationMatrix(negate(x));

    let xSize = [  x[1][0]-x[0][0], x[1][1]-x[0][1]  ];
    let ySize = [  y[1][0]-y[0][0], y[1][1]-y[0][1]  ];

    let s = [ y[ySize[0]] ]

    return result;
}

export {
    identityMatrix,
    scaleMatrix,
    translationMatrix,
    rotationMatrix,
    scaleRelativeMat,
    mapRectangleMatrix
};