import React, {useState, useEffect} from 'react';
import AllFile from './AllFile';
import {View} from 'react-native';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import {getAllFiles} from '../../components/common/Helpers/Helpers';
import {useSelector} from 'react-redux';

export default function FileViewer(props) {
  const {navigation} = props;
  const filePermission = useSelector(state => state.app.filePermission);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (!filePermission) return;
    getAllFiles().then(files => setAllFiles(files));
  }, [filePermission]);

  return (
    <View>
      <View style={{padding: 16}}>
        <View>
          <SearchBar navigation={navigation} />
        </View>
        <AllFile {...props} allFiles={allFiles} />
      </View>
    </View>
  );
}
