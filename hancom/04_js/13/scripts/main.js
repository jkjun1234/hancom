// 1. 과일 배열 
let fruits = ["사과", "바나나"];

// 2. 입력 칸,결과 칸 , 개수 칸을 저장
const fruit = document.querySelector("#fruit");
const out = document.querySelector("#out");
const info = document.querySelector("#info");

// 3. 화면을 다시 그리는 함수
const render = () => {
    // 글자 사이 ,(콤마) 넣기
    out.textContent = fruits.join(" ");

    info.textContent = `개수(length): ${fruits.length}`;
};
render();

// 4. "추가" 버튼 - 입력한 과일을 배열 끝에 push ( 화살표 함수 )
document.querySelector("#add").addEventListener("click", () => {
    if(!fruit.value) {  return; }   // 입력값이 빈값일 경우 바로 반환
    fruits.push(fruit.value);   // .push(값) : 배열 끝에 새 값 추가 
    fruit.value = "";   // 입력칸 비우기 (다음 입력 준비)
    render();
})