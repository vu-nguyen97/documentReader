import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, Dimensions, View} from 'react-native';
import {Appbar} from 'react-native-paper';
import RNFS from 'react-native-fs';
import Loading from '../../../components/common/Loading/Loading';
import {LOAD_FILE} from '../../../components/constants/constants';
import {getFileName} from '../../../components/common/Helpers/Helpers';

export default function TextViewer(props) {
  const {handleBack, file} = props;

  const [isLoading, setIsLoading] = useState(false);
  const [textFileContent, setTextFileContent] = useState();

  useEffect(() => {
    if (!file) return;
    readTxtFile();
  }, [file]);

  const readTxtFile = async () => {
    setIsLoading(true);
    try {
      const content = await RNFS.readFile(file.fileCopyUri, 'utf8');
      setTextFileContent(content);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      console.log('error :>> ', err);
    }
  };

  if (isLoading) return <Loading text={LOAD_FILE} />;

  return (
    <ScrollView>
      <Appbar.Header style={styles.headerMenu}>
        <Appbar.BackAction onPress={handleBack} />
        <Appbar.Content title={getFileName(file.fileCopyUri)} />
      </Appbar.Header>

      <Text style={styles.text}>{textFileContent}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerMenu: {
    width: Dimensions.get('window').width,
  },
  text: {
    paddingHorizontal: 10,
  },
});
