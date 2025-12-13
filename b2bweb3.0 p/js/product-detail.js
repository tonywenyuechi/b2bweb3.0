// 产品详情页面JavaScript
$(function() {
    // 初始化Swiper轮播图
    if (typeof Swiper !== 'undefined') {
        // 主图轮播
        var mainSwiper = new Swiper('.main-image-slider', {
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            on: {
                slideChange: function() {
                    var activeIndex = this.activeIndex;
                    if (this.loop) {
                        activeIndex = this.realIndex;
                    }
                    // 更新缩略图激活状态
                    updateThumbnailActive(activeIndex);
                }
            }
        });
        
        // 缩略图轮播
        var thumbnailSwiper = new Swiper('.thumbnail-slider', {
            slidesPerView: 4,
            spaceBetween: 10,
            freeMode: true,
            watchSlidesProgress: true,
            on: {
                slideChange: function() {
                    // 当缩略图滑动时，更新主图
                    var activeIndex = this.activeIndex;
                    if (!mainSwiper.loop) {
                        mainSwiper.slideTo(activeIndex);
                    }
                }
            }
        });
        
        // 缩略图点击事件
        $('.thumbnail').on('click', function() {
            var index = $(this).index();
            mainSwiper.slideTo(index);
            updateThumbnailActive(index);
        });
    } else {
        console.warn('Swiper库未加载，使用备用图片切换逻辑');
        // 备用图片切换逻辑
        initFallbackImageSwitch();
    }
    
    // 规格选择功能
    $('.spec-option').on('click', function() {
        var $parent = $(this).closest('.spec-options');
        $parent.find('.spec-option').removeClass('active');
        $(this).addClass('active');
        
        // 这里可以添加根据规格更新价格等逻辑
        updateProductInfo();
    });
    
    // 数量增减功能
    $('.quantity-btn').on('click', function() {
        var $input = $(this).closest('.quantity-control').find('.quantity-input');
        var currentValue = parseInt($input.val());
        var min = parseInt($input.attr('min')) || 1;
        var max = parseInt($input.attr('max')) || 999;
        
        if ($(this).hasClass('quantity-plus')) {
            if (currentValue < max) {
                $input.val(currentValue + 1);
            } else {
                showToast('已达到最大购买数量');
            }
        } else {
            if (currentValue > min) {
                $input.val(currentValue - 1);
            } else {
                showToast('不能少于最小购买数量');
            }
        }
        
        // 这里可以添加根据数量更新价格等逻辑
        updateProductInfo();
    });
    
    // 数量输入框变化
    $('.quantity-input').on('change', function() {
        var currentValue = parseInt($(this).val());
        var min = parseInt($(this).attr('min')) || 1;
        var max = parseInt($(this).attr('max')) || 999;
        
        // 验证输入
        if (isNaN(currentValue) || currentValue < min) {
            $(this).val(min);
        } else if (currentValue > max) {
            $(this).val(max);
            showToast('已达到最大购买数量');
        }
        
        // 更新产品信息
        updateProductInfo();
    });
    
    // 标签页切换功能
    $('.tab-item').on('click', function() {
        var tabId = $(this).data('tab');
        
        // 更新标签页状态
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
        
        // 更新标签页内容
        $('.tab-panel').removeClass('active');
        $('#' + tabId).addClass('active');
        
        // 如果是评价标签页，可以加载评价数据
        if (tabId === 'reviews') {
            loadReviews();
        }
    });
    
    // 购买按钮功能
    $('.buy-now-btn').on('click', function() {
        var quantity = $('.quantity-input').val();
        var selectedSpecs = getSelectedSpecs();
        
        // 检查是否已选择规格
        if (Object.keys(selectedSpecs).length === 0) {
            showToast('请选择产品规格');
            return;
        }
        
        // 这里可以添加购买逻辑，比如跳转到订单确认页
        showToast('正在跳转到订单确认页...');
        console.log('购买产品:', {
            productId: getProductId(),
            quantity: quantity,
            specs: selectedSpecs
        });
    });
    
    // 添加购物车按钮功能
    $('.add-to-cart-btn').on('click', function() {
        var quantity = $('.quantity-input').val();
        var selectedSpecs = getSelectedSpecs();
        
        // 检查是否已选择规格
        if (Object.keys(selectedSpecs).length === 0) {
            showToast('请选择产品规格');
            return;
        }
        
        // 这里可以添加添加购物车逻辑
        showToast('已添加到购物车');
        console.log('添加购物车:', {
            productId: getProductId(),
            quantity: quantity,
            specs: selectedSpecs
        });
    });
    
    // 对比按钮功能
    $('.compare-btn').on('click', function() {
        // 这里可以添加产品对比逻辑
        showToast('已添加到对比列表');
    });
    
    // 评价筛选功能
    $('.review-filter-options .filter-option').on('click', function() {
        $(this).siblings().removeClass('active');
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        // 这里可以添加评价筛选逻辑
        filterReviews(filter);
    });
    
    // 图片预览功能
    $('.review-image').on('click', function() {
        var imgSrc = $(this).find('img').attr('src');
        showImagePreview(imgSrc);
    });
    
    // 辅助函数：初始化备用图片切换逻辑
    function initFallbackImageSwitch() {
        var $thumbnails = $('.thumbnail');
        var $mainImage = $('.main-image img');
        
        $thumbnails.on('click', function() {
            var index = $(this).index();
            var imgSrc = $(this).find('img').attr('src');
            $mainImage.attr('src', imgSrc);
            updateThumbnailActive(index);
        });
    }
    
    // 辅助函数：更新缩略图激活状态
    function updateThumbnailActive(index) {
        $('.thumbnail').removeClass('active');
        $('.thumbnail').eq(index).addClass('active');
    }
    
    // 辅助函数：获取选中的规格
    function getSelectedSpecs() {
        var specs = {};
        
        $('.spec-options').each(function() {
            var specType = $(this).data('type') || 'spec';
            var selectedOption = $(this).find('.spec-option.active');
            
            if (selectedOption.length > 0) {
                specs[specType] = {
                    id: selectedOption.data('id'),
                    name: selectedOption.text()
                };
            }
        });
        
        return specs;
    }
    
    // 辅助函数：获取产品ID
    function getProductId() {
        // 从URL参数中获取产品ID
        var urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('id') || 'default';
    }
    
    // 辅助函数：更新产品信息
    function updateProductInfo() {
        // 这里可以根据选择的规格和数量更新价格、库存等信息
        // 模拟更新
        var quantity = parseInt($('.quantity-input').val());
        var basePrice = parseFloat($('.price-value').data('base-price')) || 1299;
        var totalPrice = basePrice * quantity;
        
        // 更新价格显示
        $('.price-value').text('¥' + totalPrice.toFixed(2));
    }
    
    // 辅助函数：加载评价数据
    function loadReviews() {
        // 这里可以添加加载评价数据的逻辑
        console.log('加载评价数据');
        // 可以模拟加载过程
    }
    
    // 辅助函数：筛选评价
    function filterReviews(filter) {
        // 这里可以添加评价筛选逻辑
        console.log('筛选评价:', filter);
        // 可以模拟筛选效果
    }
    
    // 辅助函数：显示图片预览
    function showImagePreview(imgSrc) {
        // 检查是否已存在预览框
        if ($('#image-preview').length > 0) {
            $('#image-preview img').attr('src', imgSrc);
            $('#image-preview').fadeIn();
            return;
        }
        
        // 创建图片预览框
        var preview = $('<div id="image-preview">' +
            '<div class="preview-container">' +
            '<img src="' + imgSrc + '" alt="预览图片">' +
            '<button class="preview-close">×</button>' +
            '</div>' +
            '</div>');
        
        // 设置样式
        preview.css({
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: 9999,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        });
        
        preview.find('.preview-container').css({
            position: 'relative',
            maxWidth: '90%',
            maxHeight: '90%'
        });
        
        preview.find('img').css({
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block'
        });
        
        preview.find('.preview-close').css({
            position: 'absolute',
            top: '-40px',
            right: '0',
            width: '40px',
            height: '40px',
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '3rem',
            cursor: 'pointer'
        });
        
        // 添加关闭事件
        preview.find('.preview-close').on('click', function() {
            preview.fadeOut();
        });
        
        // 点击空白处关闭
        preview.on('click', function(e) {
            if (e.target === preview[0]) {
                preview.fadeOut();
            }
        });
        
        // 添加到页面
        $('body').append(preview);
    }
    
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
    
    // 初始化页面
    function initPage() {
        // 初始化价格显示
        var basePrice = parseFloat($('.price-value').data('base-price')) || 1299;
        $('.price-value').text('¥' + basePrice.toFixed(2));
        
        // 初始化第一个标签页
        $('.tab-item:first').click();
        
        // 响应式调整
        handleResponsive();
    }
    
    // 响应式处理
    function handleResponsive() {
        // 这里可以添加响应式调整逻辑
        if ($(window).width() <= 768) {
            // 移动端处理
        } else {
            // 桌面端处理
        }
    }
    
    // 窗口大小改变时重新处理响应式
    $(window).on('resize', function() {
        handleResponsive();
    });
    
    // 初始化页面
    initPage();
});
