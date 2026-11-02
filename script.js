let currentPage = 1;

const userAnswers = {
    q1: "", q2: "", q3: "", q4: "", q5: ""
};

const pageColors = [
    '#ffe6e6', '#ffebf0', '#1a1a1a', '#e53935', '#d1c4e9', '#b2ebf2',
    '#ffcc80', '#a5d6a7', '#f48fb1', '#81d4fa', '#ffab91', '#c8e6c9', '#ffffff'
];

function nextPage(pageNum) {
    document.getElementById('page' + currentPage).classList.remove('active');
    currentPage = pageNum;
    document.getElementById('page' + currentPage).classList.add('active');
    document.body.style.backgroundColor = pageColors[currentPage - 1];
}

function createHearts() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const icons = ['❤️', '💖', '💕', '💗', '💓'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHearts, 300);

// --- ЛОГИКА ВОПРОСОВ ---

function handleQ1(answer) {
    userAnswers.q1 = answer;
    const ans1Text = document.getElementById('ans1-text');
    const q2Block = document.getElementById('q2-block');
    
    if (answer === 'Да, я красотка') {
        ans1Text.innerHTML = "Конечно так, это же очевидно! 😉❤️";
    } else if (answer === 'Я няшная') {
        ans1Text.innerHTML = "Да, ты очень няшная и милая! 🥰❤️";
    } else if (answer === 'Нет') {
        ans1Text.innerHTML = "Неправда! Вообще-то ты очень красивая и милая! 😘❤️";
    }
    
    ans1Text.classList.add('show');
    nextPage(8);
    
    setTimeout(() => {
        q2Block.style.display = "block";
        q2Block.classList.add('show');
    }, 3000);
}

function submitTextAns() {
    const text = document.getElementById('whoAmI').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q2 = text;
    nextPage(9);
}

function handleQ3(isYes) {
    userAnswers.q3 = isYes ? "Да" : "Нет";
    const trustText = document.getElementById('trust-text');
    const q4Block = document.getElementById('q4-block');
    
    trustText.innerHTML = isYes ? "Спасибо, солнышко! ❤️" : ""; 
    if(isYes) trustText.classList.add('show');
    
    nextPage(10);
    
    setTimeout(() => {
        q4Block.style.display = "block";
        q4Block.classList.add('show');
    }, 3000);
}

function handleQ4(isYes) {
    const q4Block = document.getElementById('q4-block');
    const q4RepeatBlock = document.getElementById('q4-repeat-block');
    
    if (isYes) {
        q4Block.style.display = "none";
        q4RepeatBlock.style.display = "block";
    } else {
        userAnswers.q4 = "Нет";
        nextPage(11);
    }
}

function handleQ4Final(answer) {
    userAnswers.q4 = answer;
    nextPage(11);
}

function submitOpinion() {
    const text = document.getElementById('myOpinion').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q5 = text;
    nextPage(12);
}

// --- АДМИН ПАНЕЛЬ ---

function openAdmin() {
    document.getElementById('admin-modal').style.display = 'flex';
    document.getElementById('admin-auth').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-pass').value = '';
}

function closeAdmin() {
    document.getElementById('admin-modal').style.display = 'none';
}

function checkPass() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === '1110') {
        document.getElementById('admin-auth').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        
        // Формируем отчет без прочерков
        const dataText = `
1. Ты красивая?
Ответ: ${userAnswers.q1 || "Нет ответа"}

2. Кто я для тебя?
Ответ: ${userAnswers.q2 || "Нет ответа"}

3. Ты мне доверяешь?
Ответ: ${userAnswers.q3 || "Нет ответа"}

4. Ты меня любишь?
Ответ: ${userAnswers.q4 || "Нет ответа"}

5. Какое мнение обо мне?
Ответ: ${userAnswers.q5 || "Нет ответа"}
        `;
        
        document.getElementById('admin-data').innerText = dataText.trim();
    } else {
        alert("Неверный пароль!");
    }
}
