# Final ShopXO B2B Database Initialization Script

Write-Host "ShopXO B2B Battery Trading Platform Database Initialization"
Write-Host "=" * 60

# Database connection details
$dbUser = "root"
$dbPass = "Qq700323*&"
$dbName = "shopxo"
$dbHost = "localhost"
$dbPort = "3306"

# SQL file paths
$coreSqlFile = "g:/b2bweb3.0d/shopxo/config/shopxo.sql"
$b2bSqlFile = "g:/b2bweb3.0d/b2b_standalone.sql"

# Check if SQL files exist
if (-not (Test-Path $coreSqlFile)) {
    Write-Host "❌ ShopXO core SQL file not found: $coreSqlFile"
    exit 1
}

if (-not (Test-Path $b2bSqlFile)) {
    Write-Host "❌ B2B SQL file not found: $b2bSqlFile"
    exit 1
}

Write-Host "✅ All SQL files are ready"

# Function to execute MySQL command using cmd.exe
function Execute-MySQL {
    param(
        [string]$cmd,
        [string]$description
    )
    
    Write-Host "$description..."
    $result = & cmd.exe /c $cmd 2>&1
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Success: $description"
        return $true
    } else {
        Write-Host "❌ Failed: $description"
        Write-Host "Error: $result"
        return $false
    }
}

# 1. Create database
$createDbCmd = "mysql -u $dbUser -p`"$dbPass`" -e `"CREATE DATABASE IF NOT EXISTS $dbName DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`""
Execute-MySQL -cmd $createDbCmd -description "Creating database '$dbName'"

# 2. Execute core SQL script
$coreSqlCmd = "mysql -u $dbUser -p`"$dbPass`" $dbName < `"$coreSqlFile`""
Execute-MySQL -cmd $coreSqlCmd -description "Executing ShopXO core SQL script"

# 3. Execute B2B SQL script
$b2bSqlCmd = "mysql -u $dbUser -p`"$dbPass`" $dbName < `"$b2bSqlFile`""
Execute-MySQL -cmd $b2bSqlCmd -description "Executing B2B SQL script"

Write-Host ""
Write-Host "Database initialization completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Start the web server: php -S localhost:8000"
Write-Host "2. Visit http://localhost:8000 for frontend"
Write-Host "3. Visit http://localhost:8000/admin.php for backend"
Write-Host "=" * 60
