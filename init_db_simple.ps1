# 简化版MySQL数据库初始化脚本

Write-Host "ShopXO B2B电池交易平台数据库初始化"
Write-Host "=" * 50

# 检查MySQL服务状态
Write-Host "检查MySQL服务状态..."
$mysqlService = Get-Service -Name MySQL* -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -eq "Running") {
    Write-Host "✅ MySQL服务正在运行：$($mysqlService.Name)"
} else {
    Write-Host "❌ MySQL服务未运行，请先启动MySQL服务"
    exit 1
}

# 检查SQL文件是否存在
$coreSqlFile = "g:/b2bweb3.0d/shopxo/config/shopxo.sql"
$b2bSqlFile = "g:/b2bweb3.0d/b2b_standalone.sql"

if (-not (Test-Path $coreSqlFile)) {
    Write-Host "❌ ShopXO核心SQL脚本不存在：$coreSqlFile"
    exit 1
}

if (-not (Test-Path $b2bSqlFile)) {
    Write-Host "❌ B2B电池交易平台SQL脚本不存在：$b2bSqlFile"
    exit 1
}

Write-Host "✅ 所有SQL脚本文件已准备就绪"

# 提供手动执行步骤
Write-Host ""
Write-Host "请按照以下步骤手动执行数据库初始化："
Write-Host "1. 打开命令提示符(cmd)"
Write-Host "2. 执行以下命令创建数据库："
Write-Host "   mysql -u root -p -e \"CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\""
Write-Host "3. 执行ShopXO核心SQL脚本："
Write-Host "   mysql -u root -p shopxo < $coreSqlFile"
Write-Host "4. 执行B2B电池交易平台SQL脚本："
Write-Host "   mysql -u root -p shopxo < $b2bSqlFile"
Write-Host ""
Write-Host "注意：请使用命令提示符(cmd)执行，不要使用PowerShell，因为PowerShell不支持<重定向操作符"
Write-Host ""
Write-Host "数据库初始化步骤已输出到屏幕，请手动执行。"
