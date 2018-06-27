const schema = {
  author: String,
  title: String,
  staged: Boolean,
  completed: Boolean,
  executionDate: Date,
  totalAnswers: Number,
  winningAnswer: String,
  questions: [{
    question: String,
    answers: [{
      choice: String,
      responders: [String],
      votes: Number
    }]
  }]
}

module.exports = schema;