import React from 'react';
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

export function CastComponent() {
  const source = {
    uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
    cache: true,
  };

  // This will render native Cast button.
  // When a user presses it, a Cast dialog will prompt them to select a Cast device to connect to.
  return (
    <View style={styles.container}>
      <Pdf
        trustAllCerts={false}
        source={source}
        // onLoadComplete={(numberOfPages, filePath) => {
        //   console.log(`Number of pages: ${numberOfPages}`);
        // }}
        // onPageChanged={(page, numberOfPages) => {
        //   console.log(`Current page: ${page}`);
        // }}
        // onError={error => {
        //   console.log(error);
        // }}
        // onPressLink={uri => {
        //   console.log(`Link pressed: ${uri}`);
        // }}
        style={styles.pdf}
      />
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
