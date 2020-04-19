

function taskGroup(name,id,type, depententOnTaskGroups)
{
    return { name: name, id: id, type: type, dependentOnTaskGroups: depententOnTaskGroups}
}

function task(id, question)
{
    return { id: id, question: question}
}

const taskGroupTypeMultiplyTable = 'MultiplyTable'
export class TaskGroupStore
{

    constructor()
    {

    }
    
    async getTaskGroups()
    {
        function createMultiplyTableId(tableNr)
        {
            return `${taskGroupTypeMultiplyTable}[${tableNr}]`;
        }
        let taskGroups = [];
        let i = {};
        for(i = 1; i <= 10; i++)
        {   
            let prev = i - 1;
            
            let mt = taskGroup(i,createMultiplyTableId(i),taskGroupTypeMultiplyTable,[createMultiplyTableId(prev)]);
            taskGroups.push(mt);
        }  
        return taskGroups
    }

     async getTasksForGroup(taskGroup)
    {
        function getMultiplyQuestions(tableNr)
        {
            let tasks = []
            
            function getMultiplyQuestion(a,b)
            {
                return { a: a, b: b }
            }
            function id(a,b)
            {
                return `[${a}.*.${b}]`;
            }

            let i = {};
            for(i = 1; i <= 10; i++)
            {   
                let mid = id(tableNr,i)
                let mt = task(mid,getMultiplyQuestion(tableNr,i))
                tasks.push(mt);
            }
            return tasks;

        }
        if(taskGroup == null)
            throw 'taskGroup is not available'
    
        if(taskGroup.type == taskGroupTypeMultiplyTable)
        {
            return getMultiplyQuestions(taskGroup.name)
        }
    
        throw `could not recognize taskgroupid ${taskGroup}`
    
    }


}