import { canvas, ctx } from "./canvas.js";
import { draw, Slider } from "./drawing.js";

draw(ctx, [function(x) { return Math.tan(x); }]);
