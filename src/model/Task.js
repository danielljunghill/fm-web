
//import { Attempts } from './Attempts.js'

import { Component } from './component.js'

export const TaskState = {"notAnswered":1, "answeredCorrect":2, "answeredCorrectWihTimeError":3,"answeredWithError":4 }


export class Task extends Component
{
    
    constructor(componentName,task)
    {       
        super(componentName) 
     //   this.Attempts = []
        this.task = task;
        this.state = TaskState.notAnswered;

    }
    
    static Create(task)
    {
        new Task('Task',task)

    }

    //
    attempt()
    {
        return {};
    }



}

