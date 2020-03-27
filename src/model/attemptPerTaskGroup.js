
import { AttemptPerRoundStore } from "./attemptPerRoundStore.js"


//vid alla svar rätt skall nästa
//link aktiveras
export class AttemptPerTaskGroup
{
    constructor()
    {
        this.store = new Map();
        //this.isCompleted = true;
    }

    add(attempt,taskids)
    {
        console.log(`attempt.taskGroupId ${attempt.taskGroupId}`);
        if(!this.store.has(attempt.taskGroupId))
        {
            this.store.set(attempt.taskGroupId, new AttemptPerRoundStore(false));
        }
        this.store.get(attempt.taskGroupId).add(attempt,taskids);
    }

    get(taskGroupId)
    {
        if(this.store.has(taskGroupId))
        {
            return this.store.get(taskGroupId);
        }
        return null;
    }

    has(taskGroupId)
    {
        return this.store.has(taskGroupId);
    }

    isCompleted(taskGroupId)
    {   

        console.log('sCompleted(taskGroupId) ' + taskGroupId) 
        if(!this.store.has(taskGroupId))
            return false;
        return this.store.get(taskGroupId).isCompleted;
    }



}