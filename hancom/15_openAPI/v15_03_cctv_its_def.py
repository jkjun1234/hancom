# 실행전 Pandas 설치
# 해당 프로젝트는 아나콘다 가상 환경(py39)에서 실습하므로 
# py39(conda activate py39 로 접근)에 들어가서 pandas를 설치한다
# > pip install pandas

import urllib   # URL 요청
import urllib.request   # 인터넷 주소로 자료 요청하는 도구
import json              # 글자로 된 자료를 사전(dict) 모양으로 바꾸는 도구
import pandas as pd      # 자료를 엑셀 같은 표로 다루는 도구


# 함수화
    # 함수명 : its_cctv
    # 파라미터 : 1개 => cctv_index
    # return : test_url


def its_cctv(cctv_index=77):
    # 1. 인증 키 → 정부 사이트에서 받은 "비밀 번호", 이게 있어야 자료 줌
    key = "YOUR_ITS_API_KEY"

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

    # 6. bytes → str → dict : 봉투 뜯기 (왜 두 번 변환?)
    #    (왜 디코딩?) 서버는 인터넷 전송용 bytes(0·1 묶음)로 보냄
    #                 → 사람·파이썬이 읽으려면 한글 str(글자)로 풀어야 함
    #    (왜 JSON 파싱?) str은 글자 덩어리일 뿐 → 값 꺼내려면
    #                    dict(파이썬 사전) 형태여야 ["키"]로 접근 가능
    json_str = response.read().decode("utf-8")   # bytes → str (사람 글자)
    # print(f"json_str Type : {type(json_str)}") # 타입 확인 : str 확인
    # print(f"json_str : {json_str}")

    print("----------------------------------------------------")
    json_object = json.loads(json_str)            # str → dict (사전 모양)
    # print(f"json_object Type : {type(json_object)}") # 타입 확인 : dict 으로 확인
    # print(f"json_object : {json_object}")   # 데이터 내용은 위 json_str과 동일

    # 7. 데이터프레임 변환 → 사전(dict)이 중첩되어 깊이 들어가기 번거로움
    #    → 평평한 표(DataFrame)로 펴서 한눈에 보고 행/열 인덱싱
    cctv_play = pd.json_normalize(
        json_object["response"]["data"], sep=''
    )

    # 8. 77번 CCTV URL 출력 → 표에서 77번째 줄 CCTV 영상 주소 꺼내 화면에 보여줌
    # 선택된 URL을 보면 http로 되어있는데 https로 변경해주면 정상적으로 접속이 된다.
    test_url = cctv_play["cctvurl"][cctv_index]
    print(f"선택된 CCTV URL : {test_url}")

    return test_url

