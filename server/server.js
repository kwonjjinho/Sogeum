const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// 질문 저장 API
app.post("/api/save-questions", (req, res) => {
  const questions = req.body;
  const filePath = path.join(__dirname, "../public/questions.json");

  console.log("Saving to:", filePath);
  console.log("Received data:", questions);

  // 데이터 유효성 검사
  if (!Array.isArray(questions)) {
    console.error("Invalid data format. Expected an array.");
    return res.status(400).send("Invalid data format. Expected an array.");
  }

  // 파일 쓰기
  fs.writeFile(filePath, JSON.stringify(questions, null, 2), (err) => {
    if (err) {
      console.error("Failed to save questions:", err);
      return res.status(500).send("Failed to save questions.");
    }

    console.log("Questions saved successfully.");
    res.status(200).send("Questions saved successfully.");
  });
});

// 서버 실행
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});