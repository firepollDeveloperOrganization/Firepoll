var testPoll = {
  author: "username/userID",
  title: "pollname",
  staged: false,
  complete: false,
  executionDate: "6/25/2018, 3:28:30 PM",
  totalAnswers: 1031,
  winningAnswer: "answerId",
  questions: [
    {
      questionId: "234234",
      question: "What is your favorite dog?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "hexadecimalsomething",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "hexadecimalsomething",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choiceId: "hexadecimalsomething",
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        },      
      ]
    },
    {
      questionId: "3243243",
      question: "What is your favorite cat?",
      questionType: "multipleChoice",
      answers: [
        {
          answerId: "hexadecimalsomething",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          answerId: "hexadecimalsomething",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          answerId: "hexadecimalsomething",
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        }      
      ]
    }
  ]
}

module.exports = testPoll