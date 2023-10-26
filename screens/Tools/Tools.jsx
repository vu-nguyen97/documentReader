import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {MD2Colors} from 'react-native-paper';

const Tools = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={styles.content}>PDF Tools:</Text>
      <Text>Ảnh / Word / PowerPoint => PDF</Text>
      <Text>PDF => Word</Text>
      <Text>Split / Merge PDF</Text>
      <Text>Zoom</Text>
    </View>
  );
};

export default Tools;

const styles = StyleSheet.create({
  content: {
    color: MD2Colors.orange900,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '800',
  },
});
