import { MultiplyQuestion } from './multiplyQuestion.js'
import { TaskGroup } from './taskGroup.js'
import { createUUID } from './math.js'

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
    for(i = 1; i <= 1; i++)
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

