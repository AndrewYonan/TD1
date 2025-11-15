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

    update_curve_resolution() {
        let len = this.length_approx();
        if (len > 0) {
            this.resolution = 1 / (4 * Math.sqrt(len));
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
            sum += p2.sub(p1).mag();
        }
        return sum;
    }

    get_control_point_vecs() {
        let vecs = [];
        for (const cp of this.control_points) {
            vecs.push(cp.loc);
        }
        return vecs;
    }

    draw_curve() {

        if (this.control_points.length == 0) {return;}

        let cp_vecs = this.get_control_point_vecs();
        let dt = this.resolution;
        let prev = this.control_points[0].loc;
        let t = dt;

        while (t <= 1) {
            let point_t = this.bezier_interp(t, cp_vecs);
            graphics.draw_bezier_curve_segment(prev, point_t);
            prev = point_t;
            t += dt;
        }
        return;
    }

    draw_control_points() {
        for (const cp of this.control_points) {
            cp.draw();
        }
    }

    add_control_point(vec) {
        this.control_points.push(new BezierControlPoint(vec));
        this.update_curve_resolution();
    }

    draw_skeleton() {

        let N = this.control_points.length;

        if (N == 0) {return;}

        else if (N == 1) {

            graphics.draw_bezier_control_point(this.control_points[0].loc);
            return;

        }
    
        for (let i = 0; i < N - 1; ++i) {

            let p1 = this.control_points[i].loc;
            let p2 = this.control_points[i + 1].loc;
            graphics.draw_bezier_skeleton_line(p1, p2);
            graphics.draw_bezier_control_point(p1);

        }
    
        let last = this.control_points[N - 1].loc;
        graphics.draw_bezier_control_point(last);
    }

    update_mouse_bound_control_points(mouse_loc) {
        for (let i = 0; i < this.control_points.length; ++i) {
            let point = this.control_points[i];
            if (point.bound_to_mouse) {
                point.loc = mouse_loc;
            }
        }
    }

    release_all_control_points() {
        for (let i = 0; i < this.control_points.length; ++i) {
            this.control_points[i].release();
        }
    }


    draw() {
        this.draw_skeleton();
        this.draw_control_points();
        this.draw_curve();
    }
}