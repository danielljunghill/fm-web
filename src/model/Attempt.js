export class Attempt
  {
      constructor(taskId,taskGroupId,roundId,correct)
      {
          this.taskId = taskId;
          this.taskGroupId = taskGroupId;
          this.correct = correct
          this.roundId = roundId
      }
  };