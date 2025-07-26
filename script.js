// 文件路径: /script.js

// 等待HTML文档完全加载后，再执行我们的代码
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

    // =========================================================
    // ↓↓↓↓↓↓↓↓↓↓            逻辑修改区域            ↓↓↓↓↓↓↓↓↓↓
    // =========================================================
    
    // 新增一个“吐槽计数器”
    let boringClickCounter = 0;
    // 设置触发吐槽的“阈值”，>7次，所以阈值是7
    const TUCAO_THRESHOLD = 7; 
    // “吐槽文案库”不再在这里定义，因为它已经从 tucao.js 中全局加载了

    // =========================================================
    // ↑↑↑↑↑↑↑↑↑↑            逻辑修改区域            ↑↑↑↑↑↑↑↑↑↑
    // =========================================================

    // ========== 3. 定义核心函数 ==========

    // 随机获取一个新目标
    function getRandomGoal() {
        // goalLibrary 是从 goals.js 加载的
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

    // "不好玩" 按钮 (逻辑修改)
    nextBtn.addEventListener('click', () => {
        boringClickCounter++;

        // 检查是否达到吐槽阈值 (>7次)
        if (boringClickCounter > TUCAO_THRESHOLD) {
            // tucaoLibrary 是从 tucao.js 加载的
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
