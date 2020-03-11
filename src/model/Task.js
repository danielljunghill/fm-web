
//import { Attempts } from './Attempts.js'
import { Attempt } from './Attempt.js'


export  class Task
{
    
    constructor(taskId,taskGroupId,roundId)
    {        
        this.Attempts = []
        this.taskId = taskId;
        this.taskGroupId = taskGroupId;
        //this.id = `${taskGroupId}.[${taskId}]`
        this.roundId = roundId
        this.ComponentName = 'Task'
    }

    attempt()
    {
        let attempt = new Attempt(this.taskId,this.taskGroupId, this.roundId ,true);
        this.Attempts.push(attempt);
        return attempt;
    }

    completed()
    {
        this.Attempts;
        if(this.Attempts.length == 0)
        {
            return false;
        }
        return this.Attempts[this.Attempts.length - 1].correct;
    }


}

