import React from 'react';
import {Button, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Home = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Icon name="rocket" size={30} color="#900" />

      <Button title="Go to Pdf" onPress={() => navigation.navigate('Pdf')} />
    </View>
  );
};

export default Home;
