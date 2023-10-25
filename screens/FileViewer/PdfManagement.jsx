import React from 'react';
import {View, Text} from 'react-native';
import PdfViewer from './PdfViewer';

const PdfManagement = props => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>PdfManagement Screen</Text> */}
      <PdfViewer {...props} />
    </View>
  );
};

export default PdfManagement;
