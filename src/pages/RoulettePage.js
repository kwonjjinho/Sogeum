import React, { useState, useEffect } from "react";
import Roulette from "../components/Roulette";
import DisplayQuestion from "../components/DisplayQuestion";

const RoulettePage = () => {
  const [questions, setQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  // 질문 파일 로드
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

    // 1초 대기 후 질문 표시
    setTimeout(() => {
      setCurrentQuestion(question);
      setUsedQuestions([...usedQuestions, question]);
      setQuestions(questions.filter((_, i) => i !== selectedIndex));
    }, 1000);
  };

  const handleNext = () => {
    setCurrentQuestion(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      height: "100vh",
      backgroundColor: "#f0f8ff",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      padding: "20px",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      textAlign: "center",
    },
    rouletteContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "60%",
      width: "100%",
    },
    usedQuestions: {
      width: "300px",
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflowY: "auto",
      maxHeight: "90vh",
    },
    questionItem: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
      fontSize: "16px",
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#2c3e50",
    },
    gameOver: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#e74c3c",
      marginTop: "20px",
    },
  };

  if (loading) return <p>Loading questions...</p>;

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <h1 style={styles.title}>🎡 소금부 질문룰렛</h1>
        {!currentQuestion && questions.length > 0 && (
          <div style={styles.rouletteContainer}>
            <Roulette questions={questions} onSpin={handleSpin} />
          </div>
        )}
        {currentQuestion && (
          <DisplayQuestion question={currentQuestion} onNext={handleNext} />
        )}
        {questions.length === 0 && (
          <h2 style={styles.gameOver}>질문이 끝이 났습니다!</h2>
        )}
      </div>
      <div style={styles.usedQuestions}>
        <h2>나온 질문들</h2>
        {usedQuestions.length > 0 ? (
          usedQuestions.map((question, index) => (
            <div key={index} style={styles.questionItem}>
              {index + 1}. {question}
            </div>
          ))
        ) : (
          <p>No questions used yet.</p>
        )}
      </div>
    </div>
  );
};

export default RoulettePage;