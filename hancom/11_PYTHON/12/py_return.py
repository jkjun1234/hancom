from termcolor import colored

## 함수의 type hint 문법
## 입력 매개변수 str형 2개 반환타입은 str 형으로 반환한다는 의미 
def highlight(text:str, color:str) -> None:
    color_text = colored(text, color)
    # colored 함수는 색상및 폰트를 적용해줘서 저장하는거지 출력을 담당하진 않음 
    # 따라서 해당 함수를 호출하자마자 출력을 보려면 print(highlight)를 하던가 
    # 아니면 아래처럼 print() 를 반환해주면 된다. (type hint 에서도 str => None 으로 변경)
    return print(color_text)

highlight("hello", "yellow")
# colored 함수는 색상및 폰트를 적용해줘서 저장하는거지 출력을 담당하진 않음
#print(highlight("hello", "yellow"))