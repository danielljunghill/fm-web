export default class Timer 
{
    constructor()
    {
        this.seconds = 0;
        this.started = false;
    }
    
    static flow(startf,endf,time)
    {
        let interval = {};
        function toNextFunction()
        {
            clearInterval(interval)
            endf();
        }
        startf();
        interval = setInterval(() => toNextFunction() ,time);
    }
    
    reset()
    {
        this.seconds = 0;
    }
    start()
    {
        if(this.started)
        {
             return;
        }
        this.started = true;
        this.seconds = 0;
        this.interval = setInterval(() => this.seconds ++ ,1000);
    }

    stop()
    {
        if(!this.started)
        {
            return;
        }
        this.started = false;  
        clearInterval(this.interval);
    }

    stopAndReset()
    {
        this.stop();
        this.reset();
       
    }
}