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
let accel = [0, grav]; //Vertical Signed Acceleration of player
let jumpHeight = 5; //Initial Velocity from Jump 
let speed = 2;
let canJump = false; 

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

blockCount = 0;
const blockDict = new Map();

function block(x, y, w, h) {
    if ( !blockDict.has(`${x}, ${y}`) ) {
        let newBlock = document.createElement("div");
        blockDict.set(`${x}, ${y}`, newBlock)
        newBlock.className = "block";
        newBlock.style.left = x+"px"
        newBlock.style.width = w+"px"
        newBlock.style.height = h+"px"
        newBlock.style.top = 400-y+"px"
        document.body.appendChild(newBlock)
    }

    let px = character.p[0]
    let py = character.p[1] 
    let pvx = character.v[0]
    let pvy = character.v[1]
    let pw = character.size
    let ph = character.size
    if (px + pw > x && px < x + w && py - ph < y && py > y - h) {

        //Horizontal Collision
        if(px + pw > x && px < x + w && (py - pvy) - ph < y && (py - pvy) > y - h) {
            if (pvx > 0) {character.p[0] = x-pw;}
            else if (pvx < 0) {character.p[0] = x+w;}

        }

        //Vertical Collision
        if((px - pvx) + pw > x && (px - pvx) < x + w && py - ph < y && py > y - h) {
            if (pvy < 0) {
                character.v[1] = 0;
                accel[1] = 0;
                canJump = true;
                character.p[1] = y + ph;
            }

            else {
                accel[1] = grav;
                character.v[1] = 0;
                character.p[1] =  y - h;
            }
        }

    }
}





function draw() {
    if (!introFinished) {
        updateIntro();
        return;
    }

    //Speed Affectors
    if (keysDown.left) { character.v[0] = -speed; }
    if (keysDown.right) { character.v[0] = speed; }
    if (keysDown.up && canJump) { character.v[1] = jumpHeight; canJump = false;}

    accel = [0, grav];
    character.v[1]+=accel[1];

    character.p[0] += character.v[0];
    character.p[1] += character.v[1];


    //Collision Checkers
    block(20, -160, 100, 40)
    block(220, -160, 100, 40)
    block(220, -60, 100, 40)
    block(0, -220, 500, 50)

    character.element.style.left = character.p[0] + "px";
    character.element.style.top = 400-character.p[1] + "px";

    character.v[0] = 0;
}

character.element.style.left = character.p[0] + "px";
character.element.style.top = character.p[1] + "px";

let run = setInterval(draw, 1);
