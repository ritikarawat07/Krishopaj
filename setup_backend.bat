@echo off
echo ========================================
echo Krishopaj Backend Setup Script
echo ========================================
echo.

cd backend

echo Step 1: Creating virtual environment...
python -m venv venv
if %errorlevel% neq 0 (
    echo Error: Failed to create virtual environment
    pause
    exit /b 1
)
echo Virtual environment created successfully!
echo.

echo Step 2: Activating virtual environment...
call venv\Scripts\activate
echo.

echo Step 3: Installing dependencies...
pip install -r requirements.txt
if %errorlevel% neq 0 (
    echo Error: Failed to install dependencies
    pause
    exit /b 1
)
echo Dependencies installed successfully!
echo.

echo Step 4: Running migrations...
python manage.py makemigrations
python manage.py migrate
if %errorlevel% neq 0 (
    echo Warning: Migrations failed. Make sure PostgreSQL is running.
)
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Configure your .env file with database credentials
echo 2. Create a superuser: python manage.py createsuperuser
echo 3. Start the server: python manage.py runserver
echo.
pause
