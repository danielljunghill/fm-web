import { randomInteger } from './math'
import {groupBy } from './collections'

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
    return new Set(Array.from(attempts.map((attempt) => attempt.taskId)))
}
/// Hämta attempts som är korrekta
function taskIdsFromSuccessfullAttempts(attempts)
{
    taskIdsFromAttempts(attempts.filter(function(attempt) { attempt.correct}))
}
// filterera taskId med hjälp av taskId set
function filterTask(taskIdSet)
{
    return function(task) { 

        return !taskIdSet.has(task.taskId)}
}

export function getTasks(getTasksFromStore)
{
    let taskForTaskGroup = new Map()
    return async function getTaskAsync(taskGroup)
    {
        // if(taskForTaskGroup.has(taskGroupId))
        // {
        //     return taskForTaskGroup.get(taskGroupId)
        // }
        let tasks = await getTasksFromStore(taskGroup)
        taskForTaskGroup.set(taskGroup.id,tasks)
        return tasks
    }
}

export function selectNextTaskInSortedOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextTask = tasks[0];
    return new NextTaskResult(nextTask,false);
}

export function selectNextTaskInRandomOrder(tasks)
{
    if (tasks.length == 0)
        return new NextTaskResult(null,true);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextIndex = randomInteger(0,tasks.length - 1);
    let nextTask = tasks[nextIndex];
    return new NextTaskResult(nextTask,false);
}

export function getNotAnsweredTasks(getTasksAsync,attemptStore)
{
    return async function(roundId,taskGroup)
    {
        
        let tasks = await getTasksAsync(taskGroup)
        console.log('tasks')
        console.log(tasks)
        let attempts = await attemptStore.attemptsPerRound(roundId)

        let taskids = taskIdsFromAttempts(attempts)
        console.log('taskids')
        console.log(taskids)
        let filter = filterTask(taskids)

        let notAnswerdTasks = tasks.filter(filter)

        return notAnswerdTasks
    }


}

export async function getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromSuccessfullAttempts(attempts))
    let notSuccessfullTasks = tasks.filter(filter)
    return notSuccessfullTasks
}



export function getNextTask(roundId,taskGroup)
{
    
    return async function(getNotCompletedTasksAsync)
    {
        let notCompleted = await getNotCompletedTasksAsync(roundId,taskGroup)
        return function(selectNextTask)
        {
            return selectNextTask(notCompleted)
        }

    }
}

export function getTaskGroupStatus(attemptStore)
    {
        return async function(taskGroupId)
        {
            let attempts = await attemptStore.attemptsPerTaskGroup(taskGroupId)
            console.log('getTaskGroupStatus')
            console.log(attempts)
            let attemptsPerRound = groupBy(attempts,'roundId')
            return Object.values(attemptsPerRound)
        }

}



// // 
// export async function getNextNotAsweredTaskInSortedOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
// {
//     let notAnswerdTasks = await getNotAnsweredTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
//     let tasksInSortedOrder =  selectNextTaskInSortedOrder(notAnswerdTasks)
//     return tasksInSortedOrder
// }

// export async function getNextNotAsweredTaskInRandomOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
// {
//     let notAnswerdTasks = await getNotAnsweredTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
//     let tasksInSortedOrder =  selectNextTaskInRandomOrder(notAnswerdTasks)
//     return tasksInSortedOrder
// }

// export async function getNextNotSuccessfullTaskInSortedOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
// {
//     let notSuccessfullTasks = await getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
//     let tasksInSortedOrder =  selectNextTaskInSortedOrder(notSuccessfullTasks)
//     return tasksInSortedOrder
// }

// export async function getNextNotSuccessfullTaskInRandomOrder(roundId,taskGroupId,getTasksAsync,attemptStore)
// {
//     let notSuccessfullTasks = await getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
//     let tasksInSortedOrder =  selectNextTaskInRandomOrder(notSuccessfullTasks)
//     return tasksInSortedOrder
// }




