<?php
// 检查vendor目录是否存在
$vendor_dir = 'G:\b2bweb3.0d\shopxo\vendor';

if (file_exists($vendor_dir)) {
    echo "vendor目录已存在\n";
    // 列出vendor目录下的内容
    $files = scandir($vendor_dir);
    echo "vendor目录内容：\n";
    foreach ($files as $file) {
        if ($file != '.' && $file != '..') {
            echo "  - $file\n";
        }
    }
} else {
    echo "vendor目录不存在，开始安装Composer依赖\n";
    // 切换到ShopXO目录
    chdir('G:\b2bweb3.0d\shopxo');
    // 执行Composer安装命令
    $output = array();
    $return_var = 0;
    exec('composer install', $output, $return_var);
    echo "Composer安装结果：\n";
    foreach ($output as $line) {
        echo "  $line\n";
    }
    echo "返回码：$return_var\n";
}
