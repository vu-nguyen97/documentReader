import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {ReadMobileFile} from './ReadFile';
import PdfViewer from './Pdf/PdfViewer';
import TextViewer from './Text/TextViewer';
import WordViewer from './Word/WordViewer';
import ExcelViewer from './Excel/ExcelViewer';
import ZipViewer from './Zip/ZipViewer';
import FileNotSupport from './FileNotSupport';

export default function FileViewer({navigation}: any) {
  const [file, setFile] = useState<any>();

  useEffect(() => {
    return () => handleBack();
  }, []);

  const handleBack = () => {
    setFile(undefined);
  };

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
    <View style={{flex: 1}}>
      {file ? ViewerComp : <ReadMobileFile callback={setFile} />}
    </View>
  );
}
