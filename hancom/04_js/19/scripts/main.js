// 1. 검색 기능
const searchInput = document.querySelector("#search");
const searchBtn = document.querySelector("#search-btn");

searchBtn.addEventListener("click", () => {
  const keyword = searchInput.value.toLowerCase();
  const items = ["Apple", "Banana", "Orange"];
  const result = items.filter(item => item.toLowerCase().includes(keyword));
  console.log("검색결과:", result);
});

// 2. 목록 추가
const addBtn = document.querySelector("#add-btn");
let list = [];

addBtn.addEventListener("click", () => {
  const name = searchInput.value;
  if (!name) return;

  list.push({
    id: Math.floor(Math.random() * 10000),
    name: name.toUpperCase(),
    created: new Date().toLocaleDateString()
  });

  console.log("추가됨:", list);
  localStorage.setItem("list", JSON.stringify(list));
  searchInput.value = "";
});

// 3. 수정/삭제
const deleteBtn = document.querySelector("#delete-btn");
deleteBtn.addEventListener("click", () => {
  if (list.length > 0) {
    const deleted = list.pop();
    console.log("삭제됨:", deleted.name);
    localStorage.setItem("list", JSON.stringify(list));
  }
});

// 4. 정렬
const sortBtn = document.querySelector("#sort-btn");
sortBtn.addEventListener("click", () => {
  list.sort((a, b) => a.name.localeCompare(b.name));
  console.log("정렬됨:", list.map(x => x.name));
});

// 5. 통계
const statsBtn = document.querySelector("#stats-btn");
statsBtn.addEventListener("click", () => {
  const stats = {
    total: list.length,
    names: list.map(x => x.name),
    lengths: list.map(x => x.name.length),
    avgLength: Math.round(
      list.map(x => x.name.length).reduce((a,b) => a+b, 0) / list.length
    )
  };
  console.log("통계:", stats);
});

// 6. 데이터 로드
const loadBtn = document.querySelector("#load-btn");
loadBtn.addEventListener("click", () => {
  const saved = localStorage.getItem("list");
  if (saved) {
    const parsed = JSON.parse(saved);
    list.push(...parsed);
    console.log("로드됨:", list);
  }
});

// 7. 데이터 내보내기
const exportBtn = document.querySelector("#export-btn");
exportBtn.addEventListener("click", () => {
  const json = JSON.stringify(list, null, 2);
  console.log(json);
});

// 8. 실시간 입력
searchInput.addEventListener("input", (e) => {
  const text = e.target.value;
  console.log("입력중:", text);
  console.log("길이:", text.length);
  console.log("대문자:", text.toUpperCase());
});

// 9. 엔터키 입력
searchInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    console.log("엔터 눌림");
    addBtn.click();
  }
});

// 10. 무작위 선택
const randomBtn = document.querySelector("#random-btn");
randomBtn.addEventListener("click", () => {
  if (list.length === 0) return;
  const idx = Math.floor(Math.random() * list.length);
  console.log("선택됨:", list[idx].name);
});