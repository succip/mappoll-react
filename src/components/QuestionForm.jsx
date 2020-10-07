import React, { useState } from "react";

const QuestionForm = () => {
  const [question, setQuestion] = useState("");
  return (
    <React.Fragment>
      <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} />
    </React.Fragment>
  );
};

export default QuestionForm;
