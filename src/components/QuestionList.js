import React from "react";
import QuestionItem from "./QuestionItem"

function QuestionList({list, handleDelete, handleAnswer}) {
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {list.map((question)=>(
        <QuestionItem
        key={question.id} 
        question = {question}
        handleDelete = {handleDelete}
        handleAnswer = {handleAnswer}
        />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
