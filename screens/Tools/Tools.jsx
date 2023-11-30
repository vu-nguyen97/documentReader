import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, NativeModules} from 'react-native';
import {COLORS} from '../../components/constants/colors';
import {Button} from 'react-native-paper';
import {PDFDocument, StandardFonts} from 'pdf-lib';
import RNFS from 'react-native-fs';
import {encode} from 'base-64';
import {WebView} from 'react-native-webview';
import loading from '../../components/assets/files/loading.json';
import LottieView from 'lottie-react-native';
// const mupdf = require('mupdf');
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';

const {PermissionModule} = NativeModules;
GoogleSignin.configure({
  webClientId: '', // xin or tạo YOUR_WEB_CLIENT_ID
  offlineAccess: true,
});

const Tools = () => {
  // const [renderedOnce, setRenderedOnce] = useState(false);
  // const updateSource = () => {
  //   console.log('onLoad');
  //   setRenderedOnce(true);
  // };

  function measurePromise(fn) {
    let onPromiseDone = () => performance.now() - start;
    let start = performance.now();
    return fn().then(onPromiseDone, onPromiseDone);
  }

  useEffect(() => {
    // GoogleSignin.configure();
    // console.log('?????');
    // await GoogleSignin.hasPlayServices();
    // const userInfo = await GoogleSignin.signIn();
    // const accessToken = userInfo.accessToken;
  }, []);

  const onCheck = async () => {
    // console.log('PermissionModule :>> ', PermissionModule);
    // PermissionModule.readExcelNew(
    //   '/storage/emulated/0/Download/Excel.xlsx',
    // ).then(
    //   res => {
    //     console.log('res :>> ', res);
    //   },
    //   err => console.log('err :>> ', err),
    // );
    PermissionModule.viewFile('/storage/emulated/0/Download/test2.docx').then(
      res => {
        console.log('res :>> ', res);
      },
      err => console.log('err :>> ', err),
    );
    // PermissionModule.removeTextFromPDF(
    //   '/storage/emulated/0/Download/testPDF.pdf',
    //   '/storage/emulated/0/Download/removedFilePDF.pdf',
    //   'Test',
    // ).then(
    //   res => {
    //     console.log('res :>> ', res);
    //   },
    //   err => {
    //     console.log('err', err);
    //   },
    // );
    // const fileContent = await RNFS.readFile(
    //   '/storage/emulated/0/Download/testPDF.pdf',
    //   'base64',
    // );
    // const base64String = `data:image/png;base64,${fileContent}`;
    // const pdfDoc = await PDFDocument.load(base64String);
    // const form = pdfDoc.getForm();
    // console.log('form :>> ', pdfDoc, form);
    // const check = () =>
    //   PermissionModule.convertFile(
    //     // ' /storage/emulated/0/Download/test.docx',
    //     'file:///data/user/0/com.flabs.document.reader/cache/f87667c1-e6ab-4b32-9363-432e14eb4fc5/test.docx',
    //     // 'file:///data/user/0/com.flabs.document.reader/cache/7b6ac2a1-e91b-4b61-923c-1e94a3e3a43a/WordTest.docx',
    //     '/storage/emulated/0/Download/testPDF.pdf',
    //     // '/storage/emulated/0/Download/WordTest.docx',
    //     // "content://com.android.providers.downloads.documents/document/24",
    //   ).then(
    //     res => console.log('res :>> ', res),
    //     err => {
    //       console.log('err :>> ', err);
    //     },
    //   );
    // measurePromise(() => check()).then(duration => {
    //   console.log(`promise took ${duration} ms`);
    // });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <LottieView
        source={loading}
        autoPlay
        loop
        style={{width: 300, height: 100}}
      /> */}

      <Text style={styles.content}>PDF Tools:</Text>
      <Text>Ảnh / Word / PowerPoint => PDF</Text>
      <Text>PDF => Word</Text>
      <Text>Split / Merge PDF</Text>
      <Text>Zoom</Text>

      <Button onPress={onCheck}>Check</Button>
      {/* Not working */}
      {/* <GoogleSigninButton
        style={{width: 312, height: 48}}
        // size={GoogleSigninButton.Size.Wide}
        // color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          // initiate sign in
          console.log('onPress');
        }}
        // disabled={isInProgress}
      /> */}
    </View>
  );

  // return (
  //   <WebView
  //     // javaScriptEnabled={true}
  //     // domStorageEnabled={true}
  //     // mixedContentMode="always" // Thêm dòng này để hỗ trợ tải tài nguyên không an toàn
  //     // allowFileAccess={true} // Thêm dòng này để cho phép truy cập vào tệp
  //     // originWhitelist={['*']} // Thêm dòng này để whitelist tất cả các nguồn
  //     // androidHardwareAccelerationDisabled={true}
  //     // source={{html: '<h1>This is a static HTML source!</h1>'}}
  //     // source={{
  //     //   uri: 'file:///data/user/0/com.flabs.document.reader/cache/769bca2e-31a8-4244-acc2-23e4a7f1d327/testPDF.pdf',
  //     // }}

  //     originWhitelist={['*']}
  //     style={{flex: 1}}
  //     allowFileAccess={true}
  //     allowUniversalAccessFromFileURLs={true}
  //     allowingReadAccessToURL={true}
  //     source={
  //       renderedOnce
  //         ? {
  //             uri: 'file:///data/user/0/com.flabs.document.reader/cache/769bca2e-31a8-4244-acc2-23e4a7f1d327/testPDF.pdf',
  //           }
  //         : {uri: undefined}
  //     }
  //     onLoad={updateSource}
  //     // source={{uri: 'file:///storage/emulated/0/Download/testPDF.pdf'}}

  //     // setSupportMultipleWindows={false}
  //     // onShouldStartLoadWithRequest={request => {
  //     //   console.log(request);
  //     //   return true;
  //     // }}
  //     // source={{uri: '/storage/emulated/0/Download/WordTest.docx'}}
  //     // source={{
  //     //   uri: 'https://docs.google.com/document/d/14g5pISVYBXTjzLdkFFVLIfH5c6s4vYuh/edit?usp=sharing&ouid=102610885840071112125&rtpof=true&sd=true',
  //     // }}
  //     // style={{}}
  //   />
  // );
};

export default Tools;

const styles = StyleSheet.create({
  content: {
    color: COLORS.primary,
    marginVertical: 5,
    fontSize: 14,
    fontWeight: '800',
  },
});
