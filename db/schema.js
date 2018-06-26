const schema = {
  author: String,
  title: String,
  staged: Boolean,
  completed: Boolean,
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