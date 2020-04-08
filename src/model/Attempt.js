
export function Attempt(taskId,taskGroupId,roundId,answer,correctAnswer,correct,duration)
{
    this.taskId = taskId
    this.taskGroupId = taskGroupId
    this.correct = correct
    this.roundId = roundId
    this.answer = answer
    this.correctAnswer = correctAnswer
    this.time = Date.now()
    this.duration = duration
}