import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../components/constants/colors';
import PermissionsModal from '../../components/common/Permissions/PermissionsModal';
import {throttle} from 'lodash';
import {
  getFileName,
  getFileExtension,
} from '../../components/common/Helpers/Helpers';
import {FILE_VIEWER, MAIN_SCREENS} from '../../components/constants/page';
import {getFileIcon} from '../../components/common/Helpers/UIHelpers';
import {FILE_TYPES} from '../../components/constants/constants';

export default function SearchPage(props) {
  const inputRef = useRef(null);
  const {navigation} = props;

  const [allFiles, setAllFiles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleBack = () => {
    navigation.goBack();
  };

  const updateFiles = files => {
    setAllFiles(files);
  };

  useEffect(() => {
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 10);
  }, []);

  // const performSearch = async text => {
  //   console.log('filter', text);
  //   return searchResults + 1;
  // };

  // const throttledSearch = throttle(async text => {
  //   const results = await performSearch(text);
  //   setSearchResults(results);
  // }, 2000);

  const handleSearchTextChange = text => {
    setSearchText(text);
    // throttledSearch(text);
    const files = allFiles.map(el => getFileName(el));
    setSearchResults(
      files.filter(el => el.toLowerCase().includes(text.toLowerCase())),
    );
  };

  const onPressFile = fileName => {
    const activedPath = allFiles.find(el => el.endsWith(fileName));
    const fileExtension = getFileExtension(fileName);
    let type;

    switch (fileExtension) {
      case 'txt':
        type = FILE_TYPES.txt;
        break;
      case 'pdf':
        type = FILE_TYPES.pdf;
        break;
      case 'docx':
        type = FILE_TYPES.word;
        break;
      case 'xlsx':
        type = FILE_TYPES.excel;
        break;

      default:
        break;
    }
    navigation.navigate(MAIN_SCREENS, {
      screen: FILE_VIEWER,
      params: {file: {fileCopyUri: activedPath, type}},
    });
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
          ref={inputRef}
          style={styles.input}
          placeholder="Search file, tools"
          value={searchText}
          onChangeText={handleSearchTextChange}
        />
      </View>
      <ScrollView style={styles.resultArea}>
        {/* <Text style={{fontWeight: '600', fontSize: 16}}>Recent files:</Text> */}

        {searchText && searchResults?.length > 0 && (
          <View>
            <Text style={styles.documentResults}>Documents</Text>
            {searchResults.map((el, id) => (
              <TouchableOpacity
                onPress={() => onPressFile(el)}
                style={styles.fileRow}
                key={id}>
                <View style={styles.fileDetail}>
                  {getFileIcon(el)}
                  <Text style={{fontWeight: 'bold', marginLeft: 10}}>{el}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <PermissionsModal navigation={navigation} updateFiles={updateFiles} />
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
  documentResults: {
    marginTop: 4,
    color: COLORS.neutral400,
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
