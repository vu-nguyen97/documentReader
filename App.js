import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import FileViewer from './screens/FileViewer/FileViewer';
import Tools from './screens/Tools/Tools';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon3 from 'react-native-vector-icons/Ionicons';
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {COLORS} from './components/constants/colors';
import {HOME, FILE_VIEWER, SETTINGS, TOOLS} from './components/constants/page';
import {Provider} from 'react-redux';
import store from './components/redux/store';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    // secondary: '#616161',
  },
};

function App() {
  const Tab = createBottomTabNavigator();

  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Tab.Navigator
              initialRouteName={HOME}
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  const iconSize = size - 3;
                  if (route.name === HOME) {
                    return (
                      <Icon1 name="history" size={iconSize} color={color} />
                    );
                  } else if (route.name === FILE_VIEWER) {
                    return (
                      <Icon1
                        name="file-contract"
                        size={iconSize}
                        color={color}
                      />
                    );
                  } else if (route.name === TOOLS) {
                    return (
                      <Icon4 name="compass" size={iconSize} color={color} />
                    );
                  } else if (route.name === SETTINGS) {
                    return (
                      <Icon3
                        name="settings-sharp"
                        size={size - 1}
                        color={color}
                      />
                    );
                  }
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: 'gray',
                tabBarItemStyle: {paddingVertical: 4},
                headerShown: false,
              })}>
              <Tab.Screen name={HOME} component={HomeScreen} />
              <Tab.Screen name={FILE_VIEWER} component={FileViewer} />
              <Tab.Screen name={TOOLS} component={Tools} />
              {/* <Tab.Screen name={SETTINGS} component={Settings} /> */}
            </Tab.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </PaperProvider>
  );
}

export default App;
