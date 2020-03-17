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

    attempt(input)
    {
       
     
        let correctAnswer = (this.A * this.B);
        console.log(' answer ' + input + ' correct ' + correctAnswer)
        let attempt = new Attempt(this.taskId,this.taskGroupId,this.roundId , input == (this.A * this.B));
        this.Attempts.push(attempt);
        return attempt;
    }


}

