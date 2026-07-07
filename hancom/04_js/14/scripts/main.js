// 1. 관련된 갑을 key : value 로 묶은 객체 생성
let person = {
    name: "콩이",
    age: 10
}

// 2. 결과 칸 담기
const out = document.querySelector("#out");

// 3. 객체 값을 화면에 그리는 함수
const render = () => {
    // .으로 값 가져올 수 있음
    out.textContent = `${person.name} (${person.age}살)`;
}
render();

// 4. 나이 +1 버튼 - 점(.)으로 바꾸기 age 값 바꾸기 
document.querySelector("#up").addEventListener("click", () => {
    person.age++;
    render();
});

// 5. 이름 바꾸기 버튼 - .으로 name 바꾸기
document.querySelector("#rename").addEventListener("click", () => {
// 보여지는 이름 계속 변경하기 
    if(person.name === "깨")
    {
        person.name = "두부"
    }
    else
    {
        person.name = "깨"
    }
    render();
});

// 색상 바꿀 내용 넣어보기
document.querySelector("#randomcolor").addEventListener("click", () => {
     out.setAttribute("color", #blue);
});
