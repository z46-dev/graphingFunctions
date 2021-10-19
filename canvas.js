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

// Sliding top
document.body.addEventListener("mousemove", function mouseMoveEvent(event) {
    if (event.clientY < 75) {
        top.style.top = "0px";
    } else {
        top.style.top = "-75px";
    }
});

export { canvas, ctx }
