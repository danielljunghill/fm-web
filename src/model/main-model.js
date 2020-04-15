
import { multiplyTableLinks } from './taskGroupLinks.js';
import { AttemptPerTaskGroup } from './attemptPerTaskGroup.js';
import { Timer } from './time';
import { AttemptStore } from './attemptDb';
import { getTasksForGroup } from './taskGroup'
import { getTasks, getNextTask ,getNotAnsweredTasks, selectNextTaskInRandomOrder} from './taskService'
import { createUUID } from './math'
//import { TaskStore } from './taskGroupDb'

let getTasksAsync = getTasks(getTasksForGroup)
let attemptStore = new AttemptStore()
//let taskStore = new TaskStore()
//let attemptsPerTaskGroup = getTaskGroupStatus(attemptStore)

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

    static async setup()
    {

    }

    async getNextTask()
    {
        let roundId = this.round.id
        let taskGroup = this.round.taskGroup
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
            let attempt = task.attempt(answer,seconds,state.round);

            await state.dbStore.add(attempt)
            let nextTask = await state.getNextTask()
            if(nextTask.endOfTasks)
            {
                state.selectedItem = state.start
                return 
            }
        
            state.selectedItem = nextTask.task
            state.timer.reset();
            state.timer.start(); 
    
            newTaskInit(state.selectedItem);
            
  
        }

        async function nextTaskFn(state)
        { 
            console.log(state)
        }
        Timer.flow(() => answerTaskFn(this,answer),() => nextTaskFn(this),1000)
    }

 
    goBack()
    {
        this.selectedItem = this.start;
    }

}

let taskGroupStore = new AttemptPerTaskGroup()
let data = new MainModel(taskGroupStore)

export default function getModelInstance()
{
    return data;
}










