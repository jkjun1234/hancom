// 1. 두 숫자를 곱하는 화살표 함수 (num1, num2, num3)
//  => 뒤가 한줄이면 {return} 없이 그 값이 바로 반환됨
const multiply = (num1, num2, num3) => num1 * num2 * num3;

// 2. 값을 입력 받을 태그 요소 저장
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const c = document.querySelector("#c");
const out = document.querySelector("#out");

document.querySelector("#calc").addEventListener("click", () => {
    // Number() : 입력칸 글자를 숫자로 바꿔 곱하기, 템플릿 리터럴로 문장 조립
    out.textContent = `${a.value} x ${b.value} x ${c.value} = ${multiply(Number(a.value), Number(b.value), Number(c.value))}`;
});