import React from "react";

const QuestionForm = ({ handleQuestionChange }) => {
  return (
    <React.Fragment>
      <input autoComplete="off" placeholder="Your Poll Question" type="text" onChange={(e) => handleQuestionChange(e.target.value)} />
    </React.Fragment>
  );
};

export default QuestionForm;
