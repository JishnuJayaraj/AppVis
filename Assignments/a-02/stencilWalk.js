var A = [1, 1];
var B = [7, 1];
var C = [9, 7];
var D = [0, 11];

function Phi(u, v) {
    let phi0 = (1 - u) * (1 - v);
    let phi1 = u * (1 - v);
    let phi2 = (1 - u) * v;
    let phi3 = u * v;

    let x = phi0 * A[0] + phi1 * B[0] + phi2 * C[0] + phi3 * D[0];
    let y = phi0 * A[1] + phi1 * B[1] + phi2 * C[1] + phi3 * D[1];
    return [x, y];
}

function Jacobian(u, v) {
    let dxdu = (v - 1) * A[0] + (1 - v) * B[0] - v * D[0] + v * C[0]
    let dydu = (v - 1) * A[1] + (1 - v) * B[1] - v * D[1] + v * C[1]

    let dxdv = (u - 1) * A[0] - u * B[0] + (1 - u) * D[0] + u * C[0]
    let dydv = (u - 1) * A[1] - u * B[1] + (1 - u) * D[1] + u * C[1]

    return [[dxdu, dxdv], [dydu, dydv]];
}

function invJacobian(u, v) {
    let J = Jacobian(u, v);
    let iDetJ = 1 / (J[0][0] * J[1][1] - J[0][1] * J[1][0]);
    return [[iDetJ * J[1][1], -iDetJ * J[0][1]], [-iDetJ * J[1][0], iDetJ * J[0][0]]];
}

function update(u, v, x, y) {
    let P = Phi(u, v);
    let J = invJacobian(u, v);

    let du = J[0][0] * (x - P[0]) + J[0][1] * (y - P[1]);
    let dv = J[1][0] * (x - P[0]) + J[1][1] * (y - P[1]);

    return [du, dv];
}

function norm(x, y) {
    return Math.sqrt(x ** 2 + y ** 2);
}

// The stencil walk itself
function stencilWalk() {
    let u = 0;
    let v = 0;
    let x = 5;
    let y = 6;
    let P = Phi(u, v);
    while (norm(x - P[0], y - P[1]) > 1e-5) {
        let dx = update(u, v, x, y);
        u = u + dx[0];
        v = v + dx[1];
        P = Phi(u, v);
    }

    let xy = "$$\\begin{align}(x,y) &= (" + x + ", " + y + ")\\\\";
    let uv = "(u,v) &= (" + u + ", " + v + ")\\\\";
    let phi = "\\Phi(u,v) &= (" + P[0] + ", " + P[1] + ")\\\\";
    let fA = 7, fB = 11, fC = 9, fD = 13;
    let f = (1 - u) * (1 - v) * fA + u * (1-v) * fB + (1 - u) * v * fD + u * v * fC;
    let fString = "f &= " + f + "\\end{align}$$";

    let solution = document.getElementById("theory2_1c");
    solution.textContent = "See 'stencilWalk.js' for the computation details." + xy + uv + phi + fString;
}
stencilWalk();