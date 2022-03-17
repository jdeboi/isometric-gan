
function displayGround() {
    for (let r = 0; r < width/BLOCK_DIM; r++) {
        for (let c = 0; c < width/BLOCK_DIM; c++) {
            const x = GRID_X + (c - r) * SIDE_LEN * sqrt(3) / 2;
            const y = GRID_Y + (c + r) * SIDE_LEN / 2 - (SIDE_LEN * 0);
            const opac = 80;

            const points = [];
            for (let angle = PI / 6; angle < PI * 2; angle += PI / 3) {
                points.push(
                    createVector(x + cos(angle) * SIDE_LEN,
                        y + sin(angle) * SIDE_LEN));
            }

            // // right
            // stroke(0);
            // fill(red * .75, this.green * .75, this.blue * .75, opac);
            // quad(x, y,
            //     points[5].x, points[5].y,
            //     points[0].x, points[0].y,
            //     points[1].x, points[1].y);

            // // left
            // fill(red * .9, this.green * .9, this.blue * .9, opac);
            // quad(x, y,
            //     points[1].x, points[1].y,
            //     points[2].x, points[2].y,
            //     points[3].x, points[3].y);

            noFill();
            stroke(255);
            strokeWeight(2);
            quad(x, y,
                points[3].x, points[3].y,
                points[4].x, points[4].y,
                points[5].x, points[5].y);
        }


    }
      

}