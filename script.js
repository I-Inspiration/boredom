
// 文件路径: /script.js
// 这是实现“三页面”逻辑的最终版本

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. 获取所有需要操作的HTML元素 ==========
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

    // ========== 2. 检查数据文件是否加载 ==========
    if (typeof goalLibrary === 'undefined' || typeof tucaoLibrary === 'undefined') {
        console.error("错误：数据文件加载失败！");
        document.body.innerHTML = '<div style="padding: 20px; text-align: center; color: red; font-size: 18px;"><b>错误：数据文件加载失败！</b><br><br>请按F12打开控制台(Console)查看详细错误信息。</div>';
        return;
    }

    // ========== 3. 初始化数据 ==========
    let currentGoal = {};
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    let boringClickCounter = 0;
    const TUCAO_THRESHOLD = 10; // 阈值设为10

    // ========== 4. 定义核心函数 ==========

    function setRandomGoal() {
        const randomIndex = Math.floor(Math.random() * goalLibrary.length);
        const randomGoal = goalLibrary[randomIndex];
        if (currentGoal && randomGoal.id === randomGoal.id) {
            setRandomGoal();
            return;
        }
        currentGoal = randomGoal;
        goalTitleEl.innerText = currentGoal.title;
        goalDescriptionEl.innerText = currentGoal.description;
    }
    
    function setRandomTucao() {
        const randomTucaoIndex = Math.floor(Math.random() * tucaoLibrary.length);
        tucaoTextEl.innerText = tucaoLibrary[randomTucaoIndex];
    }
    
    // 页面切换的“总导演”
    function showPage(pageToShow) {
        introContainer.style.display = 'none';
        mainContainer.style.display = 'none';
        tucaoContainer.style.display = 'none';
        pageToShow.style.display = 'flex';
    }

    // ========== 5. 绑定按钮的点击事件 ==========

    startBtn.addEventListener('click', () => {
        boringClickCounter = 0;
        setRandomGoal();
        showPage(mainContainer);
    });

    nextBtn.addEventListener('click', () => {
        boringClickCounter++;
        if (boringClickCounter >= TUCAO_THRESHOLD) {
            setRandomTucao();
            showPage(tucaoContainer);
        } else {
            setRandomGoal();
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

    apologyBtn.addEventListener('click', () => {
        boringClickCounter = 0;
        setRandomGoal();
        showPage(mainContainer);
    });
    
    // 程序开始时，默认显示启动页
    showPage(introContainer);
});
