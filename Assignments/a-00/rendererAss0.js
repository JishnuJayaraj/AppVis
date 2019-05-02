'use strict';

import * as StudentSolution from "./assignment0.js";
import * as SampleSolution from "./assignment0_solution.js";
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
// ### Assignment 0.1: Draw Polygon ######################################## //
// ######################################################################### //

// renders assignment 1.1
function renderAssignment1() {
    // create scene, etc.
    let renderObj = renderAssignment("a1", 0);

    let material = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    let points = thisSolution.randomPolygon();


    let polygonGeometry = new THREE.Geometry();
    let sphereGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    let sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xff8800} );

    points.forEach((v,i) => {
        polygonGeometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));

        let sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
        sphere.position.set(v[0], v[1], v[2]);
        renderObj.scene.add( sphere );
    });
        
    let line = new THREE.Line( polygonGeometry, material );
    renderObj.scene.add( line );

    // allow camera controls
    let controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment1();


// ######################################################################### //
// ### Assignment 0.2: Plot Function ####################################### //
// ######################################################################### //

// renders assignment 0.2
function renderAssignment2() {
    // create render context, etc.
    let renderObj = renderAssignment("a2", 0);
    
    let material = new THREE.LineBasicMaterial({
        color: 0x000000
    });

    let points = thisSolution.drawFunction();

    let polygonGeometry = new THREE.Geometry();

    points.forEach((v,i) => {
        polygonGeometry.vertices.push(new THREE.Vector3(v[0], v[1], v[2]));
    });
        
    let line = new THREE.Line( polygonGeometry, material );
    renderObj.scene.add( line );

    // allow camera controls
    let controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment2();