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
    // 读取浏览器本地存储的收藏夹，这相当于小程序里的 getStorageSync
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // ========== 3. 定义核心函数 ==========

    // 随机获取一个新目标
    function getRandomGoal() {
        const randomIndex = Math.floor(Math.random() * goalLibrary.length);
        const randomGoal = goalLibrary[randomIndex];

        // 避免与上一个重复
        if (currentGoal && randomGoal.id === currentGoal.id) {
            getRandomGoal(); // 重新抽一次
            return;
        }

        currentGoal = randomGoal;
        
        // 更新HTML内容，这相当于小程序里的 setData
        goalTitleEl.innerText = currentGoal.title;
        goalDescriptionEl.innerText = currentGoal.description;
    }

    // ========== 4. 绑定按钮的点击事件 ==========

    // "是的" 按钮
    startBtn.addEventListener('click', () => {
        introContainer.style.display = 'none'; // 隐藏启动画面
        mainContainer.style.display = 'flex';  // 显示任务界面
        getRandomGoal(); // 获取第一个目标
    });

    // "不好玩" 按钮
    nextBtn.addEventListener('click', () => {
        getRandomGoal();
    });

    // "就你了" 按钮 (收藏)
    confirmBtn.addEventListener('click', () => {
        if (!currentGoal.id) return;

        // 检查是否已收藏
        if (favorites.some(item => item.id === currentGoal.id)) {
            alert('已在收藏夹中'); // alert 相当于简化版的 showToast
            return;
        }

        // 添加到收藏夹数组
        favorites.unshift(currentGoal);
        
        // 保存到浏览器本地存储，这相当于 setStorageSync
        // 注意：localStorage只能存字符串，所以要用JSON.stringify转换
        localStorage.setItem('favorites', JSON.stringify(favorites));

        alert('已加入收藏夹！');
    });

});
