// 订单管理页面交互功能

$(document).ready(function() {
    // 初始化页面功能
    initOrderPage();
});

// 初始化订单页面
function initOrderPage() {
    // 初始化导航菜单交互
    initNavMenu();
    
    // 初始化订单筛选功能
    initOrderFilters();
    
    // 初始化订单操作按钮
    initOrderActions();
    
    // 初始化分页功能
    initPagination();
    
    // 初始化移动端适配
    initMobileAdaptation();
}

// 初始化导航菜单
function initNavMenu() {
    // 导航项点击事件
    $('.user-nav .nav-item a').on('click', function(e) {
        e.preventDefault();
        
        // 移除所有活动状态
        $('.user-nav .nav-item').removeClass('active');
        
        // 添加当前活动状态
        $(this).parent().addClass('active');
        
        // 模拟页面跳转
        const href = $(this).attr('href');
        if (href !== '#') {
            console.log('Navigate to:', href);
            // 实际项目中可以使用 window.location.href = href;
        }
    });
}

// 初始化订单筛选
function initOrderFilters() {
    // 订单状态标签切换
    $('.filter-tab').on('click', function(e) {
        e.preventDefault();
        
        // 移除所有活动状态
        $('.filter-tab').removeClass('active');
        
        // 添加当前活动状态
        $(this).addClass('active');
        
        // 模拟筛选订单
        const status = $(this).data('status');
        filterOrders(status);
    });
    
    // 搜索功能
    $('.search-btn').on('click', function() {
        performSearch();
    });
    
    // 回车键搜索
    $('.search-input input').on('keypress', function(e) {
        if (e.which === 13) {
            performSearch();
        }
    });
    
    // 时间筛选
    $('.date-filter select').on('change', function() {
        const timeRange = $(this).val();
        filterOrdersByTimeRange(timeRange);
    });
}

// 筛选订单
function filterOrders(status) {
    console.log('Filter orders by status:', status);
    
    // 显示加载中状态
    showLoading();
    
    // 模拟筛选延迟
    setTimeout(() => {
        if (status === 'all') {
            // 显示所有订单
            $('.orders-list .order-item').show();
        } else {
            // 根据状态筛选订单
            $('.orders-list .order-item').each(function() {
                const orderStatus = $(this).find('.status-badge').data('status');
                if (orderStatus === status) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
        
        // 隐藏加载中状态
        hideLoading();
        
        // 检查是否有匹配的订单
        checkEmptyResults();
    }, 500);
}

// 按时间范围筛选订单
function filterOrdersByTimeRange(timeRange) {
    console.log('Filter orders by time range:', timeRange);
    
    // 显示加载中状态
    showLoading();
    
    // 模拟筛选延迟
    setTimeout(() => {
        // 这里是模拟筛选逻辑，实际项目中应该根据后端API返回的数据进行筛选
        // 简单演示：假设时间范围只是一个视觉筛选
        hideLoading();
    }, 500);
}

// 执行搜索
function performSearch() {
    const searchTerm = $('.search-input input').val().trim();
    if (!searchTerm) return;
    
    console.log('Search orders for:', searchTerm);
    
    // 显示加载中状态
    showLoading();
    
    // 模拟搜索延迟
    setTimeout(() => {
        // 这里是模拟搜索逻辑，实际项目中应该根据后端API返回的数据进行搜索
        $('.orders-list .order-item').each(function() {
            const orderId = $(this).find('.order-id').text().toLowerCase();
            const productName = $(this).find('.product-name').text().toLowerCase();
            
            if (orderId.includes(searchTerm.toLowerCase()) || productName.includes(searchTerm.toLowerCase())) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
        
        // 隐藏加载中状态
        hideLoading();
        
        // 检查是否有匹配的订单
        checkEmptyResults();
    }, 500);
}

// 初始化订单操作按钮
function initOrderActions() {
    // 取消订单按钮
    $('.btn-cancel').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        confirmAction(`确定要取消订单 ${orderId} 吗？`, function() {
            cancelOrder(orderId);
        });
    });
    
    // 删除订单按钮
    $('.btn-delete').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        confirmAction(`确定要删除订单 ${orderId} 吗？此操作不可恢复！`, function() {
            deleteOrder(orderId);
        });
    });
    
    // 支付订单按钮
    $('.btn-pay').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        payOrder(orderId);
    });
    
    // 查看物流按钮
    $('.btn-track').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        trackOrder(orderId);
    });
    
    // 确认收货按钮
    $('.btn-confirm').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        confirmAction(`确认已收到订单 ${orderId} 的商品吗？`, function() {
            confirmReceipt(orderId);
        });
    });
    
    // 评价订单按钮
    $('.btn-review').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        reviewOrder(orderId);
    });
    
    // 再次购买按钮
    $('.btn-rebuy').on('click', function() {
        const orderItem = $(this).closest('.order-item');
        const orderId = orderItem.find('.order-id').text();
        rebuyOrder(orderItem);
    });
    
    // 查看详情按钮
    $('.btn-detail').on('click', function() {
        const orderId = $(this).closest('.order-item').find('.order-id').text();
        viewOrderDetail(orderId);
    });
}

// 取消订单
function cancelOrder(orderId) {
    console.log('Cancel order:', orderId);
    showLoading();
    
    // 模拟API请求延迟
    setTimeout(() => {
        // 更新订单状态
        const orderItem = $(`.order-item:has(.order-id:contains('${orderId}'))`);
        const statusBadge = orderItem.find('.status-badge');
        
        if (statusBadge.length) {
            statusBadge.text('已取消').removeClass('pending').addClass('cancelled').data('status', 'cancelled');
            
            // 更新操作按钮
            updateOrderActions(orderItem, 'cancelled');
            
            showMessage('订单已成功取消');
        }
        
        hideLoading();
    }, 1000);
}

// 删除订单
function deleteOrder(orderId) {
    console.log('Delete order:', orderId);
    showLoading();
    
    // 模拟API请求延迟
    setTimeout(() => {
        const orderItem = $(`.order-item:has(.order-id:contains('${orderId}'))`);
        
        if (orderItem.length) {
            orderItem.slideUp('fast', function() {
                $(this).remove();
                checkEmptyResults();
            });
            
            showMessage('订单已成功删除');
        }
        
        hideLoading();
    }, 1000);
}

// 支付订单
function payOrder(orderId) {
    console.log('Pay order:', orderId);
    // 在实际项目中，这里应该跳转到支付页面
    showMessage(`即将跳转到订单 ${orderId} 的支付页面`);
}

// 查看物流
function trackOrder(orderId) {
    console.log('Track order:', orderId);
    // 在实际项目中，这里应该显示物流信息弹窗或跳转到物流页面
    showMessage(`查看订单 ${orderId} 的物流信息`);
}

// 确认收货
function confirmReceipt(orderId) {
    console.log('Confirm receipt for order:', orderId);
    showLoading();
    
    // 模拟API请求延迟
    setTimeout(() => {
        const orderItem = $(`.order-item:has(.order-id:contains('${orderId}'))`);
        const statusBadge = orderItem.find('.status-badge');
        
        if (statusBadge.length) {
            statusBadge.text('已完成').removeClass('shipping').addClass('completed').data('status', 'completed');
            
            // 更新操作按钮
            updateOrderActions(orderItem, 'completed');
            
            showMessage('已确认收货');
        }
        
        hideLoading();
    }, 1000);
}

// 评价订单
function reviewOrder(orderId) {
    console.log('Review order:', orderId);
    // 在实际项目中，这里应该打开评价弹窗
    showMessage(`打开订单 ${orderId} 的评价页面`);
}

// 再次购买
function rebuyOrder(orderItem) {
    console.log('Rebuy order items');
    
    // 获取订单中的商品信息
    const products = [];
    orderItem.find('.product-item').each(function() {
        const productName = $(this).find('.product-name').text();
        const productSpec = $(this).find('.product-spec').text();
        const productPrice = $(this).find('.product-price').text();
        
        products.push({
            name: productName,
            spec: productSpec,
            price: productPrice
        });
    });
    
    // 模拟添加到购物车
    showLoading();
    setTimeout(() => {
        showMessage(`已将 ${products.length} 件商品添加到购物车`);
        updateCartCount(products.length);
        hideLoading();
    }, 800);
}

// 查看订单详情
function viewOrderDetail(orderId) {
    console.log('View order detail:', orderId);
    // 在实际项目中，这里应该跳转到订单详情页面
    showMessage(`查看订单 ${orderId} 的详细信息`);
}

// 更新订单操作按钮
function updateOrderActions(orderItem, status) {
    const actionsContainer = orderItem.find('.order-actions');
    actionsContainer.empty();
    
    // 根据订单状态显示不同的操作按钮
    switch(status) {
        case 'pending':
            actionsContainer.append(`
                <button class="btn-cancel">取消订单</button>
                <button class="btn-pay">去支付</button>
                <button class="btn-detail">订单详情</button>
            `);
            break;
        case 'shipping':
            actionsContainer.append(`
                <button class="btn-track">查看物流</button>
                <button class="btn-confirm">确认收货</button>
                <button class="btn-detail">订单详情</button>
            `);
            break;
        case 'completed':
            actionsContainer.append(`
                <button class="btn-review">评价订单</button>
                <button class="btn-rebuy">再次购买</button>
                <button class="btn-detail">订单详情</button>
            `);
            break;
        case 'cancelled':
            actionsContainer.append(`
                <button class="btn-delete">删除订单</button>
                <button class="btn-rebuy">再次购买</button>
                <button class="btn-detail">订单详情</button>
            `);
            break;
    }
    
    // 重新绑定按钮事件
    initOrderActions();
}

// 初始化分页功能
function initPagination() {
    // 分页按钮点击事件
    $('.am-pagination li a').on('click', function(e) {
        e.preventDefault();
        
        // 如果点击的是当前页，不执行操作
        if ($(this).closest('li').hasClass('am-active')) {
            return;
        }
        
        const page = $(this).data('page') || $(this).text();
        console.log('Navigate to page:', page);
        
        // 模拟页面加载
        showLoading();
        
        // 模拟分页延迟
        setTimeout(() => {
            // 更新活动状态
            $('.am-pagination li').removeClass('am-active');
            $(this).closest('li').addClass('am-active');
            
            hideLoading();
        }, 800);
    });
}

// 初始化移动端适配
function initMobileAdaptation() {
    // 检查屏幕宽度
    function checkScreenWidth() {
        const isMobile = $(window).width() <= 768;
        
        if (isMobile) {
            // 移动端样式调整
            $('.user-nav').css('max-height', '300px');
            $('.user-nav').css('overflow-y', 'auto');
        } else {
            // 桌面端样式调整
            $('.user-nav').css('max-height', 'none');
            $('.user-nav').css('overflow-y', 'visible');
        }
    }
    
    // 初始化检查
    checkScreenWidth();
    
    // 窗口大小改变时重新检查
    $(window).on('resize', checkScreenWidth);
}

// 检查是否有匹配的订单结果
function checkEmptyResults() {
    const visibleOrders = $('.orders-list .order-item:visible').length;
    
    if (visibleOrders === 0) {
        // 如果没有可见的订单，显示空状态
        if ($('.no-orders').length === 0) {
            $('.orders-list').append(`
                <div class="no-orders" style="padding: 50px 20px; text-align: center; color: #999;">
                    <div style="font-size: 50px; margin-bottom: 20px;">📦</div>
                    <p>暂无相关订单</p>
                </div>
            `);
        }
    } else {
        // 如果有可见的订单，移除空状态
        $('.no-orders').remove();
    }
}

// 显示确认对话框
function confirmAction(message, confirmCallback) {
    if (window.confirm(message)) {
        if (typeof confirmCallback === 'function') {
            confirmCallback();
        }
    }
}

// 显示加载中状态
function showLoading() {
    // 如果加载中提示已存在，则不再创建
    if ($('#loading-overlay').length > 0) {
        return;
    }
    
    // 创建加载中提示
    const loadingOverlay = $('<div id="loading-overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.3); display: flex; justify-content: center; align-items: center; z-index: 9999;">
        <div style="background-color: #fff; padding: 20px; border-radius: 5px; display: flex; align-items: center;">
            <div style="width: 20px; height: 20px; border: 2px solid #f3f3f3; border-top: 2px solid #e22c08; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 10px;"></div>
            <span>处理中...</span>
        </div>
    </div>');
    
    // 添加旋转动画
    const style = $('<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>');
    
    // 添加到页面
    $(document.head).append(style);
    $(document.body).append(loadingOverlay);
}

// 隐藏加载中状态
function hideLoading() {
    $('#loading-overlay').remove();
}

// 显示消息提示
function showMessage(message) {
    // 如果消息提示已存在，则更新内容
    let messageElement = $('#message-toast');
    
    if (messageElement.length === 0) {
        // 创建新的消息提示
        messageElement = $('<div id="message-toast" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background-color: rgba(0, 0, 0, 0.7); color: #fff; padding: 10px 20px; border-radius: 5px; z-index: 9999;"></div>');
        $(document.body).append(messageElement);
    }
    
    // 设置消息内容
    messageElement.text(message);
    
    // 显示消息
    messageElement.show();
    
    // 3秒后隐藏消息
    setTimeout(() => {
        messageElement.fadeOut(300, function() {
            $(this).remove();
        });
    }, 3000);
}

// 更新购物车数量
function updateCartCount(count) {
    // 在实际项目中，这里应该更新页面上的购物车数量显示
    console.log('Add to cart:', count);
}
