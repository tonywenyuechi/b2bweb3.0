# Simple ShopXO B2B Database Initialization Script

Write-Host "ShopXO B2B Battery Trading Platform Database Initialization"
Write-Host "=" * 60

# Database connection details (from config file)
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

# Function to execute MySQL command using CMD.exe
function Execute-MySQL {
    param(
        [string]$arguments,
        [string]$description
    )
    
    Write-Host "$description..."
    $cmd = "cmd.exe /c mysql -u $dbUser -p`"$dbPass`" $arguments"
    Invoke-Expression $cmd 2>&1 | Out-Null
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Success: $description"
        return $true
    } else {
        Write-Host "❌ Failed: $description"
        return $false
    }
}

# 1. Create database
Execute-MySQL -arguments "-e `"CREATE DATABASE IF NOT EXISTS $dbName DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`"" -description "Create database '$dbName'"

# 2. Execute core SQL script
Execute-MySQL -arguments "$dbName < `"$coreSqlFile`"" -description "Execute ShopXO core SQL script"

# 3. Execute B2B SQL script
Execute-MySQL -arguments "$dbName < `"$b2bSqlFile`"" -description "Execute B2B SQL script"

Write-Host ""
Write-Host "Database initialization completed!" -ForegroundColor Green
Write-Host "Next steps:" -ForegroundColor Green
Write-Host "1. Start the web server"
Write-Host "2. Visit http://localhost:8000 for frontend"
Write-Host "3. Visit http://localhost:8000/admin.php for backend"
Write-Host "=" * 60
