from PIL import Image, ImageEnhance, ImageOps   # 이미지 증강
import matplotlib.pyplot as plt

# [1단계] 이미지 불러오기 — PNG·JPG 모두 가능
img = Image.open("captured_images/result_260720_093554.jpg")
img = img.convert("RGB")

# [2단계] 회전 — 90도 시계 방향
img_rotated = img.rotate(90)

# [3단계] 밝기 조절 — 0.5 = 원본의 50%
enhancer = ImageEnhance.Brightness(img)
img_brightness = enhancer.enhance(0.5)

# [4단계] 좌우 반전 — 거울처럼 뒤집기
img_flip = ImageOps.mirror(img)

# 3. 결과 시각화
fig , ax = plt.subplots(2,3,figsize=(20, 10))

# 3-1 원본 이미지
ax[0,0].imshow(img)
ax[0,0].axis('off')
ax[0,0].set_title('Original')

#3-2. 회전 이미지
ax[0,1].imshow(img_rotated)
ax[0,1].axis('on')
ax[0,1].set_title('Rotated 90')

#3-3 밝기 이미지
ax[0,2].imshow(img_brightness)
ax[0,2].axis('off')
ax[0,2].set_title('Brightness')

#3-4 좌우 반전 이미지
ax[1,0].imshow(img_flip)
ax[1,0].axis('off')
ax[1,0].set_title('Filp')

plt.show()
print("이미지 저장이 잘 됐습니다.")

# # [5단계] 저장 — 변환된 이미지 3장 출력
img_rotated.save("./img_rotated.jpg")
img_brightness.save("./img_brightness.jpg")
img_flip.save("./img_flip.jpg")