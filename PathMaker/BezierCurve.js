class BezierCurve {

    constructor() {
        this.control_points = [];
        this.effective_control_points = []; // after all subdivisions are applied
        this.conformity = 0;
        this.subdivisions = 0;
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

    /* get effective control point list, 
    including control points from subdivision */

    recalculate_effective_control_points() {

        let pts = [];
        let S = this.subdivisions;
        let N = this.control_points.length;

        if (N == 0) {return [];}

        if (N == 1) {return [this.control_points[0]];}

        pts.push(this.control_points[0]);

        for (let i = 0; i < this.control_points.length - 1; ++i) {

            let p1 = this.control_points[i].loc;
            let p2 = this.control_points[i + 1].loc;

            let dir = p2.sub(p1);
            let subdivide_region = (dir.div(this.conformity + 1)).div(2);
            let non_subdivide_region = dir.sub(subdivide_region.mult(2));
            
            for (let j = 0; j < S; ++j) {
                
                let ds = subdivide_region.mult((1 - Math.pow(Math.E, -(j + 1))));
                let sub_p = p1.add(subdivide_region).sub(ds);
                pts.push(new BezierControlPoint(sub_p, true));
            }
            
            for (let j = 0; j < S; ++j) {
                
                let ds = subdivide_region.mult((1 - Math.pow(Math.E, -(j + 1))));
                let sub_p = p1.add(subdivide_region).add(non_subdivide_region).add(ds);
                pts.push(new BezierControlPoint(sub_p, true));
            }


            pts.push(this.control_points[i + 1]);
        }

        return pts;
    }

    get_control_point_vecs() {
        let vecs = [];
        for (let i = 0; i < this.effective_control_points.length; ++i) {
            vecs.push(this.effective_control_points[i].loc);
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


    increase_subdivisions() {
        this.subdivisions++;
    }

    decrease_subdivisions() {
        this.subdivisions = Math.max(0, this.subdivisions - 1);
    }

    increase_conformity() {
        this.conformity++;
    }
    
    decrease_conformity() {
        this.conformity = Math.max(0, this.conformity - 1);
    }

    get_effective_control_point_count() {
        let N = this.control_points.length;
        let S = this.subdivisions;
        return (N - 1)*2*S + N;
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

    get_baked_path_points() {

        let points = [];
        let cp_vecs = this.get_control_point_vecs();
        let dt = this.resolution;
        let t = dt;

        points.push(this.control_points[0].loc);
        
        while (t <= 1) {
            points.push(this.bezier_interp(t, cp_vecs));
            t += dt;
        }
        
        return points;
    }

    draw_control_points() {
        for (const cp of this.control_points) {
            cp.draw();
        }
    }

    update_effective_control_points() {
        this.effective_control_points = this.recalculate_effective_control_points();
    }

    add_control_point(vec) {
        this.control_points.push(new BezierControlPoint(vec));
        this.update_curve_resolution();
        this.update_effective_control_points();
        
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

    display_stats() {
        graphics.display_conformity(this.conformity);
        graphics.display_subdivisions(this.subdivisions);
        graphics.display_control_point_count(this.get_effective_control_point_count());
    }

    update_mouse_bound_control_points(mouse_loc) {
        for (let i = 0; i < this.control_points.length; ++i) {
            let point = this.control_points[i];
            if (point.bound_to_mouse) {
                point.loc = mouse_loc;
            }
        }
        this.update_effective_control_points();
    }

    set_all_points_unhovered() {
        for (let i = 0; i < this.control_points.length; ++i) {
            this.control_points[i].hovered = false;
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