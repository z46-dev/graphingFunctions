const colors = (function() {
    const list = ["#FF0000","#FF1A00","#FF2A00","#FF4300","#FF5D00","#FF7200","#FF7700","#FF9400","#FF9900","#FFA500","#FFBB00","#FFCC00","#FFDD00","#FFE900","#FFFA00","#EEFF00","#DDFF00","#D0FF00","#B6FF00","#AAFF00","#88FF00","#6EFF00","#54FF00","#32FF00","#19FF00","#04FF00","#00FF15","#00FF26","#00FF3F","#00FF55","#00FF6E","#00FF7F","#00FF99","#00FFA5","#00FFBB","#00FFCB","#00FFD8","#00FFED","#00FFFA","#00E9FF","#00D8FF","#00C3FF","#00BBFF","#00AEFF","#00A1FF","#0090FF","#007FFF","#0077FF","#006EFF","#005DFF","#0048FF","#0037FF","#0026FF","#0019FF","#0004FF","#0C00FF","#2200FF","#2E00FF","#3B00FF","#5400FF","#6A00FF","#7F00FF","#9000FF","#A100FF","#B600FF","#BF00FF","#D000FF","#DC00FF","#E900FF","#FA00FF","#FF00F6","#FF00E1","#FF00CB","#FF00B6","#FF00AA","#FF00A5","#FF0090","#FF007B","#FF006E","#FF005D","#FF0059","#FF0043","#FF003B","#FF0026","#FF001D","#FF000C"].sort(function() { return .5 - Math.random(); });
    let i = 0;
    list.next = function next() {
        i %= this.length;
        return this[i ++];
    }
    return list;
})();

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

function drawFunction(ctx, equation) {
    ctx.beginPath();
    for (let i = 0; i < innerWidth; i ++) {
        ctx.lineTo(i, equation(i));
    }
    ctx.closePath();
    ctx.strokeStyle = colors.next();
    ctx.stroke();
}

function draw(ctx, equations) {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    equations.forEach(function(equation) {
        draw(ctx, equation);
    });
}

export { draw, Slider }
