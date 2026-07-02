# stylelint로 CSS 속성 순서 자동 정렬하기 (설치부터 --fix까지)

> **한 줄 요약**: CSS 속성이 뒤죽박죽일 때, stylelint를 설치하면 속성을 알파벳 순서로 자동 정렬해 준다.

CSS를 짜다 보면 `width` 위에 `color`가 오고, `height`가 맨 아래로 가는 등 속성 순서가 제멋대로가 되기 쉽다. 이럴 때 **stylelint**라는 도구를 쓰면 규칙에 맞게 검사하고, 심지어 자동으로 고쳐준다.

## 준비물 — Node.js 설치

stylelint는 Node.js 환경에서 도는 도구라, 먼저 [Node.js 공식 사이트](https://nodejs.org/ko)에서 설치가 필요하다. 설치 후 버전이 잘 나오는지 확인한다.

```bash
node -v
npm -v
```

[이미지 : 터미널에서 node -v, npm -v로 버전이 정상 출력된 모습]

## 1단계 — 정렬 규칙 파일 만들기 (.stylelintrc.json)

실습 폴더(예: `03`)로 이동한 뒤, 규칙 파일을 만든다.

```json
{
  "extends": ["stylelint-config-standard"],
  "plugins": ["stylelint-order"],
  "rules": {
    "order/properties-alphabetical-order": true
  }
}
```

각 줄이 하는 일:

- **extends** → 기본 규칙 묶음 가져오기 (`stylelint-config-standard` = 표준 권장 규칙 세트)
- **plugins** → 추가 기능 `stylelint-order`(순서 검사) 끼우기
- **rules** → 켤 규칙 지정. `order/properties-alphabetical-order: true` = 속성을 알파벳순으로 자동 정렬

> ⚠️ **주의**: 실제 `.stylelintrc.json`은 JSON이라 주석(`//`, `/* */`)을 넣으면 문법이 깨진다. 위 설명은 이해용이고, 파일에는 주석을 넣지 말 것!

## 2단계 — 설치하기 (한 번만)

프로젝트 폴더에서 아래 세 개를 개발용(`-D`)으로 설치한다.

```bash
npm install -D stylelint stylelint-config-standard stylelint-order
```

## 3단계 — 검사하기

정렬이 어긋난 예시 CSS를 보자. 아래는 속성이 알파벳순이 아니다.

```css
/* 속성이 뒤죽박죽 — 아래 순서로 적혀 있음 */
.box {
  width: 120px;
  color: white;
  background: hotpink;
  height: 120px;
  border-radius: 16px;
}
```

검사를 실행하면 틀린 곳을 짚어준다.

```bash
npx stylelint "styles/main.css"
```

[이미지 : stylelint 실행 후 정렬 오류(expected order)가 표시된 터미널]

## 4단계 — 자동 수정하기 (--fix)

`--fix`를 붙이면 정렬·간단한 오류를 알아서 고쳐준다.

```bash
npx stylelint "styles/main.css" --fix
```

실행 후에는 속성이 알파벳순(`background → border-radius → color → height → width`)으로 재정렬된다.

[이미지 : --fix 실행 후 알파벳 순으로 정렬된 main.css]

## 짚고 넘어갈 점

- `-D`(`--save-dev`)는 "개발할 때만 쓰는 도구"라는 뜻이다. 실제 웹페이지 동작에는 필요 없다.
- `.stylelintrc.json`은 JSON이라 **주석 금지**. 설명은 따로 메모로 남기자.
- 설치는 프로젝트당 한 번, 검사·수정은 필요할 때마다 반복하면 된다.

## 오늘의 한 줄 정리

stylelint + stylelint-order를 설정하면, 손으로 정렬하지 않아도 `--fix` 한 번으로 CSS 속성 순서가 깔끔하게 정리된다.
