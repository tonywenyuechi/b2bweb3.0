@echo off
chcp 65001 > nul
echo ShopXO B2B电池交易平台数据库初始化
echo ========================================================

REM 数据库连接信息
set DB_USER=root
set DB_PASS=Qq700323*&
set DB_NAME=shopxo
set DB_HOST=localhost
set DB_PORT=3306

REM SQL文件路径
set CORE_SQL_FILE=g:/b2bweb3.0d/shopxo/config/shopxo.sql
set B2B_SQL_FILE=g:/b2bweb3.0d/b2b_standalone.sql

REM 检查SQL文件是否存在
if not exist "%CORE_SQL_FILE%" (
    echo ❌ ShopXO核心SQL脚本不存在: %CORE_SQL_FILE%
    pause
    exit /b 1
)

if not exist "%B2B_SQL_FILE%" (
    echo ❌ B2B电池交易平台SQL脚本不存在: %B2B_SQL_FILE%
    pause
    exit /b 1
)

echo ✅ 所有SQL脚本文件已准备就绪

REM 1. 创建数据库
echo.
echo 1. 创建数据库 %DB_NAME%...
mysql -u %DB_USER% -p%DB_PASS% -e "CREATE DATABASE IF NOT EXISTS %DB_NAME% DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if %errorlevel% equ 0 (
    echo    ✅ 数据库创建成功
) else (
    echo    ❌ 数据库创建失败
)

REM 2. 执行ShopXO核心SQL脚本
echo 2. 执行ShopXO核心SQL脚本...
mysql -u %DB_USER% -p%DB_PASS% %DB_NAME% < "%CORE_SQL_FILE%"
if %errorlevel% equ 0 (
    echo    ✅ ShopXO核心SQL执行成功
) else (
    echo    ❌ ShopXO核心SQL执行失败
)

REM 3. 执行B2B电池交易平台SQL脚本
echo 3. 执行B2B电池交易平台SQL脚本...
mysql -u %DB_USER% -p%DB_PASS% %DB_NAME% < "%B2B_SQL_FILE%"
if %errorlevel% equ 0 (
    echo    ✅ B2B电池交易平台SQL执行成功
) else (
    echo    ❌ B2B电池交易平台SQL执行失败
)

echo.
echo ========================================================
echo 数据库初始化完成！
echo 接下来您可以：
echo 1. 启动Web服务器
echo 2. 访问 http://localhost:8000 进入前台
echo 3. 访问 http://localhost:8000/admin.php 进入后台管理
echo ========================================================
pause
