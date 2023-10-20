import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import PdfManagement from './screens/Pdf/PdfManagement';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {HOME, PDF, SETTINGS} from './components/constants/page';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f57c00',
    // secondary: '#616161',
  },
};

function App() {
  const Tab = createBottomTabNavigator();

  return (
    <PaperProvider theme={theme}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName={HOME}
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
            <Tab.Screen name={HOME} component={HomeScreen} />
            <Tab.Screen name={PDF} component={PdfManagement} />
            <Tab.Screen name={SETTINGS} component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
