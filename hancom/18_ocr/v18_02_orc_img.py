# 이미지에서 한글 추출
import pytesseract
from PIL import Image
import os

# 1. Tesseract 실행 파일 경로 지정
pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

# 2. 이미지 불러오기
# (왜) 상대경로는 "실행 시점의 작업 폴더(CWD)" 기준 → F5로 돌리면 워크스페이스 루트가 되어 못 찾음
#      __file__ 기준으로 잡으면 어디서 실행하든 이 .py 파일 옆의 image.png를 가리킴
BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # 이 .py 파일이 있는 폴더
image = Image.open(os.path.join(BASE_DIR, "image.png"))

# 3. OCR 수행
results = pytesseract.image_to_string(
    image,
    lang='kor'
)

# 4. 결과 출력
print(results)
# Optical Character
# Recognition (OCR)