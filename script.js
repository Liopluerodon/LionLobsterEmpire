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
      if (e.code == "ArrowDown") {keysDown.down = true;}
      if (e.code == "ArrowUp") {keysDown.up = true;}
      if (e.code == "ArrowRight") {keysDown.right = true;}
      if (e.code == "ArrowLeft") {keysDown.left = true;}
    }
    addEventListener("keydown", recordKeyDown)

    function recordKeyUp(e) {
      if (e.code == "ArrowDown") {keysDown.down = false;}
      if (e.code == "ArrowUp") {keysDown.up = false;}
      if (e.code == "ArrowRight") {keysDown.right = false;}
      if (e.code == "ArrowLeft") {keysDown.left = false;}
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

    let run = setInterval(draw, 1);
