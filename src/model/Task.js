
//import { Attempts } from './Attempts.js'

import { Component } from './component.js'

export const TaskState = {"notAnswered":1, "answeredCorrect":2, "answeredCorrectWihTimeError":3,"answeredWithError":4 }


export class Task extends Component
{
    
    constructor(componentName,taskId,taskGroupId,roundId)
    {       
        super(componentName) 
     //   this.Attempts = []
        this.taskId = taskId;
        this.taskGroupId = taskGroupId;
        this.state = TaskState.notAnswered;
        this.roundId = roundId
    }
    
    static Create(id,taskGroupId,roundId)
    {
        new Task('Task',id, taskGroupId, roundId)
        
    }

    //
    attempt()
    {
        // let correctAnswer =''
        // let correct = true
        // let attempt = new Attempt(this.taskId, this.taskGroupId, this.roundId,answer,correctAnswer,correct,duration);
        return {};
    }



}

