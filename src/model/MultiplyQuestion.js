import { Task } from './task.js'
import { TaskState } from './task.js'
import { Attempt } from './attempt.js'
import { task} from './taskGroupDb.js'


function id(a,b)
{
    return `[${a}.*.${b}]`;
}


export class MultiplyQuestion extends Task
{
    constructor(task)
    {
        super('Task',task)
        this.A = task.question.A;
        this.B = task.question.B; 
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

