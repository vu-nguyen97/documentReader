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
import {useNavigation} from '@react-navigation/native';
import {ReadMobileFile} from './ReadFile';
import {getFileExtension} from '../../components/common/Helpers/Helpers';
import LinearGradient from 'react-native-linear-gradient';
import {FILE_IDS} from '../../components/constants/constants';
import {FILES_BY_FORMAT} from '../../components/constants/page';
import {useSelector} from 'react-redux';
import {RootState} from '../../components/redux/store';
import {LIST_FILES} from './constants';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

export default function AllFile({navigation, allFiles}: any) {
  const starState = useSelector((state: RootState) => state.files.stars);
  const nav = useNavigation();
  const [fileData, setfileData] = useState<any>(LIST_FILES);

  const onPressType = (fileType: string, id: string) => {
    let files;
    if (id === FILE_IDS.favorite) {
      files = starState;
    } else if (id === FILE_IDS.all) {
      files = allFiles;
    } else {
      files = allFiles?.filter((el: string) => {
        const fileExtension = getFileExtension(el);
        return fileExtension && fileType?.includes(fileExtension);
      });
    }
    navigation.navigate(FILES_BY_FORMAT, {files});
  };

  useEffect(() => {
    if (!allFiles?.length) return setfileData(LIST_FILES);

    let newData: any = [...LIST_FILES];
    allFiles.forEach((filePath: any) => {
      const fileExtension = getFileExtension(filePath);

      newData = newData.map((el: any) => {
        if (el.format && el.format.includes(fileExtension)) {
          const amount = el.amount || 0;
          return {...el, amount: amount + 1};
        }
        return el;
      });
    });
    newData[0].amount = allFiles.length;
    updateFavorite(newData);
  }, [allFiles]);

  const updateFavorite = (list = fileData) => {
    const newList = list.map((el: any) => {
      if (el.id === FILE_IDS.favorite) {
        return {...el, amount: starState?.length};
      }
      return el;
    });
    setfileData(newList);
  };

  useEffect(() => {
    updateFavorite();
  }, [starState]);

  return (
    <ScrollView>
      <View>
        <Text
          style={{
            color: MD2Colors.grey900,
            marginTop: screenHeight / 40,
          }}>
          Select files by type:
        </Text>
        <View style={styles.wrapper}>
          {fileData.map((item: any, index: number) => {
            const {iconEl, name, amount, bgStart, bgEnd, format, id} = item;

            return (
              <TouchableOpacity
                key={index}
                style={styles.columnFileName}
                onPress={() => onPressType(format, id)}>
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
          <ReadMobileFile navigation={navigation} />
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
