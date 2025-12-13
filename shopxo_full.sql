-- ShopXO完整初始化脚本
-- 请在MySQL命令行中执行此脚本

-- 1. 创建数据库
CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shopxo;

-- 2. 创建核心配置表
CREATE TABLE IF NOT EXISTS `sxo_config` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '基本设置id',
  `value` mediumtext NOT NULL COMMENT '数据值',
  `name` varchar(60) NOT NULL COMMENT '名称',
  `describe` varchar(255) NOT NULL COMMENT '描述',
  `error_tips` varchar(150) NOT NULL COMMENT '错误提示',
  `type` varchar(30) NOT NULL COMMENT '类型（admin后台, home前台）',
  `only_tag` varchar(60) NOT NULL COMMENT '唯一的标记',
  `upd_time` int(11) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `only_tag` (`only_tag`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='基本配置参数';

-- 3. 创建用户表
CREATE TABLE IF NOT EXISTS `sxo_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `token` char(60) NOT NULL COMMENT '登录令牌',
  `username` char(30) NOT NULL COMMENT '用户名',
  `login_pwd` char(32) NOT NULL COMMENT '登录密码',
  `login_salt` char(6) NOT NULL COMMENT '登录密码配合加密字符串',
  `mobile` char(11) NOT NULL COMMENT '手机号码',
  `email` char(60) NOT NULL COMMENT '邮箱',
  `gender` tinyint(1) NOT NULL DEFAULT '0' COMMENT '性别（0保密，1女，2男）',
  `last_login_time` int(11) NOT NULL DEFAULT '0' COMMENT '最后登录时间',
  `last_login_ip` char(15) NOT NULL COMMENT '最后登录ip',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态（0无效, 1有效）',
  `add_time` int(11) NOT NULL COMMENT '添加时间',
  `upd_time` int(11) NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `token` (`token`),
  KEY `username` (`username`),
  KEY `mobile` (`mobile`),
  KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='用户';

-- 4. 创建安装标记表
CREATE TABLE IF NOT EXISTS `sxo_install` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `version` varchar(30) NOT NULL COMMENT '版本号',
  `install_time` int(11) NOT NULL COMMENT '安装时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4 COMMENT='安装信息';

-- 5. 插入默认配置数据
INSERT INTO `sxo_config` (`id`, `value`, `name`, `describe`, `error_tips`, `type`, `only_tag`, `upd_time`) VALUES
(1, 'ShopXO - B2B电池交易平台', '站点名称', '', '站点名称不能为空', 'home', 'home_site_name', 1600000000),
(2, 'ShopXO - B2B电池交易平台', '站点标题', '浏览器标题', '站点标题不能为空', 'home', 'home_seo_site_title', 1600000000),
(3, '电池交易, B2B电商, 电池平台', '站点关键字', 'SEO关键字', '站点关键字不能为空', 'home', 'home_seo_site_keywords', 1600000000),
(4, '专业的B2B电池交易平台', '站点描述', 'SEO描述', '站点描述不能为空', 'home', 'home_seo_site_description', 1600000000),
(5, '0', '网站关闭', '是否关闭网站', '', 'home', 'home_site_is_close', 1600000000),
(6, '升级中...', '关闭原因', '网站关闭时的提示信息', '', 'home', 'home_site_close_reason', 1600000000),
(7, 'Asia/Shanghai', '默认时区', '系统默认时区', '', 'common', 'common_timezone', 1600000000),
(8, '20', '分页数量', '默认分页显示数量', '', 'admin', 'common_page_size', 1600000000);

-- 6. 插入默认管理员账号
INSERT INTO `sxo_user` (`id`, `token`, `username`, `login_pwd`, `login_salt`, `mobile`, `email`, `gender`, `last_login_time`, `last_login_ip`, `status`, `add_time`, `upd_time`) VALUES
(1, '', 'admin', '21232f297a57a5a743894a0e4a801fc3', 'admin', '', '', 0, 0, '', 1, 1600000000, 1600000000);

-- 7. 插入安装标记
INSERT INTO `sxo_install` (`id`, `version`, `install_time`) VALUES (1, 'v6.7.1', UNIX_TIMESTAMP());

-- 8. 创建B2B电池交易平台表

-- 门店信息表
CREATE TABLE IF NOT EXISTS `sxo_store` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '所属用户ID',
  `store_name` varchar(100) NOT NULL COMMENT '门店名称',
  `store_address` varchar(255) NOT NULL COMMENT '门店地址',
  `contact_person` varchar(50) NOT NULL COMMENT '联系人',
  `contact_phone` varchar(20) NOT NULL COMMENT '联系电话',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='门店信息表';

-- 电池厂家信息表
CREATE TABLE IF NOT EXISTS `sxo_factory` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '所属用户ID',
  `factory_name` varchar(100) NOT NULL COMMENT '厂家名称',
  `factory_address` varchar(255) NOT NULL COMMENT '厂家地址',
  `business_license` varchar(255) NOT NULL COMMENT '营业执照',
  `contact_person` varchar(50) NOT NULL COMMENT '联系人',
  `contact_phone` varchar(20) NOT NULL COMMENT '联系电话',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='电池厂家信息表';

-- 物流企业信息表
CREATE TABLE IF NOT EXISTS `sxo_logistics` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '所属用户ID',
  `logistics_name` varchar(100) NOT NULL COMMENT '物流企业名称',
  `logistics_code` varchar(50) NOT NULL COMMENT '物流编码',
  `contact_person` varchar(50) NOT NULL COMMENT '联系人',
  `contact_phone` varchar(20) NOT NULL COMMENT '联系电话',
  `status` tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态：0-禁用，1-启用',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物流企业信息表';

-- 电池商品扩展表
CREATE TABLE IF NOT EXISTS `sxo_battery` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goods_id` int(11) NOT NULL COMMENT '关联商品ID',
  `battery_type` varchar(50) NOT NULL COMMENT '电池类型',
  `voltage` decimal(5,2) NOT NULL COMMENT '电压',
  `capacity` int(11) NOT NULL COMMENT '容量',
  `cycle_life` int(11) NOT NULL COMMENT '循环寿命',
  `weight` decimal(10,2) NOT NULL COMMENT '重量',
  `factory_id` int(11) NOT NULL COMMENT '生产厂家ID',
  `certificate` varchar(255) NOT NULL COMMENT '认证证书',
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`),
  KEY `factory_id` (`factory_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='电池商品扩展表';

-- B2B订单表
CREATE TABLE IF NOT EXISTS `sxo_b2b_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '关联订单ID',
  `buyer_type` tinyint(1) NOT NULL COMMENT '买家类型：1-门店店主',
  `seller_type` tinyint(1) NOT NULL COMMENT '卖家类型：2-电池厂家',
  `logistics_company_id` int(11) DEFAULT NULL COMMENT '物流企业ID',
  `delivery_status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '配送状态：0-待发货，1-已发货，2-已签收',
  `blockchain_tx_hash` varchar(255) DEFAULT NULL COMMENT '区块链交易哈希',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `logistics_company_id` (`logistics_company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='B2B订单扩展表';

-- 物流轨迹表
CREATE TABLE IF NOT EXISTS `sxo_logistics_track` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL COMMENT '订单ID',
  `logistics_company_id` int(11) NOT NULL COMMENT '物流企业ID',
  `waybill_number` varchar(50) NOT NULL COMMENT '运单号',
  `track_time` int(11) NOT NULL COMMENT '轨迹时间',
  `track_content` varchar(255) NOT NULL COMMENT '轨迹内容',
  `location` varchar(100) DEFAULT NULL COMMENT '位置',
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `logistics_company_id` (`logistics_company_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='物流轨迹表';

-- 区块链钱包表
CREATE TABLE IF NOT EXISTS `sxo_blockchain_wallet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `wallet_address` varchar(255) NOT NULL COMMENT '钱包地址',
  `blockchain_network` varchar(50) NOT NULL COMMENT '区块链网络',
  `private_key` varchar(255) NOT NULL COMMENT '私钥（加密存储）',
  `public_key` varchar(255) NOT NULL COMMENT '公钥',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  UNIQUE KEY `wallet_address` (`wallet_address`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='区块链钱包表';

-- 区块链交易记录表
CREATE TABLE IF NOT EXISTS `sxo_blockchain_transaction` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tx_hash` varchar(255) NOT NULL COMMENT '交易哈希',
  `from_address` varchar(255) NOT NULL COMMENT '发送地址',
  `to_address` varchar(255) NOT NULL COMMENT '接收地址',
  `amount` decimal(20,8) NOT NULL COMMENT '交易金额',
  `gas_price` decimal(20,8) DEFAULT NULL COMMENT ' gas价格',
  `gas_limit` int(11) DEFAULT NULL COMMENT 'gas限制',
  `gas_used` int(11) DEFAULT NULL COMMENT '实际使用gas',
  `status` tinyint(1) NOT NULL DEFAULT 0 COMMENT '状态：0-待确认，1-已确认，2-失败',
  `block_number` int(11) DEFAULT NULL COMMENT '区块高度',
  `transaction_index` int(11) DEFAULT NULL COMMENT '交易索引',
  `data` text COMMENT '交易数据',
  `order_id` int(11) DEFAULT NULL COMMENT '关联订单ID',
  `create_time` int(11) NOT NULL COMMENT '创建时间',
  `confirm_time` int(11) DEFAULT NULL COMMENT '确认时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `tx_hash` (`tx_hash`),
  KEY `order_id` (`order_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='区块链交易记录表';

-- 电池溯源表
CREATE TABLE IF NOT EXISTS `sxo_battery_traceability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `battery_id` int(11) NOT NULL COMMENT '电池ID',
  `batch_number` varchar(100) NOT NULL COMMENT '批次号',
  `trace_type` varchar(50) NOT NULL COMMENT '溯源类型',
  `trace_time` int(11) NOT NULL COMMENT '溯源时间',
  `operator` varchar(50) NOT NULL COMMENT '操作人',
  `description` text NOT NULL COMMENT '描述',
  `blockchain_tx_hash` varchar(255) DEFAULT NULL COMMENT '区块链交易哈希',
  PRIMARY KEY (`id`),
  KEY `battery_id` (`battery_id`),
  KEY `batch_number` (`batch_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='电池溯源表';

-- 用户角色扩展表
CREATE TABLE IF NOT EXISTS `sxo_user_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT '用户ID',
  `role_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '角色类型：0-普通用户，1-门店店主，2-电池厂家，3-物流企业，4-平台管理员',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户角色扩展表';

-- 9. 完成初始化
SELECT '✅ ShopXO系统和B2B电池交易平台初始化完成！' AS result;