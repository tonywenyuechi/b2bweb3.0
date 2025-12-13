# MySQL数据库初始化脚本
$mysqlPath = "mysql"

# 获取MySQL密码
$password = Read-Host -Prompt "请输入MySQL root密码" -AsSecureString
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($password))

# 1. 创建数据库
Write-Host "正在创建数据库..."
$createDbCommand = "$mysqlPath -u root -p`"$plainPassword`" -e `"CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`""
Invoke-Expression $createDbCommand

# 2. 执行ShopXO核心SQL脚本
Write-Host "正在执行ShopXO核心SQL脚本..."
$coreSqlCommand = "$mysqlPath -u root -p`"$plainPassword`" shopxo < g:/b2bweb3.0d/shopxo/config/shopxo.sql"
cmd /c $coreSqlCommand

# 3. 执行B2B电池交易平台SQL脚本
Write-Host "正在执行B2B电池交易平台SQL脚本..."
$b2bSqlCommand = "$mysqlPath -u root -p`"$plainPassword`" shopxo < g:/b2bweb3.0d/b2b_standalone.sql"
cmd /c $b2bSqlCommand

Write-Host "数据库初始化完成！" -ForegroundColor Green
