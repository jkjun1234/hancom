from ultralytics import YOLO
import cv2

# 1. 모델 로드
model = YOLO("yolo11n-cls.pt")
# n => s => m => l => x


# 2. 모델 추론
results = model("c:/Users/Har24/Downloads/pexels-ssteenbergenn-3621344.jpg")

# 3. 결과 시각화
results_image = results[0].plot()

# 4.결과 이미지 저장
output_image_path = "./result.jpg"
cv2.imwrite(output_image_path, results_image)
print(f"사진이 잘 저장되었습니다. => {output_image_path}")
model = YOLO("yolo12n-cls.pt")