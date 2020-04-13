import { randomInteger } from './math'

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
    return async function getTaskAsync(roundId,taskGroup)
    {
        // if(taskForTaskGroup.has(taskGroupId))
        // {
        //     return taskForTaskGroup.get(taskGroupId)
        // }
        let tasks = await getTasksFromStore(roundId,taskGroup)
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
       
        let tasks = await getTasksAsync(roundId,taskGroup)
        let attempts = await attemptStore.attemptsPerRound(roundId)
        console.log('attempts')
        console.log(attempts)
        let taskids = taskIdsFromAttempts(attempts)
        let filter = filterTask(taskids)
        let notAnswerdTasks = tasks.filter(filter)
        console.log('not answered')
        console.log(notAnswerdTasks)
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




