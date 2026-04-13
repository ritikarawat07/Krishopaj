import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Footer = ({ navigation, activeTab }) => {

  const tabs = [
    { name: 'Home', screen: 'Dashboard', icon: '🏠' },
    { name: 'Yield', screen: 'Recommendation', icon: '📊' }, 
    { name: 'Mandi', screen: 'Mandi', icon: '🛒' },
    { name: 'Sensors', screen: 'Sensors', icon: '📡' },
    { name: 'Chat', screen: 'Chatbot', icon: '💬' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.name;

        return (
          <TouchableOpacity
            key={index}
            style={styles.tab}
            activeOpacity={0.8}
            onPress={() => navigation.navigate(tab.screen)}
          >

            {/* ICON */}
            <Text style={[
              styles.icon,
              isActive && styles.activeIcon
            ]}>
              {tab.icon}
            </Text>

            {/* LABEL */}
            <Text style={[
              styles.label,
              isActive && styles.activeLabel
            ]}>
              {tab.name}
            </Text>

            {/* ACTIVE DOT */}
            {isActive && <View style={styles.activeDot} />}

          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Footer;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#122B24',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#1F3D36',
  },

  tab: {
    alignItems: 'center',
    flex: 1,
  },

  icon: {
    fontSize: 22,
    color: '#7FAF9F',
  },

  label: {
    fontSize: 11,
    color: '#7FAF9F',
    marginTop: 2,
  },

  activeIcon: {
    color: '#2ECC71',
    fontSize: 24,
  },

  activeLabel: {
    color: '#2ECC71',
    fontWeight: 'bold',
  },

  activeDot: {
    width: 5,
    height: 5,
    backgroundColor: '#2ECC71',
    borderRadius: 5,
    marginTop: 4,
  },
});