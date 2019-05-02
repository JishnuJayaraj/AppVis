// Vector Math library
// maybe not fast, but small

// single Math

function lerp(a, b, t) {
  return a * (1.0 - t) + b * t;
}

function nan(a) {
  return a != a;
}

function rand11() {
  return 2 * (Math.random() - 0.5);
}

export { lerp, nan, rand11 };

// Vector3 Math

function vec3(x, y, z) {
  return [x, y, z];
}
function vec3_from_xyz(o) {
  return [o.x, o.y, o.z];
}

function add3(a, b) {
  return [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
}

function cross3(a, b) {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0]
  ];
}

function sub3(a, b) {
  return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function scale3(a, b) {
  return [a[0] * b, a[1] * b, a[2] * b];
}

function dot3(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function length3(a) {
  return Math.sqrt(dot3(a, a));
}

function normalize3(a) {
  return scale3(a, 1 / length3(a));
}

function lerp3(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function nan3(a) {
  return nan(a[0]) || nan(a[1]) || nan(a[2]);
}

export {
  vec3,
  vec3_from_xyz,
  add3,
  cross3,
  sub3,
  scale3,
  normalize3,
  lerp3,
  length3,
  dot3,
  nan3
};

//Vector2 Math

function vec2(x, y) {
  return [x, y];
}
function vec2_from_xy(o) {
  return [o.x, o.y];
}

function add2(a, b) {
  return [a[0] + b[0], a[1] + b[1]];
}

function cross2(a, b) {
  return a[0] * b[1] - a[1] * b[0];
}

function sub2(a, b) {
  return [a[0] - b[0], a[1] - b[1]];
}

function scale2(a, b) {
  return [a[0] * b, a[1] * b];
}

function dot2(a, b) {
  return a[0] * b[0] + a[1] * b[1];
}

function length2(a) {
  return Math.sqrt(dot2(a, a));
}

function normalize2(a) {
  return scale2(a, 1 / length2(a));
}

function lerp2(a, b, t) {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
}
function nan2(a) {
  return nan(a[0]) || nan(a[1]);
}

export {
  vec2,
  vec2_from_xy,
  add2,
  cross2,
  sub2,
  scale2,
  normalize2,
  lerp2,
  length2,
  dot2,
  nan2
};
