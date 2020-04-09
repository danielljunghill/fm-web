// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }


import { multiplyTableLinks } from './taskGroupLinks.js';
import { AttemptPerTaskGroup } from './attemptPerTaskGroup.js';
import { Timer } from './time'
import { AttemptStore } from './attemptDb'
// import { getNextTask } from './selectTask'


// async function createAttemptDb()
// {
//     console.log('trying to create db')
//     await getDb()
// }
// createAttemptDb()

// async function addAttemptToStore(attempt)
// {
//     console.log('add attempt to store');
//     await addAttemptToDb(attempt);
//     console.log('added attempt')
// }

// async function getAttemptForRound(roundId)
// {
//     await getAttemptsPerRound(roundId)
// }


    

export class MainModel
{
    constructor(store)
    {
        this.start = multiplyTableLinks(store)
        this.dbStore =  new AttemptStore()
        this.selectedItem = this.start;
        this.taskGroupStore = taskGroupStore;
        this.timer = new Timer();
           
    }

    setTaskGroup(taskGroupLink)
    {   
        let taskGroup  = taskGroupLink.CreateTaskGroup();
        this.roundId = taskGroup.roundId
        //hämta första task. Kankse ska vara egen function
        this.timer.reset();
        this.timer.start();

        taskGroup.getNextTaskRandomOrder()

        this.selectedItem = taskGroup;
      
    }


    nextTask(answer, newTaskInit)
    {
        function answerTaskFn(state,answer)
        {
            //HÄMTA TASK
            let attempts = state.dbStore.attemptsPerRound(state.selectedItem.roundId)
            console.log(attempts)
            let taskGroup = state.selectedItem;
            let task = taskGroup.task;
         
            let seconds = state.timer.seconds;
            state.timer.stop();
            //KONTROLLERA ATTEMPT
            let attempt = task.attempt(answer,seconds);
            //LAGRA ATTEMPT
            let taskIds = taskGroup.tasks.map((task) => task.taskId);
            state.taskGroupStore.add(attempt,taskIds);
            state.dbStore.add(attempt).then();
  
        }

        function nextTaskFn(state)
        { 
           
            let nextTask = state.selectedItem.getNextTaskRandomOrder()
            if(nextTask.endOfTasks)
            {
                state.selectedItem = state.start;
                return;
            } 
            
            state.timer.reset();
            state.timer.start(); 
            newTaskInit();

        }
        Timer.flow(() => answerTaskFn(this,answer),() => nextTaskFn(this),1000)
    }

 
    goBack()
    {
        this.selectedItem = this.start;
    }

    // setTaskGroupLinks(links)
    // {
    //     this.selectedItem = links;
    // }

}

let taskGroupStore = new AttemptPerTaskGroup()
let data = new MainModel(taskGroupStore)
// function createDb() {
//         return new Promise(resolve =>
//             {
//                 setTimeout(() => {
//                     resolve('resolved')
//                 },2000);
                
//             });
// }

//console.log(getDbPromise)
//getDbPromise.then(function(db) { console.log('attemptDb is set',db) })

export default function getModelInstance()
{
    return data;
}










