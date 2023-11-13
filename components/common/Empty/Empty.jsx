import {View, Text} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';

export default function Empty() {
  return (
    <View style={{alignItems: 'center', marginTop: 6}}>
      <Icon name="file-tray-outline" size={44} color={COLORS.gray500} />
      <Text style={{marginTop: 6, fontSize: 16, fontStyle: 'italic'}}>
        No files have been opened recently.
      </Text>
    </View>
  );
}
