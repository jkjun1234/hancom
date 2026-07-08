# 📚 웹 개발 기초 개념 퀴즈

> **프로젝트**: 웹 입문 학습자를 위한 개념 복습 앱 | **작성**: 2026-07-08 | **마감**: 16:00

---

## 1. 프로젝트 개요

**이름**: 웹 개발 기초 개념 퀴즈  
**목표**: 지금까지 배운 HTML·CSS·JavaScript의 기본 개념을 게임처럼 복습하고, 헷갈리는 부분을 명확히 학습  
**대상 사용자**: 같은 반 웹 입문 학습자 (지금 내가!)  

**핵심 콘텐츠**:
- **HTML 시맨틱 태그** (div vs section vs article, 언제 어떤 태그를 쓸까?)
- **CSS 핵심 속성** (display, position, flex 등 "왜 이 속성이 필요할까?")
- **JavaScript 기본 개념** (var vs let vs const, this, 이벤트, DOM, 함수)
- **웹 개발 용어** (DOM이란, 이벤트 루프, fetch, 콜백)

---

## 2. AI 활용 범위

✅ **AI가 한 작업**:
- 기획서 작성
- HTML/CSS 초기 틀
- 퀴즈 문제 샘플

❌ **사용자가 직접 하는 작업**:
- HTML 구조 작성 (배운 시맨틱 태그 사용)
- CSS 스타일 적용
- **JS 핵심 로직 설계 & 구현** (배운 개념만 사용, 심화 X)
- Netlify 배포

**제약**: 지금까지 배운 것 기반만 사용 (새로운 문법 X)

---

## 3. HTML 구조

```html
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>웹 개발 기초 개념 퀴즈</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <div class="container">
    <h1>웹 개발 기초 개념 퀴즈</h1>
    
    <div class="card">
      <div class="question" id="questionDisplay">
        다음 중 시맨틱 태그는?
      </div>
      
      <div class="choices" id="choicesContainer">
        <!-- JS에서 동적으로 생성 -->
      </div>
      
      <div class="explanation" id="explanationDisplay" style="display: none;">
        <!-- 정답 설명 (선택 후 표시) -->
      </div>
    </div>
    
    <div class="controls">
      <button id="nextBtn">다음 문제</button>
    </div>
    
    <div class="progress">
      <span id="progressText">1 / 10</span>
    </div>
  </div>
  
  <script src="scripts/main.js"></script>
</body>
</html>
```

---

## 4. CSS 테마 (테크-브라이트)

**색상 팔레트**:
- 배경: `#F7F8FC` (밝은 오프화이트)
- 카드: `#FFFFFF` (흰색)
- 텍스트: `#1E1B4B` (다크 네이비)
- 정답: `#10B981` (민트)
- 오답: `#EF4444` (빨강)
- 포인트 버튼: `#4F46E5` (인디고)

**주요 스타일**:
- 카드: 중앙 정렬, 패딩 충분, 그림자로 입체감
- 선택지 버튼: 클릭 가능한 모양, 호버 효과
- 정답/오답: 색상으로 시각적 피드백
- 전체: 밝고 학습하기 좋은 분위기

---

## 5. JS 로직 (핵심)

### 5-1. 데이터 구조
```javascript
const quizzes = [
  {
    question: "다음 중 시맨틱 태그는?",
    choices: ["<div>", "<section>", "<span>", "<b>"],
    answer: 1,  // 정답 인덱스
    explanation: "<section>은 문서의 의미 있는 섹션을 나타내는 시맨틱 태그입니다."
  },
  {
    question: "let과 const의 차이는?",
    choices: ["둘 다 재할당 가능", "let만 재할당 가능", "const만 재할당 가능", "차이 없음"],
    answer: 1,
    explanation: "let은 재할당 가능, const는 재할당 불가능합니다."
  },
  // ... (총 10개)
];
```

### 5-2. 상태 관리
```javascript
let currentIndex = 0;    // 현재 문제 번호
let score = 0;           // 맞은 개수
let quizzes = [];        // 퀴즈 데이터
```

### 5-3. 핵심 함수
- `initQuiz()` — 데이터 로드, 첫 문제 표시
- `renderQuestion()` — 현재 문제 & 선택지 화면에 그리기
- `checkAnswer(index)` — 선택지 클릭 시 정답 확인
- `showExplanation()` — 정답 설명 표시
- `nextQuestion()` — 다음 문제로 진행
- `updateProgress()` — 진행도 업데이트

### 5-4. 이벤트 바인딩
- 페이지 로드: `initQuiz()` 실행
- 선택지 버튼 클릭: `checkAnswer()` 실행
- 다음 버튼 클릭: `nextQuestion()` 실행

---

## 6. 주요 결정사항

| 항목 | 선택 | 이유 |
|------|------|------|
| 문제 수 | 10개 | 간단하고 실습에 충분 |
| 선택지 | 4개 | 표준 객관식 퀴즈 형식 |
| 정답 표시 | 색상 변화 + 설명 | "왜 이게 답인지" 학습 |
| 주제 | HTML·CSS·JS 혼합 | 지금까지 배운 내용 복습 |
| 테마 | 테크-브라이트 | 밝고 학습감 있는 분위기 |

---

## 7. 파일 구조

```
04_js/18/
├─ index.html
├─ styles/main.css
├─ scripts/main.js
└─ docs/
   ├─ flashcard-plan.md (이 파일)
   └─ flashcard-plan.pdf
```

---

## 8. 개발 일정

| 단계 | 예상 시간 | 담당 |
|------|---------|------|
| HTML 작성 | 5분 | 사용자 |
| CSS 스타일 | 10분 | 사용자 |
| JS 로직 | 40분 | 사용자 (튜터 모드) |
| 문제 데이터 입력 | 5분 | 사용자 |
| 테스트 & 배포 | 10분 | 사용자 |
| **합계** | **70분** | |

