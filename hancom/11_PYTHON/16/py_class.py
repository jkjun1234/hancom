# =========
# 1. 클래스 : 제품의 설계도 
# 2. 생성자 : 객체를 만들 때 실행되는 함수
# 3. 속성 : 클래스 안의 변수
# 4. 메서드 : 클래스 안의 함수
# 5. 객체 : 설계도로 만든 제품
# =========

# 클래스 정의
class World:

    # 생성자 
    def __init__(self, name, capital_city):
        # 속성 ( 나라 이름 , 나라 수도 정의)
        self.name = name
        self.capital_city = capital_city

    def hello(self):
        print(f"Hello, {self.name}!!")
    
    def Wellcome(self):
        print(f"우리나라({self.name})의 수도{self.capital_city} 어서오세요!")
    
    

# 객체 생성
asia = World("Korea", "서울")

asia.hello()
asia.Wellcome()
# Hello Korea 라고 출력이 된다.