/*
big thanks to cheesymonster's plaformer tutorial, although it was done in a different language it helped a lot when I was first learning how to create platformers a few years ago
the bitmaps i figured out myself though
-alex
*/
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

/*
bitmap, a refers to a block
any other keys can be used for a blank space but "_" will be used for sake of readability
*/
const map = [
    "______________________________________",
    "_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a__________________________________a_",
    "_a____________________a_____________a_",
    "_a________a___________a_____________a_",
    "_aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa_",
]

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

//hehe fancy
function recordKeyDown(e) {
    switch (e.code) {
        case "ArrowDown":
        case "KeyS":
            keysDown.down = true;
            break;

        case "ArrowUp":
        case "Space":
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
        case "Space":
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

let grav = 0.2;
let accel = [0, grav];
let jumpHeight = 7;
let speed = 2;
let canJump = false; 

let character = {
    p: [350, 350],
    v: [0, 0],
    element: document.getElementById("character"),
    size: 50
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
        newBlock.style.top = y+"px"
        document.body.appendChild(newBlock)
    }

    let px = character.p[0]
    let py = character.p[1] 
    let pvx = character.v[0]
    let pvy = character.v[1]
    let pw = character.size
    let ph = character.size
    if (px + pw > x && px < x + w && py - ph < y && py > y - h) {

    if (px + pw > x && px < x + w && (py - pvy) < y + h && (py - pvy) + ph > y) {
        if (pvx > 0) {
            character.p[0] = x - pw;
        } else if (pvx < 0) {
            character.p[0] = x + w;
        }
    }

    if ((px - pvx) + pw > x && (px - pvx) < x + w && py < y + h && py + ph > y) {
        if (pvy > 0) {
            character.v[1] = 0;
            canJump = true;
            character.p[1] = y - ph;
        } else if (pvy < 0) {
            character.v[1] = 0;
            character.p[1] = y + h;
        }
    }

    }
}

function draw() {
    if (!introFinished) {
        updateIntro();
        return;
    }

    if (keysDown.left) { 
        character.v[0] = -speed; 
    }
    if (keysDown.right) { 
        character.v[0] = speed; 
    }
    if (keysDown.up && canJump) { 
        character.v[1] = -jumpHeight; 
        canJump = false;
    }

    accel = [0, grav];
    character.v[1]+=accel[1];

    character.p[0] += character.v[0];
    character.p[1] += character.v[1];

    //arrays are nice
    for (let row = 0; row < map.length; row++) {
        const line = map[row];
        for (let column = 0; column < map[row].length; column++) {
            const tile = line[column];
            if(tile === "a"){
                block(column*character.size,row*character.size,character.size,character.size);

            }
        }
    }

    character.element.style.left = character.p[0] + "px";
    character.element.style.top = character.p[1] + "px";

    character.v[0] = 0;
}

let run = setInterval(draw, 1);
