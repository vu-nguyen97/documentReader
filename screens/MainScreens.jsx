import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HOME, FILES, SETTINGS, TOOLS} from '../components/constants/page';
import HomeScreen from './Home/Home';
import Settings from './Settings/Settings';
import FileViewer from './FileViewer/FileViewer';
import Tools from './Tools/Tools';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../components/constants/colors';

const Tab = createBottomTabNavigator();

export default function MainScreens() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          const iconSize = size - 3;
          if (route.name === HOME) {
            return <Icon1 name="history" size={iconSize} color={color} />;
          } else if (route.name === FILES) {
            return <Icon1 name="file-contract" size={iconSize} color={color} />;
          } else if (route.name === TOOLS) {
            return <Icon4 name="compass" size={iconSize} color={color} />;
          } else if (route.name === SETTINGS) {
            return (
              <Icon3 name="settings-sharp" size={size - 1} color={color} />
            );
          }
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarItemStyle: {paddingVertical: 4},
        headerShown: false,
      })}>
      <Tab.Screen name={HOME} component={HomeScreen} />
      <Tab.Screen name={FILES} component={FileViewer} />
      <Tab.Screen name={TOOLS} component={Tools} />
      {/* <Tab.Screen name={SETTINGS} component={Settings} /> */}
    </Tab.Navigator>
  );
}
