import { Component } from './component.js'
import { createUUID } from './math.js'
import { randomInteger } from './math.js'

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

    getNotAnsweredTasks()
    {
        let answeredTaskIds = new Set(this.taskGroupAttempsStore.getAnsweredTaskForRound(this.taskGroupId, this.roundId))

        let notAnswered = Array.from(this.tasks.filter((task) => !answeredTaskIds.has(task.taskId)))

        return notAnswered;
    }

    getNextTask()
    {
        
        let notAnswered = this.getNotAnsweredTasks();
       
        if (notAnswered.length == 0)
            return new NextTaskResult(null,true);
        //måste sätta nästa task i taskgroup
        //då this.task styr vilken task som visas i Task.vue
        let nextTask = notAnswered[0];
        this.task = nextTask;

        return new NextTaskResult(nextTask,false);
  
    }


    getNextTaskRandomOrder()
    {
        let notAnswered = this.getNotAnsweredTasks();

        if (notAnswered.length == 0)
            return new NextTaskResult(null,true);

        let nextIndex = randomInteger(0,notAnswered.length - 1);
        
        //måste sätta nästa task i taskgroup
        //då this.task styr vilken task som visas i Task.vue
        let nextTask =  notAnswered[nextIndex];

        this.task = nextTask;

        return new NextTaskResult(nextTask,false);

    }

 

}





