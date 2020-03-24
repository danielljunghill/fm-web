// import { Attempt } from './attempt.js'
//  import { NextTaskResult } from './task.js'

export class TaskAttempts
{
    constructor()
    {
        this.map = new Map()
    }
    add(attempt)
    {
        if(!this.map.has(attempt.taskId))
        {
            this.map.set(attempt.taskId,[])
        }
        this.map.get(attempt.taskId).push(attempt)
    
    }

    has(taskId)
    {
        return this.map.has(taskId)
    }

    get(taskId)
    {
        return this.map.get(taskId)
    }

    values()
    {   
        return Array.from(this.map.values());
    }
}

export class Attempts
{
    constructor(isCompleted)
    {
       this.attemptMap = new Map();
       this.isCompleted = isCompleted;
    }

    add(attempt)
    {
        if(!this.attemptMap.has(attempt.roundId))
        {
            this.attemptMap.set(attempt.roundId,new TaskAttempts());
        }
        let map = this.attemptMap.get(attempt.roundId)
        console.log(map)
        map.add(attempt)
        //
        if(this.isCompleted)
            return true;
        console.log(map.values())
        if(map.values().filter(a => a.correct).length == 10)
        {
            this.isCompleted  = map.get(attempt.roundId).length == 10
            return this.isCompleted;
        }
    
        return false;
    }

    getAttempts(roundId)
    {
        if(this.attemptMap.has(roundId))
            return this.attemptMap.get(roundId)
        return null;
    }

    tryGetRoundId()
    {
        let keys =  this.attemptMap.keys; 
        if(keys.length == 0)
            return { roundId: '', empty: true}
        return { roundId: keys[keys.length - 1], empty: false }
    }

    // getNextTask(roundId,tasks)
    // {
    //     // function isComplete1(tasks)
    //     // {
    //     //     let taskMap = new Map(tasks.map((task) => [task.taskId,task]))
    
    //     // }
    
    //     // function isComplete(task,attempts)
    //     // {
    //     //     let taskMap = new Map(tasks.map((task) => [task.taskId,task]))
    //     // }

    //     let attempts = this.attemptMap.get(roundId)
    //     if(attempts == undefined)
    //         return NextTaskResult(tasks[0],true);
    //     //hämta nästa task task som inte är klara
    //     let mapAttempts = new Map(attempts.map((attempt) => attempt))
        
    
    // }


    current()
    {
        return this.items[this.items.length - 1]
    }

    isEmpty()
    {
        return this.items.length == 0;
    }  


}