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
        this.selectedItem = taskGroup;
        //kontrollera taskgroup.ComponentName
 
    }

    nextTask(answer)
    {
       
        //HÄMTA TASK
        let task = this.selectedItem.task;
        this.timer.stop();
        //KONTROLLERA ATTEMPT
        let attempt = task.attempt(answer)
        //LAGRA ATTEMPT
        this.store.add(attempt);
        console.log(attempt);
        //här borde attempt sparas
        let nextTask = this.selectedItem.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = this.start;
            return;
        } 
        this.timer.start(); 
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










