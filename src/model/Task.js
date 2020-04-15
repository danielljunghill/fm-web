
//import { Attempts } from './Attempts.js'

import { Component } from './component.js'

export const TaskState = {"notAnswered":1, "answeredCorrect":2, "answeredCorrectWihTimeError":3,"answeredWithError":4 }


export class Task extends Component
{
    
    constructor(componentName,taskId)
    {       
        super(componentName) 
     //   this.Attempts = []
        this.taskId = taskId;
        this.state = TaskState.notAnswered;

    }
    
    static Create(id)
    {
        new Task('Task',id)

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

