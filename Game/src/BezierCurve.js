class BezierCurve {

    constructor() {
        this.control_points = [];
        this.resolution = 1;
    }

    lerp(v1, v2, t) {
        return (v1.mult(1 - t)).add(v2.mult(t));
    }

    bezier_interp(t, cps) {

        let N = cps.length;

        if (N == 1) {
            return cps[0];
        }
        else if (N == 2) {
            return this.lerp(cps[0], cps[1], t);
        }

        let inter_points = [];

        for (let i = 0; i < N - 1; ++i) {
            
            let P1 = cps[i];
            let P2 = cps[i + 1];
            inter_points.push(this.lerp(P1, P2, t));

        }

        return this.bezier_interp(t, inter_points);
    }


    get_control_point_vecs() {
        let vecs = [];
        for (let i = 0; i < this.control_points.length; ++i) {
            vecs.push(this.control_points[i].loc);
        }
        return vecs;
    }

    update_curve_resolution() {
        let len = this.length_approx();
        if (len > 0) {
            this.resolution = 1 / (3 * Math.sqrt(len));
        }
        else {
            this.resolution = 1;
        }
        
    }

    length_approx() {
        let sum = 0;
        for (let i = 0; i < this.control_points.length - 1; ++i) {
            let p1 = this.control_points[i].loc;
            let p2 = this.control_points[i + 1].loc;
            sum += (p2.sub(p1)).mag();
        }
        return sum;
    }

    bake(ds) {
        
        let points = [];
        
        if (this.control_points.length === 0) return;
        if (ds <= 0) return;
    
        const cp_vecs = this.get_control_point_vecs();
        const dt = this.resolution;
        let prev = this.control_points[0].loc;
        let dist_since_last_drawn = 0;
        let t = dt;
    
        while (t <= 1) {

            const curr = this.bezier_interp(t, cp_vecs);
    
            let segment_vec = curr.sub(prev);
            let segment_len = segment_vec.mag();
    
            while (dist_since_last_drawn + segment_len >= ds) {

                const remaining = ds - dist_since_last_drawn;
                const alpha = remaining / segment_len;
    
                const bake_point = prev.add(segment_vec.mult(alpha));
                points.push(bake_point);
                
                prev = bake_point;
                segment_vec = curr.sub(prev);
                segment_len = segment_vec.mag();
    
                dist_since_last_drawn = 0;
            }
    
            dist_since_last_drawn += segment_len;
            prev = curr;
            t += dt;
        }

        return points;

    }

    add_control_point(vec) {
        this.control_points.push(new BezierControlPoint(vec));
        this.update_curve_resolution();
    }
}


function bake_path(bz_curves, res) {
    let pts = [];
    for (const curve of bz_curves) {
        if (curve.control_points.length <= 2) {
            for (const cp of curve.control_points) {pts.push(cp.loc);}
        }
        else {
            for (const pt of curve.bake(res)) {pts.push(pt);}
        }
    }
    return pts;
}


function make_bezier_path(piecewise_path_coordinate_list, screen_w, screen_h) {
    let bz_path = [];
    for (const curve of piecewise_path_coordinate_list) {
        let bz = new BezierCurve();
        for (const cp_relative_loc of curve) {
            let loc_vec = new Vector2(cp_relative_loc[0] * screen_w, cp_relative_loc[1] * screen_h);
            bz.add_control_point(loc_vec);
        }
        bz_path.push(bz);
    }
    return bz_path;
}