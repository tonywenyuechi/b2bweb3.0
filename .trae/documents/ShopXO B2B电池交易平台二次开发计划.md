# ShopXO B2B电池交易平台二次开发计划

## 一、系统架构设计

### 1. 技术栈
- **后端框架**：ThinkPHP5.1（ShopXO原生框架）
- **前端技术**：HTML5、CSS3、JavaScript、jQuery（ShopXO原生）+ Vue.js（新增）
- **数据库**：MySQL 5.7+
- **Web3.0集成**：区块链API（如以太坊、BSC）、智能合约
- **缓存**：Redis
- **文件存储**：本地存储 + 云存储（可选）

### 2. 系统架构图
```
┌─────────────────────────────────────────────────────────────────┐
│                         客户端层                                 │
├─────────┬─────────┬───────────────┬───────────────┬─────────────┤
│ PC端Web │ H5移动端│ 小程序端      │ 门店店主APP    │ 物流企业APP │
└─────────┴─────────┴───────────────┴───────────────┴─────────────┘
                              │
┌─────────────────────────────┴─────────────────────────────┐
│                         API网关                           │
└─────────────────────────────┬─────────────────────────────┘
                              │
┌─────────────────────────────┴─────────────────────────────┐
│                         应用层                             │
├─────────┬─────────┬───────────────┬───────────────┬────────┤
│ 用户管理│ 商品管理│ 订单管理      │ 物流管理      │ 支付管理│
└─────────┴─────────┴───────────────┴───────────────┴────────┘
                              │
┌─────────────────────────────┴─────────────────────────────┐
│                         服务层                             │
├─────────┬─────────┬───────────────┬───────────────┬────────┤
│ 认证服务│ 权限服务│ 区块链服务    │ 消息服务      │ 统计服务│
└─────────┴─────────┴───────────────┴───────────────┴────────┘
                              │
┌─────────────────────────────┴─────────────────────────────┐
│                         数据层                             │
├─────────┬─────────┬───────────────┬───────────────┬────────┤
│ MySQL数据库 │ Redis缓存 │ 区块链存储    │ 文件存储      │ 日志存储│
└─────────┴─────────┴───────────────┴───────────────┴────────┘
```

## 二、数据库设计

### 1. 核心表结构扩展

#### 1.1 用户角色扩展
```sql
-- 扩展用户表，增加角色字段
ALTER TABLE `shopxo_user` ADD COLUMN `role_type` tinyint(1) NOT NULL DEFAULT 0 COMMENT '角色类型：0-普通用户，1-门店店主，2-电池厂家，3-物流企业，4-平台管理员';

-- 门店信息表
CREATE TABLE `shopxo_store` (
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
CREATE TABLE `shopxo_factory` (
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
CREATE TABLE `shopxo_logistics` (
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
```

#### 1.2 商品扩展
```sql
-- 电池商品扩展表
CREATE TABLE `shopxo_battery` (
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
```

#### 1.3 订单扩展
```sql
-- B2B订单表
CREATE TABLE `shopxo_b2b_order` (
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
```

## 三、角色权限设计

### 1. 角色定义
| 角色 | 描述 | 核心权限 |
|------|------|----------|
| 门店店主 | 购买电池的终端零售商 | 浏览商品、下单采购、支付订单、查看物流、管理库存 |
| 电池供应厂家 | 生产和销售电池的企业 | 发布商品、管理商品、处理订单、发货、查看销售数据 |
| 交易平台管理员 | 平台运营管理者 | 管理用户、商品审核、订单管理、数据统计、系统配置 |
| 物流企业 | 负责商品配送的企业 | 接收配送任务、更新物流状态、查看配送数据 |

### 2. 权限控制方案
- 基于RBAC（角色-权限-资源）模型
- 扩展ShopXO原有权限系统
- 为每个角色分配不同的菜单和操作权限
- 实现细粒度的权限控制

## 四、核心功能模块设计

### 1. 用户管理模块
- **用户注册/登录**：支持手机号、邮箱注册，支持第三方登录
- **角色认证**：不同角色需要提供不同的认证资料
- **个人中心**：管理个人信息、企业信息、认证资料
- **权限管理**：基于角色的权限分配

### 2. 商品管理模块
- **商品发布**：电池厂家发布电池商品，包含详细参数
- **商品分类**：按电池类型、电压、容量等分类
- **商品审核**：平台管理员审核商品，确保质量和合规性
- **商品搜索**：支持多条件搜索和筛选
- **商品详情**：展示电池详细参数、认证信息、厂家信息

### 3. 采购管理模块
- **采购订单**：门店店主下单采购电池
- **订单审核**：厂家审核订单
- **支付管理**：支持在线支付、账期支付、区块链支付
- **订单状态管理**：待付款、待发货、待收货、已完成、已取消

### 4. 物流管理模块
- **物流企业入驻**：物流企业注册和认证
- **配送任务分配**：厂家选择物流企业，分配配送任务
- **物流轨迹跟踪**：实时查看物流状态和轨迹
- **电子签收**：门店店主电子签收
- **物流评价**：对物流服务进行评价

### 5. 库存管理模块
- **库存预警**：低库存自动预警
- **库存盘点**：定期盘点功能
- **库存调拨**：门店间库存调拨
- **库存报表**：库存变化报表

### 6. 财务管理模块
- **账单管理**：收支明细、对账功能
- **发票管理**：在线开票、发票查询
- **账期管理**：信用账期设置和管理
- **财务报表**：销售报表、采购报表、利润报表

### 7. Web3.0特性模块
- **区块链身份认证**：基于区块链的用户身份认证
- **智能合约交易**：电池交易智能合约，自动执行交易流程
- **数字资产积分**：基于区块链的积分系统
- **产品溯源**：电池全生命周期溯源
- **供应链金融**：基于区块链的供应链金融服务

## 五、Web3.0特性集成

### 1. 区块链身份认证
- 为每个用户创建区块链钱包地址
- 实现基于区块链的KYC认证
- 数字签名验证交易真实性

### 2. 智能合约开发
```solidity
// 电池交易智能合约示例
pragma solidity ^0.8.0;

contract BatteryTrade {
    // 交易状态枚举
    enum TradeStatus { Created, Paid, Shipped, Received, Completed, Cancelled }
    
    // 交易结构体
    struct Trade {
        uint256 tradeId;
        address buyer;
        address seller;
        uint256 amount;
        uint256 batteryId;
        uint256 quantity;
        TradeStatus status;
        uint256 createTime;
        uint256 updateTime;
    }
    
    // 交易映射
    mapping(uint256 => Trade) public trades;
    
    // 交易事件
    event TradeCreated(uint256 indexed tradeId, address buyer, address seller, uint256 amount);
    event TradePaid(uint256 indexed tradeId);
    event TradeShipped(uint256 indexed tradeId);
    event TradeReceived(uint256 indexed tradeId);
    event TradeCompleted(uint256 indexed tradeId);
    event TradeCancelled(uint256 indexed tradeId);
    
    // 创建交易
    function createTrade(address seller, uint256 batteryId, uint256 quantity, uint256 amount) external returns (uint256) {
        // 实现创建交易逻辑
    }
    
    // 支付交易
    function payTrade(uint256 tradeId) external payable {
        // 实现支付逻辑
    }
    
    // 确认发货
    function confirmShipment(uint256 tradeId) external {
        // 实现发货逻辑
    }
    
    // 确认收货
    function confirmReceipt(uint256 tradeId) external {
        // 实现收货逻辑
    }
    
    // 完成交易
    function completeTrade(uint256 tradeId) external {
        // 实现完成交易逻辑
    }
    
    // 取消交易
    function cancelTrade(uint256 tradeId) external {
        // 实现取消交易逻辑
    }
}
```

### 3. 产品溯源系统
- 电池生产信息上链
- 物流信息上链
- 销售信息上链
- 售后信息上链
- 实现全生命周期溯源查询

## 六、开发流程和规范

### 1. 开发环境搭建
- PHP 7.3+
- MySQL 5.7+
- Apache/Nginx
- Redis
- Node.js 14+

### 2. 代码规范
- 遵循ThinkPHP代码规范
- 遵循PSR-4自动加载规范
- 代码注释率≥30%
- 单元测试覆盖率≥80%

### 3. 开发流程
1. 需求分析和评审
2. 系统设计和数据库设计
3. 前端和后端并行开发
4. 单元测试和集成测试
5. 灰度发布和全量发布
6. 系统监控和维护

### 4. 安全规范
- 防止SQL注入、XSS攻击、CSRF攻击
- 敏感数据加密存储
- 接口访问权限控制
- 区块链私钥安全管理
- 定期安全审计

## 七、部署和运维

### 1. 部署架构
- **开发环境**：单机部署
- **测试环境**：分离部署（Web服务器、数据库服务器、Redis服务器）
- **生产环境**：集群部署（负载均衡、高可用）

### 2. 监控和日志
- 系统性能监控
- 错误日志收集
- 访问日志分析
- 区块链交易监控

### 3. 备份策略
- 数据库定期备份
- 文件系统备份
- 区块链数据备份

## 八、项目计划

### 1. 阶段划分
- **第一阶段**：系统设计和基础架构搭建（2周）
- **第二阶段**：核心功能开发（用户管理、商品管理、订单管理）（4周）
- **第三阶段**：扩展功能开发（物流管理、库存管理、财务管理）（3周）
- **第四阶段**：Web3.0特性集成（3周）
- **第五阶段**：测试和优化（2周）
- **第六阶段**：部署和上线（1周）

### 2. 关键里程碑
- 完成系统设计文档
- 完成数据库设计
- 完成核心功能开发
- 完成Web3.0特性集成
- 系统上线运行

## 九、风险评估和应对措施

### 1. 技术风险
- **风险**：区块链技术复杂性
- **应对措施**：聘请区块链专家，分阶段集成

### 2. 业务风险
- **风险**：用户接受度低
- **应对措施**：提供培训和支持，优化用户体验

### 3. 安全风险
- **风险**：区块链安全漏洞
- **应对措施**：进行安全审计，定期更新合约

### 4. 性能风险
- **风险**：区块链交易延迟
- **应对措施**：优化智能合约，使用Layer2解决方案

## 十、后续迭代计划

1. **v1.1**：增加供应链金融功能
2. **v1.2**：支持更多区块链网络
3. **v1.3**：增加AI预测分析功能
4. **v2.0**：实现去中心化交易

---

以上计划基于ShopXO现有架构，通过扩展和定制开发，实现一个功能完整的B2B电池交易平台，集成Web3.0特性，满足四种角色的业务需求。