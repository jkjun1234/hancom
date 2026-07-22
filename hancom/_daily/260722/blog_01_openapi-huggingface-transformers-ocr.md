# 웹 개발 17일차 — 남이 만든 AI, 어디서 실행할 것인가 (OpenAPI · HuggingFace · Transformers · OCR)

> 오늘 실습을 다 끝내고 나서 든 생각은 솔직히 "별거 없었네" 였다.
> API 키 넣고, 함수 호출하고, 결과 출력하고. 그게 다인 것 같았다.
> 그런데 커밋 로그를 다시 훑으면서 15 → 16 → 17 → 18 순서를 나란히 놓고 보니 뭔가 보였다.
> **네 개 실습이 전부 "남이 만든 AI를 가져다 쓰는" 이야기인데, 그 AI가 돌아가는 위치가 계속 내 쪽으로 옮겨오고 있었다.**
> 그리고 그 위치가 바뀔 때마다 필요한 것(API 키 / 인터넷 / 디스크 / 설치 프로그램)도 같이 바뀌었다.
> 오늘 가상환경을 세 개나 새로 판 것도 결국 같은 이유였다는 걸 뒤늦게 알았다.

---

## 0. 오늘의 요약

- 오늘 실습 네 개(`15_openAPI`, `16_huggingface`, `17_transformers`, `18_ocr`)는 **"AI/데이터가 어디서 실행되는가"** 라는 하나의 축으로 꿰인다.
- 그 축은 **완전 원격 → 남의 GPU → 내 PC 다운로드 → 내 PC 설치 프로그램** 순으로 이동한다.
- 오늘 가장 크게 남은 건 **어제 배운 YOLO에 오늘 배운 OpenAPI를 붙여서 실시간 CCTV에 객체탐지를 돌린 것**이다. 처음으로 배운 것 두 개를 조합했다.
- 삽질도 꽤 했다 — `http`→`https`, `pipeline("summarization")`이 없어진 것, 한국어 요청했는데 독일어가 나온 것, 상대경로로 이미지를 못 찾은 것, OCR `lang` 옵션이 한 언어만 살리고 나머지를 망가뜨린 것.
- 실습 코드는 `hancom/15_openAPI` ~ `hancom/18_ocr` 에 교재 노드 순서대로 정리했다.

> ⚠️ 이 글의 코드에 나오는 API 키는 전부 마스킹했다. 실습할 땐 본인이 발급받은 키를 넣으면 된다. (왜 마스킹했는지는 [3-3](#3-3-삽질--api-키를-코드에-박으면-안-되는-이유)에서 따로 다룬다.)

---

## 1. 오늘의 축 — AI를 "어디서" 실행하느냐

먼저 이 표를 보고 시작하면 오늘 글이 훨씬 편하다. 네 실습을 순서대로 놓은 것이다.

| 실습 | 실제로 계산이 일어나는 곳 | 내가 준비해야 하는 것 | 인터넷 |
|---|---|---|---|
| `15_openAPI` (ITS CCTV) | 정부 서버 — **AI 없음, 데이터만** 받아옴 | API 키 | 필수 |
| `16_huggingface` (DeepSeek, FLUX) | **남의 GPU 서버** | API 키 | 필수 |
| `17_transformers` (MiniLM, GPT-2, T5) | **내 PC (CPU)** | 디스크 용량(모델 다운로드) | 최초 1회만 |
| `18_ocr` (Tesseract) | **내 PC (설치한 exe)** | 프로그램 설치 + 언어팩 | 불필요 |

위에서 아래로 갈수록 **내 쪽으로 가까워진다.** 그리고 그에 따라:

- **API 키가 필요 없어진다** (17, 18은 키가 아예 없다)
- **인터넷 의존이 사라진다** (18은 비행기 안에서도 된다)
- **대신 내 컴퓨터가 일을 한다** (그래서 느리다)

이걸 알고 나니 왜 오늘 가상환경을 세 개나 팠는지도 설명이 됐다. 그건 [6번](#6-가상환경을-하루에-세-개나-판-이유)에서 정리한다.

---

## 2. 공공 OpenAPI — 데이터만 받아오기 (`15_openAPI`)

첫 실습은 AI가 아예 안 나온다. **국가교통정보센터(ITS)의 실시간 CCTV 목록**을 받아오는 것이다.

### 2-1. URL 조립 → 요청 → bytes → str → dict → DataFrame

`hancom/15_openAPI/v15_02_cctv_its.py`:

```python
# 실행전 Pandas 설치
# 해당 프로젝트는 아나콘다 가상 환경(py39)에서 실습하므로
# py39(conda activate py39 로 접근)에 들어가서 pandas를 설치한다
# > pip install pandas

import urllib   # URL 요청
import urllib.request   # 인터넷 주소로 자료 요청하는 도구
import json              # 글자로 된 자료를 사전(dict) 모양으로 바꾸는 도구
import pandas as pd      # 자료를 엑셀 같은 표로 다루는 도구

# 1. 인증 키 → 정부 사이트에서 받은 "비밀 번호", 이게 있어야 자료 줌
key = "발급받은_본인_키를_넣기"

# 2. 도로 유형 (its=일반도로, ex=고속도로) → 어느 도로 CCTV 가져올지 선택
Type = "its"

# 3. 관심 영역 (경도·위도 범위) → 지도 위에 사각형 그려서 그 안 CCTV만 요청
minX, maxX = 120.95, 127.02   # 동서(가로) 범위 → 한국 전체 가로
minY, maxY = 30.55, 37.69     # 남북(세로) 범위 → 한국 전체 세로
getType = "json"              # 응답 형식 → JSON(글자로 정리된 자료)

# 4. API URL 조립 → 위 정보를 모두 합쳐서 "자료 요청 주소" 한 줄로 만듦
url_cctv = (
    f"https://openapi.its.go.kr:9443/cctvInfo"
    f"?apiKey={key}&type={Type}&cctvType=1"
    f"&minX={minX}&maxX={maxX}"
    f"&minY={minY}&maxY={maxY}"
    f"&getType={getType}"
)

# 5. 요청 → 응답 : 만든 주소로 "자료 주세요" 보내고 봉투(response) 받음
response = urllib.request.urlopen(url_cctv)
print(f"response : {response}")

json_str = response.read().decode("utf-8")   # bytes → str (사람 글자)

print("----------------------------------------------------")
json_object = json.loads(json_str)            # str → dict (사전 모양)

# 7. 데이터프레임 변환
cctv_play = pd.json_normalize(
    json_object["response"]["data"], sep=''
)

# 8. 77번 CCTV URL 출력
test_url = cctv_play["cctvurl"][77]
print(f"선택된 CCTV URL : {test_url}")
```

> 실제 파일에는 각 단계마다 "왜 이렇게 하는지" 주석이 더 길게 달려 있다. 여기선 흐름이 보이게 좀 줄였다.

한 덩어리씩 뜯어보면:

- **`f"...?apiKey={key}&type={Type}..."`** — API 호출은 결국 **주소 한 줄 만들기**다. `?` 뒤에 `키=값`을 `&`로 이어 붙이는 게 전부다. 이걸 쿼리스트링이라고 부른다. 여기선 f-string을 여러 줄로 쪼개 썼는데, 괄호 `( )` 안에 문자열을 나란히 두면 자동으로 이어 붙는다.
- **`minX/maxX/minY/maxY`** — "한국 전체"라는 뜻이 아니라 **지도 위에 사각형을 그리는 것**이다. 경도 120.95~127.02, 위도 30.55~37.69 안에 있는 CCTV만 달라는 요청이다. 이 숫자를 좁히면 특정 지역 CCTV만 골라올 수 있다.
- **`urllib.request.urlopen(url_cctv)`** — 그 주소로 "자료 주세요" 하고 보낸다. 돌아오는 `response`는 아직 내용물이 아니라 **봉투**다. 그래서 출력해보면 `<http.client.HTTPResponse object at 0x...>` 같은 정체불명의 글자가 나온다.

여기서 처음에 제일 헷갈렸던 게 **왜 변환을 두 번 하냐**는 거였다.

```python
json_str    = response.read().decode("utf-8")   # ① bytes → str
json_object = json.loads(json_str)              # ② str  → dict
```

- **① `.decode("utf-8")`** — 서버는 인터넷 전송용 **bytes**(0과 1 덩어리)로 보낸다. 사람이나 파이썬이 읽으려면 글자(`str`)로 풀어야 한다. 한글이 깨지지 않게 `utf-8`을 지정한다.
- **② `json.loads(...)`** — 근데 `str`은 여전히 **글자 덩어리**일 뿐이다. `{"response": {"data": [...]}}` 라고 눈에 보여도 파이썬은 그냥 긴 문자열로 안다. `["키"]`로 값을 꺼내려면 **`dict`(사전)** 이어야 한다. 그 변환이 `json.loads`다.

정리하면 **"봉투 → 글자 → 사전"** 3단계고, 각 단계마다 이유가 다르다.

마지막으로 `pd.json_normalize`는 **중첩된 사전을 납작한 표로 펴는** 도구다. 안 쓰면 `json_object["response"]["data"][77]["cctvurl"]` 처럼 계속 파고들어야 하는데, 표로 펴면 `cctv_play["cctvurl"][77]` 로 끝난다.

![](https://velog.velcdn.com/images/developjkj/post/e63c3b31-7091-4358-a707-7b66648824e4/image.png)

> 위 이미지는 실제 실행 결과를 터미널 스타일로 다시 그린 **재현본**이다(내용·값은 실제 출력 그대로).

### 2-2. 삽질 — `http`로 오는 URL을 `https`로 바꿔야 열린다

받아온 CCTV 주소를 그대로 브라우저에 붙여넣으면 **재생이 안 된다.** 응답에 담겨 오는 주소가 `http://`로 시작하기 때문이다. 앞에 `s` 하나만 붙여서 `https://`로 바꾸면 정상적으로 열린다.

그래서 실제 파일에도 이 메모를 남겨놨다.

```python
# 선택된 URL을 보면 http로 되어있는데 https로 변경해주면 정상적으로 접속이 된다.
```

**API가 주는 값이 항상 바로 쓸 수 있는 상태는 아니다**는 걸 처음 겪은 지점이었다.

### 2-3. 함수로 뽑아내기 — 왜 굳이

다음 파일 `v15_03_cctv_its_def.py`는 위 코드를 **함수 하나로 감싼 것**이다. 로직은 똑같고, 달라진 건 세 곳뿐이다.

```python
# 함수화
    # 함수명 : its_cctv
    # 파라미터 : 1개 => cctv_index
    # return : test_url


def its_cctv(cctv_index=77):
    # ... (본문은 v15_02와 완전히 동일) ...

    test_url = cctv_play["cctvurl"][cctv_index]   # ← 77 고정 대신 파라미터
    print(f"선택된 CCTV URL : {test_url}")

    return test_url                                # ← 출력만 하지 말고 돌려주기
```

- **`def its_cctv(cctv_index=77):`** — `=77`은 **기본값**이다. `its_cctv()`라고 그냥 부르면 77번, `its_cctv(50)`이라고 부르면 50번 CCTV를 준다.
- **`return test_url`** — 이게 핵심이다. 원래 코드는 `print`로 **화면에 보여주기만** 했다. 화면에 찍힌 글자는 다른 코드가 가져다 쓸 수 없다. `return`을 붙여야 **다른 파일이 그 값을 받아서 쓸 수 있다.**

솔직히 처음엔 "왜 굳이 함수로 만들지, 그냥 복붙하면 되는데" 싶었다. 그 답이 바로 다음 파일에서 나왔다.

### 2-4. ⭐ 어제의 YOLO + 오늘의 API = 실시간 CCTV 객체탐지

오늘 실습 중에 제일 기억에 남는 파일이다. `hancom/15_openAPI/v15_04_cctv_its_yolo.py`:

```python
from ultralytics import YOLO
import cv2
from v15_03_cctv_its_def import its_cctv   # def 파일 내부에 있는 its_cctv함수 사용

#1. its_cctv 함수로 주소 가져오기
test_url = its_cctv(50) # cctv주소 얻어오기

#2. 비디오 경로 설정
cap = cv2.VideoCapture(test_url)

#3. 모델 로드
model = YOLO("yolo26n.pt")

#4. 프레임 처리
while cap.isOpened():
    success, frame = cap.read()
    if not success:
        print("프레임 읽기 실패")
        break

    #4-1 모델 추론
    results = model(frame)

    #4-2. 결과 이미지
    annotated_frame = results[0].plot()

    #4-3. 윈도우 창 생성
    cv2.namedWindow("ITS_YOLO", cv2.WINDOW_AUTOSIZE)
    cv2.imshow("ITS_YOLO", annotated_frame)

    #4-4. q 키를 눌러 종료
    if cv2.waitKey(1) & 0xFF == ord("q"):
        print("q키를 눌러 종료")
        break

#5. 자원 해제
cap.release()
cv2.destroyAllWindows()
```

이 파일이 왜 좋았냐면, **어제까지 배운 것과 오늘 배운 것이 정확히 한 줄에서 만나기 때문**이다.

```python
from v15_03_cctv_its_def import its_cctv   # ← 오늘 배운 것 (공공 API)
test_url = its_cctv(50)

cap = cv2.VideoCapture(test_url)           # ← 어제 배운 것 (YOLO 영상 처리)
```

어제 YOLO 실습에서 `cv2.VideoCapture()` 안에 넣은 건 `0`(웹캠)이나 `"영상.mp4"`(파일)였다. 그 자리에 **오늘 API로 받아온 실시간 스트림 주소**를 그냥 넣으니까 그대로 돌아갔다.

- **`from v15_03_cctv_its_def import its_cctv`** — 같은 폴더의 다른 `.py` 파일에서 함수를 꺼내 쓰는 문법이다. `from 파일이름(확장자 빼고) import 함수이름`. 2-3에서 `return`을 붙여둔 게 여기서 값을 넘겨받는다.
- **`results = model(frame)`** → **`results[0].plot()`** — 프레임 한 장을 모델에 넣고, 결과에 박스를 그려서 새 이미지를 받는다. 이 두 줄이 어제 배운 YOLO 패턴 그대로다.
- **`cap.isOpened()` while 루프** — 영상은 결국 사진의 연속이라, 한 장씩 꺼내서(`cap.read()`) 처리하고 화면에 뿌리는(`cv2.imshow`) 걸 반복한다.

**"실시간 CCTV에서 차량 탐지"** 같은 건 원래 엄청 큰 프로젝트일 것 같았는데, 결국 **어제 것 + 오늘 것을 `import` 한 줄로 이어붙인 것**이었다. 이게 오늘의 제일 큰 수확이다.

---

## 3. HuggingFace — 남의 GPU를 빌려 쓰기 (`16_huggingface`)

여기서부터 AI가 나온다. 다만 **모델은 내 컴퓨터에 없다.** HuggingFace 서버에 요청을 보내고 결과만 받는다.

### 3-1. `InferenceClient`로 DeepSeek 호출

`hancom/16_huggingface/v16_02_deepseek.py`:

```python
import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    # api_key="hf_...", # API 키 직접입력
    api_key=os.environ["HF_TOKEN"], # 환경 변수 사용으로 API 키 노출 방지
)

answer = input("질문을 입력해주세요: ")

completion = client.chat.completions.create(
    model="deepseek-ai/DeepSeek-V3.2:novita",
    messages=[
        {
            "role": "user",
            "content": answer
        }
    ],
)

print(completion.choices[0].message)
```

- **`InferenceClient(api_key=...)`** — HuggingFace에 "나 이 사람이야" 하고 신분증을 보여주는 객체다. 이걸 한 번 만들어두면 이후 요청에 키가 자동으로 붙는다.
- **`model="deepseek-ai/DeepSeek-V3.2:novita"`** — 모델 이름을 문자열로 지정한다. **이 한 줄만 바꾸면 다른 모델로 갈아탈 수 있다.** 뒤의 `:novita`는 어느 업체 서버에서 돌릴지를 고르는 부분이다.
- **`messages=[{"role": "user", "content": answer}]`** — 요즘 챗 모델의 공통 형식이다. `role`이 `"user"`면 내가 한 말, `"assistant"`면 AI가 한 말이다. 대화를 이어가려면 이 리스트에 계속 쌓으면 된다.
- **`completion.choices[0].message`** — 응답은 후보 여러 개를 담을 수 있는 구조라 `choices[0]`으로 첫 번째를 꺼낸다.

지난주에 Groq API로 챗봇 만들 때랑 **구조가 똑같다**는 게 바로 보였다. 회사만 다르고 `messages` 형식, `choices[0]` 꺼내는 방식이 같다. 이 형식이 사실상 업계 표준인 듯하다.

### 3-2. `text_to_image`로 그림 생성 (FLUX)

`hancom/16_huggingface/v16_03_tti.py`:

```python
# text to image

import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    provider="auto",
    api_key="발급받은_본인_HF_토큰",
)

# 사용자 입력 받기
answer = input("생성할 이미지를 설명 : ")

# output is a PIL.Image object
image = client.text_to_image(
    answer,
    model="black-forest-labs/FLUX.1-dev",
)

# 생성될 이미지 저장
image.save("tti_result.jpg")

# 완료 메시지 출력
print("전체 코드가 잘 실행되었습니다.")
```

- **`provider="auto"`** — 이 모델을 서비스하는 업체 중 아무 데나 알아서 골라달라는 뜻이다. 3-1처럼 `:novita`를 직접 붙이는 것의 반대 방식.
- **`client.text_to_image(answer, model=...)`** — 반환값이 파일 경로가 아니라 **PIL 이미지 객체**다. 그래서 `.save()`로 직접 저장해야 파일이 생긴다. 저장 안 하면 프로그램이 끝나면서 그냥 사라진다.
- **`image.save("tti_result.jpg")`** — 상대경로라서 **실행한 위치**에 저장된다. 실제로 이것 때문에 프로젝트 최상단에 `tti_result.jpg`가 생겼다. (이 문제는 [5-1](#5-1-삽질--상대경로로는-이미지를-못-찾는다)에서 제대로 다룬다.)

실제로 나온 결과다.

![](https://velog.velcdn.com/images/developjkj/post/4af4b20c-bc63-434d-8fa4-6d99e6567163/image.jpg)

텍스트 몇 글자 넣었는데 이 정도 사진이 나오는 게 좀 신기했다. 그런데 이건 **내 노트북이 만든 게 아니다.** 내 컴퓨터는 문장을 보내고 이미지를 받아왔을 뿐, 실제 계산은 남의 GPU가 했다. 그래서 **GPU가 없는 노트북에서도 되는 것**이고, 동시에 **인터넷이 끊기면 아무것도 안 되는 것**이다.

### 3-3. 삽질 — API 키를 코드에 박으면 안 되는 이유

3-1과 3-2를 나란히 보면 이상한 점이 보인다.

```python
# v16_02_deepseek.py
api_key=os.environ["HF_TOKEN"],   # 환경 변수에서 읽음 ✅

# v16_03_tti.py
api_key="hf_rEUq...",             # 코드에 그대로 박음 ❌
```

**같은 날 만든 두 파일인데 한쪽만 고쳐놨다.** 그리고 이걸 그대로 깃에 커밋해버렸다. 나중에 커밋 내역을 다시 보다가 알았다.

이게 왜 문제냐면:

1. **깃 커밋은 지워도 기록이 남는다.** 파일에서 키를 지우고 다시 커밋해도, 이전 커밋을 열면 키가 그대로 있다.
2. **공개 저장소면 즉시 노출된다.** 실제로 깃허브에서 API 키를 자동으로 긁어가는 봇들이 돌아다닌다.
3. **블로그에 코드를 올릴 때도 똑같다.** 그래서 이 글의 키는 전부 마스킹했다.

`os.environ["HF_TOKEN"]`은 **키를 코드가 아니라 컴퓨터 환경변수에 저장해두고 이름으로만 불러오는** 방식이다. 코드에는 `HF_TOKEN`이라는 **이름만** 남으니까 그대로 공유해도 안전하다.

> 이미 커밋해버린 키는 **재발급(revoke)** 하는 게 맞다. 지우는 것만으로는 부족하다. — 이건 내가 오늘 배운 것 중에 제일 늦게 깨달은 것이라 따로 적어둔다.

---

## 4. Transformers — 모델을 내 PC로 내려받기 (`17_transformers`)

여기서 축이 한 칸 더 움직인다. 이제 **API 키가 없다.** 모델 파일을 내 컴퓨터로 다운로드해서 내 CPU로 돌린다.

교재는 `https://hancom-nine.vercel.app/transformers.html` 의 01~05를 순서대로 따라갔다.

### 4-1. 문장 유사도 — 문장을 숫자 384개로 바꾸기

`hancom/17_transformers/v17_01_sen_en_similar.py`:

```python
# 1. 라이브러리 불러오기
from sentence_transformers import SentenceTransformer, util

# 2. 사전 학습 모델 로드
model = SentenceTransformer("all-MiniLM-L6-v2")

# 3. 비교할 두 문장 정의
# 의미상 완전히 다른 문장 예시 → 낮은 유사도 기대
# sen1 = "The cat is sleeping on the sofa"
# sen2 = "Tomorrow, I have a math exam at school"

# 어순만 다르고 의미가 같은 문장 → 높은 유사도 기대
sen1 = "He is reading a book in the library"
sen2 = "He is at the library reading a book"

# 4. 문장 → 숫자 좌표로 바꾸기 (인코딩)
emb1 = model.encode(sen1, convert_to_tensor=True)
emb2 = model.encode(sen2, convert_to_tensor=True)

# 5. 두 좌표가 얼마나 같은 방향인지 측정 (코사인 유사도)
cos_sim = util.pytorch_cos_sim(emb1, emb2)

# 6. 결과 출력
print(f"두 문장의 유사도 : {cos_sim.item():.4f}")

print(emb1.shape)
print(model.encode("Hi", convert_to_tensor=True).shape)
```

이 실습의 핵심 개념은 **임베딩(embedding)** 이다. 처음엔 말이 어려워 보였는데, 결국 이거였다.

> **문장 하나를 숫자 384개로 바꾼다. 뜻이 비슷한 문장은 숫자 묶음도 비슷해진다.**

- **`model.encode(sen1, convert_to_tensor=True)`** — 문장을 숫자 묶음으로 바꾼다. `convert_to_tensor=True`는 결과를 파이토치가 다루는 숫자 상자(Tensor)로 받겠다는 뜻이다.
- **`util.pytorch_cos_sim(emb1, emb2)`** — 두 숫자 묶음을 **화살표 두 개**로 보고 **사이 각도**만 잰다. 각도가 0도면 1(같은 뜻), 90도면 0(무관), 180도면 -1(반대). 길이는 무시하기 때문에 **문장 길이가 달라도 비교가 된다.**
- **`.item()`** — 결과가 `tensor([[0.9723]])` 같은 상자 안에 들어 있어서, `.item()`으로 순수한 숫자를 꺼낸다. 이걸 안 하면 `:.4f` 포맷이 안 먹는다.

실제로 두 케이스를 다 돌려봤다.

![](https://velog.velcdn.com/images/developjkj/post/ffd0446b-5ce1-4208-a6bd-852c983698f8/image.png)

- **의미가 완전히 다른 문장** (고양이가 소파에서 잔다 / 내일 수학 시험이 있다) → **0.0208**
- **어순만 다르고 뜻은 같은 문장** (그는 도서관에서 책을 읽는다 / 그는 도서관에 있고 책을 읽는다) → **0.9723**

두 번째가 인상적이었다. 단어 순서가 바뀌었는데도 0.97이 나온다. **글자를 비교하는 게 아니라 뜻을 비교한다**는 걸 숫자로 확인한 순간이었다.

마지막 두 줄의 `print(...shape)`도 은근히 중요했다.

```
torch.Size([384])
torch.Size([384])
```

긴 문장이든 `"Hi"` 두 글자든 **똑같이 384개**가 나온다. 문장 길이와 상관없이 항상 같은 크기의 숫자 묶음이 나오기 때문에 서로 비교가 가능한 것이다.

### 4-2. 감정 분석 · 텍스트 생성 — `pipeline` 한 줄 패턴

다음 두 실습은 사실상 같은 패턴이다.

`v17_02_sen_en_senti.py` (감정 분석):

```python
from transformers import pipeline

# 1. 감정 분석 파이프라인 생성
classifier = pipeline("sentiment-analysis")

# 2. 분석할 문장 입력 → 추론 실행
# text = "I'm feeling really great today"   # 긍정 문구
text = "I'm feeling really Fuckday" #부정 문구
results = classifier(text)

# 3. 결과 확인
print(f"감정 분석 결과 : {results[0]['label']}")
print(f"감정 분석 점수 : {results[0]['score']:.4f}")
```

`v17_03_sen_en_gener.py` (텍스트 생성):

```python
from transformers import pipeline

# 1. 텍스트 생성 파이프라인 생성
generator = pipeline("text-generation", model="gpt2")

# 2. 시드 문장 입력 (이어 쓸 첫 부분)
answer = input("생성 문장을 입력해주세요 : ")

# 3. 생성 실행 → 토큰 단위로 max_new_tokens만큼 예측
result = generator(
    answer,
    max_new_tokens=50,       # 추가 생성할 토큰 수 → 길수록 추론 시간 ↑
    num_return_sequences=1,  # 반환 문장 개수 → 2 이상이면 후보 비교 가능
    truncation=True          # 입력이 모델 최대 길이 초과 시 자르기
)

# 4. 결과 출력
print(result[0]["generated_text"])
```

**패턴이 보인다.**

```python
도구 = pipeline("태스크이름")     # ① 태스크 이름만 말하면
결과 = 도구(입력)                 # ② 넣고
print(결과[0][...])              # ③ 꺼낸다
```

어제 YOLO `solutions`에서 "객체 이름만 바꾸면 기능이 바뀐다"고 정리했는데, **`pipeline`도 똑같은 구조**다. `"sentiment-analysis"` 자리에 `"text-generation"`, `"ner"`, `"zero-shot-classification"` 같은 이름을 넣으면 기능이 통째로 바뀐다. 모델 다운로드·토크나이저 연결·후처리를 전부 알아서 해준다.

`pipeline("sentiment-analysis")`는 **모델 이름도 안 적었는데** 돌아간다. 실행하면 이런 안내가 뜬다.

![](https://velog.velcdn.com/images/developjkj/post/ce04a520-7dbe-4710-8576-75d1a8a8eac1/image.png)

`distilbert-base-uncased-finetuned-sst-2-english`를 알아서 골라준 것이다. 태스크마다 **HuggingFace가 검증해둔 기본 모델**이 있다.

GPT-2 생성 결과도 재밌었다.

![](https://velog.velcdn.com/images/developjkj/post/1a046764-de5f-4e84-8aa0-37dbd6b96447/image.png)

- **`max_new_tokens=50`** — 이걸 안 정하면 계속 생성한다. **길이 제한은 사실상 필수**다.
- 결과가 씨앗 문장 + 이어 쓴 문장 형태로 **통째로** 나온다. 뒷부분만 따로 주지 않는다.
- 내용은 그럴듯한데 **사실인지는 보장 안 된다.** GPT-2는 "다음에 올 법한 단어"를 고르는 모델이지 사실을 아는 모델이 아니다.

### 4-3. 삽질 — 요약은 `pipeline`이 아예 안 먹혔다

교재 04번 "영문 요약"에서 막혔다. 교재대로 이렇게 썼는데:

```python
summarizer = pipeline("summarization", model="t5-small")
```

에러가 났다. 처음엔 모델 이름을 잘못 썼거나 설치가 덜 된 줄 알았다. 글 쓰면서 다시 재현해봤더니 원인이 정확히 나왔다.

![](https://velog.velcdn.com/images/developjkj/post/88afa667-4caf-4081-827e-de31e8c8a492/image.png)

```
KeyError: "Unknown task summarization, available tasks are
['any-to-any', 'audio-classification', ..., 'sentiment-analysis',
 'text-classification', 'text-generation', ...]"
```

목록을 보면 **`sentiment-analysis`도 있고 `text-generation`도 있는데 `summarization`만 없다.** 내 `nlp` 환경의 `transformers` 버전을 확인해보니 **5.14.1**, 즉 **v5**였다. 교재나 인터넷 예제들은 대부분 v4 기준이고, **v5로 올라오면서 `summarization` 태스크가 pipeline에서 빠진 것**이다.

그래서 `pipeline`을 포기하고 **모델과 토크나이저를 직접 불러오는 방식**으로 우회했다. `v17_04_sen_en_sum.py`:

```python
from transformers import pipeline   # transformers에서 pipline 은 지원안함
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM


# 1. 요약 파이프라인 생성
# summarizer = pipeline("summarization", model="t5-small")  # 약 240MB 경량 버전
tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")


# 2. 요약할 원문 (영어 단락)
text = """A special 25th anniversary edition of the extraordinary
international bestseller... Santiago's journey teaches us about
the essential wisdom of listening to our hearts..."""

input_text = "summarize: " + text

# 3. 요약 실행 (길이 옵션 지정)
inputs = tokenizer(input_text, return_tensors="pt", truncation=True)  # 글자 → 토큰 ID(숫자)
summary_ids = model.generate(
    **inputs,        # 위에서 만든 토큰 ID를 모델에 그대로 전달
    min_length=20,   # 최소 토큰 수 → 너무 짧은 요약 방지
    max_length=60,   # 최대 토큰 수 → 길이 폭주 방지
    do_sample=False  # 결정적(greedy) 생성 → 매번 동일 결과
)

# 4. 결과 텍스트 추출 → 출력
sum_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)  # 토큰 ID → 글자 되돌리기
print(f"요약된 문장 : {sum_text}")
```

`pipeline`이 대신 해주던 걸 **손으로 하나씩** 하는 코드다. 오히려 이 덕분에 안이 보였다.

- **`AutoTokenizer`** — 글자를 **토큰 ID(숫자)** 로 바꾸는 도구. 모델은 글자를 못 읽고 숫자만 읽는다.
- **`AutoModelForSeq2SeqLM`** — "문장을 넣으면 문장이 나오는" 종류의 모델을 불러오는 클래스. Seq2Seq = 시퀀스(입력 문장) → 시퀀스(출력 문장).
- **`input_text = "summarize: " + text`** — T5는 **"무슨 작업인지를 문장 앞에 적어주는"** 방식으로 학습됐다. `"summarize: "`를 빼면 요약을 안 한다. `pipeline`이 원래 이걸 자동으로 붙여주고 있었다.
- **`return_tensors="pt"`** — 결과를 파이토치(PyTorch) 텐서로 달라는 뜻. `"pt"`가 PyTorch다.
- **`**inputs`** — `inputs`는 `{"input_ids": ..., "attention_mask": ...}` 형태의 사전인데, `**`를 붙이면 그걸 **펼쳐서 각각의 인자로 넣어준다.**
- **`do_sample=False`** — 매번 같은 결과가 나오게 한다(그리디). `True`면 확률적으로 골라서 실행할 때마다 결과가 달라진다.
- **`tokenizer.decode(..., skip_special_tokens=True)`** — 나온 숫자를 다시 글자로 되돌린다. `skip_special_tokens=True`는 `<pad>`, `</s>` 같은 내부용 표시를 빼달라는 뜻이다.

**교재대로 안 될 때 에러 메시지를 끝까지 읽는 게 답이었다.** `available tasks are [...]` 목록이 이미 정답을 알려주고 있었는데, 처음엔 에러가 길어서 대충 넘겼다.

### 4-4. 삽질 — 한국어를 요청했는데 독일어가 나왔다

요약까진 됐는데 결과가 영어라서 한국어로 바꾸고 싶었다. T5는 앞에 작업 이름을 붙이면 번역도 된다길래(`"summarize: "` 처럼) 같은 방식으로 한국어 번역을 시켜봤다. 그런데 **독일어가 나왔다.**

찾아보니 이유가 명확했다. **`t5-small`은 영어→독일어/프랑스어/루마니아어만 학습됐다.** 한국어는 배운 적이 없다. 그래서 "모르는 언어"를 요청하니 가장 많이 학습한 독일어로 새어나간 것이다.

해결은 **모델이 아니라 번역 서비스를 쓰는 것**이었다. `v17_05_sen_en_sum_trans.py`:

```python
from deep_translator import GoogleTranslator   # 구글 번역 API 래퍼 → 모델 다운로드 불필요

# ... (위 v17_04와 요약 부분 동일) ...

print(f"요약된 문장 : {sum_text}")

# (왜) t5-small은 영→독/불/루마니아만 학습 → 한국어 불가(독일어로 새어나감)
#      deep-translator는 구글 번역을 호출 → 별도 모델 없이 한국어 지원
def trans_sum(trans_text) :
    trans_result_text = GoogleTranslator(
        source="en",   # 원문 언어 → "auto"로 두면 자동 감지
        target="ko"    # 목표 언어 → 한국어
    ).translate(trans_text)

    return trans_result_text

print(f"번역 및 요약 문장 : {trans_sum(sum_text)}")
```

- **`GoogleTranslator(source="en", target="ko")`** — 구글 번역을 파이썬에서 쓰기 쉽게 감싼 라이브러리다. **모델을 다운로드하지 않는다.** 인터넷으로 구글에 요청을 보낸다.
- **`source="auto"`** 로 두면 원문 언어를 자동으로 알아낸다.

실행 결과다.

![](https://velog.velcdn.com/images/developjkj/post/a0e68632-8a92-413f-acc2-46abd28e3c64/image.png)

여기서 재밌는 건 **한 스크립트 안에 오늘의 축 두 개가 섞여 있다**는 점이다.

- `t5-small` 요약 → **내 PC에서** 실행 (다운로드한 모델)
- `GoogleTranslator` 번역 → **구글 서버에서** 실행 (원격 호출)

"모델을 내려받아 쓴다 / 남의 서버에 맡긴다"는 **둘 중 하나를 고르는 게 아니라 필요에 따라 섞는 것**이라는 걸 이 파일에서 알았다. 한국어 번역 모델을 직접 받아서 돌릴 수도 있었지만, 그러면 또 몇백 MB를 받아야 한다. 요약 하나 번역하자고 그럴 필요는 없었다.

---

## 5. OCR — 내 PC에 설치한 프로그램 부르기 (`18_ocr`)

축의 마지막 칸이다. 여기선 **파이썬 라이브러리조차 아니다.** 구글이 만든 **Tesseract라는 프로그램을 윈도우에 설치**하고, 파이썬은 그걸 대신 실행해주는 역할만 한다.

교재는 `https://hancom-nine.vercel.app/ocr.html` 를 따라갔다. 설치 순서는 ① Tesseract 실행 파일(Windows용) ② `pytesseract`·`pillow` 라이브러리 ③ 경로 지정 이다.

`hancom/18_ocr/v18_01_ocr_img.py`:

```python
import pytesseract
from PIL import Image
import os

# 1. Tesseract 실행 파일 경로 지정
pytesseract.pytesseract.tesseract_cmd = "C:/Program Files/Tesseract-OCR/tesseract.exe"

# 2. 이미지 불러오기
BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # 이 .py 파일이 있는 폴더
image = Image.open(os.path.join(BASE_DIR, "image.png"))

# 3. OCR 수행
results = pytesseract.image_to_string(
    image,
    lang='eng'
)

# 4. 결과 출력
print(results)
```

- **`tesseract_cmd = "C:/Program Files/..."`** — 이 줄이 이 실습의 정체를 그대로 보여준다. **`.exe` 파일 경로를 알려주고 있다.** `pytesseract`는 AI 모델이 아니라 **그 exe를 대신 실행해주는 껍데기**다. 그래서 이 경로가 틀리면 아무것도 안 된다.
- **`Image.open(...)`** — Pillow(PIL)로 이미지를 연다.
- **`pytesseract.image_to_string(image, lang='eng')`** — 이미지에서 글자를 뽑아 문자열로 돌려준다. 실제 동작은 "이미지를 임시 파일로 저장 → tesseract.exe 실행 → 출력 읽기"다.

### 5-1. 삽질 — 상대경로로는 이미지를 못 찾는다

처음엔 그냥 이렇게 썼다.

```python
image = Image.open("image.png")
```

VS Code에서 F5로 실행하니 **파일을 못 찾는다**고 났다. 분명 같은 폴더에 `image.png`가 있는데.

이유는 **상대경로의 기준이 "파일 위치"가 아니라 "실행 시점의 작업 폴더(CWD)"** 이기 때문이다. VS Code에서 F5를 누르면 작업 폴더가 **워크스페이스 최상단**이 되어버린다. 그래서 파이썬은 `Hancom/image.png`를 찾고, 없으니 에러가 난다.

해결은 두 줄이었다.

```python
BASE_DIR = os.path.dirname(os.path.abspath(__file__))   # 이 .py 파일이 있는 폴더
image = Image.open(os.path.join(BASE_DIR, "image.png"))
```

- **`__file__`** — 지금 실행 중인 `.py` 파일의 경로가 담긴 파이썬 기본 변수다.
- **`os.path.abspath(__file__)`** — 그걸 전체 경로로 바꾼다. (`.../18_ocr/v18_01_ocr_img.py`)
- **`os.path.dirname(...)`** — 파일명을 떼고 **폴더만** 남긴다. (`.../18_ocr`)
- **`os.path.join(BASE_DIR, "image.png")`** — 그 폴더에 파일명을 붙인다. `/`를 직접 쓰지 않고 `join`을 쓰면 윈도우/맥 어디서든 알아서 맞춰준다.

이렇게 하면 **어디서 실행하든 항상 그 `.py` 파일 옆의 이미지**를 가리킨다.

돌이켜보면 3-2에서 `tti_result.jpg`가 프로젝트 최상단에 생긴 것도 **완전히 같은 문제**였다. 그땐 저장이라 에러가 안 나서 그냥 넘어갔던 것뿐이다.

### 5-2. `lang` 옵션 — 한 언어를 살리면 다른 언어가 죽는다

`v18_02_orc_img.py`는 `v18_01`과 **딱 한 글자가 다르다.**

```python
# 이미지에서 한글 추출
...
results = pytesseract.image_to_string(
    image,
    lang='kor'      # ← 'eng' 에서 'kor' 로
)
```

오늘 마지막 커밋(`OCR 을 통해 이미지에서 한글 추출`)이 정확히 이 **한 줄 변경**이었다. 대신 한글 언어팩(`kor.traineddata`)이 설치돼 있어야 한다. 내 환경엔 161개 언어가 깔려 있었다.

문제는 **내가 쓴 테스트 이미지**였다.

![](https://velog.velcdn.com/images/developjkj/post/07fcf6c0-8ffa-48c9-b54e-71ff410ecd99/image.jpg)

여행 책·잡지를 쌓아둔 사진인데, **한글·영어·러시아어가 다 섞여 있다.** 그래서 결과가 극적으로 갈렸다.

![](https://velog.velcdn.com/images/developjkj/post/0c623991-3956-4f42-99c0-8d9e5b851bc3/image.png)

- **`lang='eng'`** → 영어 줄은 거의 완벽하다. `DIRECTIONS -THE MAGAZINE by DESIGN HOTELS™ Nezo Issue 2014`, `JULY 2012 EASTER ISLAND • EPIC STORMS • VANISHING LANGUAGES`. 그런데 한글은 `ENJOY od 8H 24 a4 lobe` 로 완전히 박살난다.
- **`lang='kor'`** → 반대다. `여행회회`, `507 '여태거 21 오이` 처럼 한글이 잡히기 시작하는데, 영어가 `016ㄷ11045 - 715 21^^21페트` 같은 숫자 뭉치가 된다.

처음엔 "OCR 성능이 별로네" 하고 넘어갈 뻔했다. 그런데 **결과가 랜덤하게 나쁜 게 아니라 규칙적으로 나빴다.** 지정한 언어만 살고 나머지가 죽는다. 그제서야 `lang`이 뭘 하는 옵션인지 이해했다.

> `lang`은 **"이 이미지에 뭐가 적혀 있는지 알려주는 힌트"** 가 아니라, **"이 언어의 글자 모양만 후보로 놓고 맞춰봐"** 라는 지시다.

그래서 `lang='kor'`로 영어 글자를 만나면, Tesseract는 "이건 영어네" 하고 넘어가는 게 아니라 **한글 후보 중에서 억지로 제일 비슷한 걸 고른다.** 그 결과가 `016ㄷ11045` 같은 것이다.

교재 3단계에 답이 있었다 — **`+`로 여러 언어를 동시에 지정할 수 있다.** 시험해봤다.

```python
results = pytesseract.image_to_string(image, lang='kor+eng')
```

위 이미지 세 번째 칸이 그 결과다. **영어 정확도는 `eng`일 때 수준으로 유지되면서 한글도 `ENJOY 04 여태 거시아어`까지 살아났다.** 여전히 완벽하진 않지만(`여행 러시아어`가 정답) 둘 중 하나를 포기하는 상황은 벗어났다.

남은 오차의 원인도 대충 짐작이 간다 — 책등에 인쇄된 글자라 **각도가 비스듬하고, 배경색이 제각각이고, 글자가 작다.** OCR은 스캔한 문서처럼 **평평하고 대비가 뚜렷한** 이미지에서 잘 된다. 애초에 난이도 높은 사진을 고른 셈이었다.

---

## 6. 가상환경을 하루에 세 개나 판 이유

오늘 노트를 보면 새 가상환경을 계속 만들었다.

```bash
conda create -n nlp python=3.10     # Transformers 실습용
conda create -n ocrpy python=3.8    # OCR 실습용
```

기존에 쓰던 `py39`(파이썬 3.9)까지 하면 **하루에 세 환경**을 오간 것이다. 처음엔 "그냥 하나에 다 깔면 안 되나" 싶었다.

| 환경 | 파이썬 | 용도 | 주요 패키지 |
|---|---|---|---|
| `py39` | 3.9 | OpenAPI + YOLO | `pandas`, `ultralytics`, `opencv` |
| `nlp` | 3.10 | Transformers | `sentence-transformers`, `transformers`, `torch` |
| `ocrpy` | 3.8 | OCR | `pytesseract`, `pillow` |

이유는 **패키지마다 요구하는 파이썬 버전이 다르고, 서로 물고 늘어지기 때문**이다. 한 환경에 다 설치하면 A를 깔 때 pip가 B가 쓰던 라이브러리를 다른 버전으로 덮어써서 B가 깨진다. 실제로 오늘 확인해보니 `nlp` 환경엔 `torch 2.13.0+cpu`가 들어와 있었다. 이건 용량도 크고 버전도 예민한 패키지다. OCR 실습에 이런 게 딸려올 이유가 전혀 없다.

**환경을 나누는 건 귀찮은 게 아니라 서로 망가뜨리지 않게 벽을 세우는 것**이었다. 대신 실행할 때 어느 환경인지 꼭 확인해야 한다 — 오늘도 `(nlp)`인 줄 알고 `(base)`에서 돌려서 `ModuleNotFoundError`를 몇 번 봤다.

---

## 7. 마무리 — 오늘 얻은 재사용 패턴

처음에 "오늘은 API 호출만 해봐서 쓸 게 없다"고 생각했는데, 정리하고 나니 다음에 미니 프로젝트를 만들 때 바로 꺼내 쓸 만한 게 몇 개 남았다.

**① 새 기능이 필요하면 먼저 "어디서 돌릴지"부터 정한다.**
GPU 없는 노트북 + 가끔 쓰는 무거운 기능이면 → HuggingFace API. 자주 쓰고 인터넷을 못 믿는 상황이면 → 모델 다운로드. 글자 인식처럼 딱 떨어지는 작업이면 → Tesseract 같은 전용 프로그램. **하나만 고를 필요도 없다** — 4-4처럼 섞어도 된다.

**② `pipeline("태스크명")` 패턴 하나면 NLP 대부분이 열린다.**
단, 내 `transformers` 버전에서 그 태스크가 지원되는지부터 확인할 것. 안 되면 `AutoTokenizer` + `AutoModelFor...`로 내려가면 된다.

**③ `return` 붙인 함수 하나가 프로젝트를 연결한다.**
`its_cctv()`처럼 값을 돌려주는 함수로 만들어두면, 다른 파일에서 `import` 한 줄로 가져다 쓸 수 있다. 오늘 CCTV + YOLO 조합이 그렇게 만들어졌다.

**④ 파일 경로는 처음부터 `__file__` 기준으로 잡는다.**
`os.path.dirname(os.path.abspath(__file__))`. 이 한 줄이면 실행 위치 때문에 겪는 문제가 사라진다. 읽기든 저장이든 똑같이 적용된다.

**⑤ API 키는 처음 쓸 때부터 `os.environ`으로 넣는다.**
"나중에 고쳐야지" 하면 오늘의 나처럼 그대로 커밋한다.

---

다음엔 오늘 조각조각 써본 것들을 하나로 묶어보고 싶다. 교재 미니 프로젝트에 **영수증 OCR 정리기**가 있던데, 오늘 배운 걸 그대로 쓰면 될 것 같다 — 이미지에서 OCR로 글자를 뽑고(18), 그 텍스트를 요약·분류하고(17), 결과를 표로 정리하는(15의 `pandas`) 흐름이다.

기능 하나하나는 오늘 다 해본 것들인데, **이어붙이는 게 진짜 실력**이라는 걸 CCTV + YOLO에서 조금 맛봤다.
