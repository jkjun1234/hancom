# 웹 개발 12일차 (4) — GitHub와 Vercel 자동 배포 연동하기

> 앞 글에서 `vercel --prod`로 배포하는 법을 배웠는데, 코드 고칠 때마다 터미널에서 그걸 매번 치는 게 좀 번거로웠다.
> 오늘은 **GitHub 저장소랑 Vercel을 한 번 연결해두면, 그 다음부터는 `git push`만 하면 알아서 배포되는** 자동화를 배웠다. 심지어 마지막엔 Claude한테 "푸시해줘" 한마디만 하면 커밋·푸시·배포가 전부 자동으로 되는 것까지 봤는데, 이건 좀 신기했다.

---

## 0. 오늘의 요약

- **왜 연동하나**: `vercel --prod`를 매번 손으로 치는 대신, GitHub에 `git push`만 하면 Vercel이 알아서 감지해 배포하게 만드는 것.
- **순서**: ① GitHub 저장소 생성 → ② Vercel 대시보드에서 그 저장소 연결 → ③ 이제부터 push하면 자동 배포.
- **연결 위치**: Vercel 프로젝트의 **Settings → Git → Connect Git Repository**.
- **Claude 연동**: AI에게 "코드 고치고 푸시해줘"라고 하면 Claude가 커밋·푸시까지 자동으로 하고, 그러면 Vercel이 바로 배포한다.

---

## 1. 왜 굳이 GitHub와 연동할까?

앞 글에서 배운 CLI 배포는 이런 흐름이었다.

```
코드 수정 → 터미널에서 vercel --prod → 배포 완료
```

한두 번은 괜찮은데, 코드를 자주 고치면 매번 터미널로 돌아가 `vercel --prod`를 치는 게 은근 귀찮다. 그래서 실무에서는 이렇게 한다.

```
코드 수정 → git push → (Vercel이 자동 감지) → 자동 배포
```

**GitHub 저장소와 Vercel을 한 번만 연결해두면**, 그 저장소에 push가 들어올 때마다 Vercel이 그걸 감지해서 자동으로 새로 배포해준다. 배포를 따로 신경 쓸 필요가 없어지는 것이다.

---

## 2. ① GitHub 저장소 생성

먼저 GitHub에서 이 프로젝트를 담을 저장소(repository)를 만든다. 나는 `first-vercel`이라는 이름으로 만들었다.

🖼️ **이미지 자리** — GitHub에서 `first-vercel` 저장소를 생성하는 화면 (직접 캡처해서 넣기)

그리고 로컬 프로젝트를 이 저장소에 올린다. (git 기본 흐름)

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/내계정/first-vercel.git
git push -u origin main
```

이제 GitHub에 내 코드가 올라간 상태가 됐다.

---

## 3. ② Vercel 대시보드에서 Git 연동

여기가 오늘의 핵심이다. **이미 Vercel에 배포 중인 프로젝트**(앞 글에서 CLI로 올린 것)를, 방금 만든 GitHub 저장소랑 연결한다.

Vercel 사이트에 로그인해서:

1. 연동할 **프로젝트를 선택**한다.
2. **Settings(설정) → Git** 메뉴로 들어간다.
3. **Connect Git Repository**를 눌러서, 연결하고 싶은 GitHub 저장소(`first-vercel`)를 고른다.

🖼️ **이미지 자리** — Vercel 프로젝트의 Settings → Git 화면에서 저장소를 연결하는 모습 (직접 캡처해서 넣기)

이 과정에서 "Vercel이 내 GitHub에 접근해도 되냐"는 권한 승인을 한 번 해준다. 이걸 해줘야 Vercel이 그 저장소의 push를 감지할 수 있다.

---

## 4. ③ 자동 배포 테스트

연결이 끝났으면, 이제 진짜 자동 배포가 되는지 확인해본다.

```bash
# 로컬에서 코드를 조금 수정한 뒤
git add .
git commit -m "테스트 수정"
git push
```

`git push`가 끝나면, **내가 배포 명령을 안 쳤는데도** Vercel 대시보드에서 새 빌드가 자동으로 돌기 시작한다. 잠시 뒤 배포가 완료되고, 기존 URL에 수정된 내용이 반영된다.

🖼️ **이미지 자리** — git push 후 Vercel 대시보드에서 배포(Deployment)가 자동으로 진행되는 화면 (직접 캡처해서 넣기)

이걸 보고 나서 "아, 이래서 다들 GitHub 연동을 쓰는구나" 싶었다. 배포를 아예 신경 안 써도 되니까.

---

## 5. ④ Claude와 연동해서 완전 자동화

교재의 마지막 단계가 제일 인상적이었다. AI(Claude Code)한테 코드 수정을 시키고 **"푸시해줘"라고만 하면**, Claude가 알아서:

1. 바뀐 파일을 `git add`
2. 커밋 메시지를 만들어 `git commit`
3. `git push`

까지 다 해준다. 그러면 3번 push 때문에 방금 만든 GitHub↔Vercel 연동이 발동해서 **Vercel이 자동으로 배포**한다.

정리하면 이런 흐름이 된다.

```
나: "이거 고치고 푸시해줘"
  ↓
Claude: 코드 수정 → git add → commit → push
  ↓
GitHub: push 감지
  ↓
Vercel: 자동 배포 → 사이트 갱신
```

내가 한 건 말 한마디인데 코드 수정부터 실제 서비스 반영까지 전부 자동으로 이어진다. 처음 봤을 때 좀 신기했다 ㅎㅎ.

---

## 6. 마무리 & 다음 글

오늘은 GitHub와 Vercel을 연동해서 **`git push` = 자동 배포** 파이프라인을 만들어봤다. 배포를 손으로 하던 걸 완전히 자동화한 셈이다.

이렇게 "배포"라는 걸 익히고 나니, 다음엔 **애초에 웹사이트를 만드는 것 자체를 AI한테 시키는** 쪽으로 넘어갔다. 다음 글에서는 Claude Code로 자연어 지시만으로 계산기 웹사이트를 만들고, 디자인까지 입히는 과정을 정리한다.

➡️ 다음 글: **12일차 (5) — Claude Code로 웹사이트 만들기 (기본부터 디자인까지)**
