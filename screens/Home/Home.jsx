import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {MD2Colors, useTheme, Icon} from 'react-native-paper';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/AntDesign';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../components/constants/colors';
import {TOOLS} from '../../components/constants/page';

const CardData = [
  {
    title: 'View file',
    icon: 'file-eye',
    content: 'View files in your phone.',
  },
  {
    title: 'Convert file',
    icon: 'file-swap',
    content: 'Supports transferring file types.',
  },
  {
    title: 'Merge PDF',
    icon: 'file-replace',
    content: 'Merge multiple pdf files into one',
  },
  // {
  //   title: 'Change PDF password',
  //   icon: 'file-sign',
  //   content: '',
  // },
];

const RecentFiles = [
  {
    name: 'Test1.docx',
    time: '26.10.2023',
    size: '20',
    icon: 'file-word',
    color: '#4e8bed',
  },
  {
    name: 'Test1.docx',
    time: '26.10.2023',
    size: '20',
    icon: 'file-pdf',
    color: '#e6556d',
  },
  {
    name: 'Test1.docx',
    time: '26.10.2023',
    size: '20',
    icon: 'file-excel',
    color: '#3ec431',
  },
  {
    name: 'Test1.docx',
    time: '26.10.2023',
    size: '20',
    icon: 'file-alt',
    color: '#a06ded',
  },
];

const Home = ({navigation}) => {
  const theme = useTheme();
  const [listPaths, setListPaths] = useState([]);
  const [search, setSearch] = useState();
  const [listCards, setListCards] = useState(CardData);

  const onCloseCard = id => {
    setListCards(listCards.filter((item, idx) => id !== idx));
  };

  const onClickCard = () => {
    navigation.navigate(TOOLS);
  };

  return (
    <View style={{padding: 16}}>
      <View style={styles.searchBar}>
        <Icon3 name="search1" size={20} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder="Search file"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <ScrollView horizontal={true} style={styles.listCards}>
        {listCards.map((el, id) => (
          <View style={styles.card} key={id}>
            <Icon source={el.icon} size={28} color={MD2Colors.blue700} />
            <View style={styles.cardContent}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{el.title}</Text>
                <TouchableOpacity
                  style={{marginTop: -5, marginRight: -5}}
                  onPress={() => onCloseCard(id)}>
                  <Icon source="close" size={18} color={COLORS.gray500} />
                </TouchableOpacity>
              </View>
              <Text style={styles.cardDescription}>{el.content}</Text>
              <TouchableOpacity onPress={onClickCard} style={styles.cardBtn}>
                <Text style={styles.cardBtnText}>Try</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>

      <View>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '500',
            color: COLORS.black,
            marginVertical: 18,
          }}>
          Recent Files
        </Text>
        <View style={{backgroundColor: COLORS.white}}>
          {RecentFiles.map((el, id) => (
            <View style={styles.fileRow} key={id}>
              <View style={styles.fileDetail}>
                <Icon2 name={el.icon} size={30} color={el.color} />
                <View style={{paddingLeft: 10}}>
                  <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                  <Text>
                    {el.time} {el.size}KB
                  </Text>
                </View>
              </View>
              {/* <Icon4 name="ellipsis-vertical-sharp" size={20} /> */}
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 18,
    zIndex: 1,
  },
  input: {
    flex: 1,
    height: 46,
    borderRadius: 25,
    padding: 10,
    paddingLeft: 50,
    backgroundColor: COLORS.gray200,
    fontSize: 16,
  },
  listCards: {
    marginHorizontal: -6,
  },
  card: {
    marginTop: 16,
    marginHorizontal: 6,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    backgroundColor: COLORS.gray100,
    borderColor: COLORS.gray300,
    flexDirection: 'row',
  },
  cardContent: {
    marginLeft: 8,
    width: 140,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '500',
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 6,
  },
  cardBtn: {
    marginTop: 4,
    width: 50,
    paddingVertical: 2,
    marginLeft: 'auto',
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: MD2Colors.blue700,
  },
  cardBtnText: {color: MD2Colors.blue700},
  fileRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 10,
  },
  fileDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
