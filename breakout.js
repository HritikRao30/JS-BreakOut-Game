const canv = document.querySelector("#canvas");
const ctx = canv.getContext('2d');
const strt = document.querySelector("#start");
const rst = document.querySelector("#reset");
let canvH = canvas.height;
let canvW = canvas.width;
let x;
let y;
let xp;
let dxp;
let dx;
let dy;
let interval;
let pts = 0;
let r = false;
let l = false;
let bricks = [3, 3, 3];
set();
draw_ball();
drawpaddle();
drawbricks(bricks);
drawscore();
function set(){
    x = canvW/2;
    y = canvH - 40;
    xp = 0;
    dx = 4;
    dxp = 5;
    dy = -4;    
    bricks = [3, 3, 3];
    pts = 0;
    drawbricks(bricks);
}
function draw_ball(){
    ctx.beginPath()
    ctx.arc(x,y,10,0,2*Math.PI,false);
    ctx.fillStyle = "blue";
    ctx.fill();
    ctx.stroke();  
    ctx.closePath();
} 
function drawpaddle() {
    ctx.beginPath()
    ctx.rect(xp,290,30,10);
    ctx.fillStyle = "brown";
    ctx.fill();
    ctx.stroke();  
    ctx.closePath();   
}
function detectcollision(){
    if (x + dx >= canvW || x+dx <= 0){
        dx = -dx;
    }
    if (x + 5 >= xp && x - 5 <= xp + 30 && y + 10 >= canvH - 10) {
        y -= 6;
        dy = -dy;
    }
}
function detectPoints(bricks) {
    let xind = Math.floor(x / 99);
    let y_lim = bricks[xind] * 23;
    if (y+dy <= y_lim){
        dy = -dy;
        if (bricks[xind]) {
            bricks[xind]--;
            pts++;
        }
    }
}
function drawscore() {
    ctx.beginPath()
    ctx.fillStyle = "#000"
    ctx.fill()
    ctx.fillText("Score: " + pts, 130, 150);
    ctx.closePath()
}
function drawbricks(arr){
    let x_init = 3;
    let y_init = 3;
    let wdt = 96;
    for (let i = 0; i < 3; i++) {
        y_init = 3;
        for (let j = 0; j < arr[i]; j++){
            ctx.beginPath()
            ctx.rect(x_init,y_init,wdt,20);
            ctx.fillStyle = "red";
            ctx.fill();
            ctx.stroke();  
            ctx.closePath(); 
            y_init += 23;
        }
        x_init += 99;
    }     
}
function reset() {
    let dec = parseInt(prompt("are you sure!!"));
    if (dec === 1) {
        clearInterval(interval);
        interval = null;
        set();
    }
}
function isGameOver() {
    if (y+dy >= canvH) {
        alert("Game Over!!!");
        clearInterval(interval);
        interval = null;
        set();
    }
    if (pts == 9) {
        alert("You Won!!!");
        clearInterval(interval);
        interval = null;
        set();       
    }
}
function startGame() {
    if (!interval) {
        interval = setInterval(() => {
            ctx.clearRect(0, 0, canvH, canvW);
            isGameOver();
            detectPoints(bricks);
            detectcollision();
            if (l == true) {
                if (xp - dxp >= 0) {
                    xp -= dxp;
                }
            }
            else if (r == true) {
                if (xp + dxp + 30<= canvW){
                    xp += dxp;
                }
            }
            x += dx;
            y += dy;
            draw_ball(x, y);
            drawpaddle(xp);
            drawbricks(bricks);
            drawscore(pts);
        }, 30);
    }
    console.log(interval);
}

strt.addEventListener('click', () => {
    startGame();
})
rst.addEventListener('click', () => {
    reset();
})
window.addEventListener('keydown', function (e) {
    if (e.code == 'ArrowRight'){
        r = true;
    }
    else if (e.code == 'ArrowLeft') {
        l = true;
    }
}); 
window.addEventListener('keyup', function (e) {
    l = false;
    r = false;
}); 