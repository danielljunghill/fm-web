import { Task } from './task.js'
import { TaskState } from './task.js'
import { Attempt } from './attempt.js'



function id(a,b)
{
    return `[${a}.*.${b}]`;
}


export class MultiplyQuestion extends Task
{
    constructor(task)
    {
        super('Task',task)
        this.A = task.question.a;
        this.B = task.question.b; 
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
        let attempt = new Attempt(this.task.id,taskGroupId,round.id,input,correctAnswer, correct,elapsedSeconds);
        //this.Attempts.push(attempt);
        return attempt;
    }


}

