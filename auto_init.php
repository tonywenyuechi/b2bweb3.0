<?php
// 自动初始化ShopXO脚本
error_reporting(E_ALL);
ini_set('display_errors', 1);

// 数据库连接配置
$db_host = 'localhost';
$db_user = 'root';
$db_pass = 'Qq700323*&'; // 请在此处输入您的MySQL root密码
$db_name = 'shopxo';

echo "==========================================\n";
echo "ShopXO自动初始化脚本\n";
echo "==========================================\n\n";

// 1. 连接MySQL
echo "1. 正在连接MySQL...\n";
try {
    $pdo = new PDO("mysql:host=$db_host;charset=utf8mb4", $db_user, $db_pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ MySQL连接成功\n\n";
} catch (PDOException $e) {
    die("❌ MySQL连接失败: " . $e->getMessage() . "\n\n");
}

// 2. 创建数据库
echo "2. 正在创建数据库...\n";
try {
    $pdo->exec("CREATE DATABASE IF NOT EXISTS $db_name DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");
    echo "✅ 数据库创建成功\n\n";
} catch (PDOException $e) {
    die("❌ 数据库创建失败: " . $e->getMessage() . "\n\n");
}

// 3. 选择数据库
$pdo->exec("USE $db_name");

// 4. 创建核心配置表
echo "3. 正在创建核心表...\n";

// 核心配置表
$core_tables = [
    // 配置表
    "CREATE TABLE IF NOT EXISTS `sxo_config` (
        `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '基本设置id',
        `value` mediumtext NOT NULL COMMENT '数据值',
        `name` varchar(60) NOT NULL COMMENT '名称',
        `describe` varchar(255) NOT NULL COMMENT '描述',
        `error_tips` varchar(150) NOT NULL COMMENT '错误提示',
        `type` varchar(30) NOT NULL COMMENT '类型（admin后台, home前台）',
        `only_tag` varchar(60) NOT NULL COMMENT '唯一的标记',
        `upd_time` int(11) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (`id`),
        UNIQUE KEY `only_tag` (`only_tag`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='基本配置参数'",
    
    // 用户表
    "CREATE TABLE IF NOT EXISTS `sxo_user` (
        `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
        `token` char(60) NOT NULL COMMENT '登录令牌',
        `username` char(30) NOT NULL COMMENT '用户名',
        `login_pwd` char(32) NOT NULL COMMENT '登录密码',
        `login_salt` char(6) NOT NULL COMMENT '登录密码配合加密字符串',
        `mobile` char(11) NOT NULL COMMENT '手机号码',
        `email` char(60) NOT NULL COMMENT '邮箱',
        `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别（0保密，1女，2男）',
        `last_login_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
        `last_login_ip` char(15) NOT NULL COMMENT '最后登录ip',
        `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态（0无效, 1有效）',
        `add_time` int(11) NOT NULL COMMENT '添加时间',
        `upd_time` int(11) NOT NULL COMMENT '更新时间',
        PRIMARY KEY (`id`),
        KEY `token` (`token`),
        KEY `username` (`username`),
        KEY `mobile` (`mobile`),
        KEY `email` (`email`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户'",
    
    // 安装标记表
    "CREATE TABLE IF NOT EXISTS `sxo_install` (
        `id` int(11) NOT NULL AUTO_INCREMENT,
        `version` varchar(30) NOT NULL COMMENT '版本号',
        `install_time` int(11) NOT NULL COMMENT '安装时间',
        PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='安装信息'"
];

foreach ($core_tables as $sql) {
    try {
        $pdo->exec($sql);
    } catch (PDOException $e) {
        echo "⚠️ 创建表失败: " . $e->getMessage() . "\n";
    }
}
echo "✅ 核心表创建完成\n\n";

// 5. 插入默认数据
echo "4. 正在插入默认数据...\n";

$default_data = [
    // 默认配置
    "INSERT INTO `sxo_config` (`id`, `value`, `name`, `describe`, `error_tips`, `type`, `only_tag`, `upd_time`) VALUES
    (1, '网站名称', '站点名称', '', '站点名称不能为空', 'home', 'home_site_name', 1600000000),
    (2, '网站名称 - SEO标题', '站点标题', '浏览器标题，一般不超过80个字符', '站点标题不能为空', 'home', 'home_seo_site_title', 1600000000),
    (3, 'SEO站点关键字', '站点关键字', '一般不超过100个字符，多个关键字以半圆角逗号 [ , ] 隔开', '站点关键字不能为空', 'home', 'home_seo_site_keywords', 1600000000),
    (4, 'SEO站点描述', '站点描述', '站点描述，一般不超过200个字符', '站点描述不能为空', 'home', 'home_seo_site_description', 1600000000),
    (5, '0', '网站关闭', '是否关闭网站', '', 'home', 'home_site_is_close', 1600000000),
    (6, 'Asia/Shanghai', '默认时区', '默认 亚洲/上海 [标准时+8]', '请选择默认时区', 'common', 'common_timezone', 1600000000)",
    
    // 默认管理员账号（用户名：admin，密码：admin）
    "INSERT IGNORE INTO `sxo_user` (`id`, `token`, `username`, `login_pwd`, `login_salt`, `mobile`, `email`, `gender`, `last_login_time`, `last_login_ip`, `status`, `add_time`, `upd_time`) VALUES
    (1, '', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '', '', 0, 0, '', 1, 1600000000, 1600000000)",
    
    // 安装标记
    "INSERT IGNORE INTO `sxo_install` (`id`, `version`, `install_time`) VALUES (1, 'v6.7.1', UNIX_TIMESTAMP())"
];

foreach ($default_data as $sql) {
    try {
        $pdo->exec($sql);
    } catch (PDOException $e) {
        echo "⚠️ 插入数据失败: " . $e->getMessage() . "\n";
    }
}
echo "✅ 默认数据插入完成\n\n";

// 6. 导入B2B电池交易平台表
echo "5. 正在导入B2B电池交易平台表...\n";
try {
    $b2b_sql = file_get_contents('G:/b2bweb3.0d/b2b_standalone.sql');
    $pdo->exec($b2b_sql);
    echo "✅ B2B电池交易平台表导入完成\n\n";
} catch (PDOException $e) {
    echo "⚠️ B2B表导入失败: " . $e->getMessage() . "\n\n";
} catch (Exception $e) {
    echo "⚠️ 读取B2B SQL文件失败: " . $e->getMessage() . "\n\n";
}

// 7. 更新数据库配置文件
echo "6. 正在更新数据库配置...\n";
try {
    $config_content = <<<EOF
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

// 数据库配置
return [
    // 默认使用的数据库连接配置
    'default'         => 'mysql',

    // 数据库连接配置信息
    'connections'     => [
        // mysql数据库连接配置
        'mysql' => [
            // 数据库类型
            'type'     => 'mysql',
            // 服务器地址
            'hostname' => '$db_host',
            // 数据库名
            'database' => '$db_name',
            // 用户名
            'username' => '$db_user',
            // 密码
            'password' => '$db_pass',
            // 端口
            'hostport' => '3306',
            // 数据库连接参数
            'params'   => [],
            // 数据库编码默认采用utf8
            'charset'  => 'utf8mb4',
            // 数据库表前缀
            'prefix'   => 'sxo_',
            // 数据库调试模式
            'debug'    => true,
            // 数据库部署方式:0 集中式(单一服务器),1 分布式(主从服务器)
            'deploy'   => 0,
            // 数据库读写是否分离 主从式有效
            'rw_separate'       => false,
            // 读写分离后 主服务器数量
            'master_num'        => 1,
            // 指定从服务器序号
            'slave_no'          => '',
            // 是否严格检查字段是否存在
            'fields_strict'     => true,
            // 是否需要断线重连
            'break_reconnect'   => false,
            // 监听SQL
            'trigger_sql'       => true,
            // 是否开启字段缓存
            'fields_cache'      => false,
            // 字段缓存路径
            'schema_cache_path' => app()->getRuntimePath() . 'schema' . DIRECTORY_SEPARATOR,
        ],
    ],
];
EOF;
    file_put_contents('G:/b2bweb3.0d/shopxo/config/database.php', $config_content);
    echo "✅ 数据库配置更新完成\n\n";
} catch (Exception $e) {
    echo "⚠️ 更新配置文件失败: " . $e->getMessage() . "\n\n";
}

// 8. 启动PHP服务器
echo "7. 正在启动PHP开发服务器...\n";
echo "请在浏览器中访问: http://localhost:8000\n\n";

// 输出完成信息
echo "==========================================\n";
echo "ShopXO自动初始化完成！\n";
echo "==========================================\n";
echo "访问地址: http://localhost:8000\n";
echo "后台地址: http://localhost:8000/admin.php\n";
echo "默认账号: admin\n";
echo "默认密码: admin\n";
echo "==========================================\n";

// 启动PHP开发服务器
exec("cd G:/b2bweb3.0d/shopxo && php -S localhost:8000 -d extension=mysqli -d extension=pdo_mysql");