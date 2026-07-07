// 두 그림 주소 실제 프로젝트에선 images/cat.png 같이 파일 주소를 사용
// 여기선 picsum.photos 더미 이미지 서비스를 사용 - 인터넷 연결 필요
// (?random= 뒤 번호만 다르게 주면 서로 다른 사진을 받아옴)
const IMG_A = "https://picsum.photos/100?random=1";
const IMG_B = "https://picsum.photos/100?random=2";

// 1. 페이지의 그림(id="pic")을 찾아 myImage 상자에 담기
const myImage = document.querySelector("#pic");
// 2. 처음 보여줄 그림을 IMG_A로 설정
myImage.setAttribute("src", IMG_A);

// 3. 그림을 클릭할 떄마다 실행 (onclick 속성에 화살표 함수 연결)
myImage.onclick = () => {
    // 지금 걸려있는 그림 주소 얻어오기(getAttribute)
    const mySrc = myImage.getAttribute("src");
    if(mySrc === IMG_A)
    {
        myImage.setAttribute("src", IMG_B);
    }else 
    {
        myImage.setAttribute("src", IMG_A);
    }
}