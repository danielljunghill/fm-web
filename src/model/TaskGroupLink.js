import { TaskGroup } from "./taskGroup.js";


export class TaskGroupLink
{
    constructor(description,
        taskGroupId,
        isActive,
        dependentOnTaskGroupId,
        attemptStore)
    {
        //lägg till kontrakt som anger att isActive eller
        this.TaskGroupId = taskGroupId;
        this.IsActive = isActive;
        this.dependentOnTaskGroupId = dependentOnTaskGroupId;
        this.attemptStore = attemptStore;
        this.description = description
    }

    Create()
    {
        console.log(this.attemptStore)
        return new TaskGroup(this.taskGroupId,[],this.attemptStore)
    }

    isActive()
    {
       
        if(this.IsActive)
            return true;
        if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        {
            return false;
        }
        let iscompleted = this.attemptStore.isCompleted(this.dependentOnTaskGroupId)
        let result = iscompleted;

        return result;
    }

}


