/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
} from 'react-native';
import Pdf from 'react-native-pdf';

import {ReadMobileFile} from './screens/ReadFile';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './screens/Home/Home';
import Settings from './screens/Settings/Settings';
import PdfManagement from './screens/Pdf/PdfManagement';

function App() {
  const [file, setFile] = useState();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Pdf" component={PdfManagement} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      {/* <View style={styles.container}>
        {file ? (
          <Pdf
            source={{uri: file, cache: false}}
            // source={{uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf", cache: true}}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log('load file err', error);
            }}
            style={styles.pdf}
          />
        ) : (
          <ReadMobileFile
            callback={file => setFile(file.fileCopyUri)}
            // callback={file => setFile('data:application/pdf;base64,' + file)}
          />
        )}
      </View> */}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 5,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
  },
});

export default App;
