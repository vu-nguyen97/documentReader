import React, {useEffect, useState} from 'react';
import PdfViewer from '../FileViewer/Pdf/PdfViewer';
import TextViewer from '../FileViewer/Text/TextViewer';
import WordViewer from '../FileViewer/Word/WordViewer';
import ExcelViewer from '../FileViewer/Excel/ExcelViewer';
import ZipViewer from '../FileViewer/Zip/ZipViewer';
import FileNotSupport from '../FileViewer/FileNotSupport';
import {View} from 'react-native';
import {
  getFileExtension,
  formatBytes,
  getFileLocation,
  getFileName,
} from '../../components/common/Helpers/Helpers';
import RNFS from 'react-native-fs';
import {useDispatch} from 'react-redux';
import {updateRecentFiles} from '../../components/redux/files/files';

export default function Viewer(props) {
  const dispatch = useDispatch();
  const {navigation, route} = props;

  const [file, setFile] = useState();

  useEffect(() => {
    if (route.params?.file?.fileCopyUri) {
      openFile(route.params?.file);
    }
  }, [route]);

  const handleBack = () => {
    navigation.goBack();
  };

  const openFile = newFile => {
    if (!newFile?.fileCopyUri) return;
    setFile(newFile);

    const {fileCopyUri} = newFile;
    const time = new Date().toLocaleString();

    if (newFile.name) {
      // Open file from DocumentPicker
      return dispatch(
        updateRecentFiles({
          path: fileCopyUri,
          time,
          name: newFile.name,
          size: formatBytes(newFile.size),
          location: getFileLocation(fileCopyUri),
        }),
      );
    }

    // Open file from absolute path
    return RNFS.stat(fileCopyUri).then(res => {
      dispatch(
        updateRecentFiles({
          path: res.path,
          time,
          name: getFileName(res.path),
          size: formatBytes(res.size),
          location: getFileLocation(res.path),
        }),
      );
    });
  };

  const ViewerComp = checkFile(file, handleBack, openFile).comp;

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {ViewerComp}
    </View>
  );
}

const checkFile = (file, handleBack, setFile) => {
  const viewerProps = {file, handleBack, setFile};
  let ViewerComp;
  let support = true;
  const fileExtension = getFileExtension(file?.fileCopyUri);

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
    case 'application/vnd.ms-excel':
      ViewerComp = <ExcelViewer {...viewerProps} />;
      break;
    case 'application/zip':
      ViewerComp = <ZipViewer {...viewerProps} />;
      break;

    // case 'application/rar':
    default:
      support = false;
      ViewerComp = <FileNotSupport {...viewerProps} />;
      break;
  }

  return {comp: ViewerComp, support};
};
