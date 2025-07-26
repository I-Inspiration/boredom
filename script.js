// 文件路径: /script.js
// 这是修复了“吐槽”触发逻辑错误的最终版本。

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. 获取所有需要操作的HTML元素 ==========
    const introContainer = document.getElementById('intro-container');
    const mainContainer = document.getElementById('main-container');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const goalTitleEl = document.getElementById('goal-title');
    const goalDescriptionEl = document.getElementById('goal-description');

    // ========== 2. 初始化数据 ==========
    let currentGoal = {};
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    let boringClickCounter = 0;
    // 阈值仍然是7
    const TUCAO_THRESHOLD = 7; 

    // ========== 3. 定义核心函数 ==========

    // 随机获取一个新目标
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

    // ========== 4. 绑定按钮的点击事件 ==========

    // "是的" 按钮 (启动)
    startBtn.addEventListener('click', () => {
        boringClickCounter = 0; 
        introContainer.style.display = 'none';
        mainContainer.style.display = 'flex';
        getRandomGoal();
    });

    // "不好玩" 按钮 (逻辑已修正)
    nextBtn.addEventListener('click', () => {
        boringClickCounter++;

        // =========================================================
        // ↓↓↓↓↓↓↓↓↓↓            关键修正点            ↓↓↓↓↓↓↓↓↓↓
        // =========================================================
        // 检查是否达到吐槽阈值 (>=7次，即第7次点击时触发)
        if (boringClickCounter >= TUCAO_THRESHOLD) {
        // =========================================================
        // ↑↑↑↑↑↑↑↑↑↑            关键修正点            ↑↑↑↑↑↑↑↑↑↑
        // =========================================================
            const randomTucaoIndex = Math.floor(Math.random() * tucaoLibrary.length);
            const tucaoMessage = tucaoLibrary[randomTucaoIndex];

            goalTitleEl.innerText = "一个来自系统的警告";
            goalDescriptionEl.innerText = tucaoMessage;

            // 吐槽之后，立刻将计数器清零
            boringClickCounter = 0; 
        } else {
            getRandomGoal();
        }
    });

    // "就你了" 按钮 (收藏)
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
