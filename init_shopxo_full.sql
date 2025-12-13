-- 初始化完整的ShopXO系统
-- 1. 执行ShopXO核心系统SQL脚本
SOURCE g:/b2bweb3.0d/shopxo/config/shopxo.sql;

-- 2. 执行B2B电池交易平台SQL脚本
SOURCE g:/b2bweb3.0d/b2b_standalone.sql;

-- 3. 完成初始化
SELECT 'ShopXO系统和B2B电池交易平台初始化完成！';
