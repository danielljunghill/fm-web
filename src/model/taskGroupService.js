import { taskGroup } from './taskGroup'



export function getTaskGroupStatus(attemptStore,taskStore)
    {
        return async function(taskGroupId)
        {
            let attempts = await attemptStore.attemptsPerTaskGroup(taskGroupId)
            let attemptsPerRound = groupBy(attempts,'roundId')
            //enbart korrekta attempts

            //antal korrekta lika med antalet tasks
            return Object.values(attemptsPerRound).filter()
        }

}

async function getTaskGroups()
{

}