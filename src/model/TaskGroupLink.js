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
        return new TaskGroup(this.taskGroupId,[])
    }

    isActive()
    {
       //console.log('check if link is active ' + this.IsActive)
        if(this.IsActive)
            return true;
        console.log(this.attemptStore)
        if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        {
            //console.log('is not in attemptstore ' + this.dependentOnTaskGroupId)
            return false;
        }
        let iscompleted = this.attemptStore.isCompleted(this.dependentOnTaskGroupId)
        console.log('iscompleted ' + iscompleted)
        let result = iscompleted;

        return result;
    }

}


