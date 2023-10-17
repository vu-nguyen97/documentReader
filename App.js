import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import PdfManagement from './screens/Pdf/PdfManagement';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaProvider>
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

              return <Icon name={iconName} size={size - 5} color={color} />;
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarItemStyle: {paddingVertical: 4},
            headerShown: false,
          })}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Pdf" component={PdfManagement} />
          <Tab.Screen name="Settings" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
