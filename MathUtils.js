
function dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}

function rand_int(min, max) {
    return min + Math.floor((max - min + 1) * (Math.random()));
}