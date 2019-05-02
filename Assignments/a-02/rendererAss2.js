'use strict';

import * as StudentSolution from "./plotting.js"
import * as SampleSolution from "./plotting_solution.js"
import * as Testing from "./testing.js"
import { renderAssignment } from "../../js/util_scenecreator.js";

let thisSolution = StudentSolution;
if (showSampleSolution) {
    thisSolution = SampleSolution;
}


// ######################################################################### //
// ### Assignment 2.3 ###################################################### //
// ######################################################################### //

Testing.printA();
let refreshPart1 = document.getElementById("refreshA");
refreshPart1.onclick = Testing.printA;
Testing.printC();
let refreshPart2 = document.getElementById("refreshB");
refreshPart2.onclick = Testing.printB;
Testing.printB();
let refreshPart3 = document.getElementById("refreshC");
refreshPart3.onclick = Testing.printC;


// ######################################################################### //
// ### Assignment 2.4 ###################################################### //
// ######################################################################### //

function renderAssignment2_4a() {
    // create scene, etc.
    var renderObj = renderAssignment("a2_4a", 0);

    // add xz-grid to the scene
    var gridHelper = new THREE.GridHelper(10, 10);
    renderObj.scene.add(gridHelper);

    // move camera to a decent position
    renderObj.camera.position.set(-1, 7, 7);
    renderObj.camera.lookAt(0, 0, 0);

    // execute assignment 2.4
    var sampleNum = 50;
    var samples = thisSolution.evaluateFunc(-5, 5, sampleNum);

    if (samples.length === 0) {
        console.log("evaluateFunc seems to be not implemented yet");
    } else {
        var pointGeometry = new THREE.Geometry();
        // create points out of samples
        for (let i = 0; i < samples.length; ++i) {
            pointGeometry.vertices.push(new THREE.Vector3(samples[i][0], samples[i][2] * 0.13, samples[i][1]));
        }
        var pointMaterial = new THREE.PointsMaterial({ color: 0xff0000, size: 4, sizeAttenuation: false });
        var points = new THREE.Points(pointGeometry, pointMaterial);
        renderObj.scene.add(points);
    }

    // allow camera controls
    var controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment2_4a();

function renderAssignment2_4b() {
    // create scene, etc.
    var renderObj = renderAssignment("a2_4b", 0);

    // add xz-grid to the scene
    var gridHelper = new THREE.GridHelper(10, 10);
    renderObj.scene.add(gridHelper);

    // move camera to a decent position
    renderObj.camera.position.set(-1, 7, 7);
    renderObj.camera.lookAt(0, 0, 0);

    // execute assignment 2.4
    var sampleNum = 20;
    var samples = thisSolution.evaluateFunc(-5, 5, sampleNum);

    if (samples.length !== 0) {

        var meshGeometry = new THREE.Geometry();
        // create points out of samples
        for (let i = 0; i < samples.length; ++i) {
            meshGeometry.vertices.push(new THREE.Vector3(samples[i][0], samples[i][2] * 0.13, samples[i][1]));
        }

        // execute assignment 2.4 e)
        var sampleFaces = thisSolution.triangulateSamples(sampleNum);
        if (sampleFaces.length === 0) {
            console.log("evaluateFunc seems to be not implemented yet");
        } else {
            for (let i = 0; i < sampleFaces.length; ++i) {
                meshGeometry.faces.push(new THREE.Face3(sampleFaces[i][0], sampleFaces[i][1], sampleFaces[i][2]));
            }

            // update mesh normals to allow for phong shading
            meshGeometry.computeFaceNormals();
            meshGeometry.computeVertexNormals();

            var meshMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000, side: THREE.DoubleSide });
            var mesh = new THREE.Mesh(meshGeometry, meshMaterial);
            renderObj.scene.add(mesh);
        }
    }

    // allow camera controls
    var controls = new THREE.OrbitControls(renderObj.camera, renderObj.renderer.domElement);
}
renderAssignment2_4b();

export {
    renderAssignment2_4a,
    renderAssignment2_4b
};