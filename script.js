// 文件路径: /pages/index/index.js

// 1. 从独立文件中，引入目标库
const { goalLibrary } = require('../../data/goals.js');

Page({
  data: {
    showIntro: true,   // 控制是否显示启动画面
    currentGoal: {},   // 当前展示的目标
    favorites: []        // 收藏列表
  },

  onLoad: function() {
    // 页面加载时，只读取收藏夹
    const favorites = wx.getStorageSync('favorites') || [];
    this.setData({ favorites });
  },

  /**
   * 新增方法：处理“是的”按钮点击事件
   */
  handleStart: function() {
    this.setData({ showIntro: false });
    this.getRandomGoal();
  },

  /**
   * 核心方法：随机获取一个新目标
   */
  getRandomGoal: function() {
    const randomIndex = Math.floor(Math.random() * goalLibrary.length);
    const randomGoal = goalLibrary[randomIndex];

    if (this.data.currentGoal && randomGoal.id === this.data.currentGoal.id) {
      this.getRandomGoal();
      return;
    }

    this.setData({
      currentGoal: randomGoal
    });
  },

  /**
   * 按钮事件：“不好玩”
   */
  handleNext: function() {
    this.getRandomGoal();
  },

  /**
   * 按钮事件：“就你了”（收藏） - 已修改
   */
  handleConfirm: function() {
    const { currentGoal, favorites } = this.data;
    if (!currentGoal.id) return;

    if (favorites.some(item => item.id === currentGoal.id)) {
      wx.showToast({ title: '已在收藏夹中', icon: 'none' });
      return;
    }

    const newFavorites = [currentGoal, ...favorites];
    this.setData({ favorites: newFavorites });
    wx.setStorageSync('favorites', newFavorites);

    wx.showToast({ title: '已加入收藏夹！', icon: 'success' });

    // =========================================================
    // ↓↓↓↓↓↓↓↓↓↓  关键修改点：下面这行代码已被删除  ↓↓↓↓↓↓↓↓↓↓
    // this.getRandomGoal(); 
    // =========================================================
  },
})