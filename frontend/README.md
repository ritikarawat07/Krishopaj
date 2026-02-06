# Krishopaj Frontend - React Native App

This is the React Native mobile application for the Krishopaj smart farming solution.

## Features

- **User Authentication**: Login and Registration screens
- **Dashboard**: Overview of all features
- **Sensor Data**: Real-time IoT sensor readings from Firestore
- **Crop Prediction**: AI-powered crop recommendations using ML API
- **Media Upload**: Upload farm images to Firebase Storage
- **Profile Management**: View and manage farmer and farm information

## Tech Stack

- React Native
- Expo
- React Navigation
- Firebase (Firestore + Storage)
- Axios for API calls

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure Firebase:
   - Update `src/config/firebaseConfig.js` with your Firebase credentials

3. Configure Backend API:
   - Update `src/config/apiConfig.js` with your Django backend URL

## Running the App

```bash
# Start the development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios

# Run on Web
npm run web
```

## Project Structure

```
src/
├── assets/          # Images, icons, fonts
├── components/      # Reusable UI components
├── screens/         # App screens
├── navigation/      # Navigation configuration
├── config/          # App configuration (Firebase, API, Theme)
└── utils/           # Utility functions
```

## TODO

- Implement image picker for media upload
- Add authentication with Firebase Auth
- Implement real-time sensor data updates
- Add offline support
- Implement push notifications
