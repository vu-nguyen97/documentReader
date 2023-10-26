import {View, Text} from 'react-native';
import React from 'react';
import {MD2Colors, Appbar} from 'react-native-paper';

export default function FileNotSupport(props) {
  const {handleBack, file} = props;

  return (
    <View style={{flex: 1}}>
      <Appbar.Header>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Back" />
      </Appbar.Header>

      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{color: MD2Colors.red600, textAlign: 'center', fontSize: 16}}>
          Sorry, we currently do not support opening this files. ({file?.type})
        </Text>
      </View>
    </View>
  );
}
