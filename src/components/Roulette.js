import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ questions, onSpin }) => {
  const [spinning, setSpinning] = useState(false);
  const [prizeIndex, setPrizeIndex] = useState(null);

  const handleSpin = () => {
    const totalQuestions = questions.length;
    const sectionAngle = 360 / totalQuestions; // 각 섹션의 각도
    const targetAngle = 40; // 화살표가 가리키는 각도 (1사분면 40도)

    // 40도에 해당하는 섹션 계산
    const calculatedPrizeIndex = Math.floor(
      (totalQuestions - targetAngle / sectionAngle) % totalQuestions
    );

    setPrizeIndex(calculatedPrizeIndex); // prizeNumber 설정
    setSpinning(true);

    setTimeout(() => {
      onSpin(calculatedPrizeIndex); // 선택된 질문 전달
      setSpinning(false);
    }, 3000); // 룰렛 애니메이션 시간
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "16px",
      fontWeight: "bold",
      color: "#fff",
      backgroundColor: "#4CAF50",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#45a049",
    },
  };

  return (
    <div style={styles.container}>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={prizeIndex} // 선택된 인덱스에 따라 멈춤
        data={questions.map((q) => ({ option: q }))}
        backgroundColors={["#ff8c00", "#ffd700"]}
        textColors={["#fff"]}
        radius={150} // 룰렛 반지름 (크기 조정 가능)
        outerBorderColor={"#ccc"}
        outerBorderWidth={5}
        innerRadius={10}
        radiusLineColor={"#eee"}
        radiusLineWidth={3}
        fontSize={14}
        textDistance={60} // 텍스트와 중심 간 거리
      />
      <button
        style={styles.button}
        onClick={handleSpin}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};

export default Roulette;