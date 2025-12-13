<?php
// 交互式测试数据库连接参数
$host = readline("请输入MySQL主机地址（默认：localhost）: ") ?: 'localhost';
$dbname = readline("请输入数据库名称（默认：shopxo）: ") ?: 'shopxo';
$username = readline("请输入数据库用户名（默认：root）: ") ?: 'root';
$password = readline("请输入数据库密码（默认：空）: ");

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

echo "\n正在测试连接...\n";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ 数据库连接成功！\n\n";
    
    // 测试查询
    $stmt = $pdo->query('SHOW TABLES LIKE "sxo_%"');
    $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);
    
    echo "数据库表列表：\n";
    if (empty($tables)) {
        echo "  没有找到任何表\n";
    } else {
        foreach ($tables as $table) {
            echo "  - $table\n";
        }
    }
    
    echo "\n✅ 数据库连接正常！\n";
    echo "\n请将以下连接参数配置到ShopXO的config/database.php文件中：\n";
    echo "\n// 数据库连接配置\n";
    echo "return [\n";
    echo "    'default' => 'mysql',\n";
    echo "    'connections' => [\n";
    echo "        'mysql' => [\n";
    echo "            'type' => 'mysql',\n";
    echo "            'hostname' => '$host',\n";
    echo "            'database' => '$dbname',\n";
    echo "            'username' => '$username',\n";
    echo "            'password' => '$password',\n";
    echo "            'hostport' => '3306',\n";
    echo "            'charset' => 'utf8mb4',\n";
    echo "            'prefix' => 'sxo_',\n";
    echo "        ],\n";
    echo "    ],\n";
    echo "];\n";
} catch (PDOException $e) {
    echo "❌ 数据库连接失败：" . $e->getMessage() . "\n\n";
    echo "请检查以下事项：\n";
    echo "1. MySQL服务是否正在运行\n";
    echo "2. 数据库连接配置是否正确\n";
    echo "3. 数据库用户权限是否足够\n";
    echo "4. 防火墙是否允许MySQL连接\n";
}
