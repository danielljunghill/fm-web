

 class AttemptPerTaskStore
{
    constructor()
    {
        this.attemptesPerTask = new Map()
    }
    add(attempt)
    {
        if(!this.attemptesPerTask.has(attempt.taskId))
        {
            this.attemptesPerTask.set(attempt.taskId,[])
        }
        this.attemptesPerTask.get(attempt.taskId).push(attempt)
    
    }


    /// Task has only correct answers
    taskHasOnlyCorrectAnswers(taskId)
    {
        if(!this.taskHasAttempt(taskId))
             return false;
        let arr = this.attemptesPerTask.get(taskId).map((attempt) => attempt.correct)
        return Array.from(arr).includes(true) && !Array.from(arr).includes(false) 

    }
    /// Task has correct asnswers
    taskHasCorrectAnswers(taskId)
    {
        if(!this.taskHasAttempt(taskId))
            return false;
        let arr = this.attemptesPerTaskget(taskId).map((attempt) => attempt.correct)
        return Array.from(arr).includes(true) 
    }

    /// task has answers
    taskHasAttempt(taskId)
    {
        if(!this.attemptesPerTask.has(taskId))
            return false;
        return (this.attemptesPerTask.get(taskId).length > 0)
         
    }



    answeredTasks()
    {
        return Array.from(this.attemptesPerTask.keys())
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

export class AttemptPerRoundStore
{
    constructor(isCompleted)
    {
       this.attemptsPerRound = new Map();
       this.isCompleted = isCompleted;
      
    }

    add(attempt,taskIds)
    {
        
        let roundId = attempt.roundId
        if(!this.attemptsPerRound.has(roundId))
        {
            this.attemptsPerRound.set(roundId,new AttemptPerTaskStore());
        }
        let attemptsPerRound = this.attemptsPerRound.get(roundId)
        attemptsPerRound.add(attempt)
        
        if(this.isCompleted)
            return true;

        this.isCompleted = !taskIds.map((taskId) => attemptsPerRound.taskHasOnlyCorrectAnswers(taskId)).includes(false)
    
        return this.isCompleted;
    }

    // getAllAttemptsForRound(roundId)
    // {
    //     if(this.attemptsPerRound.has(roundId))
    //         return this.attemptsPerRound.get(roundId)
    //     return null;
    // }

    hasOneOrManySuccessfullRounds(taskIds)
    {
        Array.from(this.attemptsPerRound.values().map((attemptPerTaskStore) => attemptPerTaskStore.tasksHasOnlyCorrectAnswers(taskIds))).includes(true);
    }

    getAllAnsweredTaskIdsForRound(roundId)
    {
        if(!this.attemptsPerRound.has(roundId))
            return [];
        
        return this.attemptsPerRound.get(roundId).answeredTasks();

    }

    // isTaskAnsweredForRound(roundId,taskId)
    // {
    //     this.attemptsPerRound.has(roundId)
    //         return this.attemptsPerRound.get(roundId).taskHasAttempt(taskId)
    //     return false;
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