// Import stuff we need
import { canvas, ctx } from "./canvas.js";
import { draw, Slider } from "./drawing.js";

// Base function lol
const functions = [
    function(x) { return Math.abs(x - 25) } // 0: Wow
];

draw(ctx, {
    equations: [0].map(index => functions[index]),
    points: []
});

const inputPad = document.getElementById("inputPad");
const toggleButton = document.getElementById("toggleButton");
let enabled = false;
toggleButton.onclick = function() {
    if (enabled) {
        inputPad.style.display = "none";
        toggleButton.textContent = "Open Input Pad";
    } else {
        inputPad.style.display = "block";
        toggleButton.textContent = "Close Input Pad";
    }
    enabled = !enabled;
}

const equationSpan = document.getElementById("equation");
let currentEquation = [];

inputPad.querySelectorAll("button").forEach(function hahaFancyFunctionName(button) {
    button.onclick = function clickEvent() {
        if (button.textContent === "Go") {
            currentEquation = currentEquation.map(function cleanUp(thing, index) {
                if (index > 0 && ["x", "abs", "cos", "sin", "tan", "log"].includes(thing) && !isNaN(+currentEquation[index - 1])) {
                    thing = `*${thing}`;
                }
                return thing.replace("^", "**").replace("abs(", "Math.abs(").replace("cos(", "Math.cos(").replace("sin(", "Math.sin(").replace("tan(", "Math.tan(").replace("log(", "Math.log(");
            });
            draw(ctx, {
                equations: [function(x) { return eval(currentEquation.join("")); }]
            });
            currentEquation = [];
        } else if (button.textContent === "del") {
            currentEquation.length --;
        } else {
            currentEquation.push(button.textContent.replace("abs", "abs(").replace("cos", "cos(").replace("sin", "sin(").replace("tan", "tan(").replace("log", "log("));
        }
        equationSpan.textContent = "f(x)=" + currentEquation.join("");
    }
});