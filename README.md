# Sogeum

질문 룰렛 앱 (React + Express)

## 무료 배포 (Render)

1. **GitHub에 코드 올리기**
   - 이 프로젝트를 GitHub 저장소에 push

2. **Render 가입 및 배포**
   - https://render.com 접속 → 회원가입 (GitHub 연동 추천)
   - **New** → **Web Service**
   - GitHub 저장소 연결 후 선택
   - 아래처럼 설정 후 **Create Web Service**
     - **Build Command:** `npm install && npm run build`
     - **Start Command:** `node server/server.js`
     - **Environment:** `NODE_ENV` = `production` (추가)

3. **배포 완료**
   - 몇 분 후 `https://<서비스이름>.onrender.com` 주소로 접속

> ⚠️ Render 무료 플랜은 15분 미사용 시 슬립됩니다. 슬립 후 재접속 시 첫 로딩이 30초~1분 걸릴 수 있습니다.  
> ⚠️ 무료 플랜에서는 **질문 저장은 서버 재시작 시 초기화**됩니다. (영구 저장을 원하면 나중에 DB 연동 필요)