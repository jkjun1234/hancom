const title = document.querySelector("#title");
// . => ~의 
// title 태그 가져오기

const btn = document.querySelector("#btn");
//button 태그 요소 가져오기

btn.addEventListener("click", () => {
    // 제목이 바뀌는 로직
    if(title.textContent != "hello~")
    {
        title.textContent = "hello~";
    }
    else {
        title.textContent = "다시 원래대로~";
    }
});