import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import PdfManagement from './screens/Pdf/PdfManagement';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';

function UITab() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName = 'home';

            if (route.name === 'Pdf') {
              iconName = 'pdffile1';
            } else if (route.name === 'Settings') {
              iconName = 'setting';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Pdf" component={PdfManagement} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default UITab;
