<?php
// +----------------------------------------------------------------------
// | ShopXO 国内领先企业级B2C免费开源电商系统
// +----------------------------------------------------------------------
// | Copyright (c) 2011~2099 http://shopxo.net All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://opensource.org/licenses/mit-license.php )
// +----------------------------------------------------------------------
// | Author: Devil
// +----------------------------------------------------------------------

// [ 简化版安装入口文件 ]

// 检查是否已安装
if(file_exists(__DIR__ . '/../config/database.php')) {
    echo '<h1>安装提示</h1>';
    echo '<p>你已经安装过该系统，重新安装需要先删除 <code>./config/database.php</code> 文件</p>';
    exit;
}

// 启动session
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// 获取当前步骤
$step = isset($_GET['step']) ? $_GET['step'] : 'agreement';

// 环境检测函数
function checkEnvironment() {
    $requirements = [
        [
            'name' => 'PHP 版本',
            'required' => '7.3+',
            'current' => PHP_VERSION,
            'status' => version_compare(PHP_VERSION, '7.3.0', '>=')
        ],
        [
            'name' => 'PDO 扩展',
            'required' => '启用',
            'current' => extension_loaded('pdo') ? '已启用' : '未启用',
            'status' => extension_loaded('pdo')
        ],
        [
            'name' => 'MySQLi 扩展',
            'required' => '启用',
            'current' => extension_loaded('mysqli') ? '已启用' : '未启用',
            'status' => extension_loaded('mysqli')
        ],
        [
            'name' => 'GD 扩展',
            'required' => '启用',
            'current' => extension_loaded('gd') ? '已启用' : '未启用',
            'status' => extension_loaded('gd')
        ],
        [
            'name' => 'JSON 扩展',
            'required' => '启用',
            'current' => extension_loaded('json') ? '已启用' : '未启用',
            'status' => extension_loaded('json')
        ],
        [
            'name' => 'OpenSSL 扩展',
            'required' => '启用',
            'current' => extension_loaded('openssl') ? '已启用' : '未启用',
            'status' => extension_loaded('openssl')
        ],
        [
            'name' => 'config 目录',
            'required' => '可写',
            'current' => is_writable(__DIR__ . '/../config') ? '可写' : '不可写',
            'status' => is_writable(__DIR__ . '/../config')
        ],
        [
            'name' => 'runtime 目录',
            'required' => '可写',
            'current' => is_writable(__DIR__ . '/../runtime') ? '可写' : '不可写',
            'status' => is_writable(__DIR__ . '/../runtime')
        ],
        [
            'name' => 'public/uploads 目录',
            'required' => '可写',
            'current' => is_writable(__DIR__ . '/uploads') ? '可写' : '不可写',
            'status' => is_writable(__DIR__ . '/uploads')
        ]
    ];
    return $requirements;
}

// 渲染步骤导航
function renderStepNav($currentStep) {
    $steps = [
        'agreement' => '1. 协议阅读',
        'check' => '2. 环境检测',
        'config' => '3. 数据配置',
        'success' => '4. 安装完成'
    ];
    
    echo '<ul class="step-nav">';
    foreach ($steps as $key => $label) {
        $class = ($key == $currentStep) ? 'active' : '';
        echo '<li class="' . $class . '">' . $label . '</li>';
    }
    echo '</ul>';
}

// 安装页面HTML模板
$htmlTemplate = <<<HTML
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ShopXO 安装程序</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            text-align: center;
            margin-bottom: 30px;
        }
        .step-nav {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
            padding: 0;
            list-style: none;
        }
        .step-nav li {
            flex: 1;
            text-align: center;
            padding: 10px;
            background-color: #e9ecef;
            border-radius: 4px;
            margin: 0 5px;
            font-weight: bold;
        }
        .step-nav li.active {
            background-color: #007bff;
            color: white;
        }
        form {
            margin-top: 20px;
        }
        .form-group {
            margin-bottom: 20px;
        }
        label {
            display: block;
            margin-bottom: 8px;
            font-weight: bold;
            color: #555;
        }
        input[type="text"], input[type="password"], select {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        .btn {
            display: inline-block;
            padding: 12px 24px;
            font-size: 16px;
            font-weight: bold;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
        }
        .btn-primary {
            background-color: #007bff;
            color: white;
            border: none;
        }
        .btn-primary:hover {
            background-color: #0056b3;
        }
        .btn-next {
            float: right;
        }
        .btn-prev {
            float: left;
        }
        .requirements {
            background-color: #e8f4f8;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .requirement-item {
            margin-bottom: 10px;
        }
        .status-success {
            color: green;
        }
        .status-error {
            color: red;
        }
        .check-list {
            background-color: #f8f9fa;
            padding: 20px;
            border-radius: 4px;
            margin-bottom: 20px;
        }
        .check-item {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 10px;
            border-bottom: 1px solid #e9ecef;
        }
        .check-item:last-child {
            border-bottom: none;
        }
        .check-name {
            font-weight: bold;
        }
        .check-result {
            text-align: right;
        }
        .success-message {
            text-align: center;
            padding: 40px 0;
        }
        .success-icon {
            font-size: 64px;
            color: #28a745;
            margin-bottom: 20px;
        }
        .info-box {
            background-color: #d1ecf1;
            padding: 15px;
            border-radius: 4px;
            margin-top: 20px;
            border-left: 4px solid #17a2b8;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>ShopXO 安装程序</h1>
        
        {step_nav}
        
        {content}
    </div>
</body>
</html>
HTML;

// 根据不同步骤渲染不同内容
switch ($step) {
    case 'check':
        // 环境检测
        $requirements = checkEnvironment();
        $content = '<h3>环境检测</h3>';
        $content .= '<div class="check-list">';
        
        $allPass = true;
        foreach ($requirements as $req) {
            $statusClass = $req['status'] ? 'status-success' : 'status-error';
            $statusText = $req['status'] ? '✓ 通过' : '✗ 不通过';
            $content .= '<div class="check-item">';
            $content .= '<div class="check-name">' . $req['name'] . '</div>';
            $content .= '<div class="check-result">';
            $content .= '<span>需求: ' . $req['required'] . '</span><br>';
            $content .= '<span>当前: ' . $req['current'] . '</span><br>';
            $content .= '<span class="' . $statusClass . '">' . $statusText . '</span>';
            $content .= '</div>';
            $content .= '</div>';
            
            if (!$req['status']) {
                $allPass = false;
            }
        }
        $content .= '</div>';
        
        $content .= '<form action="install.php?step=config" method="post">';
        if ($allPass) {
            $content .= '<div class="form-group">';
            $content .= '<button type="submit" class="btn btn-primary btn-next">下一步</button>';
            $content .= '</div>';
        } else {
            $content .= '<div class="form-group">';
            $content .= '<p class="status-error">请修复上述环境问题后再继续安装</p>';
            $content .= '</div>';
        }
        $content .= '<div class="form-group">';
        $content .= '<a href="install.php?step=agreement" class="btn btn-primary btn-prev">上一步</a>';
        $content .= '</div>';
        $content .= '</form>';
        break;
        
    case 'config':
        // 数据配置
        $content = '<h3>数据配置</h3>';
        $content .= '<form action="install.php?step=install" method="post">';
        
        // 数据库配置
        $content .= '<div class="requirements">';
        $content .= '<h4>数据库配置</h4>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_host">数据库服务器地址</label>';
        $content .= '<input type="text" id="db_host" name="db_host" value="localhost" required>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_port">数据库端口</label>';
        $content .= '<input type="text" id="db_port" name="db_port" value="3306" required>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_name">数据库名</label>';
        $content .= '<input type="text" id="db_name" name="db_name" required>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_user">数据库用户名</label>';
        $content .= '<input type="text" id="db_user" name="db_user" required>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_password">数据库密码</label>';
        $content .= '<input type="password" id="db_password" name="db_password">';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="db_prefix">数据表前缀</label>';
        $content .= '<input type="text" id="db_prefix" name="db_prefix" value="sxo_" required>';
        $content .= '</div>';
        $content .= '</div>';
        
        // 管理员配置
        $content .= '<div class="requirements">';
        $content .= '<h4>管理员配置</h4>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="admin_username">管理员账号</label>';
        $content .= '<input type="text" id="admin_username" name="admin_username" required>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<label for="admin_password">管理员密码</label>';
        $content .= '<input type="password" id="admin_password" name="admin_password" required>';
        $content .= '</div>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<a href="install.php?step=check" class="btn btn-primary btn-prev">上一步</a>';
        $content .= '<button type="submit" class="btn btn-primary btn-next">安装</button>';
        $content .= '</div>';
        $content .= '</form>';
        break;
        
    case 'install':
        // 执行安装
        if ($_SERVER['REQUEST_METHOD'] == 'POST') {
            // 获取配置
            $dbConfig = [
                'host' => $_POST['db_host'],
                'port' => $_POST['db_port'],
                'name' => $_POST['db_name'],
                'user' => $_POST['db_user'],
                'password' => $_POST['db_password'],
                'prefix' => $_POST['db_prefix']
            ];
            
            $adminConfig = [
                'username' => $_POST['admin_username'],
                'password' => $_POST['admin_password']
            ];
            
            // 生成配置文件
            $configContent = <<<PHP
<?php
// +----------------------------------------------------------------------
// | ShopXO 国内领先企业级B2C免费开源电商系统
// +----------------------------------------------------------------------
// | Copyright (c) 2011~2099 http://shopxo.net All rights reserved.
// +----------------------------------------------------------------------
// | Licensed ( https://opensource.org/licenses/mit-license.php )
// +----------------------------------------------------------------------
// | Author: Devil
// +----------------------------------------------------------------------

// +----------------------------------------------------------------------
// | 数据库配置
// +----------------------------------------------------------------------
return [
    // 默认使用的数据库连接配置
    'default'         => 'mysql',

    // 自定义时间查询规则
    'time_query_rule' => [],

    // 自动写入时间戳字段
    // true为自动识别类型 false关闭
    // 字符串则明确指定时间字段类型 支持 int timestamp datetime date
    'auto_timestamp'  => true,

    // 时间字段取出后的默认时间格式
    'datetime_format' => 'Y-m-d H:i:s',

    // 数据库连接配置信息
    'connections'     => [
        'mysql' => [
            // 数据库类型
            'type'            => 'mysql',
            // 服务器地址
            'hostname'        => '{$dbConfig['host']}',
            // 数据库名
            'database'        => '{$dbConfig['name']}',
            // 用户名
            'username'        => '{$dbConfig['user']}',
            // 密码
            'password'        => '{$dbConfig['password']}',
            // 端口
            'hostport'        => '{$dbConfig['port']}',
            // 数据库连接参数
            'params'          => [
                PDO::ATTR_CASE => PDO::CASE_LOWER,
                PDO::ATTR_EMULATE_PREPARES => true,
            ],
            // 数据库编码默认采用utf8mb4
            'charset'         => 'utf8mb4',
            // 数据库表前缀
            'prefix'          => '{$dbConfig['prefix']}',

            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy'          => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate'     => false,
            // 读写分离后 主服务器数量
            'master_num'      => 1,
            // 指定从服务器序号
            'slave_no'        => '',
            // 是否严格检查字段是否存在
            'fields_strict'   => true,
            // 是否需要断线重连
            'break_reconnect' => false,
            // 监听SQL
            'trigger_sql'     => false,
            // 开启字段缓存
            'fields_cache'    => false,
        ]
    ]
];
?>
PHP;
            
            // 保存配置文件
            $configPath = __DIR__ . '/../config/database.php';
            if (file_put_contents($configPath, $configContent)) {
                // 跳转到成功页面
                header('Location: install.php?step=success');
                exit;
            } else {
                $content = '<h3>安装失败</h3>';
                $content .= '<div class="info-box">';
                $content .= '<p>无法写入配置文件，请检查目录权限</p>';
                $content .= '<p>配置文件路径：' . $configPath . '</p>';
                $content .= '</div>';
                $content .= '<div class="form-group">';
                $content .= '<a href="install.php?step=config" class="btn btn-primary">返回重试</a>';
                $content .= '</div>';
            }
        }
        break;
        
    case 'success':
        // 安装成功
        $content = '<div class="success-message">';
        $content .= '<div class="success-icon">✓</div>';
        $content .= '<h2>安装成功！</h2>';
        $content .= '<p>ShopXO 电商系统已成功安装到您的服务器</p>';
        
        $content .= '<div class="info-box">';
        $content .= '<h4>下一步操作：</h4>';
        $content .= '<ul>';
        $content .= '<li>1. <a href="/" target="_blank">访问前台首页</a></li>';
        $content .= '<li>2. <a href="/admin.php" target="_blank">登录管理后台</a></li>';
        $content .= '<li>3. 建议删除 install.php 文件，提高系统安全性</li>';
        $content .= '</ul>';
        $content .= '</div>';
        
        $content .= '<div class="info-box">';
        $content .= '<h4>默认管理账号：</h4>';
        $content .= '<p>安装过程中设置的管理员账号和密码</p>';
        $content .= '</div>';
        break;
        
    default:
        // 协议阅读
        $content = '<div class="requirements">';
        $content .= '<h3>安装协议</h3>';
        $content .= '<p>欢迎使用 ShopXO 电商系统！在安装前，请仔细阅读以下协议：</p>';
        $content .= '<ul>';
        $content .= '<li>1. ShopXO 是开源免费的电商系统，遵循 MIT 开源协议</li>';
        $content .= '<li>2. 您可以自由使用、修改和分发本系统</li>';
        $content .= '<li>3. 本系统不提供任何形式的担保，使用风险自负</li>';
        $content .= '<li>4. 请确保您的服务器环境符合安装要求</li>';
        $content .= '</ul>';
        $content .= '</div>';
        
        $content .= '<form action="install.php?step=check" method="post">';
        $content .= '<div class="form-group">';
        $content .= '<input type="checkbox" id="agree" name="agree" required>';
        $content .= '<label for="agree">我已阅读并同意安装协议</label>';
        $content .= '</div>';
        
        $content .= '<div class="form-group">';
        $content .= '<button type="submit" class="btn btn-primary btn-next">下一步</button>';
        $content .= '</div>';
        $content .= '</form>';
}

// 渲染页面
$stepNav = renderStepNav($step);
$html = str_replace('{step_nav}', ob_get_clean(), $htmlTemplate);
$html = str_replace('{content}', $content, $html);

echo $html;
