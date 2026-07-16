import pyfiglet
# 람다 공식
# 함수명 = lambda 매개 변수(파라미터) : 반환값

def add(a, b):
    return a + b

print(add(7,3))
# 10 출력

# 두 수르르 더하는 람다 함수
lambda_add = lambda a,b : a + b
print(f"람다함수를 이용한 add 함수 {lambda_add(3,3)}") # 6 출력

# 글자를 넣으면 큰 그림 글씨로 출력(pyfiglet) 해주는 람다함수
pyfiglet_lambda = lambda text : pyfiglet.figlet_format(text)
# pyfiglet_lambda: 람다함수 이름
# text : 해당 함수가 받을 매개변수
# 함수가 수행할 내용 여기선 문자 변환

print(pyfiglet_lambda("ZZZ"))