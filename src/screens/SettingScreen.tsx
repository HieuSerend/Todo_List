import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from '../Context/ThemeContext';
import { Switch } from 'react-native-gesture-handler';
import { Colors } from '../utils/Colors';

const APP_VERSION = '1.0.0';

const SettingScreen = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <SafeAreaView style={[styles.container,
    { backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary }]}>
      {/* Header */}
      <View style={[styles.header,
      { backgroundColor: theme === 'light' ? Colors.light.primary : Colors.dark.primary },
      { borderBottomColor: theme === 'light' ? Colors.light.border : Colors.dark.border }]}>
        <Text style={[styles.title,
        { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Settings
        </Text>
      </View>

      <View style={styles.contentContainer}>
        {/* App Version */}
        <View style={[styles.item,
        { borderBottomColor: theme === 'light' ? Colors.light.border : Colors.dark.border }]}>
          <Text style={[styles.label,
          { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>App Version</Text>
          <Text style={[styles.value,
          { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>{APP_VERSION}</Text>
        </View>

        {/* Theme Switch */}
        <View style={[styles.item,
        { borderBottomColor: theme === 'light' ? Colors.light.border : Colors.dark.border }]}>
          <Text style={[styles.label,
          { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Dark mode</Text>
          <Switch
            value={theme === 'dark'}
            onValueChange={() => toggleTheme(theme === 'dark' ? 'light' : 'dark')}
            trackColor={{ false: '#c5c9c7', true: '#46e071' }} // background color
            thumbColor={theme === 'dark' ? '#fff' : '#fff'} // circle color
          />
        </View>

        {/* Multi-Language */}
        <View style={[styles.item,
        { borderBottomColor: theme === 'light' ? Colors.light.border : Colors.dark.border }]}>
          <Text style={[styles.label,
          { color: theme === 'light' ? Colors.light.text : Colors.dark.text }]}>Multi-Language</Text>
        </View>
      </View>

    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 4,
    fontSize: 28,
    fontWeight: '700',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,

  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});