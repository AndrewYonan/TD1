

export function buildCanvasContext({
    canvas,
    width,
    height,
    adaptiveResolution = true,
    graphicsConfig
}) {

    const dpr = window.devicePixelRatio || 1; 

    if (adaptiveResolution) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
    }
    else {
        canvas.width = width;
        canvas.height = height;
    }
    
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    
    canvas.style.position = "absolute";
    canvas.style.left = "50%";
    canvas.style.transform = "translateX(-50%)"
    canvas.style.backgroundColor = graphicsConfig.BG_MAIN_COLOR;

    const ctx = canvas.getContext('2d');
    
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    if (adaptiveResolution) {
        ctx.scale(dpr, dpr);
    }

    return ctx;
}
