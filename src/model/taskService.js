import { randomInteger } from './math.js'

export class NextTaskResult
{
    constructor(task,endOfTasks)
    {
        this.task = task;
        this.endOfTasks = endOfTasks;
        
    }
}
/// Hämta attempts som är korrekta
function taskIdsFromSuccessfullAttempts(attempts)
{
    taskIdsFromAttempts(attempts.filter(function(attempt) { attempt.correct}))
}
/// mappa om attempts till taskIds
function taskIdsFromAttempts(attempts)
{
    return new Set(attempts.map((attempt) => attempt.taskId))
}
// filterera taskId med hjälp av taskId set
function filterTask(taskIdSet)
{
    return function(taskId) { !taskIdSet.has(taskId)}
}

export function getTasks(taskStore)
{
    let taskForTaskGroup = new Map()
    async function getTaskAsync(taskGroupId)
    {
        if(taskForTaskGroup.has(taskGroupId))
        {
            return taskForTaskGroup.get(taskGroupId)
        }
        let tasks = await taskStore.getTasks(taskGroupId)
        taskForTaskGroup.set(taskGroupId,tasks)
        return tasks
    }
}

function getNextTasInSortedOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextTask = tasks[0];
    return new NextTaskResult(nextTask,false);
}

function getNextTasInRandomOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextIndex = randomInteger(0,tasks.length - 1);
    let nextTask = tasks[nextIndex];
    return new NextTaskResult(nextTask,false);
}


/// Hämta ny task utifrån förusättningen att 
/// task är utförds när den är besvarad oavsett svarsresultat (attempt)
///
export async function getNextNotAsweredTaskInSortedOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromAttempts(attempts))
    let notanswerdTasks = tasks.filter(filter)
    return getNextTasInSortedOrder(notanswerdTasks)



}

/// Hämta ny task utifrån förusättningen att 
/// task är utförds när den är besvarad oavsett svarsresultat (attempt)
///
export async function getNextNotAsweredTaskInRandomOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromAttempts(attempts))
    tasks.filter(filter)
}




class TaskService
{
    constructor(store)
    {
        this.store = store
    }

    async getTasks(taskGroupId)
    {
        //gör detta med decorator
        let tasks = await this.store.getTasks(taskGroupId)
        return tasks;
    }

    async getNextNotAsweredTaskInSortedOrder(round)
    {
        let tasks = await this.getTasks(round.taskGroupId)
        let attempts = await this.store.getAttemptsPerRound(roundId)
        let filter = filterTask(taskIdsFromAttempts(attempts))
        tasks.filter(filter)
        
    }


    async getNextNotAsweredTaskInRandomOrder(round)
    {
        await store.getAttemptsPerRound(roundId)
    }

    async getNextNotSuccessfullTaskInSortedOrder(round)
    {
        await store.getAttemptsPerRound(roundId)
    }


    async getNextNotSuccessfullTaskInRandomOrder(round)
    {
        await store.getAttemptsPerRound(roundId)
    }




  



    static Create()
    {
        return new AttemptStore();
    }

    async add(attempt)
    {
        await getDb()
        await addAttempt(attempt)
    }

    async attemptsPerRound(roundId)
    {
        await getDb()
        let attempts = await getAttemptsPerRound(roundId)
        return attempts;

    }

    async  answeredTaskIdsPerRound(roundId)
    {
        let attempts = await this.attemptsPerRound(roundId)
        let result = [...new Set(attempts.map((attempt) => attempt.taskId))]
        return result;
    }

    async succesfullTaskIdsPerRound(roundId)
    {
        let attempts = await this.attemptsPerRound(roundId)
        return [...new Set(attempts.filter((attempt) => attempt.correct).map((attempt) => attempt.taskId))]
    }





}
