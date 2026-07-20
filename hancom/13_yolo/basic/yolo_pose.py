from ultralytics import YOLO
import cv2

#1. 모델 로드
model = YOLO("yolo26n-pose.pt")

#2. 모델 추론
results = model("c:/Users/Har24/Downloads/pexels-mayaramombellifotografias-37539990.jpg")

#3. 결과 시각화
result_img = results[0].plot()

#4. 결과 이미지 저장
output_img_path = "./result_pose.jpg"
cv2.imwrite(output_img_path, result_img)
print(f"succsed save{output_img_path}")