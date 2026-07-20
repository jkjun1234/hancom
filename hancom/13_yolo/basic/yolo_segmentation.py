from ultralytics import YOLO
import cv2

#1. 모델 로드
model = YOLO("yolo26n-seg.pt")

#2. 모델 추론
results = model("c:/Users/Har24/Downloads/pexels-mayaramombellifotografias-37539990.jpg", save = True)
