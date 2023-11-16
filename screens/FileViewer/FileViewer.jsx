import React, {useState} from 'react';
import AllFile from './AllFile';
import {View} from 'react-native';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import PermissionsModal from '../../components/common/Permissions/PermissionsModal';

export default function FileViewer(props) {
  const {navigation} = props;
  const [allFiles, setAllFiles] = useState([]);

  return (
    <View>
      <View style={{padding: 16}}>
        <View>
          <SearchBar navigation={navigation} />
        </View>
        <AllFile {...props} allFiles={allFiles} />
      </View>

      <PermissionsModal
        navigation={navigation}
        updateFiles={files => setAllFiles(files)}
      />
    </View>
  );
}
