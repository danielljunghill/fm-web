
import { TaskGroupLinks } from './taskGroupLinks.js';
import { Timer } from './time';
import { AttemptStore } from './attemptDb';
import { getTasks, getNextTask ,getNotAnsweredTasks, selectNextTaskInRandomOrder} from './taskService'
import { createUUID } from './math'
import { TaskGroupStore } from './taskGroupDb'
import { MultiplyQuestion } from './multiplyQuestion'
import { getTaskGroupLinks } from './taskGroupService'
import { getTaskHistory } from './taskHistoryService'
import { Settings } from './settings.js';



let attemptStore = new AttemptStore()
let taskGroupStore = new TaskGroupStore()
let getTasksAsync = getTasks(taskGroupStore)
let getLinksFromStore  = getTaskGroupLinks(taskGroupStore,attemptStore)
let getTaskHistoryAsync = getTaskHistory(attemptStore,taskGroupStore)

function round(taskGroup)
{
    return { id:createUUID(), taskGroup: taskGroup }
}

export class NavigationState
{
    constructor()
    {
        this.opened = false
    }

    toggleOpenedStatus()
    {
        this.opened = !this.opened
    }
}
    
export class MainModel
{
    constructor()
    {
        this.start = new TaskGroupLinks('TaskGroupLinks',[])
        this.selectedItem = this.start;
        this.timer = new Timer();
        this.round = {} 
        this.navigation = new NavigationState();
    }

    async getLinks()
    {
        let links = await getLinksFromStore()
        console.log('getLinks')
        // let taskGroupLinks = taskGroups.map((taskGroup) => new TaskGroupLink(taskGroup))
        let result = new TaskGroupLinks('TaskGroupLinks',links)
        //TODO: ändra detta bså att den går mot
        this.start = result;
        // this.start = this.selectedItem 
        return result
    }

    async setup()
    {
        this.selectedItem = await this.getLinks()
        
        return this.selectedItem
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

        this.timer.start(); 
        this.selectedItem = new MultiplyQuestion(nextTask.task,nextTask.nrOfTasksInGroup,nextTask.completed)
    }


    async answerTaskAsync(answer)
    {
        let task = this.selectedItem
        let seconds = this.timer.seconds;
        this.timer.stop();
            //KONTROLLERA ATTEMPT
        let attempt = task.attempt(answer,seconds,this.round);
        await attemptStore.add(attempt)
    }

    async nextTaskAsync()
    {
        let nextTask = await this.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = await this.getLinks()
            return 
        }
        this.selectedItem = new MultiplyQuestion(nextTask.task,nextTask.nrOfTasksInGroup,nextTask.completed)
    
        this.timer.reset();
        this.timer.start(); 
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

            await attemptStore.add(attempt)
            let nextTask = await state.getNextTask()
            if(nextTask.endOfTasks)
            {
                state.selectedItem = await state.getLinks()
                return 
            }
            state.selectedItem =  new MultiplyQuestion(nextTask.task,nextTask.nrOfTasksInGroup,nextTask.completed)
  
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
        this.timer.stop()
        this.timer.reset()
        this.selectedItem = this.start;
    }

    async goBackWithRefresh()
    {
        this.timer.stop()
        this.timer.reset()
        this.selectedItem = await this.getLinks();
    }

    async viewHistory()
    {
        this.selectedItem = await getTaskHistoryAsync(false);
      
    }

    async viewSettings()
    {
        this.selectedItem = new Settings(attemptStore) 
    }



}

let model = new MainModel()

model.setup()
export default function getModelInstance()
{
    return model;
}










