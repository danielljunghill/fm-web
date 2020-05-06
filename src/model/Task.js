
//import { Attempts } from './Attempts.js'

import { Component } from './component.js'

export const TaskState = {"notAnswered":1, "answeredCorrect":2, "answeredCorrectWihTimeError":3,"answeredWithError":4 }


export class Task extends Component
{
    
    constructor(componentName,task,countTotal,countAnswered)
    {       
        super(componentName) 
     //   this.Attempts = []
        this.task = task;
        this.state = TaskState.notAnswered;
        console.log('Task')
        console.log(countTotal)
        console.log(countAnswered)
        this.countTotal= countTotal;
        this.countAnswered = countAnswered;   

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

