import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';
import {COLORS} from '../../constants/colors';

export default function Loading({
  text = '',
  mask = true,
  color = COLORS.gray600,
}) {
  const LoadingEl = (
    <ActivityIndicator animating={true} size="large" color={color} />
  );

  if (mask) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {LoadingEl}
        {text && (
          <Text
            style={{
              marginTop: 16,
              color: color,
              fontSize: 16,
              textAlign: 'center',
            }}>
            {text}
          </Text>
        )}
      </View>
    );
  }

  return (
    <View
      style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 100,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {LoadingEl}
    </View>
  );
}
