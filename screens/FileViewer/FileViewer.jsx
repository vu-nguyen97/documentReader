import React, {useEffect, useState} from 'react';
import {ReadMobileFile} from './ReadFile';
import PdfViewer from './Pdf/PdfViewer';
import TextViewer from './Text/TextViewer';
import WordViewer from './Word/WordViewer';
import ExcelViewer from './Excel/ExcelViewer';
import ZipViewer from './Zip/ZipViewer';
import FileNotSupport from './FileNotSupport';
import AllFile from './AllFile';
import {Button, MD2Colors, Appbar, Dialog, Portal} from 'react-native-paper';
import {
  useFocusScreen,
  useChangeScreen,
} from '../../components/common/Hooks/Hooks';
import {View, Text, TextInput, StyleSheet, NativeModules} from 'react-native';
import RNFS from 'react-native-fs';

const {PermissionModule} = NativeModules;

export default function FileViewer(props) {
  const {navigation} = props;
  // const [file, setFile] = useState();
  const [file, setFile] = useState({
    fileCopyUri: '/storage/emulated/0/Download/test.docx',
    type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  });
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const [initFile, setInitFile] = useState(false);
  const [allFiles, setAllFiles] = useState([]);

  const handleBack = () => {
    setFile(undefined);
  };

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
    if (!initFile) return;

    // CachesDirectoryPath = TemporaryDirectoryPath = 6 file = com.flabs.document.reader/cache
    // DocumentDirectoryPath = 1 file: BridgeReactNativeDevBundle.js
    getAllFilesFromDirectory(RNFS.ExternalStorageDirectoryPath)
      .then(allFiles => {
        setAllFiles(allFiles);
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
      console.log('getAllFilesFromDirectory err:', error);
      return [];
    }
  };

  const openSetting = () => {
    PermissionModule.requestPermission();
    hideDialog();
  };

  const hideDialog = () => setIsOpenDialog(false);

  useEffect(() => {
    return () => handleBack();
  }, []);

  const viewerProps = {file, handleBack, setFile};
  let ViewerComp;
  // console.log('file?.type :>> ', file?.type);
  switch (file?.type) {
    case 'application/pdf':
      ViewerComp = <PdfViewer {...viewerProps} />;
      break;
    case 'text/plain':
      ViewerComp = <TextViewer {...viewerProps} />;
      break;
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      // case 'application/msword':
      ViewerComp = <WordViewer {...viewerProps} />;
      break;
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      ViewerComp = <ExcelViewer {...viewerProps} />;
      break;
    case 'application/zip':
      ViewerComp = <ZipViewer {...viewerProps} />;
      break;

    // case 'application/rar':
    default:
      ViewerComp = <FileNotSupport {...viewerProps} />;
      break;
  }

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {file ? (
        ViewerComp
      ) : (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <AllFile {...props} callback={setFile} allFiles={allFiles} />
        </View>
      )}

      <Portal>
        <Dialog visible={isOpenDialog} onDismiss={hideDialog}>
          <Dialog.Icon icon="alert" />
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
    </View>
  );
}
