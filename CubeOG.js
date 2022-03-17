

class CubeOG {

    // https://happycoding.io/examples/p5js/creating-classes/isometric-cubes
    constructor(r, c, z, isTop, imgNum) {
        this.c = c;
        this.r = r;
        this.z = z;
        this.isTop = isTop;

        const { x, y, w, h } = this.getPixelPos(r, c);
        this.w = w;
        this.h = h;

        this.img = createImage(w, h);
        // srcImage, sx, sy, sw, sh, dx, dy, dw, dh
        this.img.copy(assets[0], x, y, w, h, 0, 0, w, h);
        
        this.img.copy(assets[imgNum], x, y, w, h, 0, 0, w, h);

        this.gridTopX = 300;
        this.gridTopY = 300;
        this.sideLength = 64 / 2;

        this.red = random(255); //map(z, 0, 10, 0, 255);
        this.green = random(255); 
        this.blue = random(255); 
    }

    display() {


        // if (this.isTop)
            image(this.img, this.getX() - this.sideLength, this.getY() - this.sideLength+5, this.w, this.w);

        // else {
            // this.drawBox();
        // }

            this.drawBox();
        

    }

    drawBox() {
        const x = this.getX();
        const y = this.getY();
        const opac = 80;

        const points = [];
        for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
            points.push(
                createVector(x + cos(angle) * this.sideLength,
                    y + sin(angle) * this.sideLength));
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
        return this.gridTopX + (this.c - this.r) * this.sideLength * sqrt(3) / 2;
    }

    getY() {
        return this.gridTopY + (this.c + this.r) * this.sideLength / 2 - (this.sideLength * this.z);
    }

    getPixelPos(r, c) {
        const d = 64;
        const imgr = floor(r / 4);
        const imgc = floor(c / 4);
        // const imgr = floor(random(12))
        // const imgc = floor(random(8));
        return { x: imgc * d, y: imgr * d, w: d, h: d };
    }

    getSpriteImg(arr, num) {
        const { x, y } = this.getPixelPos(arr[num].r, arr[num].c);
        return { spImg: assets[arr[num].img], spX: x, spY: y };
    }
}