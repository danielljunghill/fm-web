
import { TaskGroupLinks } from './taskGroupLinks.js';
import { TaskGroupLink } from './taskGroupLink.js';
import { Timer } from './time';
import { AttemptStore } from './attemptDb';
import { getTasks, getNextTask ,getNotAnsweredTasks, selectNextTaskInRandomOrder} from './taskService'
import { createUUID } from './math'
import { TaskGroupStore } from './taskGroupDb'
import { MultiplyQuestion } from './multiplyQuestion'
//import { TaskStore } from './taskGroupDb'


let attemptStore = new AttemptStore()
let taskGroupStore = new TaskGroupStore()
let getTasksAsync = getTasks(taskGroupStore.getTasksForGroup)

function round(taskGroup)
{
    return { id:createUUID(), taskGroup: taskGroup }
}
    
export class MainModel
{
    constructor()
    {
        this.start = new TaskGroupLinks('TaskGroupLinks',[])
        this.selectedItem = this.start;
        this.timer = new Timer();
        this.round = {} 
    }

    async getLinks()
    {
        let taskGroups = await taskGroupStore.getTaskGroups()
        let taskGroupLinks = taskGroups.map((taskGroup) => new TaskGroupLink(taskGroup))
        this.selectedItem = new TaskGroupLinks('TaskGroupLinks',taskGroupLinks)
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
        this.round = round(taskGroup)
        let nextTask = await this.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = await this.getLinks()
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
                state.selectedItem = await this.getLinks()
                return 
            }
        
            state.selectedItem = new MultiplyQuestion(nextTask.task)
            console.log('nextTask')
            console.log(state.selectedItem )
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


let data = new MainModel()
data.getLinks()

export default function getModelInstance()
{
    return data;
}










