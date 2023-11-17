import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {File} from '../../components/redux/files/files';
import moment from 'moment';
import {COLORS} from '../../components/constants/colors';
import RNFS from 'react-native-fs';

function DetailFile(props: SheetProps<File>) {
  const {sheetId, payload} = props;
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);

  const [lastModified, setLastModified] = useState('');

  const path = payload?.path;
  useEffect(() => {
    if (!path) return;

    RNFS.stat(path).then(res =>
      setLastModified(moment(res.mtime).format('HH:mm, MMM DD, YYYY')),
    );
  }, [path]);

  return (
    // https://snack.expo.dev/@ammarahmed/github.com-ammarahm-ed-react-native-actions-sheet:expo-example
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      snapPoints={[30, 60, 100]}
      initialSnapIndex={2}
      gestureEnabled={true}>
      <View style={{paddingHorizontal: 12, maxHeight: '100%'}}>
        <ScrollView {...scrollHandlers} style={styles.scrollview}>
          <View>
            <Text style={styles.title}>Info</Text>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{payload?.name}</Text>
            <Text style={styles.label}>Path</Text>
            <Text style={styles.value}>{payload?.path}</Text>
            <Text style={styles.label}>Size</Text>
            <Text style={styles.value}>{payload?.size}</Text>
            <Text style={styles.label}>Last modified</Text>
            <Text style={styles.value}>{lastModified}</Text>
          </View>
          <View style={styles.footer} />
        </ScrollView>
      </View>
    </ActionSheet>
  );
}

const styles = StyleSheet.create({
  footer: {height: 30},
  scrollview: {
    width: '100%',
    padding: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: COLORS.black,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray400,
    marginTop: 12,
  },
  value: {
    color: COLORS.black,
    fontWeight: '500',
  },
});

export default DetailFile;
