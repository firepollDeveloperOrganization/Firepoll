var testPoll = {
  author: "username/userID",
  title: "pollname",
  status: "created/staged/complete",
  executionDate: "6/25/2018, 3:28:30 PM",
  totalAnswers: 1031,
  winningAnswer: "answerId",
  questions: [
    {
      questionId: "someID",
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
      questionId: "someID",
      question: "What is your favorite dog?",
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