import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Appbar, Button, MD2Colors} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Appbar.Header style={{backgroundColor: MD2Colors.deepOrange500}}>
        <Appbar.BackAction
          color={MD2Colors.white}
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Text style={{fontSize: 20, color: MD2Colors.white}}>Settings</Text>
      </Appbar.Header>

      <View style={styles.premium}>
        <View style={{marginLeft: 10, flexDirection: 'row'}}>
          <Icon name="diamond" color="yellow" size={30} />
          <View style={{paddingLeft: 10}}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>
              UPGRADE TO PREMIUM
            </Text>
            <Text style={{color: 'white', fontSize: 12}}>
              Remove all ads forever!
            </Text>
          </View>
        </View>

        <Button style={styles.buttonUpgrade}>
          <Text
            style={{
              color: 'white',
              fontSize: 11,
            }}>
            Upgrade
          </Text>
        </Button>
      </View>

      <View style={styles.viewComp}>
        <View
          style={[
            styles.options,
            {borderBottomWidth: 0.19, borderBottomColor: 'grey'},
          ]}>
          <View style={styles.rowOption}>
            <Icon name="star-o" size={20} />
            <Text style={styles.textOption}>Rate me</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>

        <View
          style={[
            styles.options,
            {borderBottomWidth: 0.19, borderBottomColor: 'grey'},
          ]}>
          <View style={styles.rowOption}>
            <Icon name="comments-o" size={20} />
            <Text style={styles.textOption}>Feedback</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>

        <View
          style={[
            styles.options,
            {borderBottomWidth: 0.19, borderBottomColor: 'grey'},
          ]}>
          <View style={styles.rowOption}>
            <Icon name="globe" size={20} />
            <Text style={styles.textOption}>Language</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>

        <View style={styles.options}>
          <View style={styles.rowOption}>
            <Icon name="share-alt" size={20} />
            <Text style={styles.textOption}>Share</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>
      </View>

      <View style={styles.viewComp}>
        <View
          style={[
            styles.options,
            {borderBottomWidth: 0.19, borderBottomColor: 'grey'},
          ]}>
          <View style={styles.rowOption}>
            <Icon name="briefcase" size={20} />
            <Text style={styles.textOption}>About</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>

        <View style={styles.options}>
          <View style={styles.rowOption}>
            <Icon name="shield" size={20} />
            <Text style={styles.textOption}>Privacy policy</Text>
          </View>
          <View style={{paddingRight: 10}}>
            <Icon name="chevron-right" size={15} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  premium: {
    flexDirection: 'row',
    borderWidth: 1,
    backgroundColor: 'black',
    marginTop: 20,
    height: 80,
    marginHorizontal: 10,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonUpgrade: {
    backgroundColor: 'red',
    width: 70,
    height: 40,
    marginRight: 20,
  },
  options: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  viewComp: {
    backgroundColor: 'white',
    borderRadius: 15,
    marginHorizontal: 10,
    marginTop: 20,
  },
  textOption: {color: 'black', paddingLeft: 10},
  rowOption: {flexDirection: 'row', padding: 10},
});

export default Settings;
