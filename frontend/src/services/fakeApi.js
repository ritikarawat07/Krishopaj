// Generate live sensor data
export const generateLiveData = () => {
  return {
    nitrogen: Math.floor(Math.random() * 100) + 20,
    phosphorus: Math.floor(Math.random() * 100) + 20,
    potassium: Math.floor(Math.random() * 100) + 20,
    temperature: Math.floor(Math.random() * 30) + 15,
    humidity: Math.floor(Math.random() * 60) + 30,
    ph: (Math.random() * 4 + 5).toFixed(1),
    rainfall: Math.floor(Math.random() * 200) + 50,
  };
};

// Fake API call to simulate delay
export const fakeApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

// Get crop recommendation based on data
export const getRecommendation = (data) => {
  const { nitrogen, phosphorus, potassium, temperature, humidity, ph, rainfall } = data;
  
  // Simple logic for crop recommendation
  if (nitrogen > 80 && phosphorus > 60 && potassium > 60 && temperature > 25) {
    return "Rice";
  } else if (nitrogen > 60 && phosphorus > 40 && potassium > 40 && temperature < 25) {
    return "Wheat";
  } else if (nitrogen > 70 && phosphorus > 50 && potassium > 50 && rainfall > 150) {
    return "Sugarcane";
  } else if (nitrogen > 50 && phosphorus > 30 && potassium > 30 && temperature > 20) {
    return "Cotton";
  } else if (ph > 6.5 && rainfall > 100 && temperature > 22) {
    return "Maize";
  } else {
    return "Pulses";
  }
};
