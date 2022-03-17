const trees = [
    //1 0 0 'tree'
    // 2 0 0 'blue tree'
    // bush tree 2 1 0 
    // spike tree 2 11 4
    // 2 9 3 big tree palm
    // red spikey 0 5 1

    // cone pine 1 10 7
    // 0 6 6 cone pine 
    // grass and tree 0 0 2
    // birch 0 7 4
    // tree bush 0 3 0
    // wreath tree 2 10 3
    // 2 10 7 blossom tree
    // 0 5 4 serious douglas fir
    // 0 1 4 tall narrow fir

    // 1 6 4 ice tower


    // 0 7 3 hedge arch

    // awesome tall hedge 1 1 2
    // 1 3 0 'mushroom'
    // gloud tree 1 0 1
    // snow tree 0 9 2

    // 1 8 5 // tall corner hedge
    // 0 0 3  blue tree bush
    // 0 8 7 small tree
]

const bushes = [
    // 1 6 0  blueish ground shrub
    // 2 5 7 white ground shrub 
    // 0 11 0 hedge
    // 2 11 5 big bush
    // kinda water 1 7 7
    // yellow bush grass 2 5 6
    // blue shrub 1 6 0 
    // 2 8 3  whtie shurbbery

]
const grasses = [
    { img: 0, r: 10, c: 6 },
    { img: 0, r: 0, c: 1 },
    { img: 2, r: 1, c: 0 },
    { img: 2, r: 6, c: 2 }, // desert grass
    { img: 2, r: 8, c: 5 },
    // 0 9 2  snow pile
    // 1 5 1 wall use sparingly

];
const bricks = [
    { img: 2, r: 2, c: 0 },
    { img: 2, r: 11, c: 0 },
    { img: 2, r: 2, c: 7 }, // party block
    { img: 1, r: 7, c: 4 }, // brown block  
    { img: 2, r: 10, c: 6 }, // brown, chip
    { img: 2, r: 9, c: 2 }     // hole side
]

class Cube {

    // https://happycoding.io/examples/p5js/creating-classes/isometric-cubes
    constructor(r, c, z, isTop, imgNum) {
        this.c = c;
        this.r = r;
        this.z = z;
        this.isTop = isTop;

        // const { x, y, w, h } = getPixelPos(r, c);
        // this.w = w;
        // this.h = h;

        // this.img = createImage(w, h);



        this.red = map(z, 0, 10, 0, 255);
        this.green = map(r, 0, 10, 0, 255);
        this.blue = map(c, 0, 10, 0, 255);
    }

    display() {


        if (this.isTop)
            image(grassImg, this.getX() - SIDE_LEN, this.getY() - SIDE_LEN);

        else {
            // this.drawBox();
            image(brickImg, this.getX() - SIDE_LEN, this.getY() - SIDE_LEN)
        }

        if (!this.isTop) {
            // this.drawBox();
        }

    }

    drawBox() {
        const x = this.getX();
        const y = this.getY();
        const opac = 80;

        const points = [];
        for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
            points.push(
                createVector(x + cos(angle) * SIDE_LEN,
                    y + sin(angle) * SIDE_LEN));
        }

        // right
        stroke(0);
        fill(this.red * .75, this.green * .75, this.blue * .75, opac);
        quad(x, y,
            points[5].x, points[5].y,
            points[0].x, points[0].y,
            points[1].x, points[1].y);

        // left
        fill(this.red * .9, this.green * .9, this.blue * .9, opac);
        quad(x, y,
            points[1].x, points[1].y,
            points[2].x, points[2].y,
            points[3].x, points[3].y);

        fill(this.red, this.green, this.blue, opac);
        quad(x, y,
            points[3].x, points[3].y,
            points[4].x, points[4].y,
            points[5].x, points[5].y);
    }

    getX() {
        return GRID_X + (this.c - this.r) * SIDE_LEN * sqrt(3) / 2;
    }

    getY() {
        return GRID_Y + (this.c + this.r) * SIDE_LEN / 2 - (SIDE_LEN * this.z);
    }



}