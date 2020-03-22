import { Component } from './component.js'

export class NextTaskResult
{
    constructor(task,endOfTasks)
    {
        this.task = task;
        this.endOfTasks = endOfTasks;
        
    }
}


export class TaskGroup extends Component
{
    constructor(taskGroupId,tasks)
    {   
        super('TaskGroup',)
        this.tasks = tasks;
        this.position = 0;
        this.taskGroupId = taskGroupId;   
        this.task = this.getNextTask().task
       
    }
    
    completed()
    {
        //kontrollera om samtliga tasks (questions) är klara
        if(this.tasks.map((x) => x.completed()).includes(false))
        { 
            return false;
        }
        return true;
    }

    getNextTask()
    {
        if(this.tasks.length == 0)
        {
            return new NextTaskResult(null,true);
        }
        if(this.position >= this.tasks.length)
        {
            return new NextTaskResult(null,true);
        }
        let result = this.tasks[this.position];
        this.position++;
        this.task = result;
        return new NextTaskResult(result,false);
    }

    isActive()
    {
        return true;// !(this.dependentOn.map((d) => d.completed()).includes(false))
    }

}


