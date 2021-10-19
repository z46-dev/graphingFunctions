// A color list manager thingy that stops repeating colors at once
const colors = (function() {
    const list = ["#FF0000","#FF1A00","#FF2A00","#FF4300","#FF5D00","#FF7200","#FF7700","#FF9400","#FF9900","#FFA500","#FFBB00","#FFCC00","#FFDD00","#FFE900","#FFFA00","#EEFF00","#DDFF00","#D0FF00","#B6FF00","#AAFF00","#88FF00","#6EFF00","#54FF00","#32FF00","#19FF00","#04FF00","#00FF15","#00FF26","#00FF3F","#00FF55","#00FF6E","#00FF7F","#00FF99","#00FFA5","#00FFBB","#00FFCB","#00FFD8","#00FFED","#00FFFA","#00E9FF","#00D8FF","#00C3FF","#00BBFF","#00AEFF","#00A1FF","#0090FF","#007FFF","#0077FF","#006EFF","#005DFF","#0048FF","#0037FF","#0026FF","#0019FF","#0004FF","#0C00FF","#2200FF","#2E00FF","#3B00FF","#5400FF","#6A00FF","#7F00FF","#9000FF","#A100FF","#B600FF","#BF00FF","#D000FF","#DC00FF","#E900FF","#FA00FF","#FF00F6","#FF00E1","#FF00CB","#FF00B6","#FF00AA","#FF00A5","#FF0090","#FF007B","#FF006E","#FF005D","#FF0059","#FF0043","#FF003B","#FF0026","#FF001D","#FF000C"].sort(function() { return .5 - Math.random(); });
    let i = 0;
    list.next = function next() {
        i %= this.length;
        return this[i ++];
    }
    return list;
})();

// A possible slider thing that will allow for updating and animated lines
class Slider {
    constructor(min, max, step) {
        this.min = min || 0;
        this.max = max || 10;
        this.step = step || .5;
        this.value = this.min;
        this.intervalID = -1;
    }
    play() {
        const _this = this;
        this.intervalID = setInterval(_this.update, this.step);
    }
    pause() {
        clearInterval(this.intervalID);
    }
    update() {
        this.value += this.step;
        if (this.value > this.max) this.value = this.min;
        if (this.value < this.min) this.value = this.max;
    }
}

// Text Lol
function drawText(ctx, x, y, text, size, color, align = "center") {
    ctx.save();
    ctx.font = "bold " + size + "px Ubuntu";
    //ctx.lineWidth = size / 10;
    let offX = align === "center" ? ctx.measureText(text).width / 2 : 0;
    let offY = ctx.measureText("M").width / 4;
    ctx.fillStyle = color;
    //ctx.strokeStyle = "#000000";
    //ctx.strokeText(text, x - offX, y + offY);
    ctx.fillText(text, x - offX, y + offY);
    ctx.restore();
}

// Draw the background
function drawGraph(ctx) {
    ctx.save();
    ctx.translate(innerWidth / 2, innerHeight / 2);
    ctx.globalAlpha = .3;
    ctx.beginPath();
    ctx.moveTo(0, -innerHeight / 2);
    ctx.lineTo(0, innerHeight / 2);
    ctx.moveTo(-innerWidth / 2, 0);
    ctx.lineTo(innerWidth / 2, 0);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.globalAlpha = .15;
    ctx.beginPath();
    for (let i = 25; i < innerWidth / 2; i += 25) {
        ctx.moveTo(0, i);
        ctx.lineTo(innerWidth / 2, i);
        ctx.moveTo(0, -i);
        ctx.lineTo(innerWidth / 2, -i);
        ctx.moveTo(0, i);
        ctx.lineTo(-innerWidth / 2, i);
        ctx.moveTo(0, -i);
        ctx.lineTo(-innerWidth / 2, -i);
    }
    for (let i = 25; i < innerWidth / 2; i += 25) {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, innerWidth / 2, i);
        ctx.moveTo(-i, 0);
        ctx.lineTo(-i, innerWidth / 2);
        ctx.moveTo(i, 0);
        ctx.lineTo(i, -innerWidth / 2, i);
        ctx.moveTo(-i, 0);
        ctx.lineTo(-i, -innerWidth / 2);
    }
    ctx.stroke();
    ctx.globalAlpha = 1;
    for (let i = 25; i < innerWidth / 2; i += 25) {
        if (i % 2) continue;
        drawText(ctx, -25, i, i, 13, "#000000");
        drawText(ctx, -25, -i, -i, 13, "#000000");
        drawText(ctx, i, 25, i, 13, "#000000");
        drawText(ctx, -i, 25, -i, 13, "#000000");
    }
    ctx.restore();
}

// Actually do stuff
function draw(ctx, context) {
    ctx.save();
    window.lastContext = context;
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    drawGraph(ctx);
    context.equations.forEach(function(equation) {
        ctx.beginPath();
        for (let i = -innerWidth / 2; i < innerWidth / 2; i ++) {
            ctx.lineTo(i + innerWidth / 2, innerHeight / 2 - equation(i));
        }
        ctx.strokeStyle = colors.next();
        ctx.stroke();
    });
    ctx.restore();
}

window.draw = draw;

export { draw, Slider }
