class PathGenerator {

    square_zig_zag(x_start, y_start, size) {

        let locs = [];

        let x = x_start;
        let y = y_start;

        while (x < W + 100) {

            locs.push(new Vector2(x,y));
            locs.push(new Vector2(x + size, y));
            locs.push(new Vector2(x + size, y + size));
            locs.push(new Vector2(x + size*2, y + size));
        
            x += (size*2);

        }

        return locs;
    }

    default_path_1() {
        return [
            new Vector2(-100, H/2),
            new Vector2(100, H/2),
            new Vector2(W/3, H/2 + 100),
            new Vector2(2*W/3, H/2 - 100),
            new Vector2(W-100, H/2)
        ];
    }
    
    default_path_2() {
        return [
            new Vector2(-100, H/2),
            new Vector2(600, H/2),
            new Vector2(600, H/2 - 150),
            new Vector2(600 - 150, H/2 - 150),
            new Vector2(600 - 150, H/2 + 250),
            new Vector2(600 - 300, H/2 + 250),
            new Vector2(600 - 300, H/2 + 100),
            new Vector2(600 + 200, H/2 + 100),
            new Vector2(600 + 200, H/2 - 100),
            new Vector2(600 + 350, H/2 - 100),
            new Vector2(600 + 350, H/2 + 200),
            new Vector2(W/2, H/2 + 200),
            new Vector2(W/2, H + 100)
        ];
    }   
}