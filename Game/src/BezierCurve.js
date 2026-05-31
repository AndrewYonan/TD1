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

    get_control_point_vecs() {
        let vecs = [];
        for (let i = 0; i < this.control_points.length; ++i) {
            vecs.push(this.control_points[i].loc);
        }
        return vecs;
    }

    draw_curve() {

        if (this.control_points.length == 0) {return;}

        let cp_vecs = this.get_control_point_vecs();
        let dt = this.resolution;
        let prev = this.control_points[0].loc;
        let t = dt;

        while (t <= 1 + dt) {
            let point_t = this.bezier_interp(t, cp_vecs);
            graphics.draw_bezier_curve_segment(prev, point_t);
            prev = point_t;
            t += dt;
        }
        return;
    }

    bake(res) {
        
        let points = [];
        let cps = this.control_points;
        let cp_vecs = this.get_control_point_vecs();
        let N = cps.length * res;
        let dt = 1 / N;
        let t = dt;

        points.push(cps[0].loc);
        
        while (t < 1) {
            points.push(this.bezier_interp(t, cp_vecs));
            t += dt;
        }

        const last = cps[cps.length - 1];
        points.push(last.loc);
        
        return points;
    }

    add_control_point(vec) {
        this.control_points.push(new BezierControlPoint(vec));
        this.update_curve_resolution();
    }

    draw_skeleton() {

        let N = this.control_points.length;

        if (N <= 1) {return;}
    
        for (let i = 0; i < N - 1; ++i) {

            let p1 = this.control_points[i].loc;
            let p2 = this.control_points[i + 1].loc;
            graphics.draw_bezier_skeleton_line(p1, p2);
        }
    }

    draw_control_points() {
        for (const cp of this.control_points) {
            cp.draw();
        }
    }

    draw_skeleton() {

        let N = this.control_points.length;

        if (N <= 1) {return;}
    
        for (let i = 0; i < N - 1; ++i) {

            let p1 = this.control_points[i].loc;
            let p2 = this.control_points[i + 1].loc;
            graphics.draw_bezier_skeleton_line(p1, p2);
        }
    }


    draw() {
        this.draw_curve();
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


function make_bezier_path(piecewise_path_coordinate_list) {
    bz_path = [];
    for (const curve of piecewise_path_coordinate_list) {
        bz = new BezierCurve();
        for (const cp_relative_loc of curve) {
            loc_vec = new Vector2(cp_relative_loc[0] * W, cp_relative_loc[1] * H);
            bz.add_control_point(loc_vec);
        }
        bz_path.push(bz);
    }
    return bz_path;
}