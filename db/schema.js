const schema = {
  author: String,
  title: String,
  status: String,
  executionDate: Date,
  totalAnswers: Number,
  winningAnswer: String,
  questions: [{
    questionId: String,
    question: String,
    questionType: String,
    answers: [{
      choiceId: String,
      choice: String,
      responders: [String],
      votes: Number
    }]
  }]
}

module.exports = schema;