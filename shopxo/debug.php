<?php
// 调试脚本
require __DIR__.'/public/core.php';

echo "<h2>调试信息</h2>";
echo "<h3>请求参数</h3>";
echo "<pre>";
print_r($_GET);
print_r($_POST);
print_r($_REQUEST);
echo "</pre>";

echo "<h3>路由信息</h3>";
echo "SCRIPT_NAME: " . (isset($_SERVER['SCRIPT_NAME']) ? $_SERVER['SCRIPT_NAME'] : '无') . "<br>";
echo "PHP_SELF: " . (isset($_SERVER['PHP_SELF']) ? $_SERVER['PHP_SELF'] : '无') . "<br>";
echo "REQUEST_URI: " . (isset($_SERVER['REQUEST_URI']) ? $_SERVER['REQUEST_URI'] : '无') . "<br>";
echo "当前脚本: " . SCRIPT_NAME . "<br>";
echo "是否设置了s参数: " . (isset($_GET['s']) ? $_GET['s'] : '无') . "<br>";

echo "<h3>控制器和方法</h3>";
echo "控制器: " . request()->controller() . "<br>";
echo "方法: " . request()->action() . "<br>";
echo "模块: " . request()->module() . "<br>";

echo "<h3>登录信息</h3>";
$admin = AdminService::LoginInfo();
echo "登录状态: " . (empty($admin) ? '未登录' : '已登录') . "<br>";
if(!empty($admin)) {
    echo "管理员ID: " . $admin['id'] . "<br>";
    echo "管理员用户名: " . $admin['username'] . "<br>";
}

echo "<h3>权限检查</h3>";
$controller = strtolower(request()->controller());
$action = strtolower(request()->action());
echo "当前控制器: $controller, 当前方法: $action<br>";
$is_power = AdminIsPower($controller, $action);
echo "权限检查结果: " . ($is_power ? '通过' : '不通过') . "<br>";

// 测试登录页面权限检查
echo "<h3>登录页面权限测试</h3>";
$login_is_power = AdminIsPower('admin', 'logininfo');
echo "logininfo方法权限检查: " . ($login_is_power ? '通过' : '不通过') . "<br>";

// 输出当前页面的完整URL
echo "<h3>当前URL</h3>";
echo "完整URL: " . __MY_VIEW_URL__ . "<br>";

// 重定向到登录页面进行测试
echo "<h3>重定向测试</h3>";
echo "<a href='admin.php?s=admin/admin/logininfo'>点击跳转到登录页面</a><br>";
echo "<a href='admin.php'>点击跳转到默认页面</a><br>";

// 输出配置信息
echo "<h3>配置信息</h3>";
echo "数据库配置文件存在: " . (file_exists(ROOT.'config/database.php') ? '是' : '否') . "<br>";
echo "应用调试模式: " . MyConfig('app_debug') . "<br>";