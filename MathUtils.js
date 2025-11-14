
function rand_int(min, max) {
    return min + Math.floor((max - min + 1) * (Math.random()));
}

function max(a, b) {
    return (a < b) ? b : a;
}