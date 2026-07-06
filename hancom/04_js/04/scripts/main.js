// 결과 칸 저장
const out = document.querySelector("#out");

//  값을 받아 "값 (타입: ...)" 형태로 보여 주는 화살표 함수
const show = (value) => {
    // 객체,배열은 보기 좋게 JSON 글자로, 나머지는 그대로
    const shown = (typeof value === "object" && value !== null) ? JSON.stringify(value) : value;
    // 템플릿 리터럴 `${}` 로 값과 타입(typeof)을 한 문장에 끼워 넣기
    out.textContent = `${shown} (타입 : ${typeof value})`;
};

let empty;

// 버튼마다 서로 다른 타입의 값을 넣어 호출 (7가지 타입 모두)
document.querySelector("#bStr").addEventListener("click", () => show("안녕"));
document.querySelector("#bNum").addEventListener("click", () => show(10));
document.querySelector("#bBool").addEventListener("click", () => show(true));
document.querySelector("#bUndef").addEventListener("click", () => show(empty));
document.querySelector("#bNull").addEventListener("click", () => show(null)); // null -> object 타입
document.querySelector("#bArr").addEventListener("click", () => show([1,"Jun",200]));   // array 타입 : Object타입
document.querySelector("#bObj").addEventListener("click", () => show([{name:"Kijun"}]));
