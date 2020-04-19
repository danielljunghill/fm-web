// import { taskGroup,  } from './taskGroup'
import { groupBy } from './collections'
import { TaskGroupLink } from './taskGroupLink'


 function getTaskGroupStatus(taskGroupStore,attemptStore)
    {
        return async function(taskGroup)
        {
            let tasks = await taskGroupStore.getTasksForGroup(taskGroup)
            let attempts = await attemptStore.attemptsPerTaskGroup(taskGroup.id)
            let attemptsPerRound = Object.values(groupBy(attempts,'roundId'))
            let nrOfTasks = tasks.length
            //enbart korrekta attempts
            let nrOfCorrectRounds =
                attemptsPerRound
                    .filter((attempts) => attempts.filter((attempt) => attempt.correct).length == nrOfTasks)
                    .length
             console.log(nrOfCorrectRounds)   
            //antal korrekta lika med antalet tasks
            return nrOfCorrectRounds > 0
        }

}

 function getTaskGrupLink(taskGroupStore,attemptStore)
{
    let getStatus = getTaskGroupStatus(taskGroupStore,attemptStore)
    async function isTaskGroupsAllActive(taskGroups)
    {
        let result = true;
        let taskGroup = {}
        console.log('taskGroup sdfsdf')
        console.log(taskGroups)
        for (taskGroup of taskGroups)
        {
            console.log('taskGroup')
            console.log(taskGroup)
            let active = await getStatus(taskGroup)
            if(!active)
            {
                return false
            }

        }
        return result;
    }
    return async function(taskGroup)
    {
        let result = new TaskGroupLink(taskGroup)
        console.log('function(taskGroup)')
        console.log(taskGroup)
        console.log(taskGroup.dependentOnTaskGroups)
        result.IsActive = await isTaskGroupsAllActive(taskGroup.dependentOnTaskGroups)
        return result;
    }

}
// { name: name, id: id, type: type, dependentOnTaskGroups: depententOnTaskGroups}

export function getTaskGroupLinks(taskGroupStore,attemptStore)
{
    let getLink = getTaskGrupLink(taskGroupStore,attemptStore)
    return async function()
    {
        let result = []
        let taskGroups = await taskGroupStore.getTaskGroups()
        let taskGroup = {}
        for (taskGroup of taskGroups)
        {
            let link = await getLink(taskGroup)
            result.push(link)
        }
        return result;
    }
    

}