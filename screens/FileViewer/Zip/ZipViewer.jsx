import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, View, Text} from 'react-native';
import RNFS from 'react-native-fs';
import {unzip} from 'react-native-zip-archive';
import Loading from '../../../components/common/Loading/Loading';
import {LOAD_FILE} from '../../../components/constants/constants';
import {MD2Colors, Appbar} from 'react-native-paper';

function uuidv4() {
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, c =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16),
  );
}

const ZipViewer = props => {
  const {handleBack, file, setFile} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [unzipedPath, setUnzipedPath] = useState();

  useEffect(() => {
    if (!file) return;

    setIsLoading(true);
    // Cần copy ra file tạm thời rồi đọc
    // https://github.com/itinance/react-native-fs/pull/395
    // Cách dùng này đã cũ: https://stackoverflow.com/questions/52423067/how-to-get-absolute-path-of-a-file-in-react-native
    const destPath = `${RNFS.TemporaryDirectoryPath}/${file.name}`;
    RNFS.copyFile(file.uri, destPath)
      .then(res => {
        return RNFS.stat(destPath);
      })
      .then(cachedFile => {
        const targetFolder = RNFS.DownloadDirectoryPath;
        const target = targetFolder + '/' + file.name + '_' + uuidv4();

        // For test: unzip(RNFS.DownloadDirectoryPath + '/targetFile.zip', RNFS.DownloadDirectoryPath + '/resultFile1.pdf'),
        unzip(cachedFile.path, target).then(path => {
          setIsLoading(false);
          setUnzipedPath(path);
        });
      })
      .catch(err => {
        setIsLoading(false);
        console.log('Extract err', err);
      });
  }, [file]);

  const onViewFile = () => {
    // Chưa test có được ko
    setFile({fileCopyUri: unzipedPath});
  };

  if (isLoading) return <Loading text={LOAD_FILE} />;

  return (
    <View style={{flex: 1}}>
      <Appbar.Header style={styles.headerMenu}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title="Extract result" />
      </Appbar.Header>

      <View style={styles.fullScreen}>
        {unzipedPath ? (
          <View style={styles.fullScreen}>
            <Text style={styles.text}>File unzipped completed at:</Text>
            <Text style={{...styles.text, fontWeight: 600}}>{unzipedPath}</Text>
            {/* <Button icon="cryengine" mode="contained" onPress={onViewFile}>
              Open this file
            </Button> */}
          </View>
        ) : (
          <Text style={{...styles.text, color: MD2Colors.red600}}>
            Sorry, the file cannot be extracted.
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerMenu: {
    width: Dimensions.get('window').width,
  },
  fullScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: MD2Colors.green500,
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ZipViewer;
