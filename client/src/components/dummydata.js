var dummypolls = [{
  author: "username/userID",
  title: "pollname1",
  pollId: 3894723894,
  staged: true,
  completed: true,
  executionDate: "Tue Jun 26 2018 18:56:19 GMT-0400 (Eastern Daylight Time)",
  timeMS: '1530054086896',
  totalAnswers: 1031,
  winningAnswer: "choiceId",
  questions: [
    {
      questionId: "234234",
      question: "What is your favorite dog?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "234324324",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "4324",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choiceId: "34234",
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
          choiceId: "234324",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "2343233324",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choiceId: "44444",
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        }      
      ]
    }
  ]
},
{
  author: "username/userID",
  title: "pollname2",
  pollId: 2342343243,
  staged: true,
  completed: false,
  executionDate: "6/25/2018, 3:28:30 PM",
  timeMS: '1530054150024',
  totalAnswers: 1031,
  winningAnswer: "choiceId",
  questions: [
    {
      questionId: "234234",
      question: "Do you like cookies?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "4444",
          choice: "YAAAAAAAS",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "hexadecima222lsomething",
          choice: "NO",
          responders: [],
          votes: 0
        },
        {
          choiceId: "hexadecimals5235325omething",
          choice: "Is it a pot cookie?",
          responders: ["someClient", "anotherClient"],
          votes: 2
        },      
      ]
    },
    {
      questionId: "3243243",
      question: "What's your favorite dog?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "235235",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "hexadecim6alsome46465thing",
          choice: "Pitbull",
          responders: [],
          votes: 2
        },
        {
          choiceId: "3222",
          choice: "SHIBE, MUCH FLOOF, SUCH CUDDLE",
          responders: [],
          votes: 20
        },
        {
          choiceId: "hexadecimals234324324omething",
          choice: "Lina told me to pick corgi",
          responders: ["someClient", "anotherClient"],
          votes: 232
        }      
      ]
    }
  ]
},
{
  author: "username/userID",
  title: "pollname3",
  pollId: 3242342323,
  staged: false,
  completed: false,
  executionDate: "6/25/2018, 3:28:30 PM",
  timeMS: '1530054172961',
  totalAnswers: 1031,
  winningAnswer: "choiceId",
  questions: [
    {
      questionId: "234234",
      question: "What is love?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "hexadecimals435235omething",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "23423466",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choiceId: "2222245",
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        },      
      ]
    },
    {
      questionId: "3243243",
      question: "Question?",
      questionType: "multipleChoice",
      answers: [
        {
          choiceId: "7456747",
          choice: "Labrador",
          responders: ["someClient", "anotherClient", "andSoOn"],
          votes: 3
        },
        {
          choiceId: "745674766",
          choice: "Pitbull",
          responders: [],
          votes: 0
        },
        {
          choiceId: "74567472",
          choice: "Corgi",
          responders: ["someClient", "anotherClient"],
          votes: 2
        }      
      ]
    },

  ]
}];

module.exports = dummypolls;