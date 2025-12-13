<?php
// 查看php.ini中关于MySQL PDO驱动的配置
$php_ini_path = php_ini_loaded_file();
echo "php.ini文件路径：$php_ini_path\n\n";

if ($php_ini_path) {
    $content = file_get_contents($php_ini_path);
    
    // 查找MySQL PDO相关配置
    preg_match_all('/^(extension\s*=\s*pdo_mysql|extension\s*=\s*mysqli|;extension\s*=\s*pdo_mysql|;extension\s*=\s*mysqli)/im', $content, $matches);
    
    if (!empty($matches[0])) {
        echo "MySQL PDO相关配置：\n";
        foreach ($matches[0] as $match) {
            echo "  $match\n";
        }
    } else {
        echo "未找到MySQL PDO相关配置\n";
    }
    
    // 查看当前已加载的PDO驱动
    echo "\n当前已加载的PDO驱动：\n";
    if (extension_loaded('pdo')) {
        $drivers = PDO::getAvailableDrivers();
        foreach ($drivers as $driver) {
            echo "  - $driver\n";
        }
    } else {
        echo "  PDO扩展未加载\n";
    }
} else {
    echo "未找到加载的php.ini文件\n";
}
