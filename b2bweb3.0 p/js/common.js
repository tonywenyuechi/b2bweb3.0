// 等待DOM加载完成
$(document).ready(function() {
    // 返回顶部按钮功能
    initBackToTop();
    
    // 导航栏滚动效果
    initNavScroll();
    
    // 移动端导航栏切换
    initMobileNav();
    
    // 平滑滚动
    initSmoothScroll();
    
    // 添加购物车按钮功能
    initAddToCart();
    
    // 加载更多功能
    initLoadMore();
    
    // 表单验证
    initFormValidation();
});

// 返回顶部按钮功能
function initBackToTop() {
    var backToTop = $('#back-to-top');
    
    // 监听滚动事件
    $(window).scroll(function() {
        if ($(window).scrollTop() > 300) {
            backToTop.addClass('show');
        } else {
            backToTop.removeClass('show');
        }
    });
    
    // 点击返回顶部
    backToTop.click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
}

// 导航栏滚动效果
function initNavScroll() {
    var header = $('.header');
    var headerHeight = header.outerHeight();
    var lastScrollTop = 0;
    
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        
        // 当页面向下滚动超过100px时，添加阴影效果
        if (scrollTop > 100) {
            header.addClass('header-scrolled');
        } else {
            header.removeClass('header-scrolled');
        }
        
        // 当页面向上滚动时显示导航栏，向下滚动时隐藏导航栏（仅在移动端）
        if ($(window).width() < 768) {
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                // 向下滚动，隐藏导航栏
                header.css('transform', 'translateY(-100%)');
            } else {
                // 向上滚动，显示导航栏
                header.css('transform', 'translateY(0)');
            }
        } else {
            header.css('transform', 'translateY(0)');
        }
        
        lastScrollTop = scrollTop;
    });
}

// 移动端导航栏切换
function initMobileNav() {
    var navToggle = $('.am-icon-bars');
    var navMenu = $('.am-nav-collapse');
    
    // 在小屏幕下，添加导航栏切换按钮点击事件
    if ($(window).width() < 768) {
        if (navToggle.length === 0) {
            // 如果没有导航切换按钮，则动态创建
            var toggleBtn = $('<div class="nav-toggle am-icon-bars"></div>');
            toggleBtn.css({
                'position': 'fixed',
                'top': '15px',
                'right': '15px',
                'z-index': '1001',
                'font-size': '24px',
                'cursor': 'pointer',
                'background': '#fff',
                'width': '40px',
                'height': '40px',
                'line-height': '40px',
                'text-align': 'center',
                'border-radius': '50%',
                'box-shadow': '0 2px 8px rgba(0,0,0,0.1)'
            });
            $('body').append(toggleBtn);
            navToggle = toggleBtn;
        }
        
        navToggle.click(function() {
            if (navMenu.hasClass('am-in')) {
                navMenu.removeClass('am-in');
                navToggle.removeClass('am-icon-times').addClass('am-icon-bars');
            } else {
                navMenu.addClass('am-in');
                navToggle.removeClass('am-icon-bars').addClass('am-icon-times');
            }
        });
    }
}

// 平滑滚动
function initSmoothScroll() {
    // 为所有内部链接添加平滑滚动
    $('a[href^="#"]').click(function(e) {
        e.preventDefault();
        
        var targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        var targetElement = $(targetId);
        if (targetElement.length) {
            var headerHeight = $('.header').outerHeight();
            var targetPosition = targetElement.offset().top - headerHeight;
            
            $('html, body').animate({
                scrollTop: targetPosition
            }, 500);
            
            // 在移动端点击导航链接后关闭菜单
            if ($(window).width() < 768) {
                $('.am-nav-collapse').removeClass('am-in');
                $('.nav-toggle').removeClass('am-icon-times').addClass('am-icon-bars');
            }
        }
    });
}

// 添加购物车按钮功能
function initAddToCart() {
    $('.add-to-cart').click(function(e) {
        e.preventDefault();
        
        var productItem = $(this).closest('.product-item');
        var productName = productItem.find('.product-title a').text();
        var productPrice = productItem.find('.price').text();
        
        // 显示添加成功提示
        showNotification('成功添加 "' + productName + '" 到购物车');
        
        // 添加购物车动画效果
        var button = $(this);
        button.addClass('added');
        button.text('已添加');
        
        setTimeout(function() {
            button.removeClass('added');
            button.text('加入购物车');
        }, 2000);
        
        // 这里可以添加实际的购物车添加逻辑
        // 例如调用API或更新本地存储
    });
}

// 显示通知
function showNotification(message) {
    // 检查是否已存在通知元素
    var notification = $('#notification');
    
    if (notification.length === 0) {
        // 创建新的通知元素
        notification = $('<div id="notification" class="notification"></div>');
        notification.css({
            'position': 'fixed',
            'top': '20px',
            'right': '20px',
            'background': 'rgba(0,0,0,0.8)',
            'color': '#fff',
            'padding': '15px 20px',
            'border-radius': '4px',
            'z-index': '9999',
            'opacity': '0',
            'transform': 'translateX(100%)',
            'transition': 'all 0.3s ease'
        });
        $('body').append(notification);
    }
    
    // 设置通知内容
    notification.text(message);
    
    // 显示通知
    setTimeout(function() {
        notification.css({
            'opacity': '1',
            'transform': 'translateX(0)'
        });
    }, 10);
    
    // 3秒后隐藏通知
    setTimeout(function() {
        notification.css({
            'opacity': '0',
            'transform': 'translateX(100%)'
        });
    }, 3000);
}

// 加载更多功能
function initLoadMore() {
    $('.load-more-btn').click(function() {
        var button = $(this);
        var loadingText = '加载中...';
        var originalText = button.text();
        
        // 显示加载状态
        button.text(loadingText);
        button.prop('disabled', true);
        
        // 模拟加载延迟
        setTimeout(function() {
            // 这里可以添加实际的加载更多逻辑
            // 例如通过AJAX加载更多产品或内容
            
            // 恢复按钮状态
            button.text(originalText);
            button.prop('disabled', false);
            
            // 模拟没有更多内容的情况
            // button.text('没有更多了');
            // button.prop('disabled', true);
            // button.addClass('disabled');
        }, 1500);
    });
}

// 表单验证
function initFormValidation() {
    // 为表单添加提交事件
    $('.am-form').submit(function(e) {
        var isValid = true;
        var errorMessages = [];
        
        // 验证必填字段
        $(this).find('[required]').each(function() {
            if (!$(this).val().trim()) {
                isValid = false;
                var fieldName = $(this).attr('placeholder') || $(this).prev('label').text() || '此字段';
                errorMessages.push(fieldName + '不能为空');
                
                // 添加错误样式
                $(this).addClass('error');
                
                // 移除错误样式（当用户开始输入时）
                $(this).on('input', function() {
                    $(this).removeClass('error');
                });
            }
        });
        
        // 验证邮箱格式
        $(this).find('input[type="email"]').each(function() {
            if ($(this).val().trim()) {
                var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test($(this).val().trim())) {
                    isValid = false;
                    errorMessages.push('请输入有效的邮箱地址');
                    $(this).addClass('error');
                }
            }
        });
        
        // 验证手机号格式
        $(this).find('input[type="tel"]').each(function() {
            if ($(this).val().trim()) {
                var phoneRegex = /^1[3-9]\d{9}$/;
                if (!phoneRegex.test($(this).val().trim())) {
                    isValid = false;
                    errorMessages.push('请输入有效的手机号码');
                    $(this).addClass('error');
                }
            }
        });
        
        // 如果验证失败，显示错误信息并阻止提交
        if (!isValid) {
            e.preventDefault();
            showNotification(errorMessages.join('\n'), 'error');
        }
    });
}

// 响应式调整
$(window).resize(function() {
    // 重新初始化移动端导航
    initMobileNav();
    
    // 重置导航栏样式
    if ($(window).width() >= 768) {
        $('.header').css('transform', 'translateY(0)');
        $('.am-nav-collapse').removeClass('am-in');
        if ($('.nav-toggle').length) {
            $('.nav-toggle').removeClass('am-icon-times').addClass('am-icon-bars');
        }
    }
});

// 图片懒加载（简单实现）
function initLazyLoad() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        var imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    var image = entry.target;
                    image.src = image.dataset.src;
                    image.removeAttribute('data-src');
                    imageObserver.unobserve(image);
                }
            });
        });
        
        lazyImages.forEach(function(image) {
            imageObserver.observe(image);
        });
    } else {
        // 回退方案
        lazyLoadImages();
        window.addEventListener('scroll', lazyLoadImages);
        window.addEventListener('resize', lazyLoadImages);
        window.addEventListener('orientationChange', lazyLoadImages);
    }
}

function lazyLoadImages() {
    var lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(function(image) {
        if (isElementInViewport(image)) {
            image.src = image.dataset.src;
            image.removeAttribute('data-src');
        }
    });
}

function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// 添加鼠标悬停效果
function addHoverEffects() {
    // 为卡片添加悬停效果
    $('.product-item, .news-item').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
    
    // 为按钮添加悬停效果
    $('.am-btn').hover(
        function() {
            $(this).css('transform', 'translateY(-2px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );
}