@echo off
echo Starting Krishopaj Backend Server...
cd backend
call venv\Scripts\activate
python manage.py runserver
pause
