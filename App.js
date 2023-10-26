import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import FileViewer from './screens/FileViewer/FileViewer';
import Tools from './screens/Tools/Tools';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';
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
                if (route.name === FILE_VIEWER) {
                  return (
                    <Icon2
                      name="file-eye-outline"
                      size={size - 5}
                      color={color}
                    />
                  );
                }

                let iconName = 'home';
                switch (route.name) {
                  case TOOLS:
                    iconName = 'tool';
                    break;
                  case SETTINGS:
                    iconName = 'setting';
                    break;

                  default:
                    iconName = 'home';
                    break;
                }

                return <Icon name={iconName} size={size - 5} color={color} />;
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
