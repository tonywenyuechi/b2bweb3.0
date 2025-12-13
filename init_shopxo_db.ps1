$password = Read-Host "请输入MySQL root密码" -AsSecureString
$passwordPlain = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# 创建数据库
& "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql" -u root -p$passwordPlain -e "CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 导入ShopXO核心表
& "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql" -u root -p$passwordPlain -D shopxo < "G:\b2bweb3.0d\shopxo\config\shopxo.sql"

# 导入B2B电池交易平台扩展表
& "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql" -u root -p$passwordPlain -D shopxo < "G:\b2bweb3.0d\shopxo\sql\b2b_battery.sql"

echo "数据库初始化完成！"
Read-Host "按Enter键继续..."