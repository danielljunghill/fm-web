
//import { Attempts } from './Attempts.js'
import { Attempt } from './Attempt.js'
import { Component } from './Component.js'


const TaskState = {"initializing":1, "started":2}


export class Task extends Component
{
    
    constructor(componentName,taskId,taskGroupId,roundId)
    {       
        super(componentName) 
        this.Attempts = []
        this.taskId = taskId;
        this.taskGroupId = taskGroupId;
        this.state = TaskState.initializing;
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

