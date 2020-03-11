// export default function main_model()
// {
//     return { name: 'daniel', age: 12 };
// }

import { MultiplyQuestion } from '../model/MultiplyQuestion.js'
import { multiplyTableLinks } from './TaskGroupLinks';
import { AttemptStore } from './AttemptStore';
let attemptStore = new AttemptStore()

export class MainModel
{
    constructor()
    {
        this.start = multiplyTableLinks(attemptStore)
        this.user = { name: 'daniel', age: 12 };
        this.name = 'orvar';
        this.selectedItem = this.start;
    }

    user()
    {       
        return this.user;
    }

    changeData()
    {
        let tempName = this.user.name;
        this.user.name = this.name;
        this.name = tempName;
        this.selectedItem = new MultiplyQuestion(8,8,"MultiplyTable[8]","")
    }

    backToStart()
    {
        this.selectedItem = this.start;
    }


}

let data = new MainModel()
export default function getModelInstance()
{
    return data;
}





