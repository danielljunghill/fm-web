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
        this.taskGroupId = taskGroupId;
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

    isCompleted()
    {
        console.log('is completed ' + this.taskGroupId)
        let result = this.attemptStore.isCompleted(this.taskGroupId)
      
        return result
    }

    isActive()
    {
       
        if(this.IsActive)
            return true;
        if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        {
            return false;
        }
        console.log(this.dependentOnTaskGroupId);
        let iscompleted = this.attemptStore.isCompleted(this.dependentOnTaskGroupId)
        console.log(iscompleted)
        let result = iscompleted;

        return result;
    }

}


