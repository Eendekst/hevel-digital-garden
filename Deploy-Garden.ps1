# Deploy-Garden.ps1
# Automates the build and deploy process for Jim's Garden

$ErrorActionPreference = "Stop"
$WorkingDir = "C:\Users\Hevel\Vault\1 Jason\PP\Garden\.quartz-engine"
$RepoUrl = "https://github.com/Eendekst/hevel-digital-garden.git"

# 0. Sync Content (The Shadow Patch)
Write-Host "Syncing Content..." -ForegroundColor Cyan
$SourceDir = "C:\Users\Hevel\Vault\1 Jason\PP\Garden"
$ContentDir = "$WorkingDir\content"

# 1. Clean and Setup
if (Test-Path $ContentDir) { 
    Remove-Item $ContentDir -Recurse -Force -ErrorAction SilentlyContinue 
}
New-Item -ItemType Directory -Force -Path $ContentDir | Out-Null

# 2. Copy Markdown and Assets (Exclude Engine)
Get-ChildItem -Path $SourceDir -Exclude ".quartz-engine", ".git", "Deploy-Garden.ps1" | Copy-Item -Destination $ContentDir -Recurse -Force

# 1. Build Site
Set-Location $WorkingDir
Write-Host "Building Quartz..." -ForegroundColor Cyan
$PublicDir = "$WorkingDir\public"
if (Test-Path $PublicDir) {
    Get-ChildItem -Path $PublicDir -Exclude ".git" | Remove-Item -Recurse -Force
}
$env:Path = "C:\Program Files\Git\cmd;" + $env:Path
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
npx quartz build

if (-not (Test-Path "public\index.html")) {
    Write-Error "Build failed. No index.html found."
}

# 2. Deploy to gh-pages
Write-Host "Deploying to GitHub Pages..." -ForegroundColor Cyan
Set-Location "public"

# Initialize git if needed
if (-not (Test-Path ".git")) {
    git init
    git config user.email "jason@hevel.ca"
    git config user.name "Hevel"
    git remote add origin $RepoUrl
}

# Add, Commit, Push
git add .
git commit -m "Deploy: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
git branch -M main
git push -f origin main:gh-pages

Write-Host "Garden Deployed Successfully!" -ForegroundColor Green
Start-Sleep -Seconds 3
