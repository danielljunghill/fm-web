

export default class Designer
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.context = this.canvas.getContext("2d");
    }

    drawX(x,y)
    {
        this.context.beginPath();
        this.canvas.lineWidth = 10;
        let w = this.canvas.offsetWidth
        let h = this.canvas.offsetHeight
        console.log(h)
        console.log(w)
        this.context.moveTo(0,0)
        this.context.lineTo(x,y)

        this.context.moveTo(x,0)
        this.context.lineTo(0,y)
        // this.context.moveTo(x - 20, y - 20);
        // this.context.lineTo(x + 20, y + 20);
    
        // this.context.moveTo(x + 20, y - 20);
        // this.context.lineTo(x - 20, y + 20);
        this.context.stroke();
    }
}