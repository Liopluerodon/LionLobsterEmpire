let character = {
    p: [100, 100],
    v: [0,0],
    element: document.getElementById("character")
};

let keysDown = {
    left: false, 
    right: false, 
    up: false, 
    down: false
}

function recordKeyDown(e) {
  switch (e.code) {
    case "ArrowDown":
    case "KeyS":
      keysDown.down = true;
      break;

    case "ArrowUp":
    case "KeyW":
      keysDown.up = true;
      break;

    case "ArrowRight":
    case "KeyD":
      keysDown.right = true;
      break;

    case "ArrowLeft":
    case "KeyA":
      keysDown.left = true;
      break;
  }
}
addEventListener("keydown", recordKeyDown)

function recordKeyUp(e) {
    switch (e.code) {
    case "ArrowDown":
    case "KeyS":
      keysDown.down = false;
      break;

    case "ArrowUp":
    case "KeyW":
      keysDown.up = false;
      break;

    case "ArrowRight":
    case "KeyD":
      keysDown.right = false;
      break;

    case "ArrowLeft":
    case "KeyA":
      keysDown.left = false;
      break;
  }
}
addEventListener("keyup", recordKeyUp)

let speed = 2;

function draw() {
    if (keysDown.down) {character.v[1] = speed;}
    if (keysDown.up) {character.v[1] = -speed;}
    if (keysDown.left) {character.v[0] = -speed;}
    if (keysDown.right) {character.v[0] = speed;}

    character.p[0] += character.v[0];
    character.p[1] += character.v[1];

    character.element.style.left = character.p[0] + 'px';
    character.element.style.top = character.p[1] + 'px';

    character.v = [0,0];
}
//Commit #1
let run = setInterval(draw, 1);
