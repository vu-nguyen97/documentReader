import React from 'react';
import {View, Text} from 'react-native';
import PdfViewer from './PdfViewer';

const PdfManagement = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>PdfManagement Screen</Text> */}
      <PdfViewer />
    </View>
  );
};

export default PdfManagement;
