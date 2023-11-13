import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../components/constants/colors';

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
    color: COLORS.primary,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '800',
  },
});
