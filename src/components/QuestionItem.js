import React from "react";

function QuestionItem({ question, handleDelete, handleAnswer }) {
  console.log(handleAnswer)
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
    {answer}
   </option>
  ));

  const handleClick = (questionId) =>{
    handleDelete(questionId)
  }

  const handleSelect = (e) =>{
    const newAnswer = e.target.value;
    handleAnswer(id, newAnswer)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange ={handleSelect}>{options}</select>
      </label>
      <button onClick = {()=>handleClick(id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
