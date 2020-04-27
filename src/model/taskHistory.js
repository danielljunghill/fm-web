import { Component } from './component.js'

export class TaskHistory extends Component
{
    constructor(tasks)
    {       
        super('TaskHistory') 
     //   this.Attempts = []
        this.tasks = tasks;
  

    }
}
