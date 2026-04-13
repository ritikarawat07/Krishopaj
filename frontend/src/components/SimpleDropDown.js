import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const SimpleDropdown = () => {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState('English');

  const languages = ['English', 'Hindi', 'Punjabi'];

  return (
    <View style={{ marginRight: 10 }}>

      {/* BUTTON */}
      <TouchableOpacity 
        onPress={() => setShow(!show)}
        style={{ paddingHorizontal: 8, paddingVertical: 4 }}
      >
        <Text style={{ fontSize: 12, color: '#333' }}>
          {selected} ▼
        </Text>
      </TouchableOpacity>

      {/* OPTIONS */}
      {show && (
        <View style={{ 
          position: 'absolute', 
          top: '100%', 
          right: 0,
          backgroundColor: '#fff',
          borderWidth: 1,
          borderColor: '#ddd',
          borderRadius: 4,
          zIndex: 1000,
          minWidth: 80
        }}>
          {languages.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelected(item);
                setShow(false);
              }}
              style={{ paddingHorizontal: 10, paddingVertical: 6 }}
            >
              <Text style={{ fontSize: 12, color: '#333' }}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

    </View>
  );
};

export default SimpleDropdown;
