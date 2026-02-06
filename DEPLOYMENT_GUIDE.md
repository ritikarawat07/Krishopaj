# Deployment Guide

## Development vs Production

### Current Setup: Development
- DEBUG=True
- SQLite/PostgreSQL on localhost
- No HTTPS
- CORS allows all origins
- Mock data available

### Production Requirements
- DEBUG=False
- Production database
- HTTPS enabled
- Restricted CORS
- Real Firebase credentials
- Environment variables secured

## Backend Deployment Options

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku account
- Heroku CLI installed

#### Steps

1. **Install Heroku CLI**
   ```bash
   # Download from https://devcenter.heroku.com/articles/heroku-cli
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   cd backend
   heroku create krishopaj-backend
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set SECRET_KEY=your-secret-key
   heroku config:set DEBUG=False
   heroku config:set ALLOWED_HOSTS=krishopaj-backend.herokuapp.com
   ```

6. **Create Procfile**
   ```
   web: gunicorn krishopaj_backend.wsgi
   ```

7. **Update requirements.txt**
   ```
   gunicorn==20.1.0
   whitenoise==6.5.0
   dj-database-url==2.1.0
   ```

8. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

9. **Run Migrations**
   ```bash
   heroku run python manage.py migrate
   heroku run python manage.py createsuperuser
   ```

### Option 2: AWS EC2

1. **Launch EC2 Instance**
   - Ubuntu 22.04 LTS
   - t2.micro (free tier)

2. **Install Dependencies**
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv postgresql nginx
   ```

3. **Setup Application**
   ```bash
   git clone your-repo
   cd backend
   python3 -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   pip install gunicorn
   ```

4. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;
       
       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location /static/ {
           alias /path/to/static/;
       }
   }
   ```

5. **Setup Systemd Service**
   ```ini
   [Unit]
   Description=Krishopaj Django App
   After=network.target
   
   [Service]
   User=ubuntu
   WorkingDirectory=/path/to/backend
   ExecStart=/path/to/venv/bin/gunicorn krishopaj_backend.wsgi:application
   
   [Install]
   WantedBy=multi-user.target
   ```

### Option 3: DigitalOcean App Platform

1. **Connect Repository**
2. **Configure Build Settings**
3. **Add Environment Variables**
4. **Deploy**

## Frontend Deployment Options

### Option 1: Expo Build (Recommended)

#### For Android APK

1. **Install EAS CLI**
   ```bash
   npm install -g eas-cli
   ```

2. **Login to Expo**
   ```bash
   eas login
   ```

3. **Configure Build**
   ```bash
   eas build:configure
   ```

4. **Build APK**
   ```bash
   eas build -p android --profile preview
   ```

5. **Download and Install**
   - Download APK from Expo dashboard
   - Install on Android device

#### For iOS

1. **Build for iOS**
   ```bash
   eas build -p ios
   ```

2. **Submit to App Store**
   ```bash
   eas submit -p ios
   ```

### Option 2: React Native CLI Build

1. **Eject from Expo**
   ```bash
   expo eject
   ```

2. **Build Android**
   ```bash
   cd android
   ./gradlew assembleRelease
   ```

3. **Build iOS**
   ```bash
   cd ios
   pod install
   # Open in Xcode and build
   ```

### Option 3: Web Deployment (Netlify/Vercel)

1. **Build for Web**
   ```bash
   expo build:web
   ```

2. **Deploy to Netlify**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=web-build
   ```

## Database Deployment

### PostgreSQL

#### Option 1: Heroku Postgres
- Automatically provisioned with Heroku
- Free tier: 10,000 rows

#### Option 2: AWS RDS
- Managed PostgreSQL
- Free tier: 750 hours/month

#### Option 3: DigitalOcean Managed Database
- $15/month
- Automated backups

### MongoDB

#### Option 1: MongoDB Atlas (Recommended)
1. Create account at mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Update MONGO_URI in environment variables

#### Option 2: Self-hosted on VPS
- Install MongoDB on server
- Configure security
- Setup backups

### Firebase

1. **Upgrade to Blaze Plan** (pay-as-you-go)
2. **Configure Production Rules**
3. **Setup Backup Strategy**
4. **Monitor Usage**

## Environment Variables

### Production .env Template

```env
# Django
SECRET_KEY=generate-strong-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com,www.your-domain.com

# Database
DATABASE_URL=postgres://user:password@host:5432/dbname

# MongoDB
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/
MONGO_DB_NAME=krishopaj_ml

# Firebase
FIREBASE_CREDENTIALS_PATH=/path/to/credentials.json

# CORS
CORS_ALLOWED_ORIGINS=https://your-app.com,https://www.your-app.com
```

## Security Checklist

- [ ] DEBUG=False in production
- [ ] Strong SECRET_KEY
- [ ] HTTPS enabled
- [ ] Database credentials secured
- [ ] Firebase rules configured
- [ ] CORS properly restricted
- [ ] API rate limiting enabled
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF protection enabled
- [ ] Regular security updates

## Monitoring

### Backend Monitoring

1. **Sentry** - Error tracking
   ```bash
   pip install sentry-sdk
   ```

2. **New Relic** - Performance monitoring

3. **CloudWatch** - AWS monitoring

### Frontend Monitoring

1. **Sentry** - Error tracking
2. **Google Analytics** - Usage analytics
3. **Firebase Analytics** - User behavior

## Backup Strategy

### Database Backups

1. **Automated Daily Backups**
2. **Weekly Full Backups**
3. **Test Restore Procedures**

### Code Backups

1. **Git Repository** (GitHub/GitLab)
2. **Multiple Branches**
3. **Tagged Releases**

## CI/CD Pipeline

### GitHub Actions Example

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{secrets.HEROKU_API_KEY}}
          heroku_app_name: "krishopaj-backend"
          heroku_email: "your-email@example.com"
```

## Cost Estimation

### Free Tier (Development)
- Heroku: Free
- MongoDB Atlas: Free (512MB)
- Firebase: Free (Spark plan)
- **Total: $0/month**

### Production (Small Scale)
- Heroku Hobby: $7/month
- MongoDB Atlas M10: $57/month
- Firebase Blaze: ~$25/month
- Domain: $12/year
- **Total: ~$90/month**

### Production (Medium Scale)
- AWS EC2 t3.medium: $30/month
- AWS RDS: $50/month
- MongoDB Atlas M30: $150/month
- Firebase: ~$100/month
- CDN: $20/month
- **Total: ~$350/month**

## Post-Deployment

1. **Test All Features**
2. **Monitor Logs**
3. **Check Performance**
4. **Setup Alerts**
5. **Document Issues**
6. **Plan Updates**

## Rollback Plan

1. **Keep Previous Version Tagged**
2. **Database Backup Before Deploy**
3. **Quick Rollback Command**
   ```bash
   heroku rollback
   ```

## Support

- Heroku Docs: https://devcenter.heroku.com/
- AWS Docs: https://docs.aws.amazon.com/
- Expo Docs: https://docs.expo.dev/
- Firebase Docs: https://firebase.google.com/docs
