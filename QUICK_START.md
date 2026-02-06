# 🚀 Krishopaj Quick Start Guide

## ⚡ Get Started in 5 Minutes

### Step 1: Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd frontend
npm install
```

### Step 2: Configure Environment

**Backend - Edit `backend/.env`:**
```env
SECRET_KEY=django-insecure-your-secret-key-change-this
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# PostgreSQL (update with your credentials)
DB_NAME=krishopaj_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/
MONGO_DB_NAME=krishopaj_ml
```

**Frontend - Edit `frontend/src/config/apiConfig.js`:**
```javascript
export const API_BASE_URL = 'http://localhost:8000/api';
```

### Step 3: Setup Databases

**PostgreSQL:**
```bash
# Create database
createdb krishopaj_db

# Or using psql
psql -U postgres
CREATE DATABASE krishopaj_db;
\q
```

**MongoDB:**
```bash
# MongoDB should be running on localhost:27017
# No additional setup needed for development
```

### Step 4: Run Django Migrations

```bash
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Step 5: Start the Servers

**Terminal 1 - Backend:**
```bash
cd backend
python manage.py runserver
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```

## 🎯 What You Can Do Now

### Without Firebase (Development Mode)

The app will work with mock data:

1. **Test the Mobile App**
   - Login/Register screens work
   - Dashboard navigation works
   - Sensor data shows mock data
   - Crop predictions show mock data

2. **Test the Backend API**
   ```bash
   # Health check
   curl http://localhost:8000/api/ml/health/
   
   # Get mock prediction
   curl -X POST http://localhost:8000/api/ml/predict/ \
     -H "Content-Type: application/json" \
     -d '{"temperature": 28.5, "humidity": 65, "soil_moisture": 45}'
   ```

3. **Access Django Admin**
   - Go to: http://localhost:8000/admin
   - Login with superuser credentials
   - Manage farmers and farm data

### With Firebase (Full Features)

To enable Firebase features:

1. **Create Firebase Project**
   - Go to https://console.firebase.google.com
   - Create new project
   - Enable Firestore Database
   - Enable Storage

2. **Download Credentials**
   - Project Settings → Service Accounts
   - Generate new private key
   - Save as `backend/krishopaj_backend/firebase_admin_config.json`

3. **Get Firebase Config**
   - Project Settings → General
   - Your apps → Web app
   - Copy config to `frontend/src/config/firebaseConfig.js`

4. **Update Storage Bucket**
   - Edit `backend/utils/firebase_init.py`
   - Line 18: Update `'storageBucket': 'your-project-id.appspot.com'`

## 📱 Testing the Mobile App

### On Web Browser
```bash
cd frontend
npm run web
```
Open: http://localhost:19006

### On Android/iOS
```bash
cd frontend
npm start
```
- Scan QR code with Expo Go app
- Or press 'a' for Android emulator
- Or press 'i' for iOS simulator

## 🧪 Quick API Tests

### Test Farmer Registration
```bash
curl -X POST http://localhost:8000/api/farmers/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testfarmer",
    "email": "test@example.com",
    "password": "testpass123",
    "first_name": "Test",
    "last_name": "Farmer",
    "phone": "9876543210",
    "address": "Test Address",
    "state": "Maharashtra",
    "district": "Pune",
    "pincode": "411001"
  }'
```

### Test Crop Prediction
```bash
curl -X POST http://localhost:8000/api/ml/predict/ \
  -H "Content-Type: application/json" \
  -d '{
    "farmer_id": "1",
    "temperature": 28.5,
    "humidity": 65,
    "soil_moisture": 45,
    "soil_type": "loamy"
  }'
```

### Test Sensor Data (Mock)
```bash
curl http://localhost:8000/api/sensors/data/
```

## 🐛 Troubleshooting

### Backend Issues

**Problem: ModuleNotFoundError**
```bash
# Solution: Install missing packages
pip install -r requirements.txt
```

**Problem: Database connection error**
```bash
# Solution: Check PostgreSQL is running
# Windows: Check Services
# Linux/Mac: sudo service postgresql status
```

**Problem: Firebase not working**
```bash
# Solution: Check firebase_admin_config.json exists
# Or comment out Firebase imports for now
```

### Frontend Issues

**Problem: npm install fails**
```bash
# Solution: Clear cache and retry
npm cache clean --force
npm install
```

**Problem: Expo not starting**
```bash
# Solution: Install Expo CLI globally
npm install -g expo-cli
```

**Problem: Can't connect to backend**
```bash
# Solution: Check API_BASE_URL in apiConfig.js
# Use your computer's IP instead of localhost for mobile devices
# Example: http://192.168.1.100:8000/api
```

## 📊 Project Status

✅ **Working Now:**
- Django backend structure
- React Native frontend structure
- PostgreSQL models
- API endpoints
- Mock data for development

⏳ **Need Configuration:**
- Firebase credentials
- Database setup
- ML model integration

🔜 **Coming Soon:**
- User authentication
- Real-time updates
- Push notifications
- Data visualization

## 🎓 Learning Resources

- **Django**: https://docs.djangoproject.com/
- **React Native**: https://reactnative.dev/docs/getting-started
- **Firebase**: https://firebase.google.com/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
- **MongoDB**: https://docs.mongodb.com/

## 💡 Tips

1. **Start Simple**: Test with mock data first
2. **One Step at a Time**: Set up backend, then frontend
3. **Check Logs**: Look at terminal output for errors
4. **Use Django Admin**: Great for testing database operations
5. **Test APIs First**: Use curl or Postman before mobile app

## 📞 Need Help?

1. Check `PROJECT_STRUCTURE.md` for detailed information
2. Check `README.md` for full documentation
3. Look at code comments for specific functionality
4. Check Django/React Native documentation

---

**You're all set! Start coding! 🎉**
