import { Task } from './task.js'
import { TaskState } from './task.js'
import { Attempt } from './attempt.js'


function id(a,b)
{
    return `[${a}.*.${b}]`;
}


export class MultiplyQuestion extends Task
{
    constructor(a,b)
    {
        super('Task',id(a,b))
        this.A = a;
        this.B = b; 
        this.timelimit = 5       
    }
  //current Attempts

    attempt(input,elapsedSeconds,round)
    {
        let correctAnswer = this.A * this.B
        let correct = (correctAnswer == input) 
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
        correct = correct && (this.state == TaskState.answeredCorrect)
        let taskGroupId = round.taskGroup.id
        let attempt = new Attempt(this.taskId,taskGroupId,round.id,input,correctAnswer, correct,elapsedSeconds);
        //this.Attempts.push(attempt);
        return attempt;
    }


}

