import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../components/constants/colors';
import PermissionsModal from '../../components/common/Permissions/PermissionsModal';
import {throttle} from 'lodash';
import {getFileName, viewFile} from '../../components/common/Helpers/Helpers';
import {getFileIcon} from '../../components/common/Helpers/UIHelpers';
import empty from '../../components/assets/images/empty.png';

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
    viewFile(fileName, navigation, allFiles);
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

        {searchText && (
          <View style={{paddingBottom: 16}}>
            <Text style={styles.documentResults}>Documents</Text>
            {searchResults?.length > 0 ? (
              searchResults.map((el, id) => (
                <TouchableOpacity
                  onPress={() => onPressFile(el)}
                  style={styles.fileRow}
                  key={id}>
                  <View style={styles.fileDetail}>
                    {getFileIcon(el)}
                    <Text style={{fontWeight: 'bold', marginLeft: 10}}>
                      {el}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Image
                    source={empty}
                    style={{height: 130, resizeMode: 'contain'}}
                  />
                </View>
                <Text style={{textAlign: 'center'}}>
                  Sorry, no results found.
                </Text>
                <Text style={{textAlign: 'center', marginTop: 5}}>
                  Please try a different search.
                </Text>
                <View style={styles.gapLine} />
              </View>
            )}
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
  gapLine: {
    height: 8,
    marginVertical: 50,
    backgroundColor: COLORS.gray100,
  },
});
