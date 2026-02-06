# Frontend Commands Reference

## 🚀 Starting the App

### First Time Setup
```bash
# Install dependencies (run once)
npm install
```

### Start Development Server
```bash
# Method 1: Using npm script (Recommended)
npm start

# Method 2: Using expo directly
expo start

# Method 3: Using npx
npx expo start
```

## 📱 Running on Different Platforms

### Web Browser
```bash
npm run web
# Or after npm start, press 'w'
```

### Android
```bash
npm run android
# Or after npm start, press 'a'
# Requires Android emulator or device
```

### iOS (Mac only)
```bash
npm run ios
# Or after npm start, press 'i'
# Requires iOS simulator
```

### Physical Device
```bash
npm start
# Scan QR code with Expo Go app
# Download Expo Go from Play Store or App Store
```

## 🛠️ Other Useful Commands

### Clear Cache
```bash
npm start -- --clear
# Or
expo start --clear
```

### Install New Package
```bash
npm install package-name
```

### Update Dependencies
```bash
npm update
```

### Check for Issues
```bash
npm audit
```

## ❌ Common Errors and Fixes

### Error: "could not determine executable to run"
**Wrong:** `npx start expo`  
**Correct:** `npm start` or `expo start` or `npx expo start`

### Error: "expo: command not found"
```bash
# Install Expo CLI globally
npm install -g expo-cli
```

### Error: "Metro bundler error"
```bash
# Clear cache and restart
npm start -- --clear
```

### Error: "Port already in use"
```bash
# Kill process on port 19000
# Windows:
netstat -ano | findstr :19000
taskkill /PID <PID> /F

# Or use different port
expo start --port 19001
```

### Error: "Network error" on physical device
- Ensure computer and device are on same WiFi
- Check firewall settings
- Try tunnel mode: `expo start --tunnel`

## 🔧 Development Tips

### 1. Enable Fast Refresh
Fast refresh is enabled by default. Save any file to see changes instantly.

### 2. Debug Menu
- **Android**: Shake device or Ctrl+M
- **iOS**: Shake device or Cmd+D
- **Web**: F12 for DevTools

### 3. View Logs
```bash
# All logs are shown in the terminal where you ran npm start
# Or use React Native Debugger
```

### 4. Environment Variables
Create `.env` file in frontend folder:
```env
API_URL=http://localhost:8000/api
```

## 📦 Package Management

### Check Installed Packages
```bash
npm list --depth=0
```

### Remove Package
```bash
npm uninstall package-name
```

### Clean Install
```bash
# Remove node_modules and reinstall
rm -rf node_modules
npm install
```

## 🚨 Troubleshooting Checklist

- [ ] Node.js installed (v16+)
- [ ] npm install completed successfully
- [ ] No other process using port 19000
- [ ] Firewall allows connections
- [ ] Correct command syntax
- [ ] package.json exists
- [ ] node_modules folder exists

## 📱 Testing on Physical Device

### Android
1. Install Expo Go from Play Store
2. Run `npm start`
3. Scan QR code with Expo Go app

### iOS
1. Install Expo Go from App Store
2. Run `npm start`
3. Scan QR code with Camera app
4. Open in Expo Go

### Same Network Required
- Computer and device must be on same WiFi
- Or use tunnel mode: `expo start --tunnel`

## 🎯 Quick Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm start` | Start development server |
| `npm run web` | Run on web browser |
| `npm run android` | Run on Android |
| `npm run ios` | Run on iOS |
| `expo start --clear` | Clear cache and start |
| `expo start --tunnel` | Use tunnel for remote testing |

## 💡 Pro Tips

1. **Use npm start**: It's the simplest and most reliable
2. **Keep terminal open**: Don't close it while developing
3. **Watch for errors**: Terminal shows all errors and warnings
4. **Use web first**: Easiest for initial testing
5. **Clear cache**: If you see weird errors, clear cache

---

**Need more help? Check the main documentation files!**
