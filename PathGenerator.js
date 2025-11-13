class PathGenerator {

    square_zig_zag(x_start, y_start, size) {

        let locs = [];

        let x = x_start;
        let y = y_start;

        while (x < W + 100) {

            locs.push([x,y]);
            locs.push([x + size, y]);
            locs.push([x + size, y + size]);
            locs.push([x + size*2, y + size]);

            x += (size*2);

        }

        return locs;
    }

    default_path_1() {
        
        return [[-100, H/2],
                [100, H/2], 
                [W/3, H/2 + 100],
                [2*W/3, H/2 - 100],
                [W-100, H/2]];

    }
    
    default_path_2() {
        return [[-100, H/2],
                [600, H/2], 
                [600, H/2 -150],
                [600 - 150, H/2 - 150],
                [600 - 150, H/2 + 250],
                [600 - 300, H/2 + 250],
                [600 - 300, H/2 + 100],
                [600 + 200, H/2 + 100],
                [600 + 200, H/2 - 100],
                [600 + 350, H/2 - 100],
                [600 + 350, H/2 + 200],
                [W/2, H/2 + 200],
                [W/2, H + 100]];
    }
}