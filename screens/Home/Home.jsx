import React, {useEffect, useState} from 'react';
import {Button, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Avatar} from 'react-native-paper';
import RNFS from 'react-native-fs';

const Home = ({navigation}) => {
  const [listPaths, setListPaths] = useState([]);

  useEffect(() => {
    // CachesDirectoryPath = TemporaryDirectoryPath = 6 file = com.reactnativeapp/cache
    // DocumentDirectoryPath = 1 file: BridgeReactNativeDevBundle.js
    getAllFilesFromDirectory(RNFS.RoamingDirectoryPath)
      .then(allFiles => {
        console.log('allFiles', allFiles);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, []);

  const getAllFilesFromDirectory = async directory => {
    try {
      const files = await RNFS.readDir(directory);
      const listPromises = [];
      const allFiles = [];

      files.forEach(file => {
        if (file.isFile()) {
          allFiles.push(file.path);
        } else if (file.isDirectory()) {
          listPromises.push(getAllFilesFromDirectory(file.path));
        }
      });

      const filesInFolders = await Promise.all([...listPromises]);
      filesInFolders.forEach(res => {
        if (res?.length) {
          allFiles.push(...res);
        }
      });
      return allFiles;
    } catch (error) {
      console.log('getAllFilesFromDirectory err:', error);
      return [];
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ecf0f1',
      }}>
      <Text>Home Screen</Text>
      <Icon name="rocket" size={30} color="#900" />

      <Button title="Go to Pdf" onPress={() => navigation.navigate('Pdf')} />
      <Avatar.Icon size={36} icon="fire" />
    </View>
  );
};

export default Home;
