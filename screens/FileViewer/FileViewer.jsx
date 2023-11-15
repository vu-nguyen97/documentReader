import React, {useEffect, useState} from 'react';
import PdfViewer from './Pdf/PdfViewer';
import TextViewer from './Text/TextViewer';
import WordViewer from './Word/WordViewer';
import ExcelViewer from './Excel/ExcelViewer';
import ZipViewer from './Zip/ZipViewer';
import FileNotSupport from './FileNotSupport';
import AllFile from './AllFile';
import {View} from 'react-native';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import {useDispatch} from 'react-redux';
import {updateRecentFiles} from '../../components/redux/files/files';
import PermissionsModal from '../../components/common/Permissions/PermissionsModal';
import {getFileExtension} from '../../components/common/Helpers/Helpers';

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

export default function FileViewer(props) {
  const dispatch = useDispatch();
  const {navigation, route} = props;
  const [file, setFile] = useState();
  const [allFiles, setAllFiles] = useState([]);

  const handleBack = () => {
    setFile(undefined);
  };

  useEffect(() => {
    if (route.params?.file?.fileCopyUri) {
      openFile(route.params?.file);
    }
  }, [route]);

  useEffect(() => {
    return () => handleBack();
  }, []);

  const openFile = newFile => {
    setFile(newFile);
    dispatch(updateRecentFiles(newFile));
  };

  const ViewerComp = checkFile(file, handleBack, openFile).comp;
  if (file) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        {ViewerComp}
      </View>
    );
  }

  return (
    <View>
      <View style={{padding: 16}}>
        <View>
          <SearchBar navigation={navigation} />
        </View>
        <AllFile {...props} callback={openFile} allFiles={allFiles} />
      </View>

      <PermissionsModal
        navigation={navigation}
        updateFiles={files => setAllFiles(files)}
      />
    </View>
  );
}
