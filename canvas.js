// Initialize the canvas
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Create a function to make everything look pretty.
function resetCanvas() {
    // Make it fit
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    
    // Make it pretty
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
}

resetCanvas();

// Resize the canvas when needed
window.addEventListener("resize", resetCanvas);

export { canvas, ctx }
