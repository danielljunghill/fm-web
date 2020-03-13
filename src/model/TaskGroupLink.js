import { TaskGroup } from "./TaskGroup.js";


export class TaskGroupLink
{
    constructor(taskGroupId,isActive,dependentOnTaskGroupId,attemptStore)
    {
        //lägg till kontrakt som anger att isActive eller
        this.TaskGroupId = taskGroupId;
        this.IsActive = isActive;
        this.dependentOnTaskGroupId = dependentOnTaskGroupId;
        this.attemptStore = attemptStore;
    }

    Create()
    {
        return new TaskGroup(this.taskGroupId,[])
    }

    isActive()
    {
      
        if(this.IsActive)
            return true;

        if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        {
            console.log("not in attemptStore " + this.dependentOnTaskGroupId)
            return false;
        }
        
        let result = this.attemptStore.get(this.dependentOnTaskGroupId).isCompleted;
        console.log(this.dependentOnTaskGroupId + ' ' + result);
        return result;
    }

}