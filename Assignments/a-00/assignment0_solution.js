import { vec2_from_xy } from "../../js/util_math.js";

////////////////////
// Assignment 0.1 //

function randomPolygon() {
  let points = [];
    
  let n = 15; // number of points
  for(let i = 0; i < n; ++i){
    let x = 4 * Math.random() - 2;
    let y = 4 * Math.random() - 2;
    let z = 4 * Math.random() - 2;

    points.push( [x,y,z] );
  }

  return points;

}

////////////////////
// Assignment 0.2 //
function drawFunction(){
  let points = [];
  let n = 50;

  for(let i = -n; i < n + 1; ++i){
    let x = 2 * i / n;
    let y = x * x - 0.5;
    points.push( [x, y, 0] );
  }

  return points;
}

export{
  randomPolygon,
  drawFunction
}