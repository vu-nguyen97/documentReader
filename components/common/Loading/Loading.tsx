import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';

export default function Loading({text = ''}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator
        animating={true}
        size="large"
        color={MD2Colors.orange900}
      />
      {text && (
        <Text
          style={{
            marginTop: 16,
            color: MD2Colors.orange900,
            fontSize: 16,
            textAlign: 'center',
          }}>
          {text}
        </Text>
      )}
    </View>
  );
}
