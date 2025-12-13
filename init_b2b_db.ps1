param(
    [Parameter(Mandatory=$true)]
    [string]$Password
)

# 执行B2B电池交易平台SQL脚本
& "C:\Program Files\MySQL\MySQL Server 9.5\bin\mysql" -u root --password=$Password -D shopxo < "G:\b2bweb3.0d\shopxo\sql\b2b_battery.sql"

echo "B2B电池交易平台数据库表创建完成！"