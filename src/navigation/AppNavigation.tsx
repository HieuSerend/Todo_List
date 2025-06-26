import { MainTabParamList, RootStackParamList } from '../Types/RootStackParamList';
import TodoScreen from '../screens/TodoScreen';
import TaskDetailScreen from '../screens/TaskDetailScreen';
import SettingScreen from '../screens/SettingScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator
function MainTabs() {
  return (
    <Tab.Navigator id={undefined} screenOptions={({route}) => ({ headerShown: false,
      tabBarIcon: ({focused, color, size}) => {
        let iconName = '';
        if (route.name === 'TodoList') {
          iconName = focused ? 'list' : 'list';
        } else if (route.name === 'Settings') {
          iconName = focused ? 'settings' : 'settings';
        }
        return <MaterialIcons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'black',
      tabBarInactiveTintColor: 'gray',
    })}>
      <Tab.Screen name="TodoList" component={TodoScreen} />
      <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator>
  );
}

// Stack Navigator
export const Navigation = () => {
  return (
    <Stack.Navigator id={undefined} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TodoScreen" component={MainTabs} />
      <Stack.Screen name="TaskDetailScreen" component={TaskDetailScreen} />
    </Stack.Navigator>
  );
};