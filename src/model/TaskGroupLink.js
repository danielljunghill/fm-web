import { TaskGroup } from "./taskGroup.js";


export class TaskGroupLink
{
    constructor(description,
        taskGroup,
        isActive,
        dependentOnTaskGroupId,
        attemptStore)
    {
        //lägg till kontrakt som anger att isActive eller
        this.taskGroup = taskGroup;
        this.IsActive = isActive;
        this.dependentOnTaskGroupId = dependentOnTaskGroupId;
        this.attemptStore = attemptStore;
        this.description = description
    }

    Create()
    {
      
        return new TaskGroup(this.taskGroup.id,[],this.attemptStore)
    }

    isCompleted()
    {
        
        let result = this.attemptStore.isCompleted(this.taskGroup.id)
      
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
     
        let iscompleted = this.attemptStore.isCompleted(this.dependentOnTaskGroupId)
  
        let result = iscompleted;

        return result;
    }

}


