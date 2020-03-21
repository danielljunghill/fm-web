
//import { Attempts } from './Attempts.js'
import { Attempt } from './Attempt.js'
import { Component } from './Component.js'



export const TaskState = {"notAnswered":1, "answeredCorrect":2, "answeredCorrectWihTimeError":3,"answeredWithError":4 }


export class Task extends Component
{
    
    constructor(componentName,taskId,taskGroupId,roundId)
    {       
        super(componentName) 
        this.Attempts = []
        this.taskId = taskId;
        this.taskGroupId = taskGroupId;
        this.state = TaskState.notAnswered;
        //this.id = `${taskGroupId}.[${taskId}]`
        this.roundId = roundId
    }
    static Create(id,taskGroupId,roundId)
    {
        new Task('Task',id,taskGroupId,roundId)
    }

    attempt()
    {
      
        let attempt = new Attempt(this.taskId, this.taskGroupId, this.roundId);
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

