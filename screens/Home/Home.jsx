import React from 'react';
import {Button, View, Text} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>

      <Button title="Go to Pdf" onPress={() => navigation.navigate('Pdf')} />
    </View>
  );
};

export default Home;
