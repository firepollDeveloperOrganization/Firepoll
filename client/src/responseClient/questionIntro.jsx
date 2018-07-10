import React from 'react';

const QuestionIntro = (props) => {
  return(<div className = {props.questionIntroLeave ? "answer draw meet question-intro slide-out" : "answer draw meet question-intro"}>
    {props.question.question_title}
  </div>)
}

export default QuestionIntro;