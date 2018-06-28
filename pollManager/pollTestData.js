var testPoll = {
  author: "username/userID",
  title: "pollname",
  staged: false,
  completed: false,
  executionDate: "6/25/2018, 3:28:30 PM",
  totalAnswers: 1031,
  winningAnswer: "answerId",
  questions: [
    {
      question: "What is your favorite dog?",
      answers: [
        {
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        },      
      ]
    },
    {
      question: "What is your favorite cat?",
      answers: [
        {
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        }      
      ]
    }
  ]
}

module.exports = testPoll