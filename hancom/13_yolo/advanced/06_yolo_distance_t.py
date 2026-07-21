from ultralytics import solutions
import cv2

# 1. 비디오 경로 설정
stream_url = "http://210.99.70.120:1935/live/cctv009.stream/playlist.m3u8"

cap = cv2.VideoCapture(stream_url)

# 2. 모델 로드 및 거리 계산 객체 생성
distance = solutions.DistanceCalculation(
    model="yolo26n.pt",
    show=True
)

result_distance = 0

# 3. 프레임 처리 루프
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("프레임 읽기 실패")
        break

    # 3-1. 탐지 + 클릭 대상 중심점 거리 계산 (내부 처리)
    # distance(frame) distance를 객체에 이미지를 넣었을때 얻어오는 값들 확인
    
    # 탐지한 객체간 거리 저장
    result_distance = distance.process(frame).pixels_distance

    if result_distance <= 50 and result_distance >= 1 :
        print(f"객체간의 거리가 50이하로 가깝습니다. ")
    elif (result_distance > 50 and result_distance <= 100):
        print(f"객체간의 거리가 50에서 70사이로 중간정도입니다. ")
    elif result_distance == 0 :
        print("객체가 선택되지 않았습니다.")
    else :
        print("거리가 멉니다.")



    # 3-2. q 키로 종료
    if cv2.waitKey(1) & 0xFF == ord("q"):
        print("q키를 눌러서 종료!!")
        break

# 4. 자원 해제
cap.release()

# 실습 : 거리에 따른 상태 조건 출력