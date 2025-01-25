import React, { useState, useEffect } from "react";
import Roulette from "../components/Roulette";
import DisplayQuestion from "../components/DisplayQuestion";

const RoulettePage = () => {
  const [questions, setQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch((err) => console.error("Failed to load questions:", err));
  }, []);

  const handleSpin = (selectedIndex) => {
    const question = questions[selectedIndex];
    setTimeout(() => {
      setCurrentQuestion(question);
      setUsedQuestions([...usedQuestions, question]);
      setQuestions(questions.filter((_, i) => i !== selectedIndex));
    }, 1000);
  };

  const handleNext = () => {
    setCurrentQuestion(null);
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div className="container">
      <div className="main-content">
        <h1>🎡 소금부 질문룰렛</h1>
        {!currentQuestion && questions.length > 0 && (
          <div className="roulette-container">
            <Roulette questions={questions} onSpin={handleSpin} />
          </div>
        )}
        {currentQuestion && (
          <DisplayQuestion question={currentQuestion} onNext={handleNext} />
        )}
        {questions.length === 0 && <h2>질문이 끝났습니다!</h2>}
      </div>
      <div className="used-questions">
        <h2>나온 질문들</h2>
        {usedQuestions.length > 0 ? (
          usedQuestions.map((q, index) => (
            <div key={index} className="question-item">
              {index + 1}. {q}
            </div>
          ))
        ) : (
          <p>아직 질문이 없습니다.</p>
        )}
      </div>
    </div>
  );
};

export default RoulettePage;