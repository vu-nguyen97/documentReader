import React, {useState, useEffect} from 'react';
import AllFile from './AllFile';
import {View, Text, ActivityIndicator} from 'react-native';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import {getAllFiles} from '../../components/common/Helpers/Helpers';
import {useSelector, useDispatch} from 'react-redux';
import {updateFiles} from '../../components/redux/files/files';

export default function FileViewer(props) {
  const dispatch = useDispatch();
  const filePermission = useSelector(state => state.app.filePermission);
  const filesState = useSelector(state => state.files.files);

  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  useEffect(() => {
    if (!filePermission) return;
    if (filesState?.length) return setAllFiles(filesState);

    setIsLoading(true);
    getAllFiles().then(files => {
      setIsLoading(false);
      setAllFiles(files);
      dispatch(updateFiles(files));
    });
  }, [filePermission]);

  return (
    <View>
      <View style={{padding: 16}}>
        <View>
          <SearchBar navigation={navigation} />
        </View>
        {isLoading && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 14,
              marginBottom: -14,
            }}>
            <ActivityIndicator />
            <Text style={{fontSize: 12, marginLeft: 6}}>Loading file</Text>
          </View>
        )}
        <AllFile {...props} allFiles={allFiles} />
      </View>
    </View>
  );
}
