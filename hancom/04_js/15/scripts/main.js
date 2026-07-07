// 1. Dog 클래스 - 강아지를 찍어내는 "틀"
class Dog {
    // new로 만들 때 자동 호출, 받은 이름을 보관
    constructor(name) {
        this.name = name;
    }

    // 짖는 메서드(함수)
    bark() {
        return `${this.name}: 왈왈!`;
    }
}

// 2. 결과 칸 가져오기 
const out = document.querySelector("#out");

// 3. 틀로 객체 (인스턴스) 두 개 찍어내기 (new)
const poppy = new Dog("뽀삐");
const choco = new Dog("초코");

document.querySelector("#bark").addEventListener("click", () => {
    out.textContent = `${poppy.bark()} ${choco.bark()}`;
});