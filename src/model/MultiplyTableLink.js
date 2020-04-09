import { MultiplyTable } from './multiplyTable.js'
import { TaskGroupLink  } from './taskGroupLink.js'


export class MultiplyTableLink extends TaskGroupLink
{
    constructor(description,tableNr,prevTableId,taskGroupAttemptStore)
    {
      
        super(description,`MultiplyTable[${tableNr}]`,tableNr == 1,prevTableId,taskGroupAttemptStore)
        this.TableNr = tableNr;
    }

    CreateTaskGroup()
    {
        return new MultiplyTable(this.TableNr,this.attemptStore);
    }
}