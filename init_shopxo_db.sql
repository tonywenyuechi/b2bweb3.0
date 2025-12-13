-- 初始化ShopXO数据库
CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopxo;

-- 导入ShopXO核心系统表
SOURCE g:/b2bweb3.0d/shopxo/config/shopxo.sql;

-- 导入B2B电池交易平台扩展表
SOURCE g:/b2bweb3.0d/shopxo/sql/b2b_battery.sql;