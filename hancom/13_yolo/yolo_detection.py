from ultralytics import YOLO
import cv2

#1. 모델 로드
model = YOLO("yolo26n.pt")

#2. 모델 추론
# c:\Users\Har24\Downloads\pexels-mayaramombellifotografias-37539990.jpg
results = model("c:/Users/Har24/Downloads/pexels-mayaramombellifotografias-37539990.jpg")

#3. 결과 시각화
results_img = results[0].plot()

#4. 결과 이미지 저징
output_image_path = "./result_det.jpg"
cv2.imwrite(output_image_path, results_img)
print(f"저장되었습니다.{output_image_path}")