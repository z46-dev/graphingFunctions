// Initialize the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Important thing for saving upon resizes
window.lastContext = {
    equations: [],
    points: []
};

// Create a function to make everything look pretty.
function resetCanvas() {
    // Make it fit
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    // Make it pretty
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
  
    if (typeof window.draw === "function") window.draw(ctx, window.lastContext);
}

resetCanvas();

// Resize the canvas when needed
window.addEventListener("resize", resetCanvas);

// Elements for the dragging UI
const top = document.getElementById("top");
const pad = document.getElementById("inputPad");

window.addDraggableEvent(pad);

/*let padDragging = {
    enabled: false,
    x: 0,
    y: 0,
    realX: 0,
    realY: 0
};

function lerp(a, b, x) {
    return a + (b - a) * x;
}

setInterval(function updateDragables() {
    if (padDragging.enabled) {
        pad.style.top = `${padDragging.y}px`;
        pad.style.left = `${padDragging.x}px`;
        padDragging.x = lerp(padDragging.x, padDragging.realX, .05);
        padDragging.y = lerp(padDragging.y, padDragging.realY, .05);
    }
}, 10);

document.body.addEventListener("mousedown", function mouseDownEvent(event) {
    if (event.target.id === "inputPad") {
        padDragging.enabled = true;
    }
});

document.body.addEventListener("mouseup", function mouseDownEvent(event) {
    padDragging.enabled = false;
});*/

document.body.addEventListener("mousemove", function mouseMoveEvent(event) {
    //padDragging.realX = event.clientX;
    //padDragging.realY = event.clientY;
    if (event.clientY < 75) {
        top.style.top = "0px";
    } else {
        top.style.top = "-75px";
    }
});

export { canvas, ctx }
