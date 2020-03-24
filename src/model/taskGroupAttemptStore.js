
import { TaskAttemptStore } from "./taskAttemptStore.js"


//vid alla svar rätt skall nästa
//link aktiveras
export class TaskGroupAttemptStore
{
    constructor()
    {
        this.store = new Map();
        this.isCompleted = true;
    }

    add(attempt)
    {
        console.log(`attempt.taskGroupId ${attempt.taskGroupId}`);
        if(!this.store.has(attempt.taskGroupId))
        {
            this.store.set(attempt.taskGroupId, new TaskAttemptStore(false));
        }
        this.store.get(attempt.taskGroupId).add(attempt);
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



}