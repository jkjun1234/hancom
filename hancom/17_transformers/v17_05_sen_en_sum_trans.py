from transformers import pipeline   # transformers에서 pipline 은 지원안함
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
from deep_translator import GoogleTranslator   # 구글 번역 API 래퍼 → 모델 다운로드 불필요


# 1. 요약 파이프라인 생성
# (왜) T5는 "task prefix + 입력 → 출력" 형태로 학습된 다목적 모델 → pipeline이 "summarize: " 접두사 자동 부착
# summarizer = pipeline("summarization", model="t5-small")  # 약 240MB 경량 버전
tokenizer = AutoTokenizer.from_pretrained("t5-small")
model = AutoModelForSeq2SeqLM.from_pretrained("t5-small")


# 2. 요약할 원문 (영어 단락)
text = """A special 25th anniversary edition of the extraordinary
international bestseller... Santiago's journey teaches us about
the essential wisdom of listening to our hearts..."""

input_text = "summarize: " + text

# 3. 요약 실행 (길이 옵션 지정)
# (왜) 기본값은 모델마다 다름 → 명시 지정해야 결과 길이 예측 가능
inputs = tokenizer(input_text, return_tensors="pt", truncation=True)  # 글자 → 토큰 ID(숫자)
summary_ids = model.generate(
    **inputs,        # 위에서 만든 토큰 ID를 모델에 그대로 전달
    min_length=20,   # 최소 토큰 수 → 너무 짧은 요약 방지
    max_length=60,   # 최대 토큰 수 → 길이 폭주 방지
    do_sample=False  # 결정적(greedy) 생성 → 매번 동일 결과
)  # 반환: 생성된 토큰 ID 텐서 (아직 숫자 상태)

# 4. 결과 텍스트 추출 → 출력
sum_text = tokenizer.decode(summary_ids[0], skip_special_tokens=True)  # 토큰 ID → 글자 되돌리기
print(f"요약된 문장 : {sum_text}")

# 요약된 영어 문장을 한국어로 번역하여 출력
# 번역 함수 만들기
# 번역 함수 정의
    # 함수명: 자유
    # 매개 변수 : 자유

# (왜) t5-small은 영→독/불/루마니아만 학습 → 한국어 불가(독일어로 새어나감)
#      deep-translator는 구글 번역을 호출 → 별도 모델 없이 한국어 지원
def trans_sum(trans_text) :
    trans_result_text = GoogleTranslator(
        source="en",   # 원문 언어 → "auto"로 두면 자동 감지
        target="ko"    # 목표 언어 → 한국어
    ).translate(trans_text)

    return trans_result_text

print(f"번역 및 요약 문장 : {trans_sum(sum_text)}")