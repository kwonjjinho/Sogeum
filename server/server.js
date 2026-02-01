const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
const buildPath = path.join(__dirname, "../build");
const hasBuild = require("fs").existsSync(buildPath);

app.use(cors());
app.use(express.json());

// 질문 저장 API
app.post("/api/save-questions", (req, res) => {
  const questions = req.body;
  const filePath = hasBuild
    ? path.join(__dirname, "../build/questions.json")
    : path.join(__dirname, "../public/questions.json");

  if (!Array.isArray(questions)) {
    return res.status(400).send("Invalid data format. Expected an array.");
  }

  fs.writeFile(filePath, JSON.stringify(questions, null, 2), (err) => {
    if (err) {
      console.error("Failed to save questions:", err);
      return res.status(500).send("Failed to save questions.");
    }
    res.status(200).send("Questions saved successfully.");
  });
});

// build 폴더가 있으면 React 빌드 파일 제공 (Render 등 배포 환경)
if (hasBuild) {
  app.use(express.static(buildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});