colors = ["red", "green", "blue"]
# 순서있음, 수정가능 , 중복허용

print(colors[0])    # red    (첫 번째)
print(colors[-1])   # blue   (마지막)

print(colors[0:2])  # ['red', 'green']  
# (슬라이싱) [i:j] => i 부터(포함) j 이전 까지(j포함 X)


colors[-1] = "black"         # 값 변경
print("값 변경: ", colors)
colors.append("pink")        # 끝에 추가
print("끝에 추가: ", colors)
colors.insert(0, "white")    # 특정 위치에 삽입
print("특정 위치에 삽입: ", colors)
colors.remove("white")       # 값으로 제거
print("값으로 제거: ", colors)

numbers = [8, 5, 3, 2, 7]
numbers.sort()               # 오름차순 정렬
print("오름차순 정렬: ", numbers)
numbers.sort(reverse=True)   # 내림차순 정렬
print("내림차순 정렬: ", numbers)
numbers.reverse()            # 순서 뒤집기
print("순서 뒤집기: ", numbers)
print("True (2포함 여부): ", 2 in numbers)  # True (포함 여부)
