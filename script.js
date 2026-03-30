const intro = document.getElementById("intro");
const lobster = document.getElementById("lobster");
const lion = document.getElementById("lion");
const lobsterBg = document.getElementById("lobsterBg");
const lionBg = document.getElementById("lionBg");
const introSpeed = 0.02;
let lobsterX = -220;
let lionX = window.innerWidth + 120;
let lobsterTarget = window.innerWidth / 2 - 200;
let lionTarget = window.innerWidth / 2 - 10;
let introState = "approach";
let pauseTimer = 0;
let introFinished = false;
let screenW = window.innerWidth;

let bgWidth = screenW * 0.55;
let lobsterBgX = -bgWidth;
let lionBgX = screenW;

let lobsterBgTarget = screenW / 2 - bgWidth;
let lionBgTarget = screenW / 2;

function lerp(a, b, t) {
    return a + (b - a) * t;
}

function updateIntro() {
    lobster.style.left = lobsterX + "px";
    lion.style.left = lionX + "px";
    lobsterBg.style.left = lobsterBgX + "px";
    lionBg.style.left = lionBgX + "px";

    if (introState === "approach") {
        lobsterX = lerp(lobsterX, lobsterTarget, introSpeed);
        lionX = lerp(lionX, lionTarget, introSpeed);
        lobsterBgX = lerp(lobsterBgX, lobsterBgTarget, 0.045);
        lionBgX = lerp(lionBgX, lionBgTarget, 0.045);

        if (Math.abs(lobsterX - lobsterTarget) < 1 && Math.abs(lionX - lionTarget) < 1){
            introState = "pause";
        }
    } else if (introState === "pause") {
        pauseTimer++;
        if (pauseTimer > 60) {
            introState = "leave";

            lobsterTarget = window.innerWidth + 300;
            lionTarget = -250;
        }
    } else if (introState === "leave") {
        lobsterX = lerp(lobsterX, lobsterTarget, introSpeed);
        lionX = lerp(lionX, lionTarget, introSpeed);

        if (lobsterX > window.innerWidth + 250 && lionX < -200) {
            intro.style.display = "none";
            introFinished = true;
        }
    }
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
addEventListener("keydown", recordKeyDown);

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
addEventListener("keyup", recordKeyUp);

let grav = -0.1 //Value for gravitational acceleration
let accel = grav; //Vertical Signed Acceleration of player
let jumpHeight = 5; //Initial Velocity from Jump 
let speed = 2;
let canJump = false; 
let floor = -300;

//Position refers to top left corner
let character = {
    p: [0, 0],
    v: [0, 0],
    element: document.getElementById("character"),
    size: 30
};

character.element.style.width = character.size+"px"
character.element.style.height = character.size+"px"

let keysDown = {
    left: false,
    right: false,
    up: false,
    down: false
};

const debugXaxis = document.createElement("div")
debugXaxis.style.position = "absolute"
debugXaxis.style.left = "0px"
debugXaxis.style.width = "800px"
debugXaxis.style.height = "2px"
debugXaxis.style.top = "400px"
debugXaxis.style.backgroundColor = "white"
document.body.appendChild(debugXaxis)

const debugFloor = document.createElement("div")
debugFloor.style.position = "absolute"
debugFloor.style.left = "0px"
debugFloor.style.width = "800px"
debugFloor.style.height = "2px"
debugFloor.style.top = 400-floor+"px"
debugFloor.style.backgroundColor = "white"
document.body.appendChild(debugFloor)

const floorBlock = document.createElement("div")
floorBlock.className = "block"
floorBlock.style.left = "0px"
floorBlock.style.width = "1300px"
floorBlock.style.height = "40px"
floorBlock.style.top = 400-(floor-character.size-3)+"px"
document.body.appendChild(floorBlock)




function draw() {
    if (!introFinished) {
        updateIntro();
        return;
    }

    //if (keysDown.down) { character.v[1] = -speed; }
    //if (keysDown.up) { character.v[1] = speed; }
    if (keysDown.left) { character.v[0] = -speed; }
    if (keysDown.right) { character.v[0] = speed; }
    if (keysDown.up && canJump) { character.v[1] = jumpHeight; canJump = false;}

    accel = grav;
    character.v[1]+=accel;

    character.p[0] += character.v[0];
    character.p[1] += character.v[1];



    if (character.p[1]<floor) {
        character.v[1] = 0;
        character.p[1] = floor;
        accel = 0;
        canJump = true;
    }



    character.element.style.left = character.p[0] + "px";
    character.element.style.top = 400-character.p[1] + "px";

    character.v[0] = 0;
}

character.element.style.left = character.p[0] + "px";
character.element.style.top = character.p[1] + "px";

let run = setInterval(draw, 1);
