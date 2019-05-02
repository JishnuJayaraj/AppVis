'use strict';

import * as StudentSolution from "./assignment1.js";
import * as SampleSolution from "./assignment1_solution.js";
import { renderAssignment } from "../../js/util_scenecreator.js"

let thisSolution = StudentSolution;
if (showSampleSolution) {
    thisSolution = SampleSolution;
}

/**
 * converts a 4x4 matrix in js-style ([ [a1, b1, ...], [a2, b2, ...], ...])
 * to a Matrix4 needed in THREE.js.
 */
function matToMatrix4(mat) {
    let m = new THREE.Matrix4();
    m.set(mat[0][0], mat[0][1], mat[0][2], mat[0][3],
        mat[1][0], mat[1][1], mat[1][2], mat[1][3],
        mat[2][0], mat[2][1], mat[2][2], mat[2][3],
        mat[3][0], mat[3][1], mat[3][2], mat[3][3]);
    return m;
}

/**
 * converts a 3x3 matrix in js-style ([ [a1, b1, ...], [a2, b2, ...], ...])
 * to a Matrix4 needed in THREE.js.
 */
function mat3ToMatrix4(mat) {
    let m = new THREE.Matrix4();
    m.set(mat[0][0], mat[0][1], 0, mat[0][2],
        mat[1][0], mat[1][1], 0, mat[1][2],
        0, 0, 1, 0,
        mat[2][0], mat[2][1], 0, mat[2][2]);
    return m;
}


// ######################################################################### //
// ### Assignment 1.1: Transformations ##################################### //
// ######################################################################### //

// updates the green cube in assignment 1.1
function updateScaleCube(cube) {
    let sliderX = document.getElementById("scaleX");
    let valueX = document.getElementById("xValueScale");
    let xVal = sliderX.value / 100.0;
    let sliderY = document.getElementById("scaleY");
    let valueY = document.getElementById("yValueScale");
    let yVal = sliderY.value / 100.0;
    let sliderZ = document.getElementById("scaleZ");
    let valueZ = document.getElementById("zValueScale");
    let zVal = sliderZ.value / 100.0;
    let scaleMat = SampleSolution.scaleMatrix([xVal, yVal, zVal]);
    cube.matrix.set(scaleMat[0][0], scaleMat[0][1], scaleMat[0][2], scaleMat[0][3],
        scaleMat[1][0], scaleMat[1][1], scaleMat[1][2], scaleMat[1][3],
        scaleMat[2][0], scaleMat[2][1], scaleMat[2][2], scaleMat[2][3],
        scaleMat[3][0], scaleMat[3][1], scaleMat[3][2], scaleMat[3][3]);
    valueX.innerHTML = xVal;
    valueY.innerHTML = yVal;
    valueZ.innerHTML = zVal;

    sliderX.oninput = function () {
        updateScaleCube(cube);
    }
    sliderY.oninput = function () {
        updateScaleCube(cube);
    }
    sliderZ.oninput = function () {
        updateScaleCube(cube);
    }
}

// updates the blue cube in assignment 1.1
function updateTranslationCube(cube) {
    let sliderX = document.getElementById("translationX");
    let valueX = document.getElementById("xValueTranslation");
    let xVal = sliderX.value / 100.0;
    let sliderY = document.getElementById("translationY");
    let valueY = document.getElementById("yValueTranslation");
    let yVal = sliderY.value / 100.0;
    let sliderZ = document.getElementById("translationZ");
    let valueZ = document.getElementById("zValueTranslation");
    let zVal = sliderZ.value / 100.0;
    let translationMat = thisSolution.translationMatrix([xVal, yVal, zVal]);
    cube.matrix.set(translationMat[0][0], translationMat[0][1], translationMat[0][2], translationMat[0][3],
        translationMat[1][0], translationMat[1][1], translationMat[1][2], translationMat[1][3],
        translationMat[2][0], translationMat[2][1], translationMat[2][2], translationMat[2][3],
        translationMat[3][0], translationMat[3][1], translationMat[3][2], translationMat[3][3]);
    valueX.innerHTML = xVal;
    valueY.innerHTML = yVal;
    valueZ.innerHTML = zVal;

    sliderX.oninput = function () {
        updateTranslationCube(cube);
    }
    sliderY.oninput = function () {
        updateTranslationCube(cube);
    }
    sliderZ.oninput = function () {
        updateTranslationCube(cube);
    }
}

// updates the blue cube in assignment 1.1
function updateRotationCube(cube) {
    let sliderX = document.getElementById("rotationX");
    let valueX = document.getElementById("xValueRotation");
    let xVal = sliderX.value / 100.0;
    let sliderY = document.getElementById("rotationY");
    let valueY = document.getElementById("yValueRotation");
    let yVal = sliderY.value / 100.0;
    let sliderZ = document.getElementById("rotationZ");
    let valueZ = document.getElementById("zValueRotation");
    let zVal = sliderZ.value / 100.0;
    let angleSlider = document.getElementById("rotationAngle");
    let angleValue = document.getElementById("angleValue");
    let angle = angleSlider.value / 100.0;
    let rotationMat = thisSolution.rotationMatrix(angle, [xVal, yVal, zVal]);
    cube.matrix.set(rotationMat[0][0], rotationMat[0][1], rotationMat[0][2], rotationMat[0][3],
        rotationMat[1][0], rotationMat[1][1], rotationMat[1][2], rotationMat[1][3],
        rotationMat[2][0], rotationMat[2][1], rotationMat[2][2], rotationMat[2][3],
        rotationMat[3][0], rotationMat[3][1], rotationMat[3][2], rotationMat[3][3]);
    valueX.innerHTML = xVal;
    valueY.innerHTML = yVal;
    valueZ.innerHTML = zVal;
    angleValue.innerHTML = angle;

    sliderX.oninput = function () {
        updateRotationCube(cube);
    }
    sliderY.oninput = function () {
        updateRotationCube(cube);
    }
    sliderZ.oninput = function () {
        updateRotationCube(cube);
    }
    angleSlider.oninput = function () {
        updateRotationCube(cube);
    }
}

// renders assignment 1.1
function renderAssignment1() {
    // create scene, etc.
    let renderObj = renderAssignment("a1", 0);

    // execute assignment 1.1 a)
    let identityMat = thisSolution.identityMatrix(3);
    if (identityMat.length === 0) {
        console.log("Method identityMatrix seems to be not implemented yet");
    }
    else {
        // create red cube using the identityMat
        let identityCubeGeo = new THREE.BoxGeometry(1, 1, 1);
        let identityMaterial = new THREE.MeshPhongMaterial({ color: 0xef0000 });
        let identityCube = new THREE.Mesh(identityCubeGeo, identityMaterial);
        identityCube.matrixAutoUpdate = false;
        identityCube.name = "identityCube";
        identityCube.matrix = matToMatrix4(identityMat);
        renderObj.scene.add(identityCube);

        let hideIdentityCube = document.getElementById("identityEnable");
        hideIdentityCube.oninput = function () {
            let status = hideIdentityCube.checked;
            renderObj.scene.children.forEach(child => {
                if (child.name === "identityCube") {
                    child.visible = !status;
                }
            });
        }
        hideIdentityCube.oninput();
    }

    // create geometry for assignment 1.1 b)
    let scaleMat = thisSolution.scaleMatrix([2, 0.4, 0.6]);
    if (scaleMat.length === 0) {
        console.log("Method scaleMatrix seems to be not implemented yet");
    }
    else {
        // create green cube using scaleMat
        let scaleCubeGeo = new THREE.BoxGeometry(1, 1, 1);
        let scaleMaterial = new THREE.MeshPhongMaterial({ color: 0x00ef00 });
        let scaleCube = new THREE.Mesh(scaleCubeGeo, scaleMaterial);
        scaleCube.matrixAutoUpdate = false;
        scaleCube.name = "scaleCube";
        renderObj.scene.add(scaleCube);

        // execute and display assignment 1.1 b)
        updateScaleCube(scaleCube);
        let hideScaleCube = document.getElementById("scaleEnable");
        hideScaleCube.oninput = function () {
            let status = hideScaleCube.checked;
            renderObj.scene.children.forEach(child => {
                if (child.name === "scaleCube") {
                    child.visible = !status;
                }
            });
        }
        hideScaleCube.oninput();
    }


    if (thisSolution.translationMatrix([0, 0, 0]).length === 0) {
        console.log("Method translationMatrix seems to be not implemented yet");
    }
    else {
        // create geometry for assignment 1.1 c)
        let translationCubeGeo = new THREE.BoxGeometry(1, 1, 1);
        let translationMaterial = new THREE.MeshPhongMaterial({ color: 0x0000ef });
        let translationCube = new THREE.Mesh(translationCubeGeo, translationMaterial);
        translationCube.matrixAutoUpdate = false;
        translationCube.name = "translationCube";
        renderObj.scene.add(translationCube);

        // execute and display assignment 1.1 c)
        updateTranslationCube(translationCube);
        let hideTranslationCube = document.getElementById("translationEnable");
        hideTranslationCube.oninput = function () {
            let status = hideTranslationCube.checked;
            renderObj.scene.children.forEach(child => {
                if (child.name === "translationCube") {
                    child.visible = !status;
                }
            });
        }
        hideTranslationCube.oninput();
    }


    if (thisSolution.rotationMatrix(2, [1, 1, 0.5]).length === 0) {
        console.log("Method translationMatrix seems to be not implemented yet");
    }
    else {
        // create geometry for assignment 1.1 d)
        let rotationCubeGeo = new THREE.BoxGeometry(1, 1, 1);
        let rotationMaterial = new THREE.MeshPhongMaterial({ color: 0x00efef });
        let rotationCube = new THREE.Mesh(rotationCubeGeo, rotationMaterial);
        rotationCube.matrixAutoUpdate = false;
        rotationCube.name = "rotationCube";
        renderObj.scene.add(rotationCube);

        // execute and display assignment 1.1 c)
        updateRotationCube(rotationCube);
        let hideRotationCube = document.getElementById("rotationEnable");
        hideRotationCube.oninput = function () {
            let status = hideRotationCube.checked;
            renderObj.scene.children.forEach(child => {
                if (child.name === "rotationCube") {
                    child.visible = !status;
                }
            });
        }
        hideRotationCube.oninput();
    }

    // allow camera controls
    let controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment1();


// ######################################################################### //
// ### Assignment 1.2: Scaling Around an Anchor Point ###################### //
// ######################################################################### //

// updates both the cube and the point in assignment 1.2
function updateAssignment2(box, point) {
    let sliderX = document.getElementById("Scale2X");
    let valueX = document.getElementById("xValueScale2");
    let xVal = sliderX.value / 100.0;
    let sliderY = document.getElementById("Scale2Y");
    let valueY = document.getElementById("yValueScale2");
    let yVal = sliderY.value / 100.0;
    let sliderZ = document.getElementById("Scale2Z");
    let valueZ = document.getElementById("zValueScale2");
    let zVal = sliderZ.value / 100.0;

    let psliderX = document.getElementById("anchorPointX");
    let pvalueX = document.getElementById("xValueAnchorPoint");
    let pxVal = psliderX.value / 100.0;
    let psliderY = document.getElementById("anchorPointY");
    let pvalueY = document.getElementById("yValueAnchorPoint");
    let pyVal = psliderY.value / 100.0;
    let psliderZ = document.getElementById("anchorPointZ");
    let pvalueZ = document.getElementById("zValueAnchorPoint");
    let pzVal = psliderZ.value / 100.0;


    let translationMat = thisSolution.scaleRelativeMat([pxVal, pyVal, pzVal], [xVal, yVal, zVal]);
    box.matrix.set(translationMat[0][0], translationMat[0][1], translationMat[0][2], translationMat[0][3],
        translationMat[1][0], translationMat[1][1], translationMat[1][2], translationMat[1][3],
        translationMat[2][0], translationMat[2][1], translationMat[2][2], translationMat[2][3],
        translationMat[3][0], translationMat[3][1], translationMat[3][2], translationMat[3][3]);

    point.position.set(pxVal, pyVal, pzVal);

    valueX.innerHTML = xVal;
    valueY.innerHTML = yVal;
    valueZ.innerHTML = zVal;

    pvalueX.innerHTML = pxVal;
    pvalueY.innerHTML = pyVal;
    pvalueZ.innerHTML = pzVal;

    sliderX.oninput = function () {
        updateAssignment2(box, point);
    }
    sliderY.oninput = function () {
        updateAssignment2(box, point);
    }
    sliderZ.oninput = function () {
        updateAssignment2(box, point);
    }

    psliderX.oninput = function () {
        updateAssignment2(box, point);
    }
    psliderY.oninput = function () {
        updateAssignment2(box, point);
    }
    psliderZ.oninput = function () {
        updateAssignment2(box, point);
    }
}

// renders assignment 1.2
function renderAssignment2() {
    // create render context, etc.
    let obj = renderAssignment("a2", 0);
    let scene = obj.scene;

    // create anchor point representation at [point].
    let pointGeo = new THREE.SphereGeometry(0.06, 32, 32);
    //pointGeo.vertices.push(new THREE.Vector3(0, 0, 0));
    //let pointMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 4, sizeAttenuation: false });
    let pointMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    let point = new THREE.Mesh(pointGeo, pointMaterial);
    scene.add(point);

    // create a box where one corner touches the anchor point
    let boxGeo = new THREE.BoxGeometry(1, 1, 1);
    let boxMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    let box = new THREE.Mesh(boxGeo, boxMaterial);
    box.matrixAutoUpdate = false;
    scene.add(box);

    // execute and display assignment 1.2
    if (thisSolution.scaleRelativeMat([0, 0, 0], [0, 0, 0]).length === 0) {
        console.log("Method scaleRelativeMat seems to be not implemented yet");
    }
    else {
        updateAssignment2(box, point);
    }

    // allow camera controls
    let controls = new THREE.OrbitControls(obj.camera, obj.renderer.domElement);
}
renderAssignment2();



// ######################################################################### //
// ### Assignment 1.3: Mapping Rectangles ################################## //
// ######################################################################### //

// renders assignment 1.3
function renderAssignment3() {
    // create render context, etc.
    let renderObj = renderAssignment("a3", 0);

    // create the rectangle representing the target mapping (red)
    let rectToGeo = new THREE.PlaneGeometry(2, 1);
    let rectToMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide });
    let rectTo = new THREE.Mesh(rectToGeo, rectToMaterial);
    rectTo.matrixAutoUpdate = false;
    let rectToPosition = [-1, -1.6, 0];
    let translation = SampleSolution.translationMatrix(rectToPosition);
    rectTo.matrix = matToMatrix4(translation);
    renderObj.scene.add(rectTo);

    // create the rectangle that should be mapped to the red one (green)
    let rectFromGeo = new THREE.PlaneGeometry(0.8, 0.7);
    let rectFromMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00, side: THREE.DoubleSide });
    let rectFrom = new THREE.Mesh(rectFromGeo, rectFromMaterial);
    rectFrom.matrixAutoUpdate = false;
    rectFrom.matrix = matToMatrix4(SampleSolution.identityMatrix(3));
    renderObj.scene.add(rectFrom);

    // create [[minX,minY],[maxX,maxY]] of both rectangles
    let rectToArray = assignment3Helper(rectTo);
    let rectFromArray = assignment3Helper(rectFrom);

    // compute the matrix of rectFrom with the solution of assignment 3
    if (thisSolution.mapRectangleMatrix([[0, 0], [0, 0]], [[0, 0], [0, 0]]).length === 0) {
        console.log("Method mapRectangleMatrix seems to be not implemented yet");
    }
    else {
        let matrix = thisSolution.mapRectangleMatrix(rectFromArray, rectToArray);
        // apply the calculated matrix
        rectFrom.matrix = mat3ToMatrix4(matrix);
        // move the rectangle slightly in positive z direction, so that both rectangles appear on top of each other.
        rectFrom.matrix.elements[14] += 0.01;
    }


    // allow camera controls
    let controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment3();

/**
 * returns [ [minX, minY], [maxX, maxY] ] of a THREE.Mesh rectangle for assignment 1.3
 * @param rectThreeObj: the result of a new THREE.Mesh(THREE.PlaneGeometry, material).
 */
function assignment3Helper(rectThreeObj) {
    let result = [[Infinity, Infinity], [-Infinity, -Infinity]];
    for (let i = 0; i < 4; ++i) {
        let vert = rectThreeObj.geometry.vertices[i].clone();
        vert.applyMatrix4(rectThreeObj.matrix);

        // vert.x > maxX
        if (vert.x > result[1][0]) {
            result[1][0] = vert.x;
        }
        // vert.x < minX
        if (vert.x < result[0][0]) {
            result[0][0] = vert.x;
        }

        // vert.y > maxY
        if (vert.y > result[1][1]) {
            result[1][1] = vert.y;
        }
        // vert.y < minY
        if (vert.y < result[0][1]) {
            result[0][1] = vert.y;
        }
    }
    return result;
}


//export {
//    renderAssignment1,
//    renderAssignment2,
//    renderAssignment3
//};