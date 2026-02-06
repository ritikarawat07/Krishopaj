# Krishopaj Project Structure - Complete Guide

## 📋 Overview

This document provides a complete overview of the Krishopaj project structure and how all components work together.

## 🗂️ Directory Structure

### Frontend (React Native Mobile App)

```
frontend/
├── package.json                    # Dependencies and scripts
├── babel.config.js                 # Babel configuration
├── App.js                          # Main app entry point
├── README.md                       # Frontend documentation
└── src/
    ├── assets/                     # Images, icons, fonts (empty - add your assets)
    ├── components/                 # Reusable UI components
    │   ├── SensorCard.js          # Display sensor data
    │   ├── CropCard.js            # Display crop predictions
    │   ├── UploadButton.js        # Upload button component
    │   └── NavBar.js              # Navigation bar
    ├── screens/                    # App screens
    │   ├── LoginScreen.js         # User login
    │   ├── RegisterScreen.js      # User registration
    │   ├── DashboardScreen.js     # Main dashboard
    │   ├── SensorDataScreen.js    # View sensor data
    │   ├── CropPredictionScreen.js # Crop recommendations
    │   ├── ProfileScreen.js       # User profile
    │   └── MediaUploadScreen.js   # Upload images/videos
    ├── navigation/
    │   ├── AppNavigator.js        # Stack navigation
    │   └── TabNavigator.js        # Bottom tab navigation
    ├── config/
    │   ├── firebaseConfig.js      # Firebase configuration
    │   ├── apiConfig.js           # Backend API URLs
    │   └── theme.js               # App theme (colors, fonts)
    └── utils/
        ├── fetchSensorData.js     # Fetch sensor data from API
        ├── uploadMedia.js         # Upload media to Firebase
        └── getPrediction.js       # Get crop predictions
```

### Backend (Django REST API)

```
backend/
├── manage.py                       # Django management script
├── requirements.txt                # Python dependencies
├── .env                           # Environment variables (configure this!)
├── krishopaj_backend/             # Main Django project
│   ├── __init__.py
│   ├── asgi.py                   # ASGI configuration
│   ├── wsgi.py                   # WSGI configuration
│   ├── settings.py               # Django settings
│   ├── urls.py                   # Main URL routing
│   └── firebase_admin_config.json # Firebase service account key
├── apps/                          # Django apps
│   ├── farmers/                   # Farmer management (PostgreSQL)
│   │   ├── migrations/
│   │   ├── __init__.py
│   │   ├── admin.py              # Admin interface
│   │   ├── apps.py               # App configuration
│   │   ├── models.py             # Farmer & FarmInfo models
│   │   ├── serializers.py        # REST serializers
│   │   ├── views.py              # API views
│   │   ├── urls.py               # URL routing
│   │   └── tests.py              # Unit tests
│   ├── sensors/                   # IoT sensor data (Firestore)
│   │   ├── __init__.py
│   │   ├── firebase_service.py   # Firestore operations
│   │   ├── views.py              # API views
│   │   └── urls.py               # URL routing
│   ├── mediaapp/                  # Media storage (Firebase Storage)
│   │   ├── __init__.py
│   │   ├── firebase_storage.py   # Storage operations
│   │   ├── views.py              # API views
│   │   └── urls.py               # URL routing
│   └── mlapi/                     # ML predictions (MongoDB)
│       ├── __init__.py
│       ├── models.py             # MongoDB models
│       ├── views.py              # API views
│       ├── urls.py               # URL routing
│       └── ml_files/             # ML model files
│           ├── model_placeholder.py      # Model class
│           ├── preprocess_placeholder.py # Data preprocessing
│           └── predict_placeholder.py    # Prediction logic
├── utils/                         # Utility modules
│   ├── __init__.py
│   ├── firebase_init.py          # Firebase initialization
│   ├── mongo_connection.py       # MongoDB connection
│   ├── sql_connection.py         # PostgreSQL connection
│   └── logger.py                 # Logging utility
└── static/                        # Static files (empty)
```

### Databases

```
databases/
├── sql/                           # PostgreSQL schemas
│   ├── create_farmer_table.sql   # Farmers table
│   ├── create_farminfo_table.sql # Farm info table
│   └── sample_data.sql           # Sample data
├── firestore/                     # Firestore configuration
│   ├── sensors_collection.json   # Sensor data structure
│   └── rules.json                # Security rules
├── firebase_storage/              # Firebase Storage configuration
│   ├── structure.md              # Storage structure
│   └── rules.json                # Security rules
└── mongodb/                       # MongoDB schemas
    ├── prediction_schema.json    # Predictions schema
    └── sample_data.json          # Sample predictions
```

## 🔄 Data Flow

### 1. User Registration & Login
```
Mobile App → Django API → PostgreSQL
```
- User registers via `RegisterScreen.js`
- Data sent to `/api/farmers/register/`
- Stored in PostgreSQL `farmers` table

### 2. Sensor Data Collection
```
IoT Device → Firestore → Django API → Mobile App
```
- IoT devices push data to Firestore
- Mobile app fetches via `/api/sensors/data/`
- Displayed in `SensorDataScreen.js`

### 3. Crop Prediction
```
Mobile App → Django API → ML Model → MongoDB → Mobile App
```
- User requests prediction from `CropPredictionScreen.js`
- API endpoint: `/api/ml/predict/`
- ML model processes data
- Results stored in MongoDB
- Predictions returned to app

### 4. Media Upload
```
Mobile App → Django API → Firebase Storage
```
- User uploads image from `MediaUploadScreen.js`
- API endpoint: `/api/media/upload/`
- File stored in Firebase Storage
- URL returned to app

## 🔧 Configuration Steps

### 1. Frontend Configuration

**File: `frontend/src/config/firebaseConfig.js`**
```javascript
// Replace with your Firebase project credentials
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  // ...
};
```

**File: `frontend/src/config/apiConfig.js`**
```javascript
// Update with your backend URL
export const API_BASE_URL = 'http://YOUR_IP:8000/api';
```

### 2. Backend Configuration

**File: `backend/.env`**
```env
# Update these values
SECRET_KEY=your-secret-key-here
DEBUG=True

# PostgreSQL
DB_NAME=krishopaj_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# MongoDB
MONGO_URI=mongodb://localhost:27017/
MONGO_DB_NAME=krishopaj_ml

# Firebase
FIREBASE_CREDENTIALS_PATH=krishopaj_backend/firebase_admin_config.json
```

**File: `backend/krishopaj_backend/firebase_admin_config.json`**
- Download from Firebase Console → Project Settings → Service Accounts
- Replace the placeholder content

### 3. Database Setup

**PostgreSQL:**
```bash
createdb krishopaj_db
psql -d krishopaj_db -f databases/sql/create_farmer_table.sql
psql -d krishopaj_db -f databases/sql/create_farminfo_table.sql
```

**MongoDB:**
```bash
mongoimport --db krishopaj_ml --collection predictions \
  --file databases/mongodb/sample_data.json --jsonArray
```

**Firebase:**
1. Create Firestore database
2. Create Storage bucket
3. Apply security rules from `databases/firestore/rules.json`

## 🚀 Running the Application

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend
```bash
cd frontend
npm install
npm start
```

## 📡 API Endpoints

### Farmers API
- `POST /api/farmers/register/` - Register farmer
- `GET /api/farmers/` - List farmers
- `GET /api/farmers/{id}/profile/` - Get profile

### Sensors API
- `GET /api/sensors/data/` - Latest sensor data
- `GET /api/sensors/history/` - Historical data
- `POST /api/sensors/add/` - Add sensor data

### Media API
- `POST /api/media/upload/` - Upload file
- `GET /api/media/download/` - Get download URL
- `DELETE /api/media/delete/` - Delete file
- `GET /api/media/list/` - List files

### ML API
- `POST /api/ml/predict/` - Get prediction
- `GET /api/ml/predictions/` - Prediction history
- `GET /api/ml/predictions/{id}/` - Prediction detail

## 🔐 Security Notes

1. **Never commit** `.env` file or Firebase credentials
2. Update Firebase security rules before production
3. Use environment variables for sensitive data
4. Enable HTTPS in production
5. Implement proper authentication

## 🧪 Testing

### Backend Tests
```bash
cd backend
python manage.py test apps.farmers
python manage.py test apps.mlapi
```

### API Testing
Use Postman or curl:
```bash
# Get sensor data
curl http://localhost:8000/api/sensors/data/

# Get crop prediction
curl -X POST http://localhost:8000/api/ml/predict/ \
  -H "Content-Type: application/json" \
  -d '{"temperature": 28.5, "humidity": 65, "soil_moisture": 45}'
```

## 📝 Next Steps

1. ✅ Project structure created
2. ⏳ Configure Firebase credentials
3. ⏳ Set up PostgreSQL database
4. ⏳ Set up MongoDB database
5. ⏳ Run Django migrations
6. ⏳ Install frontend dependencies
7. ⏳ Test API endpoints
8. ⏳ Integrate actual ML model (Lehar's part)
9. ⏳ Add authentication
10. ⏳ Deploy to production

## 🤝 Team Responsibilities

- **You**: Frontend + Backend + Database setup
- **Lehar**: ML model implementation in `backend/apps/mlapi/ml_files/`

## 📞 Support

For questions about:
- **Structure**: Refer to this document
- **Django**: Check Django documentation
- **React Native**: Check React Native documentation
- **Firebase**: Check Firebase documentation

---

**Happy Coding! 🚀**
