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

  return (
    <div>
      <Wheel
        mustStartSpinning={spinning}
        prizeNumber={Math.floor(Math.random() * questions.length)}
        data={questions.map((q) => ({ option: q }))}
        backgroundColors={["#ff8c00", "#ffd700"]}
        textColors={["#fff"]}
      />
      <button onClick={handleSpin} disabled={spinning}>
        Spin
      </button>
    </div>
  );
};


export default Roulette;