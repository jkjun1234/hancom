const nameInput = document.querySelector("#name");
const out = document.querySelector("#out");

document.querySelector("#greet").addEventListener("click", ()=>
{
    // 입력한 글자를 myName에 담기
    let myName = nameInput.value;
    out.textContent = `안녕, ${myName}!`;
})