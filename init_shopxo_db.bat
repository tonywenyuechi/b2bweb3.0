@echo off
set /p password=请输入MySQL root密码: 
"C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql" -u root -p%password% < "G:\b2bweb3.0d\init_shopxo_db.sql"
echo 数据库初始化完成！
pause