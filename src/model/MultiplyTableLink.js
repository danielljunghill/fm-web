import { MultiplyTable,createMultiplyTableId } from './multiplyTable.js'
import { TaskGroupLink  } from './taskGroupLink.js'
import { taskGroup } from './taskGroup'


// export class MultiplyTableLink extends TaskGroupLink
// {
//     constructor(description,tableNr,prevTableId,taskGroupAttemptStore)
//     {
        
//         super(description,taskGroup(tableNr,createMultiplyTableId(tableNr),'MultiplyTable') ,tableNr == 1,prevTableId,taskGroupAttemptStore)
//         this.TableNr = tableNr;
//     }

//     CreateTaskGroup()
//     {
//         return new MultiplyTable(this.TableNr,this.attemptStore);
//     }
// }