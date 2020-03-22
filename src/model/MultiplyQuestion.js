import { Task } from './task.js'
import { TaskState } from './task.js'
import { Attempt } from './attempt.js'


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
        this.timelimit = 5
        
    }



  //current Attempts

    attempt(input,elapsedSeconds)
    {
       
        let correct = ((this.A * this.B) == input) 
        if(correct)
        {
            this.state = TaskState.answeredCorrect
            if(elapsedSeconds > 5)
            {
                this.state = TaskState.answeredCorrectWihTimeError
            }
        }
        else
        {
            
            this.state = TaskState.answeredWithError     
        }
        let attempt = new Attempt(this.taskId,this.taskGroupId,this.roundId , correct);
        this.Attempts.push(attempt);
        return attempt;
    }


}

