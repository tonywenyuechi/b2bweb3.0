# ShopXO B2B Battery Trading Platform Database Initialization Script

Write-Host "ShopXO B2B Battery Trading Platform Database Initialization"
Write-Host "=" * 60

# Check MySQL Service Status
Write-Host "Checking MySQL service status..."
$mysqlService = Get-Service -Name MySQL* -ErrorAction SilentlyContinue
if ($mysqlService -and $mysqlService.Status -eq "Running") {
    Write-Host "✅ MySQL service is running: $($mysqlService.Name)"
} else {
    Write-Host "❌ MySQL service is not running. Please start MySQL service first."
    exit 1
}

# Check SQL Files Existence
$coreSqlFile = "g:/b2bweb3.0d/shopxo/config/shopxo.sql"
$b2bSqlFile = "g:/b2bweb3.0d/b2b_standalone.sql"

if (-not (Test-Path $coreSqlFile)) {
    Write-Host "❌ ShopXO core SQL file not found: $coreSqlFile"
    exit 1
}

if (-not (Test-Path $b2bSqlFile)) {
    Write-Host "❌ B2B Battery Trading Platform SQL file not found: $b2bSqlFile"
    exit 1
}

Write-Host "✅ All SQL script files are ready"
Write-Host ""

# Get MySQL Password
$mysqlPassword = Read-Host -Prompt "Please enter MySQL root password" -AsSecureString
$plainPassword = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($mysqlPassword))

# Function to Execute MySQL Command
function Execute-MySQLCommand {
    param(
        [string]$Command,
        [string]$Description
    )
    
    Write-Host "$Description..."
    $processInfo = New-Object System.Diagnostics.ProcessStartInfo
    $processInfo.FileName = "mysql"
    $processInfo.Arguments = $Command
    $processInfo.RedirectStandardOutput = $true
    $processInfo.RedirectStandardError = $true
    $processInfo.UseShellExecute = $false
    $processInfo.CreateNoWindow = $true
    
    $process = New-Object System.Diagnostics.Process
    $process.StartInfo = $processInfo
    $process.Start() | Out-Null
    $output = $process.StandardOutput.ReadToEnd()
    $error = $process.StandardError.ReadToEnd()
    $process.WaitForExit()
    
    if ($process.ExitCode -eq 0) {
        Write-Host "✅ Success: $Description"
        return $true
    } else {
        Write-Host "❌ Failed: $Description"
        Write-Host "Error: $error"
        return $false
    }
}

# 1. Create Database
$createDbCmd = "-u root -p`"$plainPassword`" -e `"CREATE DATABASE IF NOT EXISTS shopxo DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`""
Execute-MySQLCommand -Command $createDbCmd -Description "Creating database 'shopxo'"

# 2. Execute Core SQL Script using CMD (to avoid PowerShell redirection issues)
Write-Host "Executing ShopXO core SQL script..."
$coreCmd = "cmd.exe /c mysql -u root -p`"$plainPassword`" shopxo < `"$coreSqlFile`""
Invoke-Expression $coreCmd 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Success: ShopXO core SQL script executed"
} else {
    Write-Host "❌ Failed: ShopXO core SQL script execution"
}

# 3. Execute B2B SQL Script using CMD
Write-Host "Executing B2B Battery Trading Platform SQL script..."
$b2bCmd = "cmd.exe /c mysql -u root -p`"$plainPassword`" shopxo < `"$b2bSqlFile`""
Invoke-Expression $b2bCmd 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Success: B2B Battery Trading Platform SQL script executed"
} else {
    Write-Host "❌ Failed: B2B Battery Trading Platform SQL script execution"
}

Write-Host ""
Write-Host "Database initialization completed!" -ForegroundColor Green
Write-Host "=" * 60
