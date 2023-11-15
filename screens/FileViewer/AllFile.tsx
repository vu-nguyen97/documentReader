import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {MD2Colors} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import Icon3 from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {ReadMobileFile} from './ReadFile';
import {getFileExtension} from '../../components/common/Helpers/Helpers';
import LinearGradient from 'react-native-linear-gradient';
import {FILE_IDS} from '../../components/constants/constants';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const iconSize = (screenWidth * 6.5) / 54;
const iconSize2 = (screenWidth * 7.5) / 54;

export const LIST_FILES = [
  {
    id: FILE_IDS.all,
    name: 'All Files',
    iconEl: <Icon name="file-tray-full" size={iconSize + 1} color="#5a44de" />,
    bgStart: 'rgba(90, 68, 222, 0.3)',
    bgEnd: 'rgba(90, 68, 222, 0.1)',
  },
  {
    id: FILE_IDS.pdf,
    name: 'Pdf Files',
    format: 'pdf',
    iconEl: <Icon2 name="file-pdf" size={iconSize} color="#b8201e" />,
    bgStart: 'rgba(184, 32, 30, 0.3)',
    bgEnd: 'rgba(184, 32, 30, 0.15)',
  },
  {
    id: FILE_IDS.word,
    name: 'Word Files',
    format: 'doc, docx',
    iconEl: <Icon1 name="microsoft-word" size={iconSize2} color="#4e8bed" />,
    bgStart: 'rgba(111,151,237, 0.3)',
    bgEnd: 'rgba(111,151,237, 0.2)',
  },
  {
    id: FILE_IDS.excel,
    name: 'Excel Files',
    format: 'xlsx',
    iconEl: <Icon1 name="microsoft-excel" size={iconSize2} color="#3ec431" />,
    bgStart: 'rgba(159,219,151, 0.3)',
    bgEnd: 'rgba(159,219,151, 0.15)',
  },
  {
    id: FILE_IDS.powerpoint,
    name: 'Pptx Files',
    format: 'pptx, ppt',
    iconEl: (
      <Icon1 name="microsoft-powerpoint" size={iconSize2} color="#e86701" />
    ),
    bgStart: 'rgba(255, 168, 99, 0.3)',
    bgEnd: 'rgba(255, 168, 99, 0.1)',
  },
  {
    id: FILE_IDS.text,
    name: 'Text Files',
    format: 'txt',
    iconEl: <Icon1 name="script-text-outline" size={iconSize + 2} />,
    bgStart: 'rgba(136,212,247, 0.3)',
    bgEnd: 'rgba(136,212,247, 0.1)',
  },
  {
    id: FILE_IDS.screenshot,
    name: 'Screenshot',
    format: 'jpg, png',
    iconEl: <Icon3 name="camera" size={iconSize - 4} color="#008000" />,
    bgStart: 'rgba(0, 128, 0, 0.3)',
    bgEnd: 'rgba(0, 128, 0, 0.1)',
  },
  {
    id: FILE_IDS.favorite,
    name: 'Favorite Files',
    iconEl: <Icon name="heart-half-outline" size={iconSize2} color="#ec5688" />,
    bgStart: 'rgba(255,192,203, 0.4)',
    bgEnd: 'rgba(255,192,203, 0.2)',
  },
  {
    id: FILE_IDS.others,
    name: 'Other Files',
    format: 'rar, zip',
    iconEl: <Icon4 name="file-zipper" size={iconSize} color="#003a8c" />,
    bgStart: 'rgba(65,105,225, 0.4)',
    bgEnd: 'rgba(65,105,225, 0.2)',
  },
];

export default function AllFile({navigation, callback, allFiles}: any) {
  const nav = useNavigation();
  const [fileData, setfileData] = useState<any>(LIST_FILES);

  const onPressType = (fileType: string) => {
    console.log('fileType :>> ', fileType);
  };

  useEffect(() => {
    if (!allFiles?.length) return setfileData(LIST_FILES);

    let newData: any = [...LIST_FILES];
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
      <View>
        <Text
          style={{
            color: MD2Colors.grey900,
            marginTop: screenHeight / 40,
          }}>
          Select files by format:
        </Text>
        <View style={styles.wrapper}>
          {fileData.map((item: any, index: number) => {
            const {iconEl, name, amount, bgStart, bgEnd, id} = item;

            return (
              <TouchableOpacity
                key={index}
                style={styles.columnFileName}
                onPress={() => onPressType(id)}>
                {bgStart && bgEnd ? (
                  <LinearGradient
                    colors={[bgStart, bgEnd]}
                    start={{x: 0, y: 1}}
                    end={{x: 0.9, y: 0.5}}
                    style={styles.fileBox}>
                    {iconEl}
                  </LinearGradient>
                ) : (
                  <View style={styles.fileBox}>{iconEl}</View>
                )}

                <Text style={{fontWeight: 'bold', fontSize: 13}}>
                  {name} ({amount || 0})
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View>
          <Text style={styles.selectFile}>Browse local documents:</Text>
          <ReadMobileFile callback={callback} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingHorizontal: screenWidth / 60,
    paddingVertical: screenHeight / 40,
    marginHorizontal: -16,
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
    marginBottom: 12,
  },
});
