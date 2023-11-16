import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainScreens from './screens/MainScreens';
import SearchPage from './screens/Search/SearchPage';
import FileByFormat from './screens/FileByFormat/FileByFormat';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {COLORS} from './components/constants/colors';
import {
  MAIN_SCREENS,
  SEARCH_PAGE,
  FILES_BY_FORMAT,
} from './components/constants/page';
import {Provider} from 'react-redux';
import store from './components/redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.primary,
    // secondary: '#616161',
  },
};

function App() {
  return (
    <PaperProvider theme={theme}>
      <Provider store={store}>
        <SafeAreaProvider>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name={MAIN_SCREENS}
                component={MainScreens}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={SEARCH_PAGE}
                component={SearchPage}
                options={{headerShown: false}}
              />
              <Stack.Screen
                name={FILES_BY_FORMAT}
                component={FileByFormat}
                options={{headerShown: false}}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </PaperProvider>
  );
}

export default App;
