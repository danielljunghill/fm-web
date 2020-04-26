// import { TaskGroup } from "./taskGroup.js";


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

    static CreateFromTaskGroup(taskGroup)
    {
        return new TaskGroupLink(taskGroup)
    }

    isCompleted()
    {
        return this.IsActive;
    }

    isActive()
    {
        return this.IsActive;
    }

}


