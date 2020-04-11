import { randomInteger } from './math.js'

export class NextTaskResult
{
    constructor(task,endOfTasks)
    {
        this.task = task;
        this.endOfTasks = endOfTasks;
        
    }
}

/// mappa om attempts till taskIds
function taskIdsFromAttempts(attempts)
{
    return new Set(attempts.map((attempt) => attempt.taskId))
}
/// Hämta attempts som är korrekta
function taskIdsFromSuccessfullAttempts(attempts)
{
    taskIdsFromAttempts(attempts.filter(function(attempt) { attempt.correct}))
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

function selectNextTaskInSortedOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextTask = tasks[0];
    return new NextTaskResult(nextTask,false);
}

function selectNextTaskInRandomOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextIndex = randomInteger(0,tasks.length - 1);
    let nextTask = tasks[nextIndex];
    return new NextTaskResult(nextTask,false);
}

async function getNotAnsweredTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromAttempts(attempts))
    let notAnswerdTasks = tasks.filter(filter)
    return notAnswerdTasks

}

async function getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromSuccessfullAttempts(attempts))
    let notSuccessfullTasks = tasks.filter(filter)
    return notSuccessfullTasks
}


export async function getNextNotAsweredTaskInSortedOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let notAnswerdTasks = await getNotAnsweredTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
    let tasksInSortedOrder =  selectNextTaskInSortedOrder(notAnswerdTasks)
    return tasksInSortedOrder
}

export async function getNextNotAsweredTaskInRandomOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let notAnswerdTasks = await getNotAnsweredTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
    let tasksInSortedOrder =  selectNextTaskInRandomOrder(notAnswerdTasks)
    return tasksInSortedOrder
}

export async function getNextNotSuccessfullTaskInSortedOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let notSuccessfullTasks = await getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
    let tasksInSortedOrder =  selectNextTaskInSortedOrder(notSuccessfullTasks)
    return tasksInSortedOrder
}

export async function getNextNotSuccessfullTaskInRandomOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let notSuccessfullTasks = await getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
    let tasksInSortedOrder =  selectNextTaskInRandomOrder(notSuccessfullTasks)
    return tasksInSortedOrder
}



