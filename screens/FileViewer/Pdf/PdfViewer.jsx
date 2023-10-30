import React from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import Pdf from 'react-native-pdf';
import {MORE_ICON} from '../../../components/common/Helpers/UIHelpers';

const PdfViewer = props => {
  const {handleBack, file} = props;

  const openMoreAction = () => {};

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={styles.headerMenu}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Title" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={openMoreAction} />
      </Appbar.Header>
      <Pdf
        source={{uri: file.fileCopyUri, cache: false}}
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
  );
};

const styles = StyleSheet.create({
  headerMenu: {
    width: Dimensions.get('window').width,
  },
  pdf: {flex: 1},
});

export default PdfViewer;