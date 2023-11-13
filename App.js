import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import FileViewer from './screens/FileViewer/FileViewer';
import Tools from './screens/Tools/Tools';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Octicons';
import Icon3 from 'react-native-vector-icons/Fontisto';
import Icon4 from 'react-native-vector-icons/Feather';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {HOME, FILE_VIEWER, SETTINGS, TOOLS} from './components/constants/page';

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
                const iconSize = size - 3;
                if (route.name === HOME) {
                  return <Icon2 name="history" size={iconSize} color={color} />;
                } else if (route.name === FILE_VIEWER) {
                  return <Icon4 name="file" size={iconSize} color={color} />;
                } else if (route.name === TOOLS) {
                  return <Icon3 name="compass" size={iconSize} color={color} />;
                } else if (route.name === SETTINGS) {
                  return <Icon name="setting" size={size - 1} color={color} />;
                }
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
              tabBarItemStyle: {paddingVertical: 4},
              headerShown: false,
            })}>
            <Tab.Screen name={HOME} component={HomeScreen} />
            <Tab.Screen name={FILE_VIEWER} component={FileViewer} />
            <Tab.Screen name={TOOLS} component={Tools} />
            <Tab.Screen name={SETTINGS} component={Settings} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}

export default App;
