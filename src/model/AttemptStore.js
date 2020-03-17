
import { Attempts } from "./Attempts.js"


//vid alla svar rätt skall nästa
//link aktiveras
export class AttemptStore
{
    constructor()
    {
        this.store = new Map();
    }

    add(attempt)
    {
        console.log(`attempt.taskGroupId ${attempt.taskGroupId}`);
        if(!this.store.has(attempt.taskGroupId))
        {
            this.store.set(attempt.taskGroupId, new Attempts(false));
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