import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
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

export default function FileByFormat(props) {
  const {navigation, route} = props;

  const [files, setFiles] = useState([]);

  useEffect(() => {
    const files = route.params?.files || [];
    const listPromises = files.map(path => RNFS.stat(path));
    Promise.all(listPromises).then(fileRes => {
      setFiles(
        fileRes.map(el => ({
          ...el,
          name: getFileName(el.path),
          time: getFileTime(el.mtime),
          size: formatBytes(el.size),
          location: getFileLocation(el.path),
        })),
      );
    });
  }, [route]);

  const handleBack = () => {
    navigation.goBack();
  };

  const onPressFile = el => {
    viewFile(el.path, navigation);
  };

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
          // ref={inputRef}
          style={styles.input}
          placeholder="Search file"
          // value={searchText}
          // onChangeText={() => {}}
        />
      </View>
      <View>
        {files.length > 0 &&
          files.map((el, id) => (
            <TouchableOpacity
              onPress={() => onPressFile(el)}
              style={styles.fileRow}
              key={id}>
              <View style={styles.fileDetail}>
                {getFileIcon(el.path)}
                <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                  {el.name}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
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
});
