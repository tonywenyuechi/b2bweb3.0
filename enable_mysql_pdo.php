<?php
// 启用MySQL PDO驱动
$php_ini_path = php_ini_loaded_file();
echo "php.ini文件路径：$php_ini_path\n\n";

if ($php_ini_path) {
    $content = file_get_contents($php_ini_path);
    
    // 启用MySQLi和PDO MySQL扩展
    $content = preg_replace('/^;extension\s*=\s*mysqli/i', 'extension=mysqli', $content);
    $content = preg_replace('/^;extension\s*=\s*pdo_mysql/i', 'extension=pdo_mysql', $content);
    
    // 保存修改后的内容
    if (file_put_contents($php_ini_path, $content) !== false) {
        echo "✅ 已成功启用MySQL PDO驱动！\n\n";
        echo "请重启Web服务器或命令行终端，然后重新运行ShopXO。\n\n";
        echo "如果遇到权限问题无法写入php.ini文件，请手动编辑以下文件：\n";
        echo "  $php_ini_path\n\n";
        echo "手动修改步骤：\n";
        echo "1. 打开php.ini文件\n";
        echo "2. 查找并取消注释以下两行（去掉前面的分号）：\n";
        echo "   ;extension=mysqli   ->   extension=mysqli\n";
        echo "   ;extension=pdo_mysql   ->   extension=pdo_mysql\n";
        echo "3. 保存文件\n";
        echo "4. 重启Web服务器或命令行终端\n";
    } else {
        echo "❌ 无法写入php.ini文件，请手动修改！\n\n";
        echo "请手动编辑以下文件：\n";
        echo "  $php_ini_path\n\n";
        echo "手动修改步骤：\n";
        echo "1. 打开php.ini文件\n";
        echo "2. 查找并取消注释以下两行（去掉前面的分号）：\n";
        echo "   ;extension=mysqli   ->   extension=mysqli\n";
        echo "   ;extension=pdo_mysql   ->   extension=pdo_mysql\n";
        echo "3. 保存文件\n";
        echo "4. 重启Web服务器或命令行终端\n";
    }
} else {
    echo "❌ 未找到加载的php.ini文件\n";
}
