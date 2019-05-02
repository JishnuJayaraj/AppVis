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
    let result = [];
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
    let result = [];
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