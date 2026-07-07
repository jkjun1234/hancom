// 1. 입력 칸과 결과 칸 답기
const s = document.querySelector("#s");
const out = document.querySelector("#out");

// 2. "분석" 버튼을 누르면 문자열 도구로 글자 다루기
document.querySelector("#go").addEventListener("click", ()=> {
    const text = s.value;   // 입력된 텍스트(input)태그의 값을 저장    

    // 백틱 `` 안 ${} 로 결과 출력 
    out.innerHTML =
    `글자 수 (length): ${text.length}` + "<br>" +
    `대문자(toUpperCase): ${text.toUpperCase()}` + "<br>" +
    `e->E 바꾸기 (replace): ${text.replace("e", "E")}`;
});