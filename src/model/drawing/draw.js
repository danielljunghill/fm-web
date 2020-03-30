

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
        this.canvas.lineWidth = 40;
        let w = this.canvas.offsetWidth
        let h = this.canvas.offsetHeight
        console.log(h)
        console.log(w)
        this.context.moveTo(0,0)
        this.context.lineTo(x,y)

        this.context.moveTo(x,0)
        this.context.lineTo(0,y)

        this.context.stroke();
    }


    drawRaster()
    {
        this.context.beginPath();
        let i = {};
        let x = 15
        let y = 10
        for(i = 1; i <= 10; i++)
        {
            this.context.moveTo(0, i * y)
            this.context.lineTo(x * i, 0)
        }
        this.context.strokeStyle = "gray";
        
        this.context.stroke();
    }

}