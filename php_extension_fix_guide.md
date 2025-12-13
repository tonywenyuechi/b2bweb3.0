php -S localhost:8000php -S localhost:8000# PHP MySQL扩展启用指南 - 解决ShopXO HTTP 500错误

## 问题确认
通过CLI运行ShopXO入口文件，得到了明确的错误信息：
```
PHP Fatal error:  Uncaught think\db\exception\PDOException: could not find driver in G:\b2bweb3.0d\shopxo\vendor\topthink\think-orm\src\db\PDOConnection.php:836
```

## 根本原因
**PHP PDO MySQL驱动未启用** - 检查`C:\php\php.ini`文件发现，以下两个关键扩展被注释掉了：
- `extension=pdo_mysql`（PDO MySQL驱动）
- `extension=mysqli`（mysqli驱动）

这些扩展是ShopXO连接MySQL数据库的必要组件，缺少它们会导致数据库连接失败，从而引发HTTP 500错误。

## 详细解决方案

### 步骤1：以管理员权限打开文本编辑器
1. 按下 `Win + X` 组合键，选择 "Windows PowerShell (管理员)" 或 "命令提示符 (管理员)"
2. 在管理员权限的终端中，运行以下命令打开php.ini文件：
   ```bash
   notepad C:\php\php.ini
   ```
   或者使用VS Code（如果已安装）：
   ```bash
   code C:\php\php.ini
   ```

### 步骤2：查找并启用扩展
1. 在打开的php.ini文件中，按下 `Ctrl + F` 组合键，搜索 "extension=pdo_mysql"
2. 找到以下配置行（大约在第928-932行）：
   ```ini
   extension=mbstring
   ;extension=mysqli
   ;extension=odbc
   extension=openssl
   ;extension=pdo_firebird
   ;extension=pdo_mysql
   ;extension=pdo_odbc
   ;extension=pdo_pgsql
   ;extension=pdo_sqlite
   ;extension=pgsql
   ;extension=shmop
   ```
3. **将以下两行前面的分号（;）删除**，启用这些扩展：
   ```ini
   extension=mysqli
   extension=pdo_mysql
   ```
4. 修改后的配置应如下所示：
   ```ini
   extension=mbstring
   extension=mysqli
   ;extension=odbc
   extension=openssl
   ;extension=pdo_firebird
   extension=pdo_mysql
   ;extension=pdo_odbc
   ;extension=pdo_pgsql
   ;extension=pdo_sqlite
   ;extension=pgsql
   ;extension=shmop
   ```

### 步骤3：保存并验证修改
1. 按下 `Ctrl + S` 组合键保存修改后的php.ini文件
2. 关闭文本编辑器
3. **验证修改是否生效**：在终端中运行以下命令，检查扩展是否已启用：
   ```bash
   php -m | findstr pdo
   php -m | findstr mysqli
   ```
   如果你看到 `pdo_mysql` 和 `mysqli` 出现在输出中，说明扩展已成功启用

### 步骤4：重启PHP开发服务器
1. **先停止当前运行的PHP服务器**：
   - 如果服务器在终端中运行，按下 `Ctrl + C` 停止
   - 或者关闭运行服务器的终端窗口
2. **重新启动PHP开发服务器**：
   ```bash
   cd G:\b2bweb3.0d\shopxo
   php -S localhost:8000
   ```

### 步骤5：测试访问
1. 打开浏览器，访问 http://localhost:8000
2. HTTP 500错误应该已经解决，你应该能看到ShopXO的安装页面或首页
3. 如果看到安装页面，按照安装向导完成ShopXO的安装

## 常见问题排查

### 问题1：无法保存php.ini文件
- **原因**：没有以管理员权限打开文本编辑器
- **解决方案**：关闭文本编辑器，重新按照步骤1以管理员权限打开

### 问题2：修改后扩展仍然未启用
- **原因**：可能修改了错误的php.ini文件，或者没有重启PHP服务器
- **解决方案**：
  1. 确认php.ini文件路径：运行 `php --ini` 命令查看加载的配置文件
  2. 确保修改的是正确的php.ini文件
  3. 确保重启了PHP开发服务器

### 问题3：仍然遇到HTTP 500错误
- **原因**：可能还有其他问题，如数据库连接配置错误
- **解决方案**：
  1. 检查database.php配置文件中的数据库连接参数
  2. 确认MySQL服务正在运行
  3. 检查MySQL用户名和密码是否正确
  4. 检查数据库名是否正确

## 后续步骤
1. 访问ShopXO安装页面 http://localhost:8000/install.php 完成安装
2. 根据安装向导配置ShopXO系统
3. 测试B2B电池交易平台功能
4. 完成安装后，建议关闭PHP的错误显示（修改php.ini中的display_errors=Off）

## 技术支持
如果按照以上步骤操作后仍然遇到问题，请提供以下信息，以便进一步排查：
1. `php -m` 命令的完整输出
2. `php --ini` 命令的输出
3. 重新运行 `php public/index.php` 后的错误信息
4. MySQL服务状态
5. 数据库连接配置信息（请隐去密码）

通过以上步骤，你应该能够成功解决ShopXO的HTTP 500错误，让B2B电池交易平台正常运行！