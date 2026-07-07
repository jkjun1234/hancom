// 1. 인사말(greet) 이름 입력칸 변수에 저장
const greet = document.querySelector("#greet");
const input = document.querySelector("#name");

// 2. 처음 열 떄 저장된 이름이 있으면 getItem 으로 인사
const saved = localStorage.getItem("name");
if (saved) {
    greet.textContent = `안녕, ${saved}`;
}

// 3. 저장 버튼 -> 입력한 이름을 브라우저에 저장(setItem) 
document.querySelector("#save").addEventListener("click", () => {
    const myName = input.value;
    if(!myName) { return;}  // 비어 있으면 바로 반환

    // 입력받은 이름 브라우저에 저장
    localStorage.setItem("name", myName);
    greet.textContent = `안녕, ${myName}`;
});

// 4. 지우기 버튼 -> 저장된 이름 삭제(removeItem) 
document.querySelector("#reset").addEventListener("click", () => {
    localStorage.removeItem("name");
    greet.textContent = "안녕하세요";
})