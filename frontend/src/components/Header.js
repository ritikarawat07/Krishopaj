
        import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SimpleDropdown from './SimpleDropDown';

const Header = ({ name, navigation }) => {
  return (
    <View style={styles.header}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.name}>{name}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <SimpleDropdown />
        <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('About')}>
          <Text>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  welcomeText: { color: '#666' },
  name: { fontWeight: 'bold', color: '#333' },
  btn: {
    backgroundColor: '#eee',
    padding: 5,
    marginLeft: 5,
    borderRadius: 5,
  },
});
