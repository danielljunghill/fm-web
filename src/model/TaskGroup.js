import { Component } from './Component.js'

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
        this.Tasks = tasks;
        this.current = 0;
        this.TaskGroupId = taskGroupId;   
       
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
        if(this.Tasks.length == 0)
        {
            return new NextTaskResult(null,true);
        }
        if(this.current >= this.Tasks.length)
        {
            return new NextTaskResult(null,true);
        }
        let result = this.Tasks[this.current];
        this.current++;
        return new NextTaskResult(result,false);
    }

    isActive()
    {
        return true;// !(this.dependentOn.map((d) => d.completed()).includes(false))
    }

}