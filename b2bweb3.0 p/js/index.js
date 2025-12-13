// 首页特定的JavaScript功能
$(document).ready(function() {
    // 初始化轮播图
    initSwiper();
    
    // 初始化服务流程动画
    initProcessAnimation();
    
    // 初始化产品筛选
    initProductFilter();
    
    // 初始化倒计时功能（如果需要）
    initCountdown();
    
    // 初始化数字增长动画
    initNumberAnimation();
    
    // 初始化搜索功能
    initSearch();
});

// 初始化轮播图
function initSwiper() {
    // 检查是否存在轮播图容器
    if ($('#banner-swiper').length) {
        var swiper = new Swiper('#banner-swiper', {
            // 基本设置
            slidesPerView: 1,
            spaceBetween: 0,
            loop: true,
            
            // 自动播放
            autoplay: {
                delay: 5000, // 5秒切换一次
                disableOnInteraction: false, // 用户交互后继续自动播放
            },
            
            // 分页器
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index + 1) + '</span>';
                }
            },
            
            // 前进后退按钮
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // 滚动条（可选）
            scrollbar: {
                el: '.swiper-scrollbar',
                hide: true,
            },
            
            // 动画效果
            effect: 'fade', // 淡入淡出效果
            fadeEffect: {
                crossFade: true,
            },
            
            // 响应式设置
            breakpoints: {
                // 当屏幕宽度小于768px时
                767: {
                    autoplay: {
                        delay: 3000, // 3秒切换一次
                    },
                }
            },
            
            // 事件监听
            on: {
                init: function() {
                    console.log('轮播图初始化完成');
                },
                slideChange: function() {
                    // 可以在这里添加滑动切换时的其他逻辑
                }
            }
        });
        
        // 添加鼠标悬停暂停自动播放
        $('#banner-swiper').mouseenter(function() {
            swiper.autoplay.stop();
        });
        
        $('#banner-swiper').mouseleave(function() {
            swiper.autoplay.start();
        });
    }
    
    // 如果有其他轮播图，也可以在这里初始化
    // 例如产品推荐轮播图、新闻轮播图等
}

// 初始化服务流程动画
function initProcessAnimation() {
    // 使用Intersection Observer API监听元素是否进入视口
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    // 当元素进入视口时，添加动画类
                    var stepElements = entry.target.querySelectorAll('.step');
                    stepElements.forEach(function(step, index) {
                        setTimeout(function() {
                            step.classList.add('animate-in');
                        }, index * 200); // 每个步骤延迟200ms，形成序列动画
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // 监听服务流程容器
        var processContainer = document.querySelector('.service-process');
        if (processContainer) {
            observer.observe(processContainer);
        }
    } else {
        // 回退方案：直接添加动画类
        setTimeout(function() {
            var stepElements = document.querySelectorAll('.step');
            stepElements.forEach(function(step, index) {
                setTimeout(function() {
                    step.classList.add('animate-in');
                }, index * 200);
            });
        }, 500);
    }
    
    // 添加CSS动画样式
    var style = document.createElement('style');
    style.textContent = `
        .step {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .step.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .step-line {
            background: linear-gradient(to right, transparent, var(--color-main, #E22C08), transparent);
            animation: lineGrow 2s ease forwards;
        }
        @keyframes lineGrow {
            from {
                width: 0;
                left: 50%;
            }
            to {
                width: 80%;
                left: 10%;
            }
        }
    `;
    document.head.appendChild(style);
}

// 初始化产品筛选功能
function initProductFilter() {
    // 检查是否存在筛选按钮
    if ($('.filter-btn').length) {
        $('.filter-btn').click(function() {
            $(this).toggleClass('active');
            $(this).siblings('.filter-btn').removeClass('active');
            
            var filterType = $(this).data('filter');
            
            // 筛选产品
            if (filterType === 'all') {
                $('.product-item').show();
            } else {
                $('.product-item').hide();
                $('.product-item[data-type="' + filterType + '"]').show();
            }
            
            // 添加动画效果
            $('.product-item:visible').addClass('animated fadeIn');
            setTimeout(function() {
                $('.product-item').removeClass('animated fadeIn');
            }, 500);
        });
    }
}

// 初始化倒计时功能
function initCountdown() {
    // 检查是否存在倒计时容器
    if ($('.countdown').length) {
        // 设置结束日期（这里使用示例日期，实际应从服务器获取）
        var endDate = new Date();
        endDate.setDate(endDate.getDate() + 7); // 7天后结束
        
        function updateCountdown() {
            var now = new Date();
            var diff = endDate - now;
            
            if (diff <= 0) {
                $('.countdown').html('<p>活动已结束</p>');
                return;
            }
            
            // 计算剩余时间
            var days = Math.floor(diff / (1000 * 60 * 60 * 24));
            var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            // 格式化为两位数
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;
            
            // 更新倒计时显示
            if (days > 0) {
                $('.countdown-time.days').text(days + '天');
            } else {
                $('.countdown-time.days').hide();
            }
            $('.countdown-time.hours').text(hours);
            $('.countdown-time.minutes').text(minutes);
            $('.countdown-time.seconds').text(seconds);
        }
        
        // 立即更新一次
        updateCountdown();
        
        // 每秒更新一次
        setInterval(updateCountdown, 1000);
    }
}

// 初始化数字增长动画
function initNumberAnimation() {
    // 使用Intersection Observer API监听元素是否进入视口
    if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                    // 开始数字动画
                    var target = entry.target;
                    var finalNumber = parseInt(target.dataset.number);
                    var duration = 2000; // 动画持续时间（毫秒）
                    var startTime = null;
                    
                    function animateNumber(currentTime) {
                        if (!startTime) startTime = currentTime;
                        var timeElapsed = currentTime - startTime;
                        var progress = Math.min(timeElapsed / duration, 1);
                        
                        // 使用缓动函数使动画更自然
                        var easeProgress = 1 - Math.pow(1 - progress, 3);
                        var currentNumber = Math.floor(easeProgress * finalNumber);
                        
                        // 更新数字显示
                        target.textContent = currentNumber.toLocaleString();
                        
                        if (progress < 1) {
                            requestAnimationFrame(animateNumber);
                        } else {
                            target.classList.add('animated');
                        }
                    }
                    
                    requestAnimationFrame(animateNumber);
                    observer.unobserve(target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // 监听所有带有data-number属性的元素
        document.querySelectorAll('[data-number]').forEach(function(element) {
            observer.observe(element);
        });
    }
}

// 初始化搜索功能
function initSearch() {
    var searchInput = $('.search-input');
    var searchBtn = $('.search-btn');
    
    if (searchInput.length && searchBtn.length) {
        // 搜索按钮点击事件
        searchBtn.click(function() {
            performSearch();
        });
        
        // 输入框回车事件
        searchInput.keypress(function(e) {
            if (e.which === 13) { // 回车键
                performSearch();
            }
        });
        
        // 搜索函数
        function performSearch() {
            var keyword = searchInput.val().trim();
            
            if (keyword) {
                // 显示搜索中状态
                searchBtn.html('<i class="loading"></i>');
                
                // 模拟搜索延迟
                setTimeout(function() {
                    // 实际项目中这里应该是AJAX请求
                    console.log('搜索关键词:', keyword);
                    
                    // 重置按钮状态
                    searchBtn.html('<i class="am-icon-search"></i>');
                    
                    // 跳转到搜索结果页
                    window.location.href = 'search.html?keyword=' + encodeURIComponent(keyword);
                }, 1000);
            } else {
                showNotification('请输入搜索关键词', 'warning');
            }
        }
    }
}

// 产品快速预览功能
function initProductQuickView() {
    $('.quick-view').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        var productId = $(this).data('id');
        console.log('快速预览产品ID:', productId);
        
        // 模拟加载产品数据
        // 实际项目中应该通过AJAX获取产品详情
        
        // 显示快速预览模态框
        // 这里可以使用Amaze UI的模态框组件
    });
}

// 标签点击筛选
function initTagFilter() {
    $('.tag').click(function() {
        $(this).toggleClass('active');
        
        // 获取所有激活的标签
        var activeTags = $('.tag.active').map(function() {
            return $(this).data('tag');
        }).get();
        
        if (activeTags.length === 0) {
            // 如果没有激活的标签，显示所有产品
            $('.product-item').show();
        } else {
            // 根据激活的标签筛选产品
            $('.product-item').each(function() {
                var productTags = $(this).data('tags').split(',');
                var hasMatch = false;
                
                for (var i = 0; i < productTags.length; i++) {
                    if (activeTags.indexOf(productTags[i]) !== -1) {
                        hasMatch = true;
                        break;
                    }
                }
                
                if (hasMatch) {
                    $(this).show();
                } else {
                    $(this).hide();
                }
            });
        }
    });
}

// 初始化首页统计数据
function initStatistics() {
    // 如果页面上有统计区块，初始化数据
    if ($('.statistics').length) {
        // 模拟统计数据
        var stats = {
            products: 1200,
            customers: 5000,
            transactions: 25000,
            satisfaction: 98
        };
        
        // 更新统计数字
        $('.stat-number.products').attr('data-number', stats.products);
        $('.stat-number.customers').attr('data-number', stats.customers);
        $('.stat-number.transactions').attr('data-number', stats.transactions);
        $('.stat-number.satisfaction').attr('data-number', stats.satisfaction);
        
        // 重新初始化数字动画
        initNumberAnimation();
    }
}

// 页面加载完成后执行
$(window).on('load', function() {
    // 页面加载完成后的逻辑
    
    // 隐藏加载动画（如果有）
    $('.loading-overlay').fadeOut();
    
    // 确保轮播图在页面完全加载后正确初始化
    setTimeout(function() {
        initSwiper();
    }, 100);
});

// 监听滚动事件，添加视差效果
$(window).scroll(function() {
    var scrollTop = $(window).scrollTop();
    
    // 为banner添加视差效果
    $('.banner-img').css('transform', 'translateY(' + scrollTop * 0.2 + 'px)');
    
    // 为其他元素添加滚动动画
    checkScrollAnimations();
});

// 检查滚动动画
function checkScrollAnimations() {
    // 使用Intersection Observer API的情况下，这个函数可能不需要
    // 但为了兼容不支持Intersection Observer的浏览器，可以保留这个函数
    
    $('.animate-on-scroll').each(function() {
        var elementTop = $(this).offset().top;
        var elementBottom = elementTop + $(this).outerHeight();
        var viewportTop = $(window).scrollTop();
        var viewportBottom = viewportTop + $(window).height();
        
        if (elementBottom > viewportTop && elementTop < viewportBottom) {
            $(this).addClass('animated');
        }
    });
}