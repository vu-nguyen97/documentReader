import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView, Dimensions} from 'react-native';
import {Appbar, MD2Colors} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import {ReadMobileFile} from './ReadFile';
import {getFileExtension} from '../../components/common/Helpers/Helpers';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const FILE_TYPES = {
  all: 'All Files',
  favorite: 'Favorite Files',
};

const ListFiles = [
  {
    name: FILE_TYPES.all,
    icon: 'file-alt',
    backgroundColor: 'rgba(216,191,216, 0.6)',
  },
  {
    name: 'Pdf Files',
    format: 'pdf',
    icon: 'file-pdf',
    backgroundColor: 'rgba(224,103,103, 0.6)',
  },
  {
    name: 'Word Files',
    format: 'doc, docx',
    icon: 'file-word',
    backgroundColor: 'rgba(111,151,237, 0.5)',
  },
  {
    name: 'Excel Files',
    format: 'xlsx',
    icon: 'file-excel',
    backgroundColor: 'rgba(159,219,151, 0.5)',
  },
  {
    name: 'Pptx Files',
    format: 'pptx, ppt',
    icon: 'file-powerpoint',
    backgroundColor: 'rgba(255,228,181, 0.7)',
  },
  {
    name: 'Text Files',
    format: 'txt',
    icon: 'file',
    backgroundColor: 'rgba(136,212,247, 0.6)',
  },
  {
    name: 'Screenshot',
    format: 'jpg, png',
    icon: 'file-image',
    backgroundColor: 'rgba(255,250,205, 0.8)',
  },
  {
    name: FILE_TYPES.favorite,
    icon: 'kiss-wink-heart',
    backgroundColor: 'rgba(255,192,203, 0.6)',
  },
  {
    name: 'Other Files',
    format: 'rar, zip',
    icon: 'toolbox',
    backgroundColor: 'rgba(65,105,225, 0.4)',
  },
];

export default function AllFile({navigation, callback, allFiles}: any) {
  const nav = useNavigation();
  const [fileData, setfileData] = useState<any>(ListFiles);

  useEffect(() => {
    if (!allFiles?.length) return setfileData(ListFiles);
    console.log('allFiles :>> ', allFiles);

    let newData: any = [...ListFiles];
    let totalFiles = 0;
    allFiles.forEach((filePath: any) => {
      const fileExtension = getFileExtension(filePath);
      const index = newData.findIndex(
        (el: any) => el.format && el.format.includes(fileExtension),
      );

      if (index !== -1) {
        const amount = newData[index].amount || 0;
        newData[index].amount = amount + 1;
        totalFiles += 1;
      }
    });
    newData[0].amount = totalFiles;
    setfileData(newData);
  }, [allFiles]);

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
          {fileData.map((item: any, index: number) => (
            <View key={index} style={styles.columnFileName}>
              <View
                style={[
                  styles.fileBox,
                  {backgroundColor: item.backgroundColor},
                ]}>
                <Icon2 name={item.icon} size={(screenWidth * 7) / 54} />
              </View>
              <Text style={{fontWeight: 'bold'}}>
                {item.name} ({item.amount || 0})
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
