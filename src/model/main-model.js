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

  

    setTaskGroup(taskGroupLink)
    {   
        let taskGroup  = taskGroupLink.CreateTaskGroup();
        let nextTask = taskGroup.getNextTask();
        console.log('nexttask ' + nextTask.task)
        //hämta första task. Kankse ska vara egen function

        this.task = nextTask.task; 
        this.selectedItem = taskGroup;
        //kontrollera taskgroup.ComponentName
        console.log('task ' + this.task)      
    }

    nextTask(answer)
    {
        console.log(answer + ' answer')
        this.task.attempt(answer)
        //här borde attempt sparas
        let nextTask = this.selectedItem.getNextTask()
        if(nextTask.endOfTasks)
        {
            this.selectedItem = this.start;
            return;
        }
        console.log(nextTask + ' next task ' + nextTask.task.B);
        this.task = nextTask.task
        
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










