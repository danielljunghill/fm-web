import { Component } from './component.js'


// export function taskGroup(name,id,type, isActive)
// {
//     return { name: name, id: id, type: type, isActive: isActive}
// }

// export async function getTasksForGroup(taskGroup)
// {

//     if(taskGroup == null)
//         throw 'taskGroup is not available'

//     if(taskGroup.type == 'MultiplyTable')
//     {
//         return createMultiplyQuestions(taskGroup.name)
//     }

//     throw `could not recognize taskgroupid ${taskGroup}`

// }



// export class NextTaskResult
// {
//     constructor(task,endOfTasks)
//     {
//         this.task = task;
//         this.endOfTasks = endOfTasks;
        
//     }
// }


export class TaskGroup extends Component
{
    constructor(taskGroupId,tasks)
    {   
        super('TaskGroup')
        this.tasks = tasks;
        this.position = 0;
        this.taskGroupId = taskGroupId;   
        // this.roundId = createUUID()
        //Attemptstore borde brytas ut
        // this.taskGroupAttempsStore = taskGroupAttempsStore
        //this.task = this.getNextTask().task
       
    }
    
    completed()
    {
        //kontrollera om samtliga tasks (questions) är klara
        // if(this.tasks.map((x) => x.completed()).includes(false))
        // { 
        //     return false;
        // }
        // return true;
        return true;
    }

    getNotAnsweredTasks()
    {
        // let answeredTaskIds = new Set(this.taskGroupAttempsStore.getAnsweredTaskForRound(this.taskGroupId, this.roundId))

        // let notAnswered = Array.from(this.tasks.filter((task) => !answeredTaskIds.has(task.taskId)))

        // return notAnswered;
        return [];
    }

    getNonSuccessfullTasks()
    { 
        
        // let successfullTasks = new Set(this.taskGroupAttempsStore.getSuccessfullTaskForRound(this.taskGroupId, this.roundId))

        // let notSuccessfull = Array.from(this.tasks.filter((task) => !successfullTasks.has(task.taskId)))

        // return notSuccessfull;
        return []

    }

    getNextTask()
    {
        
        // let notAnswered = this.getNotAnsweredTasks();
       
        // if (notAnswered.length == 0)
        //     return new NextTaskResult(null,true);
        // //måste sätta nästa task i taskgroup
        // //då this.task styr vilken task som visas i Task.vue
        // let nextTask = notAnswered[0];
        // this.task = nextTask;

        // return new NextTaskResult(null,false);
  
    }


    getNextTaskRandomOrder()
    {
        // let notAnswered = this.getNotAnsweredTasks();

        // if (notAnswered.length == 0)
        //     return new NextTaskResult(null,true);

        // let nextIndex = randomInteger(0,notAnswered.length - 1);
        
        // //måste sätta nästa task i taskgroup
        // //då this.task styr vilken task som visas i Task.vue
        // let nextTask =  notAnswered[nextIndex];

        // this.task = nextTask;

        // return new NextTaskResult(nextTask,false);

    }

 

}





