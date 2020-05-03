import { Component } from './component.js'



 export default class TaskHistoryCollection extends Component
{
    constructor(tasks)
    {       
        super('TaskHistory') 
     //   this.Attempts = []
        this.tasks = tasks;
        // this.attemptsPerTaskId = groupBy(attempts,'taskId')
        // console.log(this.attemptsPerTaskId)

 
    }

    
}
