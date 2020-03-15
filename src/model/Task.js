
//import { Attempts } from './Attempts.js'
import { Attempt } from './Attempt.js'
import { Component } from './Component.js'
import Timer from './Time.js';


export class Task extends Component
{
    
    constructor(componentName,taskId,taskGroupId,roundId)
    {       
        super(componentName) 
        this.Attempts = []
        this.taskId = taskId;
        this.taskGroupId = taskGroupId;
        //this.id = `${taskGroupId}.[${taskId}]`
        this.roundId = roundId
        //this.timer = new Timer();
        //this.timer.start();
   
    }
    static Create(id,taskGroupId,roundId)
    {
        new Task('Task',id,taskGroupId,roundId)
    }

    attempt()
    {
        
       
        //this.timer.stopAndReset();
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

