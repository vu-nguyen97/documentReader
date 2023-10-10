import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFS from 'react-native-fs';

export function ReadMobileFile() {
  const onPress = async () => {
    var RNFS = require('react-native-fs');

    // get a list of files and directories in the main bundle
    RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
      .then(result => {
        console.log('GOT RESULT', result);

        // stat the first file
        return Promise.all([RNFS.stat(result[2].path), result[2].path]);
      })
      .then(statResult => {
        console.log('statResult :>> ', statResult);
        if (statResult[0].isFile()) {
          // if we have a file, read it
          return RNFS.readFile(statResult[1], 'base64');
        }

        return 'no file';
      })
      .then(contents => {
        // log the file contents
        console.log('contents', contents);
      })
      .catch(err => {
        console.log('err', err.message, err);
      });
  };

  // This will render native Cast button.
  // When a user presses it, a Cast dialog will prompt them to select a Cast device to connect to.
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{backgroundColor: 'gray', padding: 20}}>
        <Text style={{fontSize: 25}}> App </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: 300,
    height: 350,
    backgroundColor: '#e1e1e1',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
