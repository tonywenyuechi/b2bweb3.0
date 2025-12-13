@echo off
set /p password=请输入MySQL root密码: 
mysql -u root -p%password% -e "CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p%password% shopxo < g:/b2bweb3.0d/shopxo/config/shopxo.sql
mysql -u root -p%password% shopxo < g:/b2bweb3.0d/b2b_standalone.sql
echo 数据库初始化完成！
pause