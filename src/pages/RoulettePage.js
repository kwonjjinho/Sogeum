import React, { useState, useEffect } from "react";
import Roulette from "../components/Roulette";
import DisplayQuestion from "../components/DisplayQuestion";

const RoulettePage = () => {
  const [questions, setQuestions] = useState([]);
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const handleNext = () => {
    setCurrentQuestion(null);
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
      height: "100vh",
      backgroundColor: "#f0f8ff",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    mainContent: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      flex: 2,
      textAlign: "center",
    },
    rouletteContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    usedQuestions: {
      flex: 1,
      backgroundColor: "#fff",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      overflowY: "auto",
      maxHeight: "90vh",
    },
    questionItem: {
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    title: {
      fontSize: "36px",
      marginBottom: "20px",
      fontWeight: "bold",
    },
    gameOver: {
      fontSize: "24px",
      color: "#e74c3c",
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
          <h2 style={styles.gameOver}>질문이 끝났습니다!</h2>
        )}
      </div>
      <div style={styles.usedQuestions}>
        <h2>나온 질문들</h2>
        {usedQuestions.map((question, index) => (
          <div key={index} style={styles.questionItem}>
            {index + 1}. {question}
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoulettePage;