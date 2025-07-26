// 文件路径: /script.js
// 最终审查与修正版本

document.addEventListener('DOMContentLoaded', () => {

    // 检查：确保HTML元素都存在
    const introContainer = document.getElementById('intro-container');
    const mainContainer = document.getElementById('main-container');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const goalTitleEl = document.getElementById('goal-title');
    const goalDescriptionEl = document.getElementById('goal-description');

    // 检查：确保数据文件已正确加载
    if (typeof goalLibrary === 'undefined' || typeof tucaoLibrary === 'undefined') {
        console.error("错误：goalLibrary 或 tucaoLibrary 未能成功加载，请检查 index.html 中的 <script> 路径和 data/ 文件夹下的文件是否正确。");
        // 在页面上显示错误，方便用户看到
        document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red;">错误：数据文件加载失败！<br>请按F12打开控制台查看详细信息。</div>';
        return;
    }

    let currentGoal = {};
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let boringClickCounter = 0;
    const TUCAO_THRESHOLD = 7;

    function getRandomGoal() {
        const randomIndex = Math.floor(Math.random() * goalLibrary.length);
        const randomGoal = goalLibrary[randomIndex];

        if (currentGoal && randomGoal.id === currentGoal.id) {
            getRandomGoal();
            return;
        }

        currentGoal = randomGoal;
        
        goalTitleEl.innerText = currentGoal.title;
        goalDescriptionEl.innerText = currentGoal.description;
    }

    startBtn.addEventListener('click', () => {
        boringClickCounter = 0;
        introContainer.style.display = 'none';
        mainContainer.style.display = 'flex';
        getRandomGoal();
    });

    nextBtn.addEventListener('click', () => {
        boringClickCounter++;

        if (boringClickCounter >= TUCAO_THRESHOLD) {
            const randomTucaoIndex = Math.floor(Math.random() * tucaoLibrary.length);
            const tucaoMessage = tucaoLibrary[randomTucaoIndex];

            goalTitleEl.innerText = "一个来自系统的警告";
            goalDescriptionEl.innerText = tucaoMessage;

            boringClickCounter = 0;
        } else {
            getRandomGoal();
        }
    });

    confirmBtn.addEventListener('click', () => {
        boringClickCounter = 0;

        if (!currentGoal.id) return;

        if (favorites.some(item => item.id === currentGoal.id)) {
            alert('已在收藏夹中');
            return;
        }

        favorites.unshift(currentGoal);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert('已加入收藏夹！');
    });
});
