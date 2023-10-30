import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import {Appbar, MD2Colors} from 'react-native-paper';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {useNavigation} from '@react-navigation/native';
import DocumentPicker, {types} from 'react-native-document-picker';
import {ReadMobileFile} from './ReadFile';

export default function AllFile({navigation, callback}: any) {
  const nav = useNavigation();
  const filePicker = async () => {
    try {
      const res: any = await DocumentPicker.pickSingle({
        type: [types.allFiles],
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      });
      callback && callback(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User canceled!');
      } else {
        console.log('????', err);
      }
    }
  };

  return (
    <ScrollView>
      <Appbar.Header
        style={{
          backgroundColor: '#f7661e',
          width: 400,
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Appbar.BackAction
            onPress={() => nav.goBack()}
            color={MD2Colors.white}
          />
          <Text style={{fontSize: 20, color: MD2Colors.white}}>
            All Document Reader
          </Text>
        </View>
        <View style={styles.premiumButton}>
          <Icon name="diamond" size={32} color="#f7661e" />
        </View>
      </Appbar.Header>

      <View style={styles.wrapper}>
        <View style={styles.rowFile}>
          <View style={styles.columnFileName}>
            <TouchableOpacity onPress={filePicker}>
              <View
                style={[
                  styles.fileBox,
                  {backgroundColor: 'rgba(216,191,216, 0.6)'},
                ]}>
                <Icon2 name="file-alt" size={50} />
              </View>
            </TouchableOpacity>
            <Text style={{fontWeight: 'bold'}}>All Files (10)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: 'rgba(224,103,103, 0.6)'},
              ]}>
              <Icon2 name="file-pdf" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Pdf Files (5)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: 'rgba(111,151,237, 0.5)'},
              ]}>
              <Icon2 name="file-word" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Word Files (3)</Text>
          </View>
        </View>

        <View style={styles.rowFile}>
          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: 'rgba(159,219,151, 0.5)'},
              ]}>
              <Icon2 name="file-excel" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Excel Files (1)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: 'rgba(255,228,181, 0.7)'},
              ]}>
              <Icon2 name="file-powerpoint" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Powerpoint Files (0)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: 'rgba(136,212,247, 0.6)'},
              ]}>
              <Icon2 name="file" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Text Files (1)</Text>
          </View>
        </View>

        <View style={[styles.rowFile]}>
          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: '#rgba(255,250,205, 0.8)'},
              ]}>
              <Icon2 name="file-image" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Screenshot (0)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={[
                styles.fileBox,
                {backgroundColor: '#rgba(255,192,203, 0.6)', marginRight: 15},
              ]}>
              <Icon2 name="kiss-wink-heart" size={50} />
            </View>
            <Text style={{fontWeight: 'bold'}}>Favorite Files (0)</Text>
          </View>

          <View style={styles.columnFileName}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 25,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
              <Icon2 name="toolbox" size={80} color="#rgba(65,105,225, 0.9)" />
            </View>
            <Text style={{fontWeight: 'bold'}}>Tools Pdf</Text>
          </View>
        </View>

        <Text style={styles.selectFile}>Select file to view:</Text>
        <ReadMobileFile callback={callback} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  premiumButton: {
    marginRight: 15,
    borderWidth: 1,
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    backgroundColor: '#FFFFFF',
  },
  fileBox: {
    width: 90,
    height: 90,
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowFile: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    marginBottom: 40,
  },
  columnFileName: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  selectFile: {
    color: MD2Colors.grey900,
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
});
