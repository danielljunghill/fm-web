import { MultiplyQuestion } from './multiplyQuestion.js'
import { TaskGroup } from './taskGroup.js'



export function createMultiplyTableId(tableNr)
{
    return `MultiplyTable[${tableNr}]`;
}

export function createMultiplyQuestions(tableNr,roundId)
{
    let questions = [];
    let i = {};

    for(i = 1; i <= 10; i++)
    {   
    
        let question = new MultiplyQuestion(tableNr,i,createMultiplyTableId(tableNr),roundId);
        questions.push(question);
    }
    
    return questions;
}

export class MultiplyTable extends TaskGroup
{
    constructor(tableNr,taskGroupAttemptStore)
    {
        console.log(taskGroupAttemptStore)
        super(createMultiplyTableId(tableNr), [],taskGroupAttemptStore); 
        this.tasks = createMultiplyQuestions(tableNr,this.roundId);

    }

}

