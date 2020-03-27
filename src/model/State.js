// import { MultiplyTables } from './MultiplyTables.js'
import { multiplyTableLinks } from './taskGroupLinks.js'
import { MultiplyTable } from './MultiplyTable.js';

export class State
{
    constructor()
    {
        this.showTask = false;
        this.showTaskGroupLinks = false;
        this.showCorrectAttempt = false;
        this.showErronousAttempt = false;
        this.items = {}
    }
   
}


export class TaskGroupLinksState extends State
{
    constructor(taskGroupLinks)
    {
        super()
     
        this.items = taskGroupLinks.Links;
        console.log(this.items);
        this.showTaskGroupLinks = true;
    }
}


export class TaskGroupState extends State
{
    constructor(taskGroup)
    {
        super()
        this.TaskGroup = taskGroup;
        this.Items = taskGroup.Tasks;
        this.Task  = taskGroup.getNextTask().Task;
        this.showTask = true;
        //answer must be represented by its own class 
        //but for now its not :-)
        this.Answer = "";
    }


}

export function getMultiplyTableGroupLinksState(store)
{
    return new TaskGroupLinksState(multiplyTableLinks(store));
}

export function getMultiplyTableGroupState(tableNr)
{
    return new TaskGroupState(new MultiplyTable(tableNr));
}

