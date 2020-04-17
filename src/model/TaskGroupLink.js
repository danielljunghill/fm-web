import { TaskGroup } from "./taskGroup.js";


//skicka in taskgroup i metod för att skapa taskgroup i component.


export class TaskGroupLink
{
    constructor(taskGroup)
    {
        //lägg till kontrakt som anger att isActive eller
       
        this.taskGroup = taskGroup;
        this.IsActive = true;
        this.description = taskGroup.name
    }

    Create()
    {
      
        return new TaskGroup(this.taskGroup.id,[])
    }

    static CreateFromTaskGroup(taskGroup)
    {
        return new TaskGroupLink(taskGroup)
    }

    isCompleted()
    {
        return true;
        // let result = this.attemptStore.isCompleted(this.taskGroup.id)
      
        // return result
    }

    isActive()
    {
        return true;
        // if(this.IsActive)
        //     return true;
        // if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        // {
        //     return false;
        // }
     
        // let iscompleted = this.attemptStore.isCompleted(this.dependentOnTaskGroupId)
  
        // let result = iscompleted;

        // return result;
    }

}


