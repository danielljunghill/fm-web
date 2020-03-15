import { MultiplyQuestion } from './MultiplyQuestion.js'
import { TaskGroup } from './TaskGroup.js'
import { createUUID } from './Math.js'

function createMultiplyTableId(tableNr)
{
    return `MultiplyTable[${tableNr}]`;
}

function createMultiplyQuestions(tableNr)
{
    let questions = [];
    let roundId = createUUID();
    let i = {};
    console.log( `tablenr ${tableNr}`)
    for(i = 1; i <= 10; i++)
    {   
        console.log(i)
        let question = new MultiplyQuestion(tableNr,i,createMultiplyTableId(tableNr),roundId);
        questions.push(question);
    }
    
    return questions;
}

export class MultiplyTable extends TaskGroup
{
    constructor(tableNr)
    {
        super(createMultiplyTableId(tableNr), createMultiplyQuestions(tableNr)); 

    }

}

