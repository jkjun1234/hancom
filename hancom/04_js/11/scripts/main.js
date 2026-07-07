// 1. 입력칸, 목록, 버튼 담기
const n = document.querySelector("#n");
const out = document.querySelector("#out");

// 2. "반복" 버튼 - for로 1부터 N까지 반복
document.querySelector("#run").addEventListener("click", () => {
    out.innerHTML = "";     // 목록 비우기
    // N 번 입력을 Number로 저장
    const count = Number(n.value);
    for(let i = 1; i <= count; i++)
    {
        const li = document.createElement("li");
        li.textContent = `${i} 번째 사과~`; // 1~count까지 반복 출력
        out.appendChild(li);
    }
});

// 3. 카운트 다운 버튼 - while 로 N부터 1까지
document.querySelector("#down").addEventListener("click", () => {
    out.innerHTML = "";
    let i = Number(n.value);
    
    while(i > 0) {
        const li = document.createElement("li");
        li.textContent = i; 
        out.appendChild(li);
        i--;
    }
})