
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Image,
  ActivityIndicator,
  Platform,
} from 'react-native';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const WEATHER_API_KEY = '2917488118c57ff8c2ccb2edfdb2babc'; // Get free API key from openweathermap.org

export default function WeatherScreen() {
  const [location, setLocation] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access location was denied');
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation(loc.coords);
      fetchWeatherData(loc.coords.latitude, loc.coords.longitude);
    } catch (error) {
      console.error('Error getting location:', error);
      setLoading(false);
    }
  };

  const fetchWeatherData = async (lat, lon) => {
    setLoading(true);
    try {
  
      const currentResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const currentData = await currentResponse.json();
      setCurrentWeather(currentData);
      setCityName(currentData.name);

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
      );
      const forecastData = await forecastResponse.json();
      

      const dailyForecasts = processForecastData(forecastData.list);
      setForecast(dailyForecasts);
    } catch (error) {
      console.error('Error fetching weather:', error);
      alert('Error fetching weather data. Please check your API key.');
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (list) => {
    const daily = {};
    
    list.forEach((item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!daily[date]) {
        daily[date] = {
          date: item.dt,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          weather: item.weather[0],
          humidity: item.main.humidity,
          wind_speed: item.wind.speed,
        };
      } else {
        daily[date].temp_min = Math.min(daily[date].temp_min, item.main.temp_min);
        daily[date].temp_max = Math.max(daily[date].temp_max, item.main.temp_max);
      }
    });

    return Object.values(daily).slice(0, 10);
  };

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${searchQuery}&limit=1&appid=${WEATHER_API_KEY}`
      );
      const data = await response.json();
      
      if (data.length > 0) {
        const { lat, lon } = data[0];
        fetchWeatherData(lat, lon);
      } else {
        alert('Location not found');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error searching location:', error);
      setLoading(false);
    }
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getWeatherGradient = (weatherMain) => {
    switch (weatherMain?.toLowerCase()) {
      case 'clear':
        return ['#4facfe', '#00f2fe'];
      case 'clouds':
        return ['#757F9A', '#D7DDE8'];
      case 'rain':
      case 'drizzle':
        return ['#5f72bd', '#9b23ea'];
      case 'thunderstorm':
        return ['#2c3e50', '#4ca1af'];
      case 'snow':
        return ['#e6dada', '#274046'];
      default:
        return ['#4facfe', '#00f2fe'];
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4facfe" />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={getWeatherGradient(currentWeather?.weather[0]?.main)}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search city..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={searchLocation}
          />
          <TouchableOpacity onPress={searchLocation} style={styles.searchButton}>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>


        {currentWeather && (
          <View style={styles.currentWeatherContainer}>
            <Text style={styles.cityName}>{cityName}</Text>
            <Text style={styles.date}>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              month: 'long', 
              day: 'numeric' 
            })}</Text>
            
            <Image
              source={{ uri: getWeatherIcon(currentWeather.weather[0].icon) }}
              style={styles.weatherIcon}
            />
            
            <Text style={styles.temperature}>
              {Math.round(currentWeather.main.temp)}°C
            </Text>
            <Text style={styles.weatherDescription}>
              {currentWeather.weather[0].description}
            </Text>

            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="water" size={24} color="#fff" />
                <Text style={styles.detailText}>{currentWeather.main.humidity}%</Text>
                <Text style={styles.detailLabel}>Humidity</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="speedometer" size={24} color="#fff" />
                <Text style={styles.detailText}>{currentWeather.wind.speed} m/s</Text>
                <Text style={styles.detailLabel}>Wind</Text>
              </View>
              <View style={styles.detailItem}>
                <Ionicons name="eye" size={24} color="#fff" />
                <Text style={styles.detailText}>{(currentWeather.visibility / 1000).toFixed(1)} km</Text>
                <Text style={styles.detailLabel}>Visibility</Text>
              </View>
            </View>
          </View>
        )}


        <View style={styles.forecastContainer}>
          <Text style={styles.forecastTitle}>10-Day Forecast</Text>
          {forecast.map((day, index) => (
            <View key={index} style={styles.forecastCard}>
              <Text style={styles.forecastDate}>{formatDate(day.date)}</Text>
              <Image
                source={{ uri: getWeatherIcon(day.weather.icon) }}
                style={styles.forecastIcon}
              />
              <View style={styles.forecastTempContainer}>
                <Text style={styles.forecastTemp}>{Math.round(day.temp_max)}°</Text>
                <Text style={styles.forecastTempMin}>{Math.round(day.temp_min)}°</Text>
              </View>
              <Text style={styles.forecastDescription}>{day.weather.main}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 50 : 40,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 25,
    paddingHorizontal: 15,
    height: 50,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchButton: {
    backgroundColor: '#4facfe',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentWeatherContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  cityName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 150,
    height: 150,
  },
  temperature: {
    fontSize: 72,
    fontWeight: '200',
    color: '#fff',
    marginTop: -10,
  },
  weatherDescription: {
    fontSize: 24,
    color: '#fff',
    textTransform: 'capitalize',
    marginBottom: 30,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
  },
  detailItem: {
    alignItems: 'center',
  },
  detailText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 5,
  },
  detailLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  forecastContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 40,
    borderRadius: 20,
    padding: 20,
  },
  forecastTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  forecastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    padding: 15,
    marginBottom: 10,
  },
  forecastDate: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  forecastIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  forecastTempContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  forecastTemp: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  forecastTempMin: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  forecastDescription: {
    fontSize: 14,
    color: '#fff',
    width: 80,
    textAlign: 'right',
  },
});