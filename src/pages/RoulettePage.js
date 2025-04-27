import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Roulette from "../components/Roulette";
import DisplayQuestion from "../components/DisplayQuestion";
import "../styles/RoulettePage.css";

const RoulettePage = () => {
  const [questions, setQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [answer, setAnswer] = useState("");
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const navigate = useNavigate();

  // 배열을 랜덤하게 섞는 함수
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // 질문 파일 로드 및 섞기
  useEffect(() => {
    fetch("/questions.json")
      .then((res) => res.json())
      .then((data) => {
        const shuffledQuestions = shuffleArray(data);
        setQuestions(shuffledQuestions);
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

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      const newAnswer = {
        question: currentQuestion,
        answer: answer,
        timestamp: new Date().toISOString()
      };
      setAnsweredQuestions([...answeredQuestions, newAnswer]);
      setAnswer('');
      setCurrentQuestion(null);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAnswerSubmit(e);
    }
  };

  const handleNext = () => {
    setCurrentQuestion(null);
  };

  const handleFinish = () => {
    navigate("/");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="roulette-container">
      <h1 className="page-title">소금부 질문룰렛</h1>
      <div className="content-container">
        {currentQuestion && (
          <div className="left-section">
            <div className="question-card">
              <h2>현재 질문</h2>
              <div className="question-content">
                <p>{currentQuestion}</p>
              </div>
              <form className="answer-form" onSubmit={handleAnswerSubmit}>
                <textarea
                  className="answer-input"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="답변을 입력하세요..."
                  onKeyPress={handleKeyPress}
                />
                <button type="submit" className="submit-button">
                  제출
                </button>
              </form>
            </div>
          </div>
        )}

        <div className={`right-section ${!currentQuestion ? 'full-width' : ''}`}>
          <div className="roulette-section">
            {questions.length > 0 && !currentQuestion && (
              <Roulette questions={questions} onSpin={handleSpin} />
            )}
          </div>
          
          <div className="answered-questions">
            <h2>답변된 질문들</h2>
            {answeredQuestions.map((item, index) => (
              <div key={index} className="answered-item">
                <p className="question-text">Q: {item.question}</p>
                <p className="answer-text">A: {item.answer}</p>
              </div>
            ))}
          </div>

          {questions.length === 0 && !currentQuestion && (
            <button onClick={handleFinish} className="finish-button">
              완료
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoulettePage;