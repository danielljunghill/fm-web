import { groupBy } from './collections'
import TaskHistoryCollection from './taskHistory'

export class TaskHistory
{
    constructor(task,attempts)
    {
        this.task = task;
        this.attempts = attempts;
    }
}


 export function getTaskHistory(attemptStore,taskStore)
{
    async function createTaskHistory(attemptPerTask)
    {
        let tasks = []
        for (let [taskId, attempts] of Object.entries(attemptPerTask)) {
           let task = await taskStore.getTask(taskId)
           tasks.push(new TaskHistory(task,attempts))
        }
        return tasks
    }
    
    return async function(status)
    {
        let iStatus = status ? 1 : 0
        let attempts = await attemptStore.attemptPerStatus(iStatus)
        console.log(attempts.length)
        let attemptsPerTask = groupBy(attempts, 'taskId')
        console.log(attemptsPerTask)
        let tasks = await createTaskHistory(attemptsPerTask)
        console.log(tasks)
        return new TaskHistoryCollection(tasks)
    }
}
