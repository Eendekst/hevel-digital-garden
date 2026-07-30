# Push-To-Main.ps1
# Fast push using persistent local git repo. No cloning needed.

$ErrorActionPreference = "Stop"
$SourceDir = $PSScriptRoot
$RepoUrl = "https://github.com/Eendekst/hevel-digital-garden.git"

Write-Host "Publishing garden to GitHub (main)..." -ForegroundColor Cyan

# Ensure git repo is initialized
if (-not (Test-Path "$SourceDir\.git")) {
    git init
    git config user.email "jason@hevel.ca"
    git config user.name "Hevel"
    git remote add origin $RepoUrl
    git branch -M main
}

# Stage all changes
git add -A

# Commit and push
$commitMsg = "Sync vault update: $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
$status = git status --porcelain
if ($status) {
    git commit -m $commitMsg
    Write-Host "Pushing to GitHub..." -ForegroundColor Cyan
    $env:GIT_LFS_SKIP_PUSH = "1"
    git push --no-verify origin main
    Write-Host "Garden published successfully!" -ForegroundColor Green
} else {
    Write-Host "No changes to publish." -ForegroundColor Yellow
}
