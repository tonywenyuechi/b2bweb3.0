// 用户中心页面交互功能
$(document).ready(function() {
    // 初始化
    initUserCenter();
});

/**
 * 初始化用户中心页面
 */
function initUserCenter() {
    // 导航菜单交互
    initNavigation();
    
    // 订单操作按钮交互
    initOrderActions();
    
    // 推荐产品交互
    initRecommendProducts();
    
    // 账户操作交互
    initAccountActions();
    
    // 移动端适配
    initMobileAdaptation();
}

/**
 * 初始化导航菜单
 */
function initNavigation() {
    // 导航项点击事件
    $('.user-nav .nav-item a').on('click', function(e) {
        // 如果不是外部链接，则阻止默认行为
        if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
            e.preventDefault();
            
            // 移除所有活动状态
            $('.user-nav .nav-item').removeClass('active');
            
            // 添加当前活动状态
            $(this).closest('.nav-item').addClass('active');
            
            // 这里可以添加加载不同内容的逻辑
            showLoadingMessage('加载中...');
            
            // 模拟加载延迟
            setTimeout(function() {
                hideLoadingMessage();
            }, 800);
        }
    });
}

/**
 * 初始化订单操作按钮
 */
function initOrderActions() {
    // 取消订单按钮
    $('.btn-cancel').on('click', function() {
        const orderNumber = $(this).closest('.order-item').find('.order-number').text().replace('订单号：', '');
        
        if (confirm(`确定要取消订单 ${orderNumber} 吗？`)) {
            showLoadingMessage('正在取消订单...');
            
            // 模拟API请求
            setTimeout(function() {
                hideLoadingMessage();
                showSuccessMessage('订单已成功取消');
                // 这里可以添加刷新订单列表的逻辑
            }, 1000);
        }
    });
    
    // 立即付款按钮
    $('.btn-pay').on('click', function() {
        const orderNumber = $(this).closest('.order-item').find('.order-number').text().replace('订单号：', '');
        const orderAmount = $(this).closest('.order-item').find('.total-price').text();
        
        // 跳转到支付页面或显示支付弹窗
        alert(`跳转到支付页面\n订单号：${orderNumber}\n支付金额：${orderAmount}`);
        // 实际项目中应该跳转到支付页面或显示支付弹窗
    });
    
    // 查看物流按钮
    $('.btn-track').on('click', function() {
        const orderNumber = $(this).closest('.order-item').find('.order-number').text().replace('订单号：', '');
        
        alert(`查看订单 ${orderNumber} 的物流信息`);
        // 实际项目中应该显示物流信息弹窗或跳转到物流详情页
    });
    
    // 确认收货按钮
    $('.btn-confirm').on('click', function() {
        const orderNumber = $(this).closest('.order-item').find('.order-number').text().replace('订单号：', '');
        
        if (confirm(`确认已收到订单 ${orderNumber} 的商品吗？`)) {
            showLoadingMessage('正在确认收货...');
            
            // 模拟API请求
            setTimeout(function() {
                hideLoadingMessage();
                showSuccessMessage('已成功确认收货');
                // 这里可以添加刷新订单列表的逻辑
            }, 1000);
        }
    });
    
    // 查看全部订单链接
    $('.section-more').on('click', function(e) {
        // 检查是否是订单相关的链接
        if ($(this).closest('.section').find('.section-header h2').text() === '订单状态' || 
            $(this).closest('.section').find('.section-header h2').text() === '最近订单') {
            e.preventDefault();
            // 跳转到订单列表页
            window.location.href = 'orders.html';
        }
    });
}

/**
 * 初始化推荐产品交互
 */
function initRecommendProducts() {
    // 加入购物车按钮
    $('.btn-add-cart').on('click', function() {
        const productName = $(this).closest('.product-info').find('.product-name').text();
        const productPrice = $(this).closest('.product-info').find('.product-price').text();
        
        showLoadingMessage('正在加入购物车...');
        
        // 模拟API请求
        setTimeout(function() {
            hideLoadingMessage();
            showSuccessMessage(`${productName} 已成功加入购物车`);
            
            // 更新购物车数量
            updateCartCount(1);
        }, 800);
    });
    
    // 推荐产品项点击事件
    $('.recommend-products .product-item').on('click', function(e) {
        // 排除按钮点击
        if (!$(e.target).is('button') && !$(e.target).closest('button').length) {
            // 获取产品ID或其他标识，跳转到产品详情页
            // 这里仅做示例，实际项目中应该有真实的产品ID
            window.location.href = 'product-detail.html?id=sample';
        }
    });
}

/**
 * 初始化账户操作交互
 */
function initAccountActions() {
    // 充值按钮
    $('.stat-action:contains("充值")').on('click', function(e) {
        e.preventDefault();
        alert('跳转到账户充值页面');
        // 实际项目中应该显示充值弹窗或跳转到充值页面
    });
    
    // 查看优惠券
    $('.stat-action:contains("查看")').on('click', function(e) {
        e.preventDefault();
        alert('查看我的优惠券');
        // 实际项目中应该显示优惠券列表或跳转到优惠券页面
    });
    
    // 积分兑换
    $('.stat-action:contains("兑换")').on('click', function(e) {
        e.preventDefault();
        alert('跳转到积分兑换页面');
        // 实际项目中应该显示积分兑换商城或跳转到兑换页面
    });
    
    // 处理待处理订单
    $('.stat-action:contains("处理")').on('click', function(e) {
        e.preventDefault();
        window.location.href = 'orders.html';
    });
}

/**
 * 初始化移动端适配
 */
function initMobileAdaptation() {
    // 移动端导航菜单折叠/展开功能
    if ($(window).width() <= 768) {
        // 在小屏幕上添加点击展开/折叠子菜单的功能
        $('.user-nav .nav-title').on('click', function() {
            $(this).next('.nav-list').slideToggle();
            $(this).toggleClass('expanded');
        });
        
        // 默认折叠所有子菜单
        $('.user-nav .nav-list').hide();
        // 展开当前活动的菜单
        $('.user-nav .nav-item.active').closest('.nav-list').show();
    }
    
    // 窗口大小改变时重新适配
    $(window).on('resize', function() {
        if ($(window).width() > 768) {
            // 大屏幕上始终展开所有菜单
            $('.user-nav .nav-list').show();
        } else {
            // 小屏幕上保持折叠状态，只展开当前活动的菜单
            $('.user-nav .nav-list').hide();
            $('.user-nav .nav-item.active').closest('.nav-list').show();
        }
    });
}

/**
 * 显示加载消息
 */
function showLoadingMessage(message) {
    // 检查是否已存在加载遮罩
    if (!$('#loading-mask').length) {
        const loadingHtml = `
            <div id="loading-mask" class="loading-mask">
                <div class="loading-content">
                    <div class="loading-spinner"></div>
                    <p class="loading-text">${message || '加载中...'}</p>
                </div>
            </div>
        `;
        $('body').append(loadingHtml);
    } else {
        // 更新现有消息
        $('#loading-mask .loading-text').text(message || '加载中...');
        $('#loading-mask').show();
    }
}

/**
 * 隐藏加载消息
 */
function hideLoadingMessage() {
    $('#loading-mask').hide();
}

/**
 * 显示成功消息
 */
function showSuccessMessage(message) {
    // 检查是否已存在成功提示
    if (!$('#success-toast').length) {
        const toastHtml = `
            <div id="success-toast" class="success-toast">
                <div class="toast-content">
                    <i class="fa fa-check-circle"></i>
                    <span class="toast-text">${message}</span>
                </div>
            </div>
        `;
        $('body').append(toastHtml);
    } else {
        // 更新现有消息
        $('#success-toast .toast-text').text(message);
    }
    
    // 显示提示
    $('#success-toast').fadeIn();
    
    // 3秒后自动隐藏
    setTimeout(function() {
        $('#success-toast').fadeOut();
    }, 3000);
}

/**
 * 显示错误消息
 */
function showErrorMessage(message) {
    // 检查是否已存在错误提示
    if (!$('#error-toast').length) {
        const toastHtml = `
            <div id="error-toast" class="error-toast">
                <div class="toast-content">
                    <i class="fa fa-exclamation-circle"></i>
                    <span class="toast-text">${message}</span>
                </div>
            </div>
        `;
        $('body').append(toastHtml);
    } else {
        // 更新现有消息
        $('#error-toast .toast-text').text(message);
    }
    
    // 显示提示
    $('#error-toast').fadeIn();
    
    // 3秒后自动隐藏
    setTimeout(function() {
        $('#error-toast').fadeOut();
    }, 3000);
}

/**
 * 更新购物车数量
 */
function updateCartCount(change) {
    const cartCountEl = $('.cart-count');
    let currentCount = parseInt(cartCountEl.text()) || 0;
    currentCount += change;
    
    if (currentCount <= 0) {
        cartCountEl.hide();
        currentCount = 0;
    } else {
        cartCountEl.show();
    }
    
    cartCountEl.text(currentCount);
}

/**
 * 添加动态样式
 */
function addDynamicStyles() {
    const styleHtml = `
        <style>
            /* 加载遮罩样式 */
            .loading-mask {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.5);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
            }
            
            .loading-content {
                background-color: #fff;
                padding: 20px 30px;
                border-radius: 8px;
                text-align: center;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            }
            
            .loading-spinner {
                width: 30px;
                height: 30px;
                border: 3px solid #f3f3f3;
                border-top: 3px solid var(--color-main);
                border-radius: 50%;
                animation: spin 1s linear infinite;
                margin: 0 auto 10px;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            .loading-text {
                margin: 0;
                color: #666;
                font-size: 14px;
            }
            
            /* 提示消息样式 */
            .success-toast,
            .error-toast {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background-color: #52c41a;
                color: #fff;
                padding: 12px 20px;
                border-radius: 4px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                z-index: 9999;
                display: none;
                font-size: 14px;
            }
            
            .error-toast {
                background-color: #f5222d;
            }
            
            .toast-content {
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .toast-content i {
                font-size: 18px;
            }
            
            /* 移动端导航扩展样式 */
            .user-nav .nav-title.expanded {
                color: var(--color-main);
            }
            
            .user-nav .nav-title {
                cursor: pointer;
                position: relative;
                padding-right: 30px !important;
            }
            
            .user-nav .nav-title::after {
                content: '▼';
                position: absolute;
                right: 20px;
                top: 50%;
                transform: translateY(-50%);
                font-size: 12px;
                transition: transform 0.3s ease;
            }
            
            .user-nav .nav-title.expanded::after {
                transform: translateY(-50%) rotate(180deg);
            }
        </style>
    `;
    
    $('head').append(styleHtml);
}

// 添加动态样式
addDynamicStyles();
