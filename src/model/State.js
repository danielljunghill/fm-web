// import { MultiplyTables } from './MultiplyTables.js'
import { multiplyTableLinks } from './TaskGroupLinks.js'
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

// export class State
//   {
//       hideCompleted = true;
//       hideQuestion = true;
//       hideSelection = true;
//       hideDisplayCorrectAnswer = true;
//       hideDisplayWrongAnswer = true;
//       correct = false;
//       seconds = 0;
//       answer = "";
//       correctAnswer = "";
//   }

 
//   export function correctAnswerState(answer)
//   {
//       let state = new State();
//       state.hideDisplayCorrectAnswer = true;
//       state.hideDisplayWrongAnswer = true;
//       state.hideQuestion = false;
//       state.correct = true
//       state.answer = answer;
//       state.correctAnswer = answer;
//       return state;
//   }

//   export  function wrongAnswerState(answer,correctAnswer)
//   {
//       let state = new State();
//       state.hideDisplayCorrectAnswer = true;
//       state.hideDisplayWrongAnswer = false;
//       state.hideQuestion = true;
//       state.correct = false
//       state.answer = answer;
//       state.correctAnswer = correctAnswer;
//       return state;
//   }


//   export function newQuestionState()
//   {
//       let state = new State();
//       state.hideQuestion = false;
//       return state;
//   }

//   export function completedState()
//   {
//       let state = new State();
//       state.hideCompleted = false;
//       state.hideQuestion = true;
//       state.correct = false;
//       return state;
//   }

  
//   export function selectQuestionsState()
//   {
//       let state = new State();
//       state.hideSelection= false;
//       return state;

//   }