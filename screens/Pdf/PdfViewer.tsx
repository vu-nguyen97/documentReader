import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import {ReadMobileFile} from './ReadFile';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function PdfViewer({navigation}: any) {
  const [file, setFile] = useState<any>();

  const handleBack = () => {
    // navigation.navigate('Home');
    setFile(undefined);
  };

  const openMoreAction = () => {};

  return (
    <View style={styles.container}>
      {file ? (
        <View style={{flex: 1}}>
          <Appbar.Header>
            <Appbar.BackAction onPress={handleBack} />
            <Appbar.Content title="Title" />
            <Appbar.Action icon="magnify" onPress={() => {}} />
            <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
          </Appbar.Header>
          <Pdf
            source={{uri: file, cache: false}}
            // source={{
            //   // uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf',
            //   // uri: 'https://pspdfkit.com/downloads/pspdfkit-android-quickstart-guide.pdf',
            //   uri: 'file:///data/user/0/com.reactnativeapp/cache/d520617d-63ab-4393-9992-2dd16ca27e13/pdf-test.pdf',
            //   cache: true,
            // }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              // console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log('load file err', error);
            }}
            style={styles.pdf}
          />
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width - 20,
  },
});
