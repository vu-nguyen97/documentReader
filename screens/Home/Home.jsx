import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {MD2Colors, Appbar} from 'react-native-paper';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

const Home = ({navigation}) => {
  const [listPaths, setListPaths] = useState([]);

  return (
    <View>
      <Appbar.Header style={{backgroundColor: MD2Colors.deepOrange500}}>
        <Text style={{fontSize: 20, color: MD2Colors.white, paddingLeft: 15}}>
          Home
        </Text>
      </Appbar.Header>
      <View style={styles.fileListContainer}>
        <Icon name="search" size={25} />
        <TextInput
          placeholder="Click here to search"
          clearButtonMode="always"
          style={{paddingLeft: 10, fontSize: 15}}
        />
      </View>

      <View style={{paddingHorizontal: 10}}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: '#000000',
            paddingTop: 10,
            paddingBottom: 10,
          }}>
          Recent Files
        </Text>
        <View style={{backgroundColor: '#FFFFFF'}}>
          <View
            style={[
              styles.fileRow,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              },
            ]}>
            <View style={styles.fileDetail}>
              <Icon2 name="file-word" size={30} color="#4e8bed" />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Test1.docx</Text>
                <Text>26.10.2023 20KB</Text>
              </View>
            </View>
            <Icon name="ellipsis-v" size={20} />
          </View>

          <View
            style={[
              styles.fileRow,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              },
            ]}>
            <View style={styles.fileDetail}>
              <Icon2 name="file-pdf" size={30} color="#e6556d" />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>TestPdf.pdf</Text>
                <Text>27.10.2023 780KB</Text>
              </View>
            </View>
            <Icon name="ellipsis-v" size={20} />
          </View>

          <View
            style={[
              styles.fileRow,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              },
            ]}>
            <View style={styles.fileDetail}>
              <Icon2 name="file-word" size={30} color="#4e8bed" />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Test2.docx</Text>
                <Text>26.10.2023 100KB</Text>
              </View>
            </View>
            <Icon name="ellipsis-v" size={20} />
          </View>

          <View
            style={[
              styles.fileRow,
              {
                borderBottomWidth: 1,
                borderBottomColor: 'rgba(0, 0, 0, 0.1)',
              },
            ]}>
            <View style={styles.fileDetail}>
              <Icon2 name="file-excel" size={30} color="#3ec431" />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>TestExcel.xlsx</Text>
                <Text>26.10.2023 60KB</Text>
              </View>
            </View>
            <Icon name="ellipsis-v" size={20} />
          </View>

          <View style={styles.fileRow}>
            <View style={styles.fileDetail}>
              <Icon2 name="file-alt" size={30} color="#a06ded" />
              <View style={{paddingLeft: 10}}>
                <Text style={{fontWeight: 'bold'}}>Test1.txt</Text>
                <Text>26.10.2023 4KB</Text>
              </View>
            </View>
            <Icon name="ellipsis-v" size={20} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fileRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
  },
  fileListContainer: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 10,
  },
  fileDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
