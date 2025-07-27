
// 文件路径: /script.js
// 这是在您提供的稳定版基础上，实现“三页面”逻辑的最终代码。

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. 获取所有需要操作的HTML元素 (已更新) ==========
    const introContainer = document.getElementById('intro-container');
    const mainContainer = document.getElementById('main-container');
    const tucaoContainer = document.getElementById('tucao-container'); // 新增

    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const apologyBtn = document.getElementById('apology-btn'); // 新增

    const goalTitleEl = document.getElementById('goal-title');
    const goalDescriptionEl = document.getElementById('goal-description');
    const tucaoTextEl = document.getElementById('tucao-text'); // 新增

    // ========== 2. 初始化数据 (已更新) ==========
    let currentGoal = {};
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // 新增吐槽计数器和阈值
    let boringClickCounter = 0;
    const TUCAO_THRESHOLD = 10;

    // ========== 3. 定义核心函数 (已更新) ==========

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
    
    // 新增：随机获取一个吐槽
    function setRandomTucao() {
        const randomTucaoIndex = Math.floor(Math.random() * tucaoLibrary.length);
        // 从 tucaoLibrary 的对象中，取出 text 属性
        tucaoTextEl.innerText = tucaoLibrary[randomTucaoIndex].text;
    }
    
    // 新增：页面切换的“总导演”
    function showPage(pageToShow) {
        introContainer.style.display = 'none';
        mainContainer.style.display = 'none';
        tucaoContainer.style.display = 'none';
        pageToShow.style.display = 'flex';
    }

    // ========== 4. 绑定按钮的点击事件 (已更新) ==========

    // "是的" 按钮
    startBtn.addEventListener('click', () => {
        boringClickCounter = 0;
        getRandomGoal();
        showPage(mainContainer);
    });

    // "没意思" 按钮
    nextBtn.addEventListener('click', () => {
        boringClickCounter++;
        // 当计数器等于10时，触发吐槽
        if (boringClickCounter === TUCAO_THRESHOLD) {
            setRandomTucao();
            showPage(tucaoContainer);
        } else {
            getRandomGoal();
        }
    });

    // "就你了" 按钮 (收藏)
    confirmBtn.addEventListener('click', () => {
        boringClickCounter = 0; // 点击“就你了”，计数器归零
        if (!currentGoal.id) return;

        if (favorites.some(item => item.id === currentGoal.id)) {
            alert('已在收藏夹中');
            return;
        }

        favorites.unshift(currentGoal);
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert('已加入收藏夹！');
    });
    
    // 新增："对不起，我错了" 按钮
    apologyBtn.addEventListener('click', () => {
        boringClickCounter = 0; // 道歉了，计数器归零
        getRandomGoal();
        showPage(mainContainer);
    });
    
    // 程序开始时，默认显示启动页
    showPage(introContainer);
});
