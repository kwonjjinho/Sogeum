const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5001;
// Render 등: 실행 디렉터리가 repo root이므로 cwd/build 사용. 로컬은 __dirname/../build
const buildPathByDir = path.join(__dirname, "../build");
const buildPathByCwd = path.join(process.cwd(), "build");
const buildPath = require("fs").existsSync(buildPathByCwd)
  ? buildPathByCwd
  : buildPathByDir;
const hasBuild = require("fs").existsSync(buildPath);

app.use(cors());
app.use(express.json());

// 질문 저장 API
app.post("/api/save-questions", (req, res) => {
  const questions = req.body;
  const filePath = hasBuild
    ? path.join(buildPath, "questions.json")
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
  console.log("Serving React build from:", buildPath);
} else {
  app.get("/", (req, res) => {
    res.send(
      `<h1>Build not found</h1><p>cwd: ${process.cwd()}</p><p>buildPathByCwd: ${buildPathByCwd}</p><p>buildPathByDir: ${buildPathByDir}</p><p>Render에서 Build Command를 <code>npm install && npm run build</code> 로 설정했는지 확인하세요.</p>`
    );
  });
  console.log("No build folder. cwd:", process.cwd(), "buildPathByDir:", buildPathByDir);
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});