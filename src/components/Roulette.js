import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

const Roulette = ({ questions, onSpin }) => {
  const [spinning, setSpinning] = useState(false);

  const handleSpin = () => {
    const selectedIndex = Math.floor(Math.random() * questions.length);
    setSpinning(true);
    setTimeout(() => {
      onSpin(selectedIndex);
      setSpinning(false);
    }, 3000); // 룰렛 애니메이션 시간
  };

  const styles = {
    wheelContainer: {
      width: "100%",
      maxWidth: "500px", // 최대 크기 제한
      margin: "auto",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      fontSize: "1.2rem",
      borderRadius: "5px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.wheelContainer}>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={Math.floor(Math.random() * questions.length)}
        data={questions.map((q) => ({ option: q }))}
        backgroundColors={["#ff8c00", "#ffd700"]}
        textColors={["#fff"]}
        outerBorderColor={"#ccc"}
        radiusLineColor={"#fff"}
        outerBorderWidth={5}
        textDistance={85}
        radius={150} // 반응형 크기
      />
      <button style={styles.button} onClick={handleSpin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
};


export default Roulette;