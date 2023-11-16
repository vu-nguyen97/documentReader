import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import {getFileIcon} from '../../components/common/Helpers/UIHelpers';
import {
  getFileTime,
  formatBytes,
  getFileLocation,
  getFileName,
  viewFile,
} from '../../components/common/Helpers/Helpers';
import {COLORS} from '../../components/constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFS from 'react-native-fs';
import {useSelector, useDispatch} from 'react-redux';
import {updateStar} from '../../components/redux/files/files';
import fileEmpty from '../../components/assets/images/file-empty.png';

export default function FileByFormat(props) {
  const dispatch = useDispatch();
  const starState = useSelector(state => state.files.stars);

  const {navigation, route} = props;

  const [files, setFiles] = useState([]);
  const [inited, setInited] = useState(false);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const files = route.params?.files || [];

    if (!files?.length) return setInited(true);
    if (files[0].time) {
      !inited && setInited(true);
      // Favorite type: don't check
      return setFiles(files.map(el => ({...el, star: true})));
    }

    const listPromises = files.map(path => RNFS.stat(path));
    Promise.all(listPromises).then(fileRes => {
      setFileWithStar(
        fileRes.map(el => ({
          path: el.path,
          name: getFileName(el.path),
          time: getFileTime(el.mtime),
          size: formatBytes(el.size),
          location: getFileLocation(el.path),
        })),
      );
    });
  }, [route]);

  const setFileWithStar = (list = files) => {
    if (!list?.length) return;
    const newFiles = list.map(el => {
      const isStar = starState.some(file => file.path === el.path);
      return {...el, star: isStar};
    });
    setFiles(newFiles);
    !inited && setInited(true);
  };

  useEffect(() => {
    setFileWithStar();
  }, [starState]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onPressFile = el => {
    viewFile(el.path, navigation);
  };

  const toggleStar = file => {
    dispatch(updateStar(file));
  };

  const listFiles = searchText
    ? files.filter(
        file =>
          file.name &&
          file.name.toLowerCase().includes(searchText.toLowerCase()),
      )
    : files;

  return (
    <View style={styles.page}>
      <View style={styles.searchBar}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            name="chevron-back-outline"
            size={24}
            style={styles.searchIcon}
            color={COLORS.gray800}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Search file"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      <ScrollView style={styles.resultArea}>
        {inited && !searchText && !files?.length && (
          <View style={{flex: 1, alignItems: 'center', marginTop: 30}}>
            <Image
              source={fileEmpty}
              style={{height: 180, width: 200, resizeMode: 'contain'}}
            />
            <Text style={{fontSize: 16}}>No files found on your device.</Text>
          </View>
        )}
        {listFiles.length > 0 &&
          listFiles.map((el, id) => (
            <View style={styles.fileRow} key={id}>
              <TouchableOpacity
                style={styles.fileDetail}
                onPress={() => onPressFile(el)}>
                {getFileIcon(el.path)}
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                  {el.name}
                </Text>
              </TouchableOpacity>

              <View style={styles.icons}>
                <TouchableOpacity
                  onPress={() => toggleStar(el)}
                  style={{marginRight: 10}}>
                  {el.star ? (
                    <Icon name="heart-sharp" size={22} color="#ff2121" />
                  ) : (
                    <Icon name="heart-outline" size={22} />
                  )}
                </TouchableOpacity>
                <Icon name="ellipsis-vertical-sharp" size={20} />
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {flex: 1},
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.neutral50,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.neutral100,
  },
  searchIcon: {
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: COLORS.neutral50,
    fontSize: 16,
  },
  resultArea: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: 16,
    paddingTop: 12,
  },
  fileRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 14,
  },
  fileDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
  },
});
