# 最终版ShopXO B2B数据库初始化脚本
# 直接从配置文件读取数据库连接信息

Write-Host "ShopXO B2B电池交易平台数据库初始化"
Write-Host "=" * 50

# 1. 读取数据库配置
$configFile = "g:/b2bweb3.0d/shopxo/config/database.php"
if (-not (Test-Path $configFile)) {
    Write-Host "❌ 数据库配置文件不存在: $configFile"
    exit 1
}

Write-Host "✅ 读取数据库配置文件..."
$configContent = Get-Content $configFile -Raw

# 提取配置信息
$dbHost = [regex]::Match($configContent, "'hostname'\s*=>\s*'([^']+)'").Groups[1].Value
$dbName = [regex]::Match($configContent, "'database'\s*=>\s*'([^']+)'").Groups[1].Value
$dbUser = [regex]::Match($configContent, "'username'\s*=>\s*'([^']+)'").Groups[1].Value
$dbPass = [regex]::Match($configContent, "'password'\s*=>\s*'([^']+)'").Groups[1].Value
$dbPort = [regex]::Match($configContent, "'hostport'\s*=>\s*'([^']+)'").Groups[1].Value
$dbPrefix = [regex]::Match($configContent, "'prefix'\s*=>\s*'([^']+)'").Groups[1].Value

Write-Host "  数据库主机: $dbHost"
Write-Host "  数据库名称: $dbName"
Write-Host "  数据库用户: $dbUser"
Write-Host "  数据库端口: $dbPort"
Write-Host "  表前缀: $dbPrefix"

# 2. 检查SQL文件
$coreSqlFile = "g:/b2bweb3.0d/shopxo/config/shopxo.sql"
$b2bSqlFile = "g:/b2bweb3.0d/b2b_standalone.sql"

if (-not (Test-Path $coreSqlFile)) {
    Write-Host "❌ ShopXO核心SQL脚本不存在: $coreSqlFile"
    exit 1
}

if (-not (Test-Path $b2bSqlFile)) {
    Write-Host "❌ B2B电池交易平台SQL脚本不存在: $b2bSqlFile"
    exit 1
}

Write-Host "✅ 所有SQL脚本文件已准备就绪"

# 3. 执行数据库初始化
Write-Host ""
Write-Host "开始数据库初始化..."

# 创建数据库
Write-Host "1. 创建数据库 $dbName..."
$createDbCmd = "cmd.exe /c mysql -u $dbUser -p`"$dbPass`" -e `"CREATE DATABASE IF NOT EXISTS $dbName DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`""
Invoke-Expression $createDbCmd 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ 数据库创建成功"
} else {
    Write-Host "   ❌ 数据库创建失败"
}

# 执行核心SQL
Write-Host "2. 执行ShopXO核心SQL脚本..."
$coreCmd = "cmd.exe /c mysql -u $dbUser -p`"$dbPass`" $dbName < `"$coreSqlFile`""
Invoke-Expression $coreCmd 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ ShopXO核心SQL执行成功"
} else {
    Write-Host "   ❌ ShopXO核心SQL执行失败"
}

# 执行B2B SQL
Write-Host "3. 执行B2B电池交易平台SQL脚本..."
$b2bCmd = "cmd.exe /c mysql -u $dbUser -p`"$dbPass`" $dbName < `"$b2bSqlFile`""
Invoke-Expression $b2bCmd 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "   ✅ B2B电池交易平台SQL执行成功"
} else {
    Write-Host "   ❌ B2B电池交易平台SQL执行失败"
}

Write-Host ""
Write-Host "=" * 50
Write-Host "数据库初始化完成！" -ForegroundColor Green
Write-Host "接下来您可以："
Write-Host "1. 启动Web服务器"
Write-Host "2. 访问 http://localhost:8000 进入前台"
Write-Host "3. 访问 http://localhost:8000/admin.php 进入后台管理"
Write-Host "=" * 50
