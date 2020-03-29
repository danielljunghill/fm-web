export const TaskOrder = { "fixedOrder":1, "randomOrder":2 }
export const TaskFinishedWhen = { "Answered":1, "HasCorrectAnswer":2}

export class Round
{
    constructor(roundId,taskOrder,taskFinnishedWhen)
    {
        this.roundId = roundId;
        this.taskOrder = taskOrder;
        this.taskFinnished = taskFinnishedWhen;

    }
}