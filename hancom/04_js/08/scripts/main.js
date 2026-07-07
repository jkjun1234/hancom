// 1. 누른 횟수를 담을 변수
let n = 0;

// 2. 버튼과 횟수 표시 칸을 찾아 담기
const btn = document.querySelector("#btn");
const out = document.querySelector("#count");

// 3. 버튼이 클릭될 때마다 실행 
btn.addEventListener("click", () => {
    n++;
    out.textContent = `${n}번 눌렀습니다`;
})