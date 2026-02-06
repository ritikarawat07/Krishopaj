# Configuration Checklist

## ✅ Complete This Checklist Before Running

### 1. Backend Configuration

#### PostgreSQL Database
- [ ] PostgreSQL installed and running
- [ ] Database created: `krishopaj_db`
- [ ] Database credentials updated in `backend/.env`:
  ```env
  DB_NAME=krishopaj_db
  DB_USER=postgres
  DB_PASSWORD=your_password
  DB_HOST=localhost
  DB_PORT=5432
  ```

#### MongoDB
- [ ] MongoDB installed and running
- [ ] MongoDB URI updated in `backend/.env`:
  ```env
  MONGO_URI=mongodb://localhost:27017/
  MONGO_DB_NAME=krishopaj_ml
  ```

#### Django Settings
- [ ] Secret key generated in `backend/.env`:
  ```env
  SECRET_KEY=your-secret-key-here
  ```
- [ ] Debug mode set in `backend/.env`:
  ```env
  DEBUG=True
  ```
- [ ] Allowed hosts configured in `backend/.env`:
  ```env
  ALLOWED_HOSTS=localhost,127.0.0.1
  ```

#### Firebase (Optional for Development)
- [ ] Firebase project created
- [ ] Service account key downloaded
- [ ] Key saved as `backend/krishopaj_backend/firebase_admin_config.json`
- [ ] Storage bucket name updated in `backend/utils/firebase_init.py` (line 18)

### 2. Frontend Configuration

#### Firebase Config
- [ ] Firebase web config obtained
- [ ] Config updated in `frontend/src/config/firebaseConfig.js`:
  ```javascript
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };
  ```

#### API Configuration
- [ ] Backend URL updated in `frontend/src/config/apiConfig.js`:
  ```javascript
  export const API_BASE_URL = 'http://localhost:8000/api';
  // For mobile device testing, use your computer's IP:
  // export const API_BASE_URL = 'http://192.168.1.100:8000/api';
  ```

### 3. Dependencies Installation

#### Backend
- [ ] Virtual environment created
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Packages verified:
  - Django
  - djangorestframework
  - psycopg2-binary
  - firebase-admin
  - pymongo

#### Frontend
- [ ] Node.js installed (v16+)
- [ ] Dependencies installed: `npm install`
- [ ] Expo CLI available

### 4. Database Setup

#### PostgreSQL
- [ ] Tables created using SQL scripts:
  ```bash
  psql -d krishopaj_db -f databases/sql/create_farmer_table.sql
  psql -d krishopaj_db -f databases/sql/create_farminfo_table.sql
  ```
- [ ] OR Django migrations run:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

#### MongoDB
- [ ] Sample data imported (optional):
  ```bash
  mongoimport --db krishopaj_ml --collection predictions --file databases/mongodb/sample_data.json --jsonArray
  ```

#### Firestore (Optional)
- [ ] Firestore database created in Firebase Console
- [ ] Security rules applied from `databases/firestore/rules.json`

#### Firebase Storage (Optional)
- [ ] Storage bucket created in Firebase Console
- [ ] Security rules applied from `databases/firebase_storage/rules.json`

### 5. Django Setup

- [ ] Migrations created: `python manage.py makemigrations`
- [ ] Migrations applied: `python manage.py migrate`
- [ ] Superuser created: `python manage.py createsuperuser`
- [ ] Static files collected (if needed): `python manage.py collectstatic`

### 6. Testing

#### Backend Tests
- [ ] Server starts successfully: `python manage.py runserver`
- [ ] Admin panel accessible: http://localhost:8000/admin
- [ ] API endpoints accessible: http://localhost:8000/api/
- [ ] Health check works: http://localhost:8000/api/ml/health/

#### Frontend Tests
- [ ] App starts successfully: `npm start`
- [ ] No compilation errors
- [ ] Can view on web browser: http://localhost:19006

#### Integration Tests
- [ ] Frontend can connect to backend
- [ ] API calls work from mobile app
- [ ] Data flows correctly

### 7. Optional Configurations

#### For Mobile Device Testing
- [ ] Computer and mobile device on same network
- [ ] Backend running on `0.0.0.0:8000`
- [ ] Firewall allows connections on port 8000
- [ ] API_BASE_URL updated with computer's IP address

#### For Production
- [ ] DEBUG set to False
- [ ] ALLOWED_HOSTS configured properly
- [ ] Secret key is strong and unique
- [ ] Database credentials are secure
- [ ] HTTPS configured
- [ ] Static files served properly

### 8. Common Issues Checklist

If something doesn't work, check:

- [ ] All services are running (PostgreSQL, MongoDB, Django, Expo)
- [ ] No port conflicts (8000, 19000, 19001, etc.)
- [ ] Virtual environment is activated
- [ ] Environment variables are loaded
- [ ] File paths are correct
- [ ] Firewall is not blocking connections
- [ ] Dependencies are installed correctly

## Quick Verification Commands

### Check PostgreSQL
```bash
psql -U postgres -c "SELECT version();"
```

### Check MongoDB
```bash
mongo --eval "db.version()"
```

### Check Python Packages
```bash
pip list | grep -E "Django|firebase|pymongo|psycopg2"
```

### Check Node Packages
```bash
npm list --depth=0
```

### Test Backend API
```bash
curl http://localhost:8000/api/ml/health/
```

## Need Help?

If you're stuck on any item:
1. Check the error message carefully
2. Refer to QUICK_START.md
3. Check backend_README.md for detailed backend setup
4. Check frontend README.md for frontend setup
5. Search for the specific error online

## Ready to Go?

Once all items are checked:
1. Run backend: `python manage.py runserver`
2. Run frontend: `npm start`
3. Start developing! 🚀
