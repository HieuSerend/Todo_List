// src/screens/SettingScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const APP_VERSION = '1.0.0'; // You can update this as needed

const SettingScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.item}>
        <Text style={styles.label}>App Version</Text>
        <Text style={styles.value}>{APP_VERSION}</Text>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 24,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 32,
    color: '#222',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: 'bold',
  },
});