import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

const APP_VERSION = '1.0.0'; 

const SettingScreen = () => {
  const {theme, toggleTheme} = useTheme()

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>
      <View style={styles.item}>
        <Text style={styles.label}>App Version</Text>
        <Text style={styles.value}>{APP_VERSION}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Theme</Text>
        <Text style={styles.value}>{theme.backgroundColor}</Text>
        <TouchableOpacity onPress={toggleTheme} style={styles.toggleButton}>
          <Text style={styles.toggleButtonText}>Change Theme</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
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
  toggleButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  toggleButtonText: {
    color: '#fff',
  },
});