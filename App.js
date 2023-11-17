import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainScreens from './screens/MainScreens';
import SearchPage from './screens/Search/SearchPage';
import FileByFormat from './screens/FileByFormat/FileByFormat';
import Viewer from './screens/Viewer/Viewer';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MD3LightTheme as DefaultTheme, PaperProvider} from 'react-native-paper';
import {COLORS} from './components/constants/colors';
import {
  MAIN_SCREENS,
  SEARCH_PAGE,
  FILES_BY_FORMAT,
  VIEWER,
} from './components/constants/page';
import {Provider} from 'react-redux';
import store from './components/redux/store';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MenuProvider} from 'react-native-popup-menu';
import {SheetProvider} from 'react-native-actions-sheet';
import './screens/Sheets/Sheets';

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
        <MenuProvider>
          <SheetProvider>
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
                  <Stack.Screen
                    name={VIEWER}
                    component={Viewer}
                    options={{headerShown: false}}
                  />
                </Stack.Navigator>
              </NavigationContainer>
            </SafeAreaProvider>
          </SheetProvider>
        </MenuProvider>
      </Provider>
    </PaperProvider>
  );
}

export default App;
