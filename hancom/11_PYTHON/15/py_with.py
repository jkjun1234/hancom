# ================== 파일 쓰기 (생성) ===================
# with open("./memo.txt", "w", encoding="utf-8") as f:
#     f.write("안녕, 파이썬...!\n")
#     f.write("with문이 자동으로 닫아줌\n")

# print("파일 작성 잘됨")
    
# # 블록을 빠져나오면 파일은 알아서 닫힌다.

# ================== 파일 읽어오기 ===================
# with open("memo.txt", "r", encoding="utf-8") as f:
#     text = f.read()

# print(text)

# ================== 파일 내용 추가 ===================
with open("memo.txt", "a", encoding="utf-8") as f:
    f.write("\n 새로운 한 줄 추가\n")

print("새로운 한 줄 추가 완료!")
# 기존 내용은 그대로, 끝에만 한 줄이 더 붙음