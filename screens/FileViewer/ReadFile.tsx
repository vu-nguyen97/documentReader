import React, {useEffect} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import DocumentPicker, {types} from 'react-native-document-picker';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import {getPage} from '../func';
import {Button} from 'react-native-paper';
import XLSX from 'xlsx';
import {VIEWER} from '../../components/constants/page';

// import RNHTMLtoPDF from 'react-native-html-to-pdf'
// import mammoth from 'mammoth';
// import Icon from 'react-native-vector-icons/AntDesign';

function base64ToArrayBuffer(data: any) {
  const binaryString = atob(data); // Giải mã data thành chuỗi binary
  const length = binaryString.length;
  const bytes = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes.buffer; // Chuyển đổi thành ArrayBuffer
}

export function ReadMobileFile({navigation}: any) {
  const onPress = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [types.allFiles],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      navigation.navigate(VIEWER, {file: res});
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // console.log('User canceled!');
      } else {
        // console.log('ReadFile error', err);
      }
    }
  };

  const onPress2 = async () => {
    const pdfDoc = await PDFDocument.create();
    const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);

    getPage(pdfDoc, timesRomanFont);
    // const page = pdfDoc.addPage();
    // getPage = (pdfDoc: any, timesRomanFont: any)

    // const {width, height} = page.getSize();
    // const fontSize = 30;
    // page.drawText('Creating PDFs!', {
    //   x: 50,
    //   y: height - 4 * fontSize,
    //   size: fontSize,
    //   font: timesRomanFont,
    //   color: rgb(0, 0.53, 0.71),
    // });

    const pdfBytes = await pdfDoc.saveAsBase64();
    console.log('pdfBytes :>> ', pdfBytes);

    // // get a list of files and directories in the main bundle
    // RNFS.readDir(RNFS.DocumentDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
    //   .then(result => {
    //     console.log('GOT RESULT', result);
    //     // stat the first file
    //     return Promise.all([RNFS.stat(result[1].path), result[1].path]);
    //   })
    //   .then(statResult => {
    //     console.log('statResult :>> ', statResult);
    //     if (statResult[0].isFile()) {
    //       // if we have a file, read it
    //       return RNFS.readFile(statResult[1], 'base64');
    //       // return Promise.all([
    //       //   statResult[1],
    //       //   RNFS.stat(statResult[1]),
    //       //   RNFS.write(statResult[1], 'VU_Nguyen_DEVVVVVVVVV', -1),
    //       // ]);
    //     }
    //   })
    //   // .then((fileContent: any) => {
    //   //   return RNFS.readFile(fileContent[0], 'base64');
    //   // })
    //   .then(contents => {
    //     console.log('base64 file :>> ', contents);
    //   })
    //   .catch(err => {
    //     console.log('err', err.message, err);
    //   });
  };

  return (
    <View
      style={{
        alignItems: 'flex-start',
        justifyContent: 'center',
        flex: 1,
      }}>
      <Button
        // icon={() => <Icon name="pdffile1" size={20} />}
        icon="folder"
        mode="contained"
        onPress={onPress}>
        Select file
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: 300,
    height: 350,
    backgroundColor: '#e1e1e1',
    // width: Dimensions.get('window').width,
    // height: Dimensions.get('window').height,
  },
});
