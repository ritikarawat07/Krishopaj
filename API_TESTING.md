# API Testing Guide

## Testing with cURL

### 1. Farmer Registration

```bash
curl -X POST http://localhost:8000/api/farmers/register/ \
  -H "Content-Type: application/json" \
  -d "{
    \"username\": \"farmer1\",
    \"email\": \"farmer1@example.com\",
    \"password\": \"securepass123\",
    \"first_name\": \"Ramesh\",
    \"last_name\": \"Patil\",
    \"phone\": \"9876543210\",
    \"address\": \"Village Shirur, Tal. Shirur\",
    \"state\": \"Maharashtra\",
    \"district\": \"Pune\",
    \"pincode\": \"412210\"
  }"
```

### 2. List All Farmers

```bash
curl http://localhost:8000/api/farmers/
```

### 3. Get Farmer Profile

```bash
curl http://localhost:8000/api/farmers/1/profile/
```

### 4. Create Farm Info

```bash
curl -X POST http://localhost:8000/api/farmers/farm-info/ \
  -H "Content-Type: application/json" \
  -d "{
    \"farmer\": 1,
    \"farm_name\": \"Green Valley Farm\",
    \"area_in_acres\": 5.5,
    \"soil_type\": \"Loamy\",
    \"irrigation_type\": \"Drip\",
    \"latitude\": 18.6298,
    \"longitude\": 74.3697,
    \"current_crop\": \"Rice\"
  }"
```

### 5. Get Latest Sensor Data

```bash
curl http://localhost:8000/api/sensors/data/
```

### 6. Get Sensor Data with Device ID

```bash
curl "http://localhost:8000/api/sensors/data/?device_id=SENSOR_001"
```

### 7. Get Sensor History

```bash
curl "http://localhost:8000/api/sensors/history/?days=7"
```

### 8. Add Sensor Data (IoT Device)

```bash
curl -X POST http://localhost:8000/api/sensors/add/ \
  -H "Content-Type: application/json" \
  -d "{
    \"device_id\": \"SENSOR_001\",
    \"farmer_id\": \"1\",
    \"temperature\": 28.5,
    \"humidity\": 65.2,
    \"soil_moisture\": 45.8,
    \"soil_ph\": 6.5,
    \"nitrogen\": 120,
    \"phosphorus\": 80,
    \"potassium\": 100
  }"
```

### 9. Get Crop Prediction

```bash
curl -X POST http://localhost:8000/api/ml/predict/ \
  -H "Content-Type: application/json" \
  -d "{
    \"farmer_id\": \"1\",
    \"temperature\": 28.5,
    \"humidity\": 65,
    \"soil_moisture\": 45,
    \"soil_type\": \"loamy\",
    \"area\": 5.5
  }"
```

### 10. Get Prediction History

```bash
curl "http://localhost:8000/api/ml/predictions/?farmer_id=1&limit=5"
```

### 11. Upload Media File

```bash
curl -X POST http://localhost:8000/api/media/upload/ \
  -F "file=@/path/to/image.jpg" \
  -F "farmer_id=1"
```

### 12. List Media Files

```bash
curl "http://localhost:8000/api/media/list/?farmer_id=1"
```

### 13. Health Check

```bash
curl http://localhost:8000/api/ml/health/
```

## Testing with PowerShell

### 1. Farmer Registration

```powershell
$body = @{
    username = "farmer1"
    email = "farmer1@example.com"
    password = "securepass123"
    first_name = "Ramesh"
    last_name = "Patil"
    phone = "9876543210"
    address = "Village Shirur"
    state = "Maharashtra"
    district = "Pune"
    pincode = "412210"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/farmers/register/" -Method Post -Body $body -ContentType "application/json"
```

### 2. Get Crop Prediction

```powershell
$body = @{
    farmer_id = "1"
    temperature = 28.5
    humidity = 65
    soil_moisture = 45
    soil_type = "loamy"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/ml/predict/" -Method Post -Body $body -ContentType "application/json"
```

### 3. Get Sensor Data

```powershell
Invoke-RestMethod -Uri "http://localhost:8000/api/sensors/data/"
```

## Expected Responses

### Successful Farmer Registration
```json
{
  "id": 1,
  "user": {
    "id": 1,
    "username": "farmer1",
    "email": "farmer1@example.com",
    "first_name": "Ramesh",
    "last_name": "Patil"
  },
  "phone": "9876543210",
  "address": "Village Shirur",
  "state": "Maharashtra",
  "district": "Pune",
  "pincode": "412210",
  "created_at": "2025-10-09T06:30:00Z"
}
```

### Successful Crop Prediction
```json
{
  "prediction_id": "507f1f77bcf86cd799439011",
  "predictions": [
    {
      "crop": "Rice",
      "confidence": 0.85,
      "recommended": true
    },
    {
      "crop": "Wheat",
      "confidence": 0.72,
      "recommended": true
    }
  ]
}
```

### Sensor Data Response
```json
{
  "device_id": "SENSOR_001",
  "temperature": 28.5,
  "humidity": 65.2,
  "soil_moisture": 45.8,
  "timestamp": "2025-10-09T06:00:00Z"
}
```

## Common HTTP Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Postman Collection

Import this JSON into Postman:

```json
{
  "info": {
    "name": "Krishopaj API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Farmers",
      "item": [
        {
          "name": "Register Farmer",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"username\": \"farmer1\",\n  \"email\": \"farmer1@example.com\",\n  \"password\": \"securepass123\",\n  \"first_name\": \"Ramesh\",\n  \"last_name\": \"Patil\",\n  \"phone\": \"9876543210\",\n  \"address\": \"Village Shirur\",\n  \"state\": \"Maharashtra\",\n  \"district\": \"Pune\",\n  \"pincode\": \"412210\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:8000/api/farmers/register/",
              "protocol": "http",
              "host": ["localhost"],
              "port": "8000",
              "path": ["api", "farmers", "register", ""]
            }
          }
        }
      ]
    }
  ]
}
```

## Testing Tips

1. **Start with Health Check**: Verify server is running
2. **Test in Order**: Register farmer → Create farm → Get predictions
3. **Check Response**: Verify status codes and response structure
4. **Save IDs**: Use returned IDs for subsequent requests
5. **Test Error Cases**: Try invalid data to test validation

## Debugging

### Enable Verbose Output (cURL)
```bash
curl -v http://localhost:8000/api/ml/health/
```

### Check Django Logs
Look at the terminal where Django server is running

### Use Django REST Framework Browser
Navigate to: http://localhost:8000/api/farmers/
- Interactive API interface
- Easy testing without tools
- Shows available endpoints
