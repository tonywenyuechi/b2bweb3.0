<?php
// 测试MySQL PDO连接
$host = 'localhost';
$dbname = 'shopxo';
$username = 'root';
$password = 'root';

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

try {
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "✅ MySQL PDO连接成功！\n\n";
    
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
    
    echo "\n✅ ShopXO数据库连接正常，可以开始安装！\n";
} catch (PDOException $e) {
    echo "❌ MySQL PDO连接失败：" . $e->getMessage() . "\n\n";
    echo "请检查以下事项：\n";
    echo "1. MySQL服务是否正在运行\n";
    echo "2. 数据库连接配置是否正确\n";
    echo "3. MySQL PDO驱动是否已启用\n";
    echo "4. 数据库用户权限是否足够\n";
}
