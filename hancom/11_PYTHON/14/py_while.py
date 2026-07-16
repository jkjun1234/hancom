def meters_to_feet(meters):
    feet = meters * 3.2804
    return feet

while True:
    # 사용자 입력
    user_input = input("미터 값을 입력 : ")

    # 예외 처리
    try:
        meters = float(user_input) # 숫자 변환 시도
        feet = meters_to_feet(meters)
        print(f"{meters}m 은 {feet:.2f}ft 이다.")
        break
    except ValueError:
        print("숫자를 입력해주세요.")   # 변환 실패 시 실행