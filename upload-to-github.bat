@echo off
echo ================================================
echo  Electronic Form - GitHub Upload Script
echo ================================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Git is not installed!
    echo.
    echo Please install Git first from: https://git-scm.com/download/win
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo [1/6] Initializing Git repository...
git init
if errorlevel 1 goto error

echo.
echo [2/6] Adding all files...
git add .
if errorlevel 1 goto error

echo.
echo [3/6] Creating initial commit...
git commit -m "Initial commit: Electronic Form K-Link System"
if errorlevel 1 goto error

echo.
echo [4/6] Adding remote repository...
git remote add origin https://github.com/muammar-qathafi/electronic_form.git
if errorlevel 1 (
    echo Remote already exists, skipping...
)

echo.
echo [5/6] Setting branch to main...
git branch -M main
if errorlevel 1 goto error

echo.
echo [6/6] Pushing to GitHub...
echo You may be asked to login to GitHub.
git push -u origin main
if errorlevel 1 goto error

echo.
echo ================================================
echo  SUCCESS! Project uploaded to GitHub!
echo ================================================
echo.
echo Repository: https://github.com/muammar-qathafi/electronic_form
echo.
echo Next steps:
echo 1. Visit your repository on GitHub
echo 2. Update repository description
echo 3. Add topics: nodejs, express, javascript, portfolio
echo 4. Deploy your app (see docs/DEPLOYMENT.md)
echo.
pause
exit /b 0

:error
echo.
echo ================================================
echo  ERROR: Upload failed!
echo ================================================
echo.
echo Please check:
echo 1. Internet connection
echo 2. GitHub credentials
echo 3. Repository exists and is accessible
echo.
echo For help, see CARA_UPLOAD_GITHUB.md
echo.
pause
exit /b 1
