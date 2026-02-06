@echo off
echo ========================================
echo Krishopaj Frontend Setup Script
echo ========================================
echo.

cd frontend

echo Step 1: Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure Firebase in src/config/firebaseConfig.js
echo 2. Update API URL in src/config/apiConfig.js
echo 3. Start the app: npm start
echo.
pause
