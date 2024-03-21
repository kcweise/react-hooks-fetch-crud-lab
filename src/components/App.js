import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [list, setList] = useState([]);
  const url = 'http://localhost:4000/questions'

  useEffect(()=> {

    fetch(url)
      .then (res => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok");
      })
      .then (data => setList(data))
      //.then (data => setFilteredListings(data))
      .catch(error => console.error("Error", error))
    },[])

    const postQuestion=(formData)=> {
      fetch('http://localhost:4000/questions', {
        method: 'POST',
        headers: {
          'Content-Type':'Application/JSON',
        },
        body: JSON.stringify(formData),
      })
        .then(res=>res.json())
        .then(question => {
          setList([...list, question]);
        })
        .catch(error=> console.log('Error adding plant:', error));
    };

    const handleDelete = (questionId) =>{
      const url = `http://localhost:4000/questions/${questionId}`;
    
      fetch(url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      })
      .then(res=>{
        if (!res.ok){
          console.error("Network response failed")
        }
        setList(currentList => currentList.filter(question => question.id !== questionId));
        return res.json();
      })
      .then(()=>{
        console.log(`Item deleted successfully`)
      })    
      .catch(error=> {
        console.error('Error deleting item', error);
      });
    }

    const handleAnswer =(id, newAnswer) => {
      const url = `http://localhost:4000/questions/${id}`;
      fetch(url,{
        method:'PATCH',
        headers: {'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correctIndex:parseInt(newAnswer),
        }),
      })
      .then(res => {
        if(!res.ok) {
          console.error("Error with Fetch")
        }
        return res.json();
      })
      .then(() => {
        console.log("Answer update was successful");
      })
      .catch (error =>{
        console.error('Error updating answer');
      });
    };

    return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? <QuestionForm list={list} postQuestion={postQuestion}/> : 
      <QuestionList list={list} handleDelete = {handleDelete} handleAnswer = {handleAnswer} />}
    </main>
  );
}

export default App;
