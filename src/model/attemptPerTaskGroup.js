
import { AttemptPerRoundStore } from "./attemptPerRoundStore.js"


//vid alla svar rätt skall nästa
//link aktiveras
export class AttemptPerTaskGroup
{
    constructor()
    {
        this.roundStoresPerTaskGroup = new Map();
        //this.isCompleted = true;
    }

    add(attempt,taskids)
    {
        
        if(!this.roundStoresPerTaskGroup.has(attempt.taskGroupId))
        {
            this.roundStoresPerTaskGroup.set(attempt.taskGroupId, new AttemptPerRoundStore(false));
        }
        this.roundStoresPerTaskGroup.get(attempt.taskGroupId).add(attempt,taskids);
    }

    get(taskGroupId)
    {
        if(this.roundStoresPerTaskGroup.has(taskGroupId))
        {
            return this.roundStoresPerTaskGroup.get(taskGroupId);
        }
        return null;
    }

    has(taskGroupId)
    {
        return this.roundStoresPerTaskGroup.has(taskGroupId);
    }

    isCompleted(taskGroupId)
    {   

        if(!this.roundStoresPerTaskGroup.has(taskGroupId))
            return false;
        return this.roundStoresPerTaskGroup.get(taskGroupId).isCompleted;
    }

    //hämta task som är bsevarade och har åtminstore ett korrekt attempt
    getSuccessfullTaskForRound(taskGroupId,roundId)
    {
        if(!this.roundStoresPerTaskGroup.has(taskGroupId))
            return [];  
        let roundStore = this.roundStoresPerTaskGroup.get(taskGroupId);   
        let successfullTasks = roundStore.getSuccessfullTaskForRound(roundId);
        return successfullTasks;

    }

    //hämta tasks som är besvarade
    getAnsweredTaskForRound(taskGroupId,roundId)
    {
        if(!this.roundStoresPerTaskGroup.has(taskGroupId))
            return [];      
        let roundStore = this.roundStoresPerTaskGroup.get(taskGroupId);  
        let answeredTasks = roundStore.getAllAnsweredTaskIdsForRound(roundId);
        return answeredTasks
    }


}