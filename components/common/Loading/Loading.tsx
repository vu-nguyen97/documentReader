import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../constants/colors';

export default function Loading({text = ''}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator animating={true} size="large" color={COLORS.gray600} />
      {text && (
        <Text
          style={{
            marginTop: 16,
            color: COLORS.gray600,
            fontSize: 16,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      )}
    </View>
  );
}
