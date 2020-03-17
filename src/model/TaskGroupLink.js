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
       console.log('check if link is active')
        if(this.IsActive)
            return true;

        if(!this.attemptStore.has(this.dependentOnTaskGroupId))
        {
          
            return false;
        }
        let state = this.attemptStore.get(this.dependentOnTaskGroupId)
      
        let result = state.isCompleted;
 
        return result;
    }

}