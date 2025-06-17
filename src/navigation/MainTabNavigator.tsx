import SettingScreen from '../screens/SettingScreen'
import TodoScreen from '../screens/TodoScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, 
                                    tabBarStyle: { backgroundColor: 'white' },}}>
      <Tab.Screen name="Task" component={TodoScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

