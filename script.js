// 1. 문제 데이터 (문제, 보기, 정답, 설명)
const questions = [
    {
        q: "다음 중 여러 셀의 합계를 구하는 가장 기본적인 함수는 무엇인가요?",
        options: ["AVERAGE", "COUNT", "MAX", "SUM", "IF", "모름"],
        answer: 3, // SUM (0부터 시작)
        info: "SUM 함수는 지정한 셀 범위의 모든 수의 합계를 구하는 가장 기초적인 함수입니다."
    },
    {
        q: "수식을 다른 셀로 복사할 때, 참조하는 셀 주소가 변하지 않도록<br/>'절대 참조'를 적용하기 위해 사용하는 기호는?",
        options: ["@", "#", "$", "%", "&", "모름"],
        answer: 2, // $
        info: "'$' 기호는 수식을 복사할 때 열(Column)이나 행(Row) 주소를 고정하여 변하지 않게 하는 절대 참조 기호입니다."
    },
    {
        q: "만약 점수가 80점 이상이면 '합격', 아니면 '불합격'으로 표시하라'는<br/> 조건을 구현할 때 사용하는 함수는?",
        options: ["AND", "OR", "IF", "VLOOKUP", "CHOOSE", "모름"],
        answer: 2, // IF
        info: "IF 함수는 주어진 조건이 참(True)인지 거짓(False)인지에 따라 다른 값을 결과로 돌려줍니다."
    },
    {
        q: "기준값을 가지고 다른 표나 범위에서 관련된 데이터를 찾아올 때<br/> 실무에서 가장 많이 사용하는 함수는?",
        options: ["FIND", "SEARCH", "MATCH", "INDEX", "VLOOKUP", "모름"],
        answer: 4, // VLOOKUP
        info: "VLOOKUP 함수는 표의 가장 왼쪽 열에서 특정 값을 찾아, 그 행에 있는 다른 열의 데이터를 가져오는 실무 핵심 함수입니다."
    },
    {
        q: "여러 셀에 입력된 텍스트 양 끝의 불필요한 띄어쓰기(공백)를<br/> 한 번에 제거해 주는 함수는 무엇인가요?",
        options: ["TRIM", "CLEAN", "LEFT", "MID", "SUBSTITUTE", "모름"],
        answer: 0, // TRIM
        info: "TRIM 함수는 텍스트의 양 끝 공백과 단어 사이의 불필요한 공백을 하나만 남기고 모두 제거합니다."
    },
    {
        q: "방대한 양의 데이터를 빠르고 쉽게 요약, 분석, 필터링<br/>할 수 있도록 도와주는 엑셀의 핵심 기능은?",
        options: ["조건부 서식", "데이터 유효성 검사", "피벗 테이블", "매크로", "목표값 찾기", "모름"],
        answer: 2, // 피벗 테이블
        info: "피벗 테이블은 대량의 데이터를 클릭 몇 번으로 요약, 집계, 분석할 수 있는 엑셀 최고의 도구입니다."
    },
    {
        q: "실무에서 데이터에 필터(Filter)를 빠르게 적용하거나 해제할 때<br/> 사용하는 단축키는 무엇인가요?",
        options: ["Ctrl + C", "Ctrl + Shift + L", "Ctrl + F", "Alt + F11", "Ctrl + 1", "모름"],
        answer: 1, // Ctrl + Shift + L
        info: "Ctrl+Shift+L은 데이터 범위 내에서 빠르게 자동 필터를 적용하거나 해제할 수 있는 유용한 단축키입니다."
    }
];

// 2. 상태 변수
let currentIdx = 0;
let userAnswers = new Array(questions.length).fill(null);

// 3. DOM 요소 선택
const introSection = document.getElementById('intro-section');
const quizSection = document.getElementById('quiz-section');
const resultSection = document.getElementById('result-section');
const reviewSection = document.getElementById('review-section');

const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressBar = document.getElementById('progress-bar');
const progressText = document.getElementById('progress-text');

const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

// 4. 기능 구현
function startQuiz() {
    introSection.style.display = 'none';
    quizSection.style.display = 'block';
    renderQuestion();
}

function renderQuestion() {
    const currentQ = questions[currentIdx];
    questionText.innerHTML = `Q${currentIdx + 1}. ${currentQ.q}`;
    
    // 보기 생성
    optionsContainer.innerHTML = '';
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.classList.add('option-btn');
        if (userAnswers[currentIdx] === index) btn.classList.add('selected');
        btn.textContent = `${index + 1}. ${opt}`;
        btn.onclick = () => selectOption(index);
        optionsContainer.appendChild(btn);
    });

    // 버튼 제어
    prevBtn.disabled = currentIdx === 0;
    nextBtn.textContent = currentIdx === questions.length - 1 ? "결과 보기" : "다음";
    nextBtn.disabled = userAnswers[currentIdx] === null;

    // 프로그레스 바
    const progressPercent = ((currentIdx + 1) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    progressText.textContent = `${currentIdx + 1} / ${questions.length}`;
}

function selectOption(index) {
    userAnswers[currentIdx] = index;
    renderQuestion(); 
}

function goNext() {
    if (currentIdx < questions.length - 1) {
        currentIdx++;
        renderQuestion();
    } else {
        showResult();
    }
}

function goPrev() {
    if (currentIdx > 0) {
        currentIdx--;
        renderQuestion();
    }
}

function showResult() {
    quizSection.style.display = 'none';
    resultSection.style.display = 'block';

    let score = 0;
    userAnswers.forEach((ans, idx) => {
        if (ans === questions[idx].answer) score++;
    });

    document.getElementById('result-score').textContent = `총 ${questions.length}문제 중 ${score}문제 정답!`;
    
    // 레벨 판정
    const levelTitle = document.getElementById('level-title');
    const levelDesc = document.getElementById('level-desc');

    if (score <= 2) {
        levelTitle.textContent = "엑셀 새싹 🌱";
        levelDesc.textContent = "기초부터 차근차근! 엑셀의 기본 원리를 잡는 상담이 필요해요. (실전OA2과정 추천)";
    } else if (score <= 4) {
        levelTitle.textContent = "엑셀 주니어 🌿";
        levelDesc.textContent = "기본기는 있으시네요! 실무에 자주 쓰이는 함수 위주로 효율을 높여볼까요? (컴활2급과정 추천)";
    } else if (score <= 6) {
        levelTitle.textContent = "엑셀 프로 🌳";
        levelDesc.textContent = "엑셀을 꽤 다루실 줄 아네요! 복잡한 데이터 가공이나 피벗 테이블 활용법을 더 파고들어 봐요. (컴활1급과정 추천)";
    } else {
        levelTitle.textContent = "엑셀 마스터 👑";
        levelDesc.textContent = "완벽합니다! 업무 자동화나 데이터 모델링 등 고급 기능 위주의 컨설팅을 추천해요. (컴활1급과정 추천)";
    }
}

function renderReview() {
    const reviewList = document.getElementById('review-list');
    reviewList.innerHTML = '';
    
    let hasWrong = false;
    userAnswers.forEach((ans, idx) => {
        if (ans !== questions[idx].answer) {
            hasWrong = true;
            const item = document.createElement('div');
            item.classList.add('review-item');
            item.innerHTML = `
                <p class="review-q">Q${idx + 1}. ${questions[idx].q} ❌</p>
                <p class="my-ans">👉 나의 답변: ${questions[idx].options[ans] === undefined ? '미선택' : questions[idx].options[ans]}</p>
                <p class="correct-ans">✅ 정답: ${questions[idx].options[questions[idx].answer]}</p>
                <div class="explanation">💡 <strong>설명:</strong> ${questions[idx].info}</div>
            `;
            reviewList.appendChild(item);
        }
    });

    if (!hasWrong) {
        reviewList.innerHTML = '<p style="padding:20px; text-align:center;">모든 문제를 맞히셨습니다! 완벽해요! 👏</p>';
    }

    reviewSection.style.display = 'block';
    // 부드럽게 스크롤 내리기
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
}

// 5. 이벤트 리스너
document.getElementById('start-btn').onclick = startQuiz;
nextBtn.onclick = goNext;
prevBtn.onclick = goPrev;
document.getElementById('show-review-btn').onclick = renderReview;
document.getElementById('close-review-btn').onclick = () => {
    reviewSection.style.display = 'none';
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
document.getElementById('restart-btn').onclick = () => location.reload();