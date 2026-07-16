mixed = [1, "Hello", 3.14, True]

for i in mixed:
    print(i)

# enumerate : 인덱스의 번호까지 얻어온다. 키값 필요
for index, item in enumerate(mixed):
    print(f"index: {index}, item: {item}")
# index: 0, item: 1
# index: 1, item: hello
# index: 2, item: 3.14
# index: 3, item: True