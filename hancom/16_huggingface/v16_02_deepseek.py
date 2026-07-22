import os
from huggingface_hub import InferenceClient

client = InferenceClient(
    # api_key="YOUR_HF_TOKEN", # API 키 직접입력
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