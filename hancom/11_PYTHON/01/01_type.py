x = 10  #int
y = 3.14    #float
name = 'Python' #str
is_fun = True   #bool
colors = ["red", "green", "blue"] # list
coords = (10, 20)   # tuple(순서 있음, 수정 불가)
person = {"name" : "Tom", "age":40} #dict (키-값)
nums = {1, 2, 3}    # set(중복 불가, 순서 없음)
nothing = None  #NoneType


# 이름 규칙
# smake_case => 변수명, 함수명
# PascalCase => 클래스 명
# camelCase => JS 방식

# F5 > python 디버거 선택 > py39 아나콘다 환경 선택
# 아래 코드를 통해 터미널에서 위에 정의한 변수들의 타입들에 대해 알 수 있다.
# print(type(name))
# print(type(is_fun))

# 타입 비교하는 명령어 isinstance()
# x : 타입 비교하고자하는 변수 이름
# int : x 는  판별하는 기준 (int -> x가 int형일때 true 반환)
print(isinstance(x, int))
