import { MultiplyTable } from './multiplyTable.js'
import { TaskGroupLink  } from './taskGroupLink.js'


export class MultiplyTableLink extends TaskGroupLink
{
    constructor(description,tableNr,prevTableId,store)
    {
        super(description,`MultiplyTable.[${tableNr}].Link`,tableNr == 1,prevTableId,store)
        this.TableNr = tableNr;
    }

    CreateTaskGroup()
    {
        console.log(`this.tableNr ${this.TableNr}`)
        return new MultiplyTable(this.TableNr);
    }
}