import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const LandingScreen = ({ navigation }) => {

  const goToAbout = () => {
    navigation.navigate('About');
  };

  return (
    <View style={styles.container}>

      <Image 
        source={require('../../assets/logophoto.png')} 
        style={styles.logo}
      />
      <TouchableOpacity style={styles.button} onPress={goToAbout}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

    </View>
  );
};

export default LandingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1F1A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 300,
    marginBottom: 20,
    borderRadius: 150,
    elevation:100
  },
  title: {
    fontSize: 30,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#e8f5e9',
    marginVertical: 10,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  buttonText: {
    color: '#0B1F1A',
    fontWeight: 'bold',
  },
});
