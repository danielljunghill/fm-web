// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }


import { multiplyTableLinks } from './TaskGroupLinks';
import { AttemptStore } from './AttemptStore';
import { Timer } from './Time'

let attemptStore = new AttemptStore()

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
        //hämta första task. Kankse ska vara egen function
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
            newTaskInit();
            state.timer.reset();
            state.timer.start(); 

        }
        Timer.flow(() => answerTaskFn(this,answer),() => nextTaskFn(this),20)
    }

 
 

    // setTaskGroupLinks(links)
    // {
    //     this.selectedItem = links;
    // }

}

let data = new MainModel(attemptStore)
export default function getModelInstance()
{
    return data;
}










