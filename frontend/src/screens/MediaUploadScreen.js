import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import UploadButton from '../components/UploadButton';
import { uploadMedia } from '../utils/uploadMedia';

const MediaUploadScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleSelectImage = () => {
    // TODO: Implement image picker
    Alert.alert('Info', 'Image picker will be implemented');
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('Error', 'Please select an image first');
      return;
    }

    setUploading(true);
    try {
      await uploadMedia(selectedImage);
      Alert.alert('Success', 'Image uploaded successfully');
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', 'Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Media Upload</Text>
      
      <View style={styles.uploadArea}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.preview} />
        ) : (
          <Text style={styles.placeholder}>No image selected</Text>
        )}
      </View>
      
      <UploadButton 
        title="Select Image" 
        onPress={handleSelectImage}
      />
      
      {selectedImage && (
        <UploadButton 
          title={uploading ? 'Uploading...' : 'Upload to Cloud'} 
          onPress={handleUpload}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4CAF50',
  },
  uploadArea: {
    backgroundColor: '#fff',
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  preview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  placeholder: {
    fontSize: 16,
    color: '#999',
  },
});

export default MediaUploadScreen;
