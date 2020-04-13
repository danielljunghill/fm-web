
import { multiplyTableLinks } from './taskGroupLinks.js';
import { AttemptPerTaskGroup } from './attemptPerTaskGroup.js';
import { Timer } from './time';
import { AttemptStore } from './attemptDb';
import { getTasksForGroup } from './taskGroup'
import { getTasks, getNextTask ,getNotAnsweredTasks, selectNextTaskInRandomOrder } from './taskService'
import { createUUID } from './math'

let getTasksAsync = getTasks(getTasksForGroup)
let attemptStore = new AttemptStore()

function round(taskGroup)
{
    return { id:createUUID(), taskGroup: taskGroup }
}
    
export class MainModel
{
    constructor(store)
    {
        this.start = multiplyTableLinks(store)
        this.dbStore =  new AttemptStore()
        this.selectedItem = this.start;
        this.taskGroupStore = taskGroupStore;
        this.timer = new Timer();
        this.round = {}
           
    }

    async getNextTask()
    {
        let roundId = this.round.id
        let taskGroup = this.round.taskGroup
        console.log('taskgroup')
        console.log(roundId)
        console.log(taskGroup)
        let getAvailableTasks = getNotAnsweredTasks(getTasksAsync,attemptStore)
        let getNextTaskInOrder =  await getNextTask(roundId,taskGroup)(getAvailableTasks)
        let nextTask = getNextTaskInOrder(selectNextTaskInRandomOrder)   
        return nextTask
    }

    async startRound(taskGroup)
    {   
       
        //roundId,taskGroupId,getTasksAsync,attemptStore
        this.round = round(taskGroup)
        let nextTask = await this.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = this.start
            return 
        }
      
        this.selectedItem = nextTask.task

    }


    nextTask(answer, newTaskInit)
    {
        async function answerTaskFn(state,answer)
        {
            //HÄMTA TASK
            let task = state.selectedItem
            let seconds = state.timer.seconds;
            state.timer.stop();
            //KONTROLLERA ATTEMPT
            let attempt = task.attempt(answer,seconds);
            console.log('attempt')
            await state.dbStore.add(attempt)
            let nextTask = await state.getNextTask()
            if(nextTask.endOfTasks)
            {
                state.selectedItem = state.start
                return 
            }
            console.log(nextTask.task)
            state.selectedItem = nextTask.task
            state.timer.reset();
            state.timer.start(); 
            console.log('init next task')
            newTaskInit(state.selectedItem);
            
  
        }

        async function nextTaskFn(state)
        { 
            //let attempts = await state.dbStore.answeredTaskIdsPerRound(state.selectedItem.roundId)
            console.log(state)
            // let taskids = await state.dbStore.succesfullTaskIdsPerRound(state.selectedItem.roundId)
            // console.log(taskids)
     
            // if(nextTask.endOfTasks)
            // {
            //     state.selectedItem = state.start;
            //     return;
            // } 
            
            // state.timer.reset();
            // state.timer.start(); 
            // newTaskInit();

        }
        Timer.flow(() => answerTaskFn(this,answer),() => nextTaskFn(this),1000)
    }

 
    goBack()
    {
        this.selectedItem = this.start;
    }

    // setTaskGroupLinks(links)
    // {
    //     this.selectedItem = links;
    // }

}

let taskGroupStore = new AttemptPerTaskGroup()
let data = new MainModel(taskGroupStore)
// function createDb() {
//         return new Promise(resolve =>
//             {
//                 setTimeout(() => {
//                     resolve('resolved')
//                 },2000);
                
//             });
// }

//console.log(getDbPromise)
//getDbPromise.then(function(db) { console.log('attemptDb is set',db) })

export default function getModelInstance()
{
    return data;
}










