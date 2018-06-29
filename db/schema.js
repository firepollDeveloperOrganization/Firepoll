const schema = { 
  author: String,
  title: String,
  active: Boolean,
  completed: Boolean,
  num_questions: Number,
  total_answers: Number,
  winning_response: String, // SEND AS NULL
  start_time: String, // SEND AS NULL
  questions: [{
    question: String,
    question_type: String, // "multiple-choice"
    total_voting_time: Number, 
    answers: [{
      choice: String,
      responders: [String], // DON'T SEND
      votes: Number // DON'T SEND
    }]
  }]
}

// QUESTIONS IN POLL AS ARRAY OF QUESTION ID'S

// UNIQUE QUESTIONS DATA
 // HAS:
 // DISPLAY_RESULTS: BOOLEAN,
 // QUESTION_TITLE: STRING,
 // ARRAY OF ANSWERS ANSWER ID

module.exports = schema;