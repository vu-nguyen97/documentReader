import React, {useEffect} from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import Pdf from 'react-native-pdf';
import RNFS from 'react-native-fs';
import DocumentPicker, {types} from 'react-native-document-picker';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import {getPage} from './func';

export function ReadMobileFile({callback}: any) {
  const onPress = async () => {
    try {
      console.log('DocumentPicker :>> ', DocumentPicker);
      const res: any = await DocumentPicker.pickSingle({
        type: [types.pdf],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });

      console.log('res :>> ', res);
      callback && callback(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled!');
      } else {
        console.log('????', err);
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
    callback && callback(pdfBytes);

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
    //     callback && callback(contents);
    //   })
    //   .catch(err => {
    //     console.log('err', err.message, err);
    //   });
  };

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: 'red',
        flex: 1,
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{backgroundColor: 'gray', padding: 20}}>
        <Text style={{fontSize: 25}}> App </Text>
      </TouchableOpacity>
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
