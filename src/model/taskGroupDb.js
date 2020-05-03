

function taskGroup(name,id,type, depententOnTaskGroups)
{
    return { name: name, id: id, type: type, dependentOnTaskGroups: depententOnTaskGroups}
}

function task(id, question)
{
    return { id: id, question: question}
}

function id(a,b)
{
    return `[${a}.*.${b}]`;
}

const taskGroupTypeMultiplyTable = 'MultiplyTable'

export class TaskGroupStore
{

    constructor()
    {
        console.log('init TaskGroupStore')
        this.taskStore = TaskGroupStore.init()
    }

    static init()
    {
        let taskStore = new Map();
        console.log('init')
      
        function getMultiplyQuestion(a,b)
        {
            return { 
                a: a,
                b: b,
                typeName : function() {
                    return 'multiplyQuestion';
                  }

            }
        }
        
        let j = {}
        let i = {}
        for(j = 1; j <= 10; j++)
        {
            for(i = 1; i <= 10; i++)
            {   
                let mid = id(j,i)
                let mt = task(mid,getMultiplyQuestion(j,i))
                taskStore.set(mid,mt)
            }
        }
        console.log('end init')
       
        return taskStore
    }

    async getTask(taskId)
    {
        if(this.taskStore.has(taskId))
            return this.taskStore.get(taskId)
        throw `Task ${taskId} is not available in taskstore`
    }
    
    async getTaskGroups()
    {
        function createMultiplyTableId(tableNr)
        {
            return `${taskGroupTypeMultiplyTable}[${tableNr}]`;
        }
        let taskGroups = [];
        let i = {};
        function taskGroupDependency(taskGroups)
        {
            if(taskGroups.length == 0)
            {
                return [];
            }
            else
            {
                return [ taskGroups[taskGroups.length - 1] ]
            }

        }
        for(i = 1; i <= 10; i++)
        {   

            let denpendentOn = taskGroupDependency(taskGroups)
            let mt = taskGroup(i,createMultiplyTableId(i),taskGroupTypeMultiplyTable,denpendentOn);
            taskGroups.push(mt);
        }  
        return taskGroups
    }


     async getTasksForGroup(taskGroup)
    {
        function getMultiplyQuestions(tableNr,taskStore)
        {
            let tasks = []
            
            let i = {};
            for(i = 1; i <= 10; i++)
            {   
                let mid = id(tableNr,i)
                let mt = taskStore.get(mid)
                tasks.push(mt);
            }
            return tasks;

        }
        if(taskGroup == null)
            throw 'taskGroup is not available'
    
        if(taskGroup.type == taskGroupTypeMultiplyTable)
        {
            return getMultiplyQuestions(taskGroup.name,this.taskStore)
        }
    
        throw `could not recognize taskgroupid ${taskGroup}`
    
    }


}