// 1. 입력칸, 기호 선택 결과 칸을 찾아 담기
const a = document.querySelector("#a");
const b = document.querySelector("#b");
const op = document.querySelector("#op");
const out = document.querySelector("#out");

// 2. 계산 버튼을 누르면 실행 
document.querySelector("#calc").addEventListener("click", () => {
    const x = Number(a.value);
    const y = Number(b.value);
    let result; // 결과는 나중에 정해지니 let으로 선언

    // 3. 고른 기호(op)에 따라 다른 연산자로 계산 
    if(op.value === "+") { result = x + y;}
    else if(op.value === "-") { result = x - y;}
    else if(op.value === "*") { result = x * y;}
    else {
        result = x/y;
    }

    out.textContent = `${x} ${op.value} ${y} = ${result}`;
});