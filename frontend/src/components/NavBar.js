import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const NavBar = ({ title, onBackPress }) => {
  return (
    <View style={styles.navbar}>
      {onBackPress && (
        <TouchableOpacity onPress={onBackPress}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 15,
    paddingTop: 40,
  },
  backButton: {
    fontSize: 24,
    color: '#fff',
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default NavBar;
