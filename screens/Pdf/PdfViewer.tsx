import React, {useState} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {ReadMobileFile} from '../ReadFile';

export default function PdfViewer() {
  const [file, setFile] = useState();

  return (
    <View style={styles.container}>
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
          callback={(file: any) => setFile(file.fileCopyUri)}
          // callback={file => setFile('data:application/pdf;base64,' + file)}
        />
      )}
    </View>
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
