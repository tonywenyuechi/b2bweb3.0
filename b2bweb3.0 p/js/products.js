// 产品列表页面JavaScript
$(function() {
    // 视图切换功能
    $('.view-btn').on('click', function() {
        var viewType = $(this).data('view');
        
        // 更新按钮状态
        $('.view-btn').removeClass('active');
        $(this).addClass('active');
        
        // 更新产品列表视图
        if (viewType === 'grid') {
            $('.products-list').removeClass('list-view');
            $('.products-list').addClass('grid-view');
        } else {
            $('.products-list').removeClass('grid-view');
            $('.products-list').addClass('list-view');
        }
    });
    
    // 产品排序功能
    $('.sort-select').on('change', function() {
        var sortBy = $(this).val();
        
        // 这里可以添加实际的排序逻辑
        // 模拟排序效果
        var products = $('.product-item').detach();
        
        // 根据选择的排序方式排序
        if (sortBy === 'price_asc') {
            products.sort(function(a, b) {
                var priceA = parseFloat($(a).find('.price').text().replace(/[^\d.-]/g, ''));
                var priceB = parseFloat($(b).find('.price').text().replace(/[^\d.-]/g, ''));
                return priceA - priceB;
            });
        } else if (sortBy === 'price_desc') {
            products.sort(function(a, b) {
                var priceA = parseFloat($(a).find('.price').text().replace(/[^\d.-]/g, ''));
                var priceB = parseFloat($(b).find('.price').text().replace(/[^\d.-]/g, ''));
                return priceB - priceA;
            });
        } else if (sortBy === 'rating') {
            products.sort(function(a, b) {
                var ratingA = parseFloat($(a).find('.rating-score').text());
                var ratingB = parseFloat($(b).find('.rating-score').text());
                return ratingB - ratingA;
            });
        }
        
        // 重新添加到容器中
        $('.products-list').append(products);
        
        // 显示排序提示
        showToast('已按' + $(this).find('option:selected').text() + '排序');
    });
    
    // 产品分类筛选功能
    $('.filter-item a').on('click', function(e) {
        e.preventDefault();
        
        // 如果是移动端，点击展开子菜单
        if ($(window).width() <= 768) {
            var $submenu = $(this).next('.filter-submenu');
            if ($submenu.length) {
                $submenu.slideToggle();
                return;
            }
        }
        
        // 添加选中样式
        $(this).closest('.filter-section').find('.filter-item').removeClass('active');
        $(this).closest('.filter-item').addClass('active');
        
        // 这里可以添加实际的筛选逻辑
        var category = $(this).data('category');
        
        // 模拟筛选效果
        simulateFilter(category);
    });
    
    // 复选框筛选功能
    $('.filter-section .am-checkbox').on('change', function() {
        // 获取选中的复选框值
        var selectedValues = [];
        $(this).closest('.filter-section').find('.am-checkbox input:checked').each(function() {
            selectedValues.push($(this).val());
        });
        
        // 这里可以添加实际的筛选逻辑
        // 模拟筛选效果
        simulateFilter(selectedValues.join(','));
    });
    
    // 价格筛选功能
    $('.price-filter-btn').on('click', function() {
        var minPrice = $('.price-min').val();
        var maxPrice = $('.price-max').val();
        
        // 验证输入
        if (!minPrice && !maxPrice) {
            showToast('请输入价格范围');
            return;
        }
        
        if (minPrice && !isNumeric(minPrice)) {
            showToast('最低价格格式不正确');
            return;
        }
        
        if (maxPrice && !isNumeric(maxPrice)) {
            showToast('最高价格格式不正确');
            return;
        }
        
        if (minPrice && maxPrice && parseFloat(minPrice) > parseFloat(maxPrice)) {
            showToast('最低价格不能高于最高价格');
            return;
        }
        
        // 这里可以添加实际的价格筛选逻辑
        simulateFilter('price_' + minPrice + '_' + maxPrice);
        showToast('价格筛选已应用');
    });
    
    // 重置筛选按钮
    $('.reset-filter-btn').on('click', function() {
        // 重置表单
        $(this).closest('.filter-section').find('input[type="text"]').val('');
        $(this).closest('.filter-section').find('input[type="checkbox"]').prop('checked', false);
        $(this).closest('.filter-section').find('.filter-item').removeClass('active');
        
        // 重置筛选结果
        resetFilter();
        showToast('筛选条件已重置');
    });
    
    // 搜索功能
    $('.search-btn').on('click', function() {
        var keyword = $('.search-input').val().trim();
        if (!keyword) {
            showToast('请输入搜索关键词');
            return;
        }
        
        // 这里可以添加实际的搜索逻辑
        simulateFilter('search_' + keyword);
        showToast('正在搜索: ' + keyword);
    });
    
    // 回车键搜索
    $('.search-input').on('keypress', function(e) {
        if (e.which === 13) {
            $('.search-btn').click();
        }
    });
    
    // 产品标签筛选
    $('.tag').on('click', function() {
        $(this).toggleClass('active');
        
        // 获取所有选中的标签
        var selectedTags = [];
        $('.tag.active').each(function() {
            selectedTags.push($(this).data('tag'));
        });
        
        // 这里可以添加实际的标签筛选逻辑
        if (selectedTags.length > 0) {
            simulateFilter('tags_' + selectedTags.join(','));
        } else {
            resetFilter();
        }
    });
    
    // 添加到购物车功能
    $('.add-to-cart').on('click', function() {
        var productId = $(this).closest('.product-item').data('id');
        var productName = $(this).closest('.product-item').find('.product-title a').text();
        
        // 这里可以添加实际的添加购物车逻辑
        showToast('已将"' + productName + '"添加到购物车');
    });
    
    // 立即购买功能
    $('.buy-now').on('click', function() {
        var productId = $(this).closest('.product-item').data('id');
        // 跳转到产品详情页
        window.location.href = 'product-detail.html?id=' + productId;
    });
    
    // 产品对比功能
    $('.compare-btn').on('click', function() {
        var productId = $(this).closest('.product-item').data('id');
        var productName = $(this).closest('.product-item').find('.product-title a').text();
        
        // 这里可以添加实际的产品对比逻辑
        showToast('已将"' + productName + '"添加到对比列表');
    });
    
    // 分页功能
    $('.am-pagination a').on('click', function(e) {
        e.preventDefault();
        
        // 检查是否是禁用状态
        if ($(this).parent().hasClass('am-disabled')) {
            return;
        }
        
        var page = $(this).data('page');
        
        // 这里可以添加实际的分页逻辑
        // 模拟分页效果
        simulatePagination(page);
    });
    
    // 移动端折叠筛选面板
    $('.filter-title').on('click', function() {
        if ($(window).width() <= 768) {
            var $filterSection = $(this).closest('.filter-section');
            $filterSection.find('.filter-list, .price-range').slideToggle();
            $filterSection.toggleClass('expanded');
        }
    });
    
    // 辅助函数：显示提示信息
    function showToast(message) {
        // 如果已经存在提示框，先移除
        $('.toast-message').remove();
        
        // 创建新的提示框
        var toast = $('<div class="toast-message">' + message + '</div>');
        toast.css({
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '4px',
            zIndex: 9999,
            fontSize: '1.4rem'
        });
        
        // 添加到页面并设置自动消失
        $('body').append(toast);
        setTimeout(function() {
            toast.fadeOut(300, function() {
                $(this).remove();
            });
        }, 2000);
    }
    
    // 辅助函数：检查是否是数字
    function isNumeric(value) {
        return /^\d+(\.\d+)?$/.test(value);
    }
    
    // 模拟筛选效果
    function simulateFilter(filterParam) {
        // 显示加载中效果
        showLoading();
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 隐藏加载中效果
            hideLoading();
            
            // 这里可以添加实际的筛选逻辑
            console.log('应用筛选参数:', filterParam);
            
            // 显示筛选结果数量
            updateResultsCount();
        }, 500);
    }
    
    // 重置筛选
    function resetFilter() {
        // 显示加载中效果
        showLoading();
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 隐藏加载中效果
            hideLoading();
            
            // 更新结果数量
            updateResultsCount();
        }, 500);
    }
    
    // 模拟分页效果
    function simulatePagination(page) {
        // 显示加载中效果
        showLoading();
        
        // 模拟网络请求延迟
        setTimeout(function() {
            // 隐藏加载中效果
            hideLoading();
            
            // 更新分页按钮状态
            updatePaginationButtons(page);
            
            // 更新结果数量
            updateResultsCount();
        }, 500);
    }
    
    // 显示加载中效果
    function showLoading() {
        // 如果已经存在加载中效果，先移除
        $('.loading-overlay').remove();
        
        // 创建加载中效果
        var loading = $('<div class="loading-overlay">' +
            '<div class="loading-spinner"></div>' +
            '<div class="loading-text">加载中...</div>' +
            '</div>');
        
        loading.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9998
        });
        
        loading.find('.loading-spinner').css({
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid var(--color-main)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            marginBottom: '10px'
        });
        
        loading.find('.loading-text').css({
            fontSize: '1.4rem',
            color: '#666'
        });
        
        // 添加动画样式
        var style = $('<style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>');
        $('head').append(style);
        
        // 添加到页面
        $('body').append(loading);
    }
    
    // 隐藏加载中效果
    function hideLoading() {
        $('.loading-overlay').fadeOut(300, function() {
            $(this).remove();
        });
    }
    
    // 更新分页按钮状态
    function updatePaginationButtons(page) {
        var currentPage = parseInt(page);
        var totalPages = 5; // 假设总页数为5
        
        // 更新所有分页按钮
        $('.am-pagination li').removeClass('am-active am-disabled');
        
        // 设置当前页
        $('.am-pagination a[data-page="' + currentPage + '"]').parent().addClass('am-active');
        
        // 设置上一页和下一页按钮状态
        if (currentPage === 1) {
            $('.am-pagination li.am-pagination-prev').addClass('am-disabled');
        }
        
        if (currentPage === totalPages) {
            $('.am-pagination li.am-pagination-next').addClass('am-disabled');
        }
    }
    
    // 更新结果数量
    function updateResultsCount() {
        // 统计显示的产品数量
        var visibleCount = $('.product-item').length;
        var totalCount = 120; // 假设总共有120个产品
        
        // 更新结果数量显示
        $('.results-count').text(visibleCount);
        $('.total-count').text(totalCount);
    }
    
    // 初始化页面
    function initPage() {
        // 初始化结果数量
        updateResultsCount();
        
        // 初始化分页
        updatePaginationButtons(1);
        
        // 响应式调整
        handleResponsive();
    }
    
    // 响应式处理
    function handleResponsive() {
        if ($(window).width() <= 768) {
            // 移动端默认折叠筛选面板
            $('.filter-section').not('.expanded').find('.filter-list, .price-range').hide();
        } else {
            // 桌面端默认展开筛选面板
            $('.filter-list, .price-range').show();
        }
    }
    
    // 窗口大小改变时重新处理响应式
    $(window).on('resize', function() {
        handleResponsive();
    });
    
    // 初始化页面
    initPage();
});
