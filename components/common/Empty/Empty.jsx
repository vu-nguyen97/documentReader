import {View, Text, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import empty from '../../assets/images/empty.png';

export default function Empty() {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingTop: 30,
        paddingBottom: 45,
        marginHorizontal: 4,
        borderRadius: 6,
      }}>
      {/* <Icon name="file-tray-outline" size={44} color={COLORS.gray500} /> */}
      <Image source={empty} style={{height: 120, resizeMode: 'contain'}} />
      <Text style={{fontSize: 16, fontStyle: 'italic'}}>
        No files have been opened recently.
      </Text>
    </View>
  );
}
