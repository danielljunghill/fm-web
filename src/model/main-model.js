// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }


import { multiplyTableLinks } from './TaskGroupLinks';
import { AttemptStore } from './AttemptStore';


let attemptStore = new AttemptStore()

export class MainModel
{
    constructor()
    {
        this.start = multiplyTableLinks(attemptStore)
        this.selectedItem = this.start;
           
    }

    setTask(task)
    {
        this.task = task;
    }

    setTaskGroup(taskGroupLink)
    {   
        this.selectedItem = taskGroupLink.CreateTaskGroup();
        //hämta första task. Kankse ska vara egen function
        this.task = this.selectedItem.getNextTask();       
    }

    nextTask(answer)
    {
        this.task.Attempt(answer)
        //här borde attempt sparas
        let nextTask = this.selectedItem.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = this.start;
            return;
        }
        this.task = nextTask.Task
        
    }

    setTaskGroupLinks(links)
    {
        this.selectedItem = links;
    }

}

let data = new MainModel()
export default function getModelInstance()
{
    return data;
}










