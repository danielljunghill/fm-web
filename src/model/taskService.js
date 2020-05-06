import { randomInteger } from './math'
// import {groupBy } from './collections'

export class NextTaskResult
{
    constructor(task,endOfTasks, completed, total)
    {
        this.task = task;
        this.endOfTasks = endOfTasks;
        console.log(completed)
        console.log(total)

        this.completed = completed
        this.nrOfTasksInGroup = total
        
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

        return !taskIdSet.has(task.id)}
}

export function getTasks(taskGroupStore)
{
    let taskForTaskGroup = new Map()
    return async function getTaskAsync(taskGroup)
    {
        // if(taskForTaskGroup.has(taskGroupId))
        // {
        //     return taskForTaskGroup.get(taskGroupId)
        // }
        let tasks = await taskGroupStore.getTasksForGroup(taskGroup)
        taskForTaskGroup.set(taskGroup.id,tasks)
        return tasks
    }
}

export function selectNextTaskInSortedOrder(tasks)
{
    if (tasks.notCompleted.length == 0)
        return new NextTaskResult(null,true,tasks.notCompleted.length,tasks.nrOfTasks);
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextTask = tasks.notCompleted[0];
    return new NextTaskResult(nextTask,false,tasks.notCompleted.length,tasks.nrOfTasks);
}

export function selectNextTaskInRandomOrder(tasks)
{
    console.log('selectNextTaskInRandomOrder')
    console.log(tasks)
    if (tasks.notCompleted.length == 0)
        return new NextTaskResult(null,true,tasks.notCompleted.length,tasks.nrOfTasks);
    
    //måste sätta nästa task i taskgroup
    //då this.task styr vilken task som visas i Task.vue
    let nextIndex = randomInteger(0,tasks.notCompleted.length - 1);
    let nextTask = tasks.notCompleted[nextIndex]
    return new NextTaskResult(nextTask,false,tasks.notCompleted.length,tasks.nrOfTasks);
}

export function getNotAnsweredTasks(getTasksAsync,attemptStore)
{
    return async function(roundId,taskGroup)
    {
  
        let tasks = await getTasksAsync(taskGroup)
        let attempts = await attemptStore.attemptsPerRound(roundId)
        let taskids = taskIdsFromAttempts(attempts)  
        let filter = filterTask(taskids)
        let notAnswerdTasks = tasks.filter(filter)
        return { notCompleted : notAnswerdTasks, nrOfTasks: tasks.length }
    }


}

export async function getNotSuccessfullTasks(roundId,taskGroupId,getTasksAsync,attemptStore)
{
    let tasks = await getTasksAsync(taskGroupId)
    let attempts = await attemptStore.getAttemptsPerRound(roundId)
    let filter = filterTask(taskIdsFromSuccessfullAttempts(attempts))
    let notSuccessfullTasks = tasks.filter(filter)
    return { notCompleted : notSuccessfullTasks, nrOfTasks: tasks.length }
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









