import React, {useState, useEffect} from 'react';
import {StyleSheet, Dimensions, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import Loading from '../../../components/common/Loading/Loading';
import {LOAD_FILE} from '../../../components/constants/constants';
import {getFileName} from '../../../components/common/Helpers/Helpers';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import mammoth from 'mammoth';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {decode} from 'base-64';

function base64ToArrayBuffer(data) {
  const binaryString = decode(data); // Giải mã data thành chuỗi binary
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer; // Chuyển đổi thành ArrayBuffer
}

const convertDocxToPdf = async path => {
  try {
    // Read the DOCX file
    const data = await RNFS.readFile(path, 'base64');
    const arrayData = base64ToArrayBuffer(data);

    // Convert DOCX to HTML
    const htmlFile = await mammoth.convertToHtml({arrayBuffer: arrayData});
    const html = htmlFile.value;

    // Save the HTML content to a file
    const HtmlPath = RNFS.CachesDirectoryPath + '/Test.html';
    await RNFS.writeFile(HtmlPath, html, 'utf8');
    console.log('HTML file created at: file://' + HtmlPath);

    // Convert the HTML to PDF
    const pdfOptions = {
      html,
      fileName: 'Test',
      directory: RNFS.CachesDirectoryPath,
    };
    const pdfFilePath = await RNHTMLtoPDF.convert(pdfOptions);
    console.log('PDF file created at:', pdfFilePath.filePath);
    return pdfFilePath.filePath;
  } catch (error) {
    console.error('Err convertDocxToPdf:', error);
  }
};

export default function WordViewer(props) {
  const {handleBack, file} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [docxConvertFilePath, setDocxConvertFilePath] = useState();

  useEffect(() => {
    if (!file) return;
    handleConvertDocxToPdf();
  }, [file]);

  const handleConvertDocxToPdf = async () => {
    setIsLoading(true);
    const pdfFilePath = await convertDocxToPdf(file.fileCopyUri);
    const path = 'File://' + pdfFilePath;

    setIsLoading(false);
    setDocxConvertFilePath(path);
  };

  if (isLoading) return <Loading text={LOAD_FILE} />;

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={styles.headerMenu}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={getFileName(file.fileCopyUri)} />
      </Appbar.Header>
      <Pdf
        source={{uri: docxConvertFilePath, cache: false}}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          // console.log(`Current page: ${page}`);
        }}
        onError={error => {
          // console.log('load file err', error);
        }}
        style={styles.pdf}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    width: Dimensions.get('window').width,
  },
  pdf: {flex: 1},
});
