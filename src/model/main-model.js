// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }


import { multiplyTableLinks } from './taskGroupLinks.js';
import { AttemptPerTaskGroup } from './attemptPerTaskGroup.js';
import { Timer } from './time'
// import { getNextTask } from './selectTask'



export class MainModel
{
    constructor(store)
    {
        this.start = multiplyTableLinks(store)
        this.selectedItem = this.start;
        this.store = store;
        this.timer = new Timer();
           
    }

    setTaskGroup(taskGroupLink)
    {   
        let taskGroup  = taskGroupLink.CreateTaskGroup();
        this.roundId = taskGroup.roundId
        //hämta första task. Kankse ska vara egen function
        this.timer.reset();
        this.timer.start();
        this.selectedItem = taskGroup;
        //kontrollera taskgroup.ComponentName
 
    }


    nextTask(answer, newTaskInit)
    {
        function answerTaskFn(state,answer)
        {
            //HÄMTA TASK
           
            let task = state.selectedItem.task;
            let seconds = state.timer.seconds;
            state.timer.stop();
            //KONTROLLERA ATTEMPT
            let attempt = task.attempt(answer,seconds);
            //LAGRA ATTEMPT
        
            state.store.add(attempt);
  
        }

        function nextTaskFn(state)
        { 
            let nextTask = state.selectedItem.getNextTask()
            if(nextTask.endOfTasks)
            {
                state.selectedItem = state.start;
                return;
            } 
            
            state.timer.reset();
            state.timer.start(); 
            newTaskInit();

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
export default function getModelInstance()
{
    return data;
}










