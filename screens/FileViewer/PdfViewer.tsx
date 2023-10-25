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
// import Icon from 'react-native-vector-icons/AntDesign';
// import Icon2 from 'react-native-vector-icons/FontAwesome';
import {Appbar} from 'react-native-paper';
import {Platform} from 'react-native';
import FileViewerDetail from './FileViewerDetail';

const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export default function PdfViewer({navigation}: any) {
  const [file, setFile] = useState<any>();
  // const handleBack = () => {
  //   // navigation.navigate('Home');
  //   setFile(undefined);
  // };

  // const openMoreAction = () => {};

  const setFileFromView = (fileData: any) => {
    setFile(fileData);
  };

  return (
    <View style={styles.container}>
      {file ? (
        <FileViewerDetail file={file} setFileInParent={setFileFromView} />
      ) : (
        <ReadMobileFile callback={(file: any) => setFile(file)} />
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
});
