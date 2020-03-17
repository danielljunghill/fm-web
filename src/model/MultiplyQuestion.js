import { Task } from './Task.js'
import { Attempt } from './Attempt.js'


function id(a,b)
{
    return `[${a}.*.${b}]`;
}

export class MultiplyQuestion extends Task
{
    constructor(a,b,taskGroupId,roundId)
    {
        super('Task',id(a,b),taskGroupId,roundId)
        this.A = a;
        this.B = b; 
    }



  //current Attempts

    attempt(input,elapsedSeconds)
    {
       
        let correct = ((this.A * this.B) == input) && elapsedSeconds < 5;
 
        let attempt = new Attempt(this.taskId,this.taskGroupId,this.roundId , correct);
        this.Attempts.push(attempt);
        return attempt;
    }


}

