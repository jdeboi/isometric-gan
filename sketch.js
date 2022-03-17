const SPRITE_ROWS = 20;
const SPRITE_COLS = 20;

const BLOCK_DIM = 64;
const SIDE_LEN = 64 / 2;
let GRID_X;
let GRID_Y;

const assets = [];
let cubes = [];
let terrain = [];
let flyingOff = 0;

let grassImg;
let brickImg;


function preload() {
    assets[0] = loadImage("assets/0.png");
    assets[1] = loadImage("assets/1.png");
    assets[2] = loadImage("assets/2.png");
    initTerrain()
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    GRID_X = width/2;
    GRID_Y = height/4;

    initBlockImgs();

    initCubes();

}

function draw() {
    background(0);
    displayGround();
    for (const cube of cubes) {
        cube.display();
    }
}

function initTerrain() {
    terrain = [];
    let inc = .1;

    let roff = 0;
    for (let r = 0; r < SPRITE_ROWS; r++) {
        terrain[r] = [];
        let coff = 0;
        for (let c = 0; c < SPRITE_COLS; c++) {
            terrain[r][c] = constrain(map(noise(roff + flyingOff, coff + flyingOff), 0, 1, -12, 12), 0, 12);
            coff += inc;
        }
        roff += inc;
    }

    // flyingOff += .001;
}

function mousePressed() {
    reset();
}

function reset() {
    flyingOff += 1;
    setRandomGrassSprite();
    setRandomBrickSprite();
    initTerrain();
    initCubes();

}

function initCubes() {
    cubes = [];
    for (let r = 0; r < SPRITE_ROWS; r++) {
        for (let c = 0; c < SPRITE_COLS; c++) {
            for (let z = 0; z < terrain[r][c]; z++) {
                let isTop = false;
                if (z + 1 >= terrain[r][c]) {
                    isTop = true;
                }
                cubes.push(new Cube(r, c, z, isTop, random([0, 1, 2])));
            }
        }
    }
}

function initBlockImgs() {
    {
        brickImg = createImage(64, 64);
        let { spImg, spX, spY } = getSpriteImg(bricks, 0);
        brickImg.copy(spImg, spX, spY, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
    }
    {
        grassImg = createImage(64, 64);
        let { spImg, spX, spY } = getSpriteImg(grasses, 0);
        grassImg.copy(spImg, spX, spY, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
    }

}

function setRandomGrassSprite() {
    const r = floor(random(12));
    const c = floor(random(8));
    const num = floor(random(assets.length));
    // console.log(num, r, c, 'grass');
    const { x, y } = getPixelPos(r, c);
    // return { spImg: assets[num], spX: x, spY: y };
    grassImg = createImage(64, 64);
    grassImg.copy(assets[num], x, y, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
}

function setRandomBrickSprite() {
    const brick = random(bricks);
    const r = brick.r;
    const c = brick.c;
    const num = brick.img;
    const { x, y } = getPixelPos(r, c);
    // console.log(num, r, c, "brick")
    brickImg = createImage(64, 64);
    brickImg.copy(assets[num], x, y, BLOCK_DIM, BLOCK_DIM, 0, 0, BLOCK_DIM, BLOCK_DIM);
}

function getSpriteImg(arr, num) {
    const { x, y } = getPixelPos(arr[num].r, arr[num].c);
    return { spImg: assets[arr[num].img], spX: x, spY: y };
}

function getPixelPos(r, c) {
    return { x: c * BLOCK_DIM, y: r * BLOCK_DIM };
}