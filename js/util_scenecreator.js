
/**
 * creates a scene for a given canvas.
 * @param element: id of a canvas.
 * @param isPerspective: 0 for a perspective camera, 1 for an orthographic camera, 2 for both.
 */
function renderAssignment(element, isPerspective) {
    // get the widget that will be the canvas for this assignment.
    var widget = document.getElementById(element);

    // calculate width and height of canvas
    var width = widget.clientWidth;
    var height = widget.clientHeight;
    var aspect = width / height;

    // create THREE renderer fitting inside the element
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);

    // create scene and camera
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeec);
    var camera;
    if (isPerspective === 0) {
        camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
    } else if (isPerspective === 1) {
        camera = new THREE.OrthographicCamera(-3 * aspect, 3 * aspect, 3, -3, 1, 1000);
        camera.position.set(0, 0, 5);
        camera.lookAt(0, 0, 0);
    } else if (isPerspective === 2) {
        var perspective = new THREE.PerspectiveCamera(75, 0.5 * aspect, 0.1, 1000);
        perspective.position.set(0, 0, 5);
        perspective.lookAt(0, 0, 0);
        perspective.name = "perspective";

        var ortho = new THREE.OrthographicCamera(-3 * 0.5 * aspect, 3 * 0.5 * aspect, 3, -3, 1, 1000);
        ortho.position.set(0, 20, 0);
        ortho.lookAt(0, 0, 0);
        ortho.name = "ortho";

        camera = new THREE.Group();
        camera.add(perspective);
        camera.add(ortho);
    }
    scene.add(camera);

    // add coordinate system lines
    var axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // add a spotlights to the scene
    var spot1 = new THREE.SpotLight(0xffffff);
    spot1.position.set(150, 350, 250);
    scene.add(spot1);
    var spot2 = new THREE.SpotLight(0xdfdfdf);
    spot2.position.set(-350, -150, -250);
    scene.add(spot2);
    var dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    scene.add(dirLight);
    dirLight.position.set(0,30,30);

    // attach renderer to widget
    widget.appendChild(renderer.domElement);

    var renderObj = { scene: scene, renderer: renderer, camera: camera, isPerspective: isPerspective, width: width, height: height };

    // start rendering
    function renderMe() {
        requestAnimationFrame(renderMe);
        render(isPerspective, renderObj, width, height);
    }
    renderMe();


    window.addEventListener('resize', onWindowResize, false);
    function onWindowResize() {
        resizeWindow(element, renderObj);
    }

    // return references to all important objects of the scene.
    return renderObj;
}

function render(isPerspective, renderObj, width, height) {
    if (isPerspective === 0 || isPerspective === 1) {
        renderObj.renderer.render(renderObj.scene, renderObj.camera);
    } else if (isPerspective === 2) {
        renderObj.renderer.clear();

        // render with perspective camera
        renderObj.renderer.setViewport(0, 0, width * 0.5, height);
        renderObj.renderer.render(renderObj.scene, renderObj.camera.children[0]);

        // render with ortho camera
        renderObj.renderer.setViewport(width * 0.5, 0, width * 0.5, height);
        renderObj.renderer.render(renderObj.scene, renderObj.camera.children[1]);
    }
}

/**
 * resizes the canvas of a given element.
 * to be used if a window resize event happens
 * @param element: a string representing the id of a canvas.
 * @param threeObj: an object returned by renderAssignment(element).
 */
function resizeWindow(element, threeObj) {
    // get canvas widget and calculate its dimensions
    var widget = document.getElementById(element);
    var width = widget.clientWidth;
    var height = widget.clientHeight;
    var aspect = width / height;

    if (threeObj.isPerspective === 0) {
        // update aspect on perspective camera
        threeObj.camera.aspect = aspect;
        threeObj.camera.updateProjectionMatrix();
    } else if (threeObj.isPerspective === 1) {
        // update planes on orthographic camera
        threeObj.camera.left = -3 * aspect;
        threeObj.camera.right = 3 * aspect;
        threeObj.camera.top = 3;
        threeObj.camera.bottom = -3;
        threeObj.camera.updateProjectionMatrix();
    } else if (threeObj.isPerspective === 2) {
        // update planes on both perspective and orthographic camera
        threeObj.camera.children[0].aspect = aspect * 0.5;
        threeObj.camera.children[0].updateProjectionMatrix();

        threeObj.camera.children[1].left = -3 * 0.5 * aspect;
        threeObj.camera.children[1].right = 3 * 0.5 * aspect;
        threeObj.camera.children[1].top = -3;
        threeObj.camera.children[1].bottom = -3;
        threeObj.camera.children[1].updateProjectionMatrix();
    }
    // apply updates
    threeObj.renderer.setSize(width, height);
}

function cylinderBetweenTwoPoints(p1, p2, radius, material) {
    let pointX = new THREE.Vector3(p1[0], p1[1], p1[2]);
    let pointY = new THREE.Vector3(p2[0], p2[1], p2[2]);

    var direction = new THREE.Vector3().subVectors(pointY, pointX);

    if(direction.length() < 0.00001) {
        return undefined;
    }

    var orientation = new THREE.Matrix4();
    orientation.lookAt(pointX, pointY, new THREE.Object3D().up);
    orientation.multiply(new THREE.Matrix4().set(1, 0, 0, 0,
        0, 0, 1, 0,
        0, -1, 0, 0,
        0, 0, 0, 1));
    var edgeGeometry = new THREE.CylinderGeometry(radius, radius, direction.length(), 8, 1);
    var edge = new THREE.Mesh(edgeGeometry, material);
    edge.applyMatrix(orientation);
    // position based on midpoints - there may be a better solution than this
    edge.position.x = (pointY.x + pointX.x) / 2;
    edge.position.y = (pointY.y + pointX.y) / 2;
    edge.position.z = (pointY.z + pointX.z) / 2;
    return edge;
}

export {
    renderAssignment,
    cylinderBetweenTwoPoints
}