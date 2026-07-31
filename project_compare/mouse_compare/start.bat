@echo off
setlocal
cd /d "%~dp0"

title MouseDB Web Server

echo ============================================
echo   MouseDB - starting web application
echo ============================================

if not exist "node_modules" (
  echo Installing dependencies...
  call npm install
  if errorlevel 1 (
    echo [ERROR] npm install failed.
    pause
    exit /b 1
  )
)

echo Starting ASP.NET Core API at http://localhost:5123
if exist "D:\dotnet-sdk\dotnet.exe" (
  start "MouseDB API" cmd /k "cd /d backend\AspNetCoreAuth\AspNetCoreAuth && D:\dotnet-sdk\dotnet.exe run"
) else (
  start "MouseDB API" cmd /k "cd /d backend\AspNetCoreAuth\AspNetCoreAuth && dotnet run"
)

echo Starting Next.js at http://localhost:3000
start "MouseDB WEB" cmd /k "npm run dev"

exit /b 0
