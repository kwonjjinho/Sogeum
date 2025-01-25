import React from "react";

const DisplayQuestion = ({ question, onNext }) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Selected Question</h1>
      <p style={styles.question}>{question}</p>
      <button style={styles.button} onClick={onNext}>
        Next
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    border: "2px solid #4CAF50",
    borderRadius: "10px",
    backgroundColor: "#f4f4f9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "90%", // 모바일에서도 잘 맞도록 조정
    maxWidth: "600px",
    margin: "20px auto",
    textAlign: "center",
  },
  title: {
    fontSize: "28px", // 반응형 폰트 크기
    fontWeight: "bold",
    color: "#333",
    marginBottom: "20px",
  },
  question: {
    fontSize: "20px",
    fontWeight: "500",
    color: "#555",
    lineHeight: "1.5",
    marginBottom: "30px",
  },
  button: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4CAF50",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#45a049",
  },
};

export default DisplayQuestion;