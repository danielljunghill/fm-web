import { MultiplyTable } from './MultiplyTable.js'
import { TaskGroupLink  } from './TaskGroupLink.js'


export class MultiplyTableLink extends TaskGroupLink
{
    constructor(tableNr,prevTableId,store)
    {
        super(`MultiplyTable.[${tableNr}].Link`,tableNr == 1,prevTableId,store)
        this.TableNr = tableNr;
    }

    CreateTaskGroup()
    {
        console.log(`this.tableNr ${this.TableNr}`)
        return new MultiplyTable(this.TableNr);
    }
}