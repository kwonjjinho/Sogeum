import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditPage = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 질문 불러오기
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  const addQuestion = () => setQuestions([...questions, ""]);
  const updateQuestion = (index, value) =>
    setQuestions(questions.map((q, i) => (i === index ? value : q)));
  const deleteQuestion = (index) =>
    setQuestions(questions.filter((_, i) => i !== index));

  // 질문 저장
  const saveQuestions = () => {
    fetch("/api/save-questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(questions),
    })
      .then((res) => {
        if (res.ok) {
          alert("Questions saved successfully!");
          navigate("/");
        } else {
          alert("Failed to save questions.");
        }
      })
      .catch((err) => console.error("Failed to save questions:", err));
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Edit Questions</h1>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>
            <input
              type="text"
              value={q}
              onChange={(e) => updateQuestion(index, e.target.value)}
            />
            <button onClick={() => deleteQuestion(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={saveQuestions}>Save</button>
    </div>
  );
};

export default EditPage;