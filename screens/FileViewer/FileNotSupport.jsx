import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../components/constants/colors';
import commingSoon from '../../components/assets/images/commingSoon.png';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FileNotSupport(props) {
  const {handleBack, file} = props;
  // console.log('file :>> ', file);

  return (
    <View>
      <TouchableOpacity
        onPress={handleBack}
        style={{flexDirection: 'row', marginTop: 12, alignItems: 'center'}}>
        <Icon name="arrow-left-top" size={30} color={COLORS.gray500} />
        <Text style={{marginLeft: 10, fontSize: 18, color: COLORS.gray800}}>
          Back
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          marginTop: 80,
        }}>
        <Image source={commingSoon} style={{height: 240, width: 280}} />

        <Text
          style={{
            marginTop: 12,
            color: '#06b6d4',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: '500',
          }}>
          Oops! Unsupported File Type
        </Text>
        <Text
          style={{
            color: '#06b6d4',
            textAlign: 'center',
            fontSize: 16,
            marginTop: 10,
            paddingHorizontal: 20,
          }}>
          We currently do not support opening this files.
        </Text>
      </View>
    </View>
  );
}
