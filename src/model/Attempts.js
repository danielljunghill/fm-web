//import { Attempt } from './Attempt.js'

export class Attempts
{
    constructor(isCompleted)
    {
       this.AttemptMap = new Map();
       this.isCompleted = isCompleted;
    }

    add(attempt)
    {
        if(!this.AttemptMap.has(attempt.roundId))
        {
            this.AttemptMap.set(attempt.roundId,[]);
        }
        this.AttemptMap.get(attempt.roundId).push(attempt);
        //
        if(this.isCompleted)
            return true;

        if(this.AttemptMap.get(attempt.roundId).filter(a => a.correct).length == 10)
        {
            let result = this.AttemptMap.get(attempt.roundId).length == 10;
            console.log(this.AttemptMap.get(attempt.roundId).length);
            console.log("check completed " + result)
            return (this.isCompleted  = this.AttemptMap.get(attempt.roundId).length == 10);
        }
    
        return false;
    }

    current()
    {
        return this.items[this.items.length - 1]
    }

    isEmpty()
    {
        return this.items.length == 0;
    }  


}