// 우리 반 배치도 만들기 CRUD 최종 과제

const express = require('express')
const app = express()

// 정상명단
const correctNames = ['강성원', '강하영', '김정아', '김정현', '김해냄', '김효인', '박진', '안치호', '양하은', '유민성', '이도연', '이현우', '임소정', '전욱진', '정기준', '정선민', '정유진', '표후동', '한유진', '한윤지']

let finalStudents = []

// 1단계: 서버 데이터 가져오기 + CRUD
async function initializeData() {
    try {
        const res = await fetch('http://192.168.10.28:5000/hancom/정기준/users', {
            headers: { 'Authorization': 'HANCOM' }
        })
        let students = await res.json()
        console.log('서버 데이터:', students)

        // 삭제할 목록
        const toDelete = students.filter(s => !correctNames.includes(s.name))
        console.log('삭제할 것:', toDelete)

        // DELETE 요청
        for (let item of toDelete) {
            await fetch(`http://192.168.10.28:5000/hancom/정기준/users/${item.id}`, {
                method: 'DELETE',
                headers: { 'Authorization': 'HANCOM' }
            })
            console.log(`삭제 완료: ${item.name}`)
        }

        // 추가할 목록
        const serverNames = students.map(s => s.name)
        const toAdd = correctNames.filter(name => !serverNames.includes(name))
        console.log('추가할 것:', toAdd)

        // POST 요청
        const maxId = Math.max(...students.map(s => s.id))
        for (let i = 0; i < toAdd.length; i++) {
            const newId = maxId + i + 1
            await fetch('http://192.168.10.28:5000/hancom/정기준/users', {
                method: 'POST',
                headers: {
                    'Authorization': 'HANCOM',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: newId, name: toAdd[i] })
            })
            console.log(`추가 완료: ${toAdd[i]}`)
        }

        // 최종 데이터 조회
        const finalRes = await fetch('http://192.168.10.28:5000/hancom/정기준/users', {
            headers: { 'Authorization': 'HANCOM' }
        })
        finalStudents = await finalRes.json()
        console.log('최종 완료:', finalStudents)

    } catch (err) {
        console.error('에러:', err.message)
    }
}

// 2단계: 라우트 정의
app.get('/', (req, res) => {
    // 자리 개수 설정 (3칼럼 x 5줄 = 30개)
    const seatCount = 30
    const seats = new Array(seatCount).fill(null)
    finalStudents.forEach((s, idx) => {
        if (idx < seatCount) seats[idx] = s
    })

    let html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>우리 반 배치도</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
                background: #f5f5f5;
            }
            .classroom {
                max-width: 1200px;
                margin: 0 auto;
                background: white;
                padding: 30px;
                border-radius: 8px;
            }
            .tv-section {
                display: grid;
                grid-template-columns: repeat(3, 120px) 80px repeat(3, 120px);
                gap: 40px;
                justify-content: center;
                margin-bottom: 40px;
            }
            .tv {
                grid-column: 4;
                width: 80px;
                height: 80px;
                background: #222;
                border: 6px solid #333;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 24px;
            }
            h1 {
                text-align: center;
                color: #333;
                margin-top: 0;
            }
            .container {
                display: grid;
                grid-template-columns: repeat(3, 120px) 80px repeat(3, 120px);
                grid-template-rows: repeat(5, auto);
                gap: 40px;
                justify-content: center;
                padding: 30px;
                border: 2px dashed #999;
                border-radius: 8px;
                background: #fafafa;
                width: fit-content;
                margin: 0 auto;
            }
            .aisle {
                grid-column: 4;
                background: linear-gradient(180deg, #ddd 1px, transparent 1px);
                background-size: 100% 10px;
                opacity: 0.5;
            }
            .card {
                background: #FFE5B4;
                padding: 15px 10px;
                border-radius: 6px;
                box-shadow: 0 2px 6px rgba(0,0,0,0.15);
                cursor: move;
                text-align: center;
                user-select: none;
                transition: all 0.2s;
                width: 100%;
                box-sizing: border-box;
                min-height: 80px;
                display: flex;
                flex-direction: column;
                justify-content: center;
            }
            .card.empty {
                background: transparent;
                border: 2px dashed #ddd;
                cursor: default;
                box-shadow: none;
                padding: 0;
            }
            .card.empty:hover {
                background: transparent;
                box-shadow: none;
                transform: none;
            }
            .card:hover {
                box-shadow: 0 4px 10px rgba(0,0,0,0.25);
                transform: scale(1.05);
                background: #FFD700;
            }
            .card.dragging {
                opacity: 0.6;
                background: #87CEEB;
                transform: scale(1.1);
            }
            .card-id {
                font-size: 10px;
                color: #666;
                margin-bottom: 4px;
            }
            .card-name {
                font-size: 14px;
                font-weight: bold;
                color: #333;
            }
        </style>
    </head>
    <body>
        <div class="classroom">
            <div class="tv-section">
                <div class="tv">📺 TV</div>
            </div>
            <h1>우리 반 배치도 (좌석 배치)</h1>
            <div class="container" id="board">
    `

    // 자리 렌더링 (학생 또는 빈 자리)
    seats.forEach((student, index) => {
        if (student) {
            html += `
                <div class="card" draggable="true" data-seat="${index}" data-id="${student.id}">
                    <div class="card-id">ID: ${student.id}</div>
                    <div class="card-name">${student.name}</div>
                </div>
            `
        } else {
            html += `<div class="card empty" draggable="true" data-seat="${index}"></div>`
        }
    })

    html += `
            <div class="aisle" style="grid-row: 1 / -1;"></div>
            </div>
        </div>

        <script>
            let draggedSeat = null;
            const board = document.getElementById('board');
            const seatCount = ${seatCount};

            // 배치 배열 초기화 (JSON으로 임베드)
            let seating = ${JSON.stringify(seats)};

            function renderSeating() {
                board.innerHTML = '';
                seating.forEach((student, idx) => {
                    if (student) {
                        const card = document.createElement('div');
                        card.className = 'card';
                        card.draggable = true;
                        card.dataset.seat = idx;
                        card.dataset.id = student.id;
                        card.innerHTML = \`
                            <div class="card-id">ID: \${student.id}</div>
                            <div class="card-name">\${student.name}</div>
                        \`;
                        addCardEvents(card);
                        board.appendChild(card);
                    } else {
                        const empty = document.createElement('div');
                        empty.className = 'card empty';
                        empty.draggable = true;
                        empty.dataset.seat = idx;
                        addCardEvents(empty);
                        board.appendChild(empty);
                    }
                });
                board.appendChild(document.createElement('div'));
                board.lastChild.className = 'aisle';
                board.lastChild.style.gridRow = '1 / -1';
            }

            function addCardEvents(card) {
                card.addEventListener('dragstart', (e) => {
                    draggedSeat = parseInt(card.dataset.seat);
                    card.classList.add('dragging');
                });

                card.addEventListener('dragend', (e) => {
                    card.classList.remove('dragging');
                    saveSeating();
                });

                card.addEventListener('dragover', (e) => {
                    e.preventDefault();
                });

                card.addEventListener('drop', (e) => {
                    e.preventDefault();
                    const targetSeat = parseInt(card.dataset.seat);
                    if (draggedSeat !== targetSeat) {
                        // 두 자리 교환
                        [seating[draggedSeat], seating[targetSeat]] = [seating[targetSeat], seating[draggedSeat]];
                        renderSeating();
                    }
                });
            }

            function saveSeating() {
                localStorage.setItem('classroomSeating', JSON.stringify(seating));
                console.log('배치도 저장 완료');
            }

            function loadSeating() {
                const saved = localStorage.getItem('classroomSeating');
                if (saved) {
                    const parsed = JSON.parse(saved);
                    // 자리 수(형식)가 지금 레이아웃과 다르면 예전 저장분은 버림
                    if (Array.isArray(parsed) && parsed.length === seatCount) {
                        seating = parsed;
                        console.log('저장된 배치도 로드됨');
                    } else {
                        console.log('예전 형식의 저장 데이터라 무시하고 새로 불러옴');
                        localStorage.removeItem('classroomSeating');
                    }
                }
            }

            loadSeating();
            renderSeating();
        </script>
    </body>
    </html>
    `
    res.send(html)
})

// 3단계: 데이터 초기화 후 서버 시작
initializeData().then(() => {
    app.listen(3010, () => console.log('http://localhost:3010'))
})
