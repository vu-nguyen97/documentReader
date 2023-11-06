import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import {Appbar, MD2Colors} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ReadMobileFile} from './ReadFile';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const items = [
  {
    name: 'All Files',
    amount: '(10)',
    icon: 'file-alt',
    backgroundColor: 'rgba(216,191,216, 0.6)',
  },
  {
    name: 'Pdf Files',
    amount: '(5)',
    icon: 'file-pdf',
    backgroundColor: 'rgba(224,103,103, 0.6)',
  },
  {
    name: 'Word Files',
    amount: '(3)',
    icon: 'file-word',
    backgroundColor: 'rgba(111,151,237, 0.5)',
  },
  {
    name: 'Excel Files',
    amount: '(1)',
    icon: 'file-excel',
    backgroundColor: 'rgba(159,219,151, 0.5)',
  },
  {
    name: 'Pptx Files',
    amount: '(0)',
    icon: 'file-powerpoint',
    backgroundColor: 'rgba(255,228,181, 0.7)',
  },
  {
    name: 'Text Files',
    amount: '(1)',
    icon: 'file',
    backgroundColor: 'rgba(136,212,247, 0.6)',
  },
  {
    name: 'Screenshot',
    amount: '(0)',
    icon: 'file-image',
    backgroundColor: 'rgba(255,250,205, 0.8)',
  },
  {
    name: 'Favorite Files',
    amount: '(0)',
    icon: 'kiss-wink-heart',
    backgroundColor: 'rgba(255,192,203, 0.6)',
  },
  {
    name: 'Tools PDF',
    amount: '',
    icon: 'toolbox',
    backgroundColor: 'rgba(65,105,225, 0.4)',
  },
];

export default function AllFile({navigation, callback}: any) {
  const nav = useNavigation();
  const filePicker = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [types.allFiles],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      callback && callback(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled!');
      } else {
        console.log('????', err);
      }
    }
  };

  return (
    <ScrollView>
      <Appbar.Header style={styles.barHeader}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Appbar.BackAction
            onPress={() => nav.goBack()}
            color={MD2Colors.white}
          />
          <Text style={{fontSize: 20, color: MD2Colors.white}}>
            All Document Reader
          </Text>
        </View>
        <View style={styles.premiumButton}>
          <Icon name="diamond" size={32} color="#f7661e" />
        </View>
      </Appbar.Header>

      <View>
        <View style={styles.wrapper}>
          {items.map((item, index) => (
            <View key={index} style={styles.columnFileName}>
              <View
                style={[
                  styles.fileBox,
                  {backgroundColor: item.backgroundColor},
                ]}>
                <Icon2 name={item.icon} size={(screenWidth * 7) / 54} />
              </View>
              <Text style={{fontWeight: 'bold'}}>
                {item.name} {item.amount}
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.allFileSelectView}>
          <Text style={styles.selectFile}>Select file to view:</Text>
          <ReadMobileFile callback={callback} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  barHeader: {
    backgroundColor: '#f7661e',
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: screenWidth / 60,
    paddingVertical: screenHeight / 40,
  },
  premiumButton: {
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    width: screenWidth / 10,
    height: screenWidth / 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#FFFFFF',
  },
  fileBox: {
    width: (screenWidth * 43) / 180,
    height: (screenWidth * 43) / 180,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginRight: screenWidth / 24,
    marginLeft: screenWidth / 24,
  },
  columnFileName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginBottom: screenHeight / 40,
  },
  selectFile: {
    color: MD2Colors.grey900,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  allFileSelectView: {
    paddingHorizontal: screenWidth / 20,
    paddingVertical: screenHeight / 40,
  },
});
