const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const player = { x: 50, y: 300, w: 40, h: 40, vx: 0, vy: 0, jump: false };
const gravity = 0.5;
const keys = {};

const fragments = [
  { x: 200, y: 350, collected: false },
  { x: 400, y: 350, collected: false },
  { x: 600, y: 350, collected: false },
];

const boss = { x: 750, y: 300, w: 40, h: 60, defeated: false };

document.addEventListener("keydown", e => keys[e.key] = true);
document.addEventListener("keyup", e => keys[e.key] = false);

function update() {
  if (keys["ArrowRight"]) player.vx = 2;
  else if (keys["ArrowLeft"]) player.vx = -2;
  else player.vx = 0;

  if (keys[" "] && !player.jump) {
    player.vy = -10;
    player.jump = true;
  }

  player.vy += gravity;
  player.x += player.vx;
  player.y += player.vy;

  if (player.y + player.h > 400) {
    player.y = 400 - player.h;
    player.vy = 0;
    player.jump = false;
  }

  fragments.forEach(f => {
    if (!f.collected &&
        player.x < f.x + 20 && player.x + player.w > f.x &&
        player.y < f.y + 20 && player.y + player.h > f.y) {
      f.collected = true;
    }
  });

  if (fragments.every(f => f.collected) &&
      player.x < boss.x + boss.w && player.x + player.w > boss.x &&
      player.y < boss.y + boss.h && player.y + player.h > boss.y) {
    boss.defeated = true;
  }
}

function draw() {
  ctx.clearRect(0, 0, 800, 400);
  ctx.fillStyle = "white";
  ctx.fillRect(player.x, player.y, player.w, player.h);

  fragments.forEach(f => {
    if (!f.collected) {
      ctx.fillStyle = "cyan";
      ctx.fillRect(f.x, f.y, 20, 20);
    }
  });

  if (!boss.defeated) {
    ctx.fillStyle = "red";
    ctx.fillRect(boss.x, boss.y, boss.w, boss.h);
  } else {
    ctx.fillStyle = "lime";
    ctx.font = "30px sans-serif";
    ctx.fillText("You Win!", 350, 200);
  }
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}
loop();
