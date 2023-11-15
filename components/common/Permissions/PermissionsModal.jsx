import React, {useEffect, useState} from 'react';
import {Button, Dialog, Portal} from 'react-native-paper';
import {useFocusScreen, useChangeScreen} from '../../common/Hooks/Hooks';
import {Text, NativeModules} from 'react-native';
import RNFS from 'react-native-fs';
import {COLORS} from '../../constants/colors';

const {PermissionModule} = NativeModules;

export default function PermissionsModal({
  navigation,
  updateFiles,
  getFile = true,
}) {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [initFile, setInitFile] = useState(false);

  const checkPermission = () => {
    PermissionModule.getPermission().then(hasPermission => {
      if (!hasPermission) {
        setIsOpenDialog(true);
      } else if (!initFile) {
        setInitFile(true);
      }
    });
  };

  useFocusScreen(navigation, checkPermission);
  useChangeScreen(checkPermission);

  useEffect(() => {
    // console.log('Check module params :>> ', PermissionModule.getConstants());
    if (!initFile || !getFile) return;

    // CachesDirectoryPath = TemporaryDirectoryPath = 6 file = com.flabs.document.reader/cache
    // DocumentDirectoryPath = 1 file: BridgeReactNativeDevBundle.js
    getAllFilesFromDirectory(RNFS.ExternalStorageDirectoryPath)
      .then(allFiles => {
        updateFiles(allFiles);
      })
      .catch(error => {
        console.log('error', error);
      });
  }, [initFile]);

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
      // console.log('getAllFilesFromDirectory err:', error);
      return [];
    }
  };

  const openSetting = () => {
    PermissionModule.requestPermission();
    hideDialog();
  };

  const hideDialog = () => setIsOpenDialog(false);

  return (
    <Portal>
      <Dialog
        visible={isOpenDialog}
        onDismiss={hideDialog}
        style={{backgroundColor: COLORS.gray50}}>
        <Dialog.Icon icon="alert" color={COLORS.wraning} />
        <Dialog.Title>App Requires Permissions</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            To use all features of the Document Reader app, please grant the
            required permissions.
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={openSetting}>Open Settings</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
