import { Component } from './component.js'
import { createUUID } from './math.js'

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
    constructor(taskGroupId,tasks,taskGroupAttempsStore)
    {   
        super('TaskGroup')
        this.tasks = tasks;
        this.position = 0;
        this.taskGroupId = taskGroupId;   
        this.roundId = createUUID()
        //Attemptstore borde brytas ut
        this.taskGroupAttempsStore = taskGroupAttempsStore
        //this.task = this.getNextTask().task
       
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
        
        let answeredTaskIds = new Set(this.taskGroupAttempsStore.getAnsweredTaskForRound(this.taskGroupId, this.roundId))
        let notAnswered = Array.from(this.tasks.filter((task) => !answeredTaskIds.has(task.taskId)))
       
        if (notAnswered.length == 0)
            return new NextTaskResult(null,true);
        this.task =  notAnswered[0];
        return new NextTaskResult(notAnswered[0],false);
        // if(this.tasks.length == 0)
        // {
        //     return new NextTaskResult(null,true);
        // }
        // if(this.position >= this.tasks.length)
        // {
        //     return new NextTaskResult(null,true);
        // }
        // let result = this.tasks[this.position];
        // this.position++;
        // this.task = result;
        // return new NextTaskResult(result,false);
    }

    // isActive()
    // {
    //     return true;// !(this.dependentOn.map((d) => d.completed()).includes(false))
    // }

}





