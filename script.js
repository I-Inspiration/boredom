// 文件路径: /script.js (最简洁稳定版)

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. 获取所有需要操作的HTML元素 ==========
    const introContainer = document.getElementById('intro-container');
    const mainContainer = document.getElementById('main-container');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const confirmBtn = document.getElementById('confirm-btn');
    const goalTitleEl = document.getElementById('goal-title');
    const goalDescriptionEl = document.getElementById('goal-description');

    // ========== 2. 检查数据文件是否加载 ==========
    if (typeof goalLibrary === 'undefined') {
        document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red; font-size: 18px;"><b>错误：目标库(goals.js)加载失败！</b><br><br>请按F12打开控制台(Console)查看详细错误信息。</div>';
        return;
    }

    // ========== 3. 初始化数据 ==========
    let currentGoal = {};
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // ========== 4. 定义核心函数 ==========
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

    // ========== 5. 绑定按钮的点击事件 ==========

    // "是的" 按钮
    startBtn.addEventListener('click', () => {
        introContainer.style.display = 'none'; // 隐藏启动画面
        mainContainer.style.display = 'flex';  // 显示任务界面
        getRandomGoal(); // 获取第一个目标
    });

    // "没意思" 按钮
    nextBtn.addEventListener('click', () => {
        getRandomGoal(); // 直接获取下一个目标
    });

    // "就你了" 按钮 (收藏)
    confirmBtn.addEventListener('click', () => {
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
