// 页面导航功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取所有页面和导航项
    const pages = document.querySelectorAll('.page');
    const navItems = document.querySelectorAll('.nav-item');
    
    // 导航切换功能
    navItems.forEach((navItem) => {
        navItem.addEventListener('click', function() {
            // 移除所有活动状态
            pages.forEach(page => page.classList.remove('active'));
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // 添加活动状态
            this.classList.add('active');
            
            // 获取目标页面ID
            const targetPageId = this.getAttribute('data-page');
            
            // 控制底部导航栏显示/隐藏
            const bottomNav = document.querySelector('.bottom-nav');
            if (bottomNav) {
                if (targetPageId === 'my-page') {
                    // "我的"页面隐藏导航栏
                    bottomNav.style.display = 'none';
                    bottomNav.style.visibility = 'hidden';
                    document.body.classList.add('hide-nav');
                } else {
                    // 其他页面显示导航栏
                    bottomNav.style.display = 'flex';
                    bottomNav.style.visibility = 'visible';
                    document.body.classList.remove('hide-nav');
                }
            }
            
            if (targetPageId) {
                const targetPage = document.getElementById(targetPageId);
                if (targetPage) {
                    targetPage.classList.add('active');
                    
                    // 根据页面更新地址栏
                    if (targetPageId === 'home-page' || targetPageId === 'my-page' || targetPageId === 'education-page') {
                        updateAddressBar('my.chsi.com.cn');
                    } else {
                        updateAddressBar('xz.chsi.com.cn');
                    }
                }
            } else {
                // 默认显示首页
                document.getElementById('home-page').classList.add('active');
                updateAddressBar('my.chsi.com.cn');
            }
        });
    });
    
    // 更新地址栏（已移除，保留函数防止报错）
    function updateAddressBar(url) {
        // 地址栏已移除，此函数保留以避免报错
        return;
    }
    
    // 时间更新功能已移除（因为状态栏被移除）
    
    // 添加触摸反馈效果
    addTouchFeedback();
    
    // 进度条动画
    animateProgressBar();
    
    // 添加滚动效果
    addScrollEffects();
    
    // 添加学籍学历卡片点击事件
    addEducationCardClickHandlers();
});

// 触摸反馈效果
function addTouchFeedback() {
    const clickableElements = document.querySelectorAll('.function-item, .service-item, .service-item-home, .account-item, .nav-item, .career-test-card, .test-btn, .survey-btn, .play-btn, .logout-btn, .login-btn-primary, .register-btn-outline, .login-submit-btn, .back-btn, .bind-btn, .send-btn, .start-survey-btn, .recommendation-btn, .verify-btn, .report-item, .partner-item, .info-card.clickable, .action-btn');
    
    clickableElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
            this.style.transition = 'transform 0.1s';
        });
        
        element.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });
}

// 进度条动画
function animateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    if (progressFill) {
        setTimeout(() => {
            progressFill.style.width = '15%';
            progressFill.style.transition = 'width 1s ease-in-out';
        }, 500);
    }
}

// 滚动效果（状态栏已移除，保留函数结构）
function addScrollEffects() {
    // 状态栏滚动效果已移除
    return;
}

// 添加学籍学历卡片点击事件处理
function addEducationCardClickHandlers() {
    // 获取所有可点击的学籍和学历卡片
    const clickableCards = document.querySelectorAll('.info-card.clickable');
    
    clickableCards.forEach(card => {
        card.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            const level = this.getAttribute('data-level');
            
            if (targetPage) {
                // 隐藏所有页面
                const pages = document.querySelectorAll('.page');
                pages.forEach(page => page.classList.remove('active'));
                
                // 显示目标页面
                const targetPageElement = document.getElementById(targetPage);
                if (targetPageElement) {
                    targetPageElement.classList.add('active');
                    
                    // 隐藏底部导航栏（详细页面不显示导航栏）
                    const bottomNav = document.querySelector('.bottom-nav');
                    if (bottomNav) {
                        bottomNav.style.display = 'none';
                        bottomNav.style.visibility = 'hidden';
                    }
                    
                    // 更新地址栏
                    updateAddressBar('my.chsi.com.cn');
                    
                    // 显示提示信息
                    if (level) {
                        showToast(`查看${level}详细信息`);
                    }
                }
            }
        });
    });
}

// 模拟功能点击事件
function addFunctionClickHandlers() {
    // 查看按钮
    const viewBtns = document.querySelectorAll('.view-btn');
    viewBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('功能开发中...');
        });
    });
    
    // 功能项点击
    const functionItems = document.querySelectorAll('.function-item');
    functionItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            showToast(`${text}功能开发中...`);
        });
    });
    
    // 服务项点击
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function() {
            const text = this.querySelector('.service-text').textContent;
            showToast(`${text}功能开发中...`);
        });
    });

    // 首页服务项点击跳转
    const homeServiceItems = document.querySelectorAll('.service-item-home');
    homeServiceItems.forEach(item => {
        item.addEventListener('click', function() {
            const targetPage = this.getAttribute('data-page');
            if (targetPage) {
                showServicePage(targetPage);
            }
        });
    });
    
    // 职业测评卡片点击
    const testBtns = document.querySelectorAll('.test-btn');
    testBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('职业决策风格测评功能开发中...');
        });
    });
    
    // 调查问卷点击
    const surveyBtns = document.querySelectorAll('.survey-btn');
    surveyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('毕业生跟踪调查功能开发中...');
        });
    });
    
    // 播放按钮点击
    const playBtns = document.querySelectorAll('.play-btn');
    playBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            showToast('视频播放功能开发中...');
        });
    });
    
    // 退出按钮点击
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            showLogoutToLoginPage();
        });
    }
    
    // 去登录按钮点击
    const goToLoginBtn = document.getElementById('go-to-login');
    if (goToLoginBtn) {
        goToLoginBtn.addEventListener('click', function() {
            showLoginFormPage();
        });
    }
    
    // 登录表单提交
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }

    // 为所有返回按钮添加事件处理（防止遗漏）
    const backButtons = document.querySelectorAll('.back-btn');
    backButtons.forEach(btn => {
        if (!btn.onclick) {
            btn.addEventListener('click', function() {
                showPage('home-page');
            });
        }
    });
}

// 显示提示消息
function showToast(message) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0,0,0,0.8);
        color: white;
        padding: 15px 25px;
        border-radius: 20px;
        font-size: 16px;
        z-index: 10000;
        text-align: center;
    `;
    
    document.body.appendChild(toast);
    
    // 2秒后移除
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.3s';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 2000);
}

// 页面加载完成后添加功能点击处理
document.addEventListener('DOMContentLoaded', function() {
    addFunctionClickHandlers();
    
    // 确保所有返回按钮都能正常工作
    console.log('返回按钮功能已初始化');
});

// 全局点击事件代理处理返回按钮（兜底方案）
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('back-btn')) {
        e.preventDefault();
        e.stopPropagation();
        
        // 如果返回按钮没有onclick事件，则手动返回首页
        if (!e.target.onclick) {
            showPage('home-page');
        }
    }
});

// 防止页面滚动时的橡皮筋效果
document.addEventListener('touchmove', function(e) {
    if (e.target.closest('.page-content')) {
        return;
    }
    e.preventDefault();
}, { passive: false });

// 页面可见性改变时的处理
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // 页面变为可见时，重新开始动画
        animateProgressBar();
    }
});

// 添加设备方向改变的处理
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // 重新计算布局
        window.scrollTo(0, 0);
    }, 100);
});

// 网络状态更新功能已移除（因为状态栏被移除）

// 添加页面切换动画
function addPageTransitions() {
    const pages = document.querySelectorAll('.page');
    
    pages.forEach(page => {
        page.style.transition = 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out';
    });
}

// 初始化页面切换动画
document.addEventListener('DOMContentLoaded', addPageTransitions);

// 登录流程相关函数
function showLogoutToLoginPage() {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示登录引导页面
    const loginGuidePage = document.getElementById('login-guide-page');
    if (loginGuidePage) {
        loginGuidePage.classList.add('active');
    }
    
    // 更新地址栏
    updateAddressBar('my.chsi.com.cn');
    
    // 隐藏底部导航栏 - 多种方法确保隐藏
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
        bottomNav.style.visibility = 'hidden';
    }
    
    // 为body添加隐藏导航栏的类
    document.body.classList.add('hide-nav');
    
    // 更新导航栏状态（取消所有激活状态）
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));
}

function showLoginFormPage() {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示登录表单页面
    const loginFormPage = document.getElementById('login-form-page');
    if (loginFormPage) {
        loginFormPage.classList.add('active');
    }
    
    // 更新地址栏
    updateAddressBar('account.chsi.com.cn');
    
    // 隐藏底部导航栏 - 多种方法确保隐藏
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
        bottomNav.style.visibility = 'hidden';
    }
    
    // 确保body有隐藏导航栏的类
    document.body.classList.add('hide-nav');
}

function handleLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // 验证账号密码
    if (username === '17600661310' && password === 'liuwang') {
        // 登录成功
        showToast('登录成功！');
        
        // 延迟跳转到首页
        setTimeout(() => {
            // 显示首页
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            document.getElementById('home-page').classList.add('active');
            
            // 显示底部导航栏
            const bottomNav = document.querySelector('.bottom-nav');
            if (bottomNav) {
                bottomNav.style.display = 'flex';
                bottomNav.style.visibility = 'visible';
                document.body.classList.remove('hide-nav');
            }
            
            // 激活首页导航项
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(nav => {
                nav.classList.toggle('active', nav.getAttribute('data-page') === 'home-page');
            });
        }, 1500);
    } else {
        // 登录失败
        showToast('账号或密码错误，请重试');
    }
}

function returnToHomePage() {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示首页
    const homePage = document.getElementById('home-page');
    if (homePage) {
        homePage.classList.add('active');
    }
    
    // 更新地址栏
    updateAddressBar('my.chsi.com.cn');
    
    // 显示底部导航栏 - 移除所有隐藏样式
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'flex';
        bottomNav.style.visibility = 'visible';
    }
    
    // 移除body的隐藏导航栏类
    document.body.classList.remove('hide-nav');
    
    // 更新导航栏状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // 激活首页导航
    const homeNavItem = document.querySelector('.nav-item[data-page="home-page"]');
    if (homeNavItem) {
        homeNavItem.classList.add('active');
    }
}

// 显示服务页面
function showServicePage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // 隐藏底部导航栏
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'none';
        bottomNav.style.visibility = 'hidden';
    }
    
    // 为body添加隐藏导航栏的类
    document.body.classList.add('hide-nav');
    
    // 更新地址栏
    updateAddressBar('my.chsi.com.cn');
    
    // 取消所有导航项的激活状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => nav.classList.remove('active'));
}

// 显示页面函数
function showPage(pageId) {
    // 隐藏所有页面
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // 控制底部导航栏显示/隐藏
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        // 在首页、平台页、职业页、测评页和从"我的"页面返回时显示导航栏
        if (pageId === 'home-page' || pageId === 'platform-page' || 
            pageId === 'career-page' || pageId === 'assessment-page' || 
            document.querySelector('#my-page .back-btn:active')) {
            bottomNav.style.display = 'flex';
            bottomNav.style.visibility = 'visible';
            document.body.classList.remove('hide-nav');
        }
    }

    // 更新导航项状态
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-page') === pageId);
    });
}

// 确保从"我的"页面返回时显示导航栏
document.querySelector('#my-page .back-btn')?.addEventListener('click', function() {
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'flex';
        bottomNav.style.visibility = 'visible';
        document.body.classList.remove('hide-nav');
    }
});

// 广告轮播图功能
function initCarousel() {
    const container = document.querySelector('.carousel-container');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (!container || !dots.length) return;  // 如果元素不存在则退出

    function showSlide(index) {
        container.style.transform = `translateX(-${index * 50}%)`;
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        currentSlide = index;
    }

    // 点击小圆点切换图片
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => showSlide(index));
    });

    // 自动轮播
    function autoSlide() {
        currentSlide = (currentSlide + 1) % 2;
        showSlide(currentSlide);
    }

    // 立即开始第一次轮播
    showSlide(0);
    
    // 设置定时器
    const timer = setInterval(autoSlide, 2000);

    // 当页面不可见时清除定时器
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            clearInterval(timer);
        } else {
            setInterval(autoSlide, 2000);
        }
    });
}

// 确保在页面加载完成后初始化轮播图
document.addEventListener('DOMContentLoaded', () => {
    console.log('初始化轮播图');
    initCarousel();
});

// 从我的页面返回首页的函数
function returnToHome() {
    // 显示首页
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById('home-page').classList.add('active');
    
    // 显示底部导航栏
    const bottomNav = document.querySelector('.bottom-nav');
    if (bottomNav) {
        bottomNav.style.display = 'flex';
        bottomNav.style.visibility = 'visible';
    }
    document.body.classList.remove('hide-nav');
    
    // 激活首页导航项
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(nav => {
        nav.classList.toggle('active', nav.getAttribute('data-page') === 'home-page');
    });
}

// 页面加载完成后添加申请按钮点击事件
document.addEventListener('DOMContentLoaded', function() {
    // 为暂无报告页面的申请按钮添加点击事件
    const applyBtn = document.querySelector('#no-report-page .action-btn');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            showToast('已提交申请，1-3个工作日内生成');
        });
    }
}); 