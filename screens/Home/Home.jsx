import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {MD2Colors, useTheme, Icon} from 'react-native-paper';
// import Icon1 from 'react-native-vector-icons/FontAwesome5';
// import Icon2 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../components/constants/colors';
import {TOOLS, FILE_VIEWER} from '../../components/constants/page';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Empty from '../../components/common/Empty/Empty';
import {useSelector} from 'react-redux';
import {LIST_FILES} from '../FileViewer/AllFile';
import moment from 'moment';
import {
  getFileExtension,
  formatBytes,
  isSameDay,
} from '../../components/common/Helpers/Helpers';
import {FILE_IDS} from '../../components/constants/constants';

const CardData = [
  {
    title: 'View file',
    icon: 'file-eye',
    content: 'View files in your phone.',
    isRedirectToFile: true,
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

const getIcon = filePath => {
  const fileExtension = getFileExtension(filePath);
  const activedEl = LIST_FILES.find(
    el => el.format && el.format.includes(fileExtension),
  );

  let icon;
  switch (activedEl?.id) {
    case FILE_IDS.pdf:
      icon = <Icon source="file-pdf-box" size={30} color="#b8201e" />;
      // icon = <Icon1 name="file-pdf" size={22} color="#b8201e" />;
      break;
    case FILE_IDS.word:
      icon = <Icon source="microsoft-word" size={30} color="#4e8bed" />;
      break;
    case FILE_IDS.excel:
      icon = <Icon source="microsoft-excel" size={30} color="#3ec431" />;
      break;
    case FILE_IDS.powerpoint:
      icon = <Icon source="microsoft-powerpoint" size={30} color="#e86701" />;
      break;
    case FILE_IDS.screenshot:
      icon = <Icon source="file-image-outline" size={30} color="#008000" />;
      // icon = <Icon2 name="camera" size={22} color="#008000" />;
      break;
    case FILE_IDS.text:
      icon = <Icon source="script-text-outline" size={30} color="#6b7280" />;
      break;

    default:
      icon = <Icon source="file-outline" size={30} color="#6b7280" />;
      break;
  }
  return icon;
};

const Home = ({navigation}) => {
  const theme = useTheme();
  const recentFileState = useSelector(state => state.files.recent);
  const [search, setSearch] = useState();
  const [listCards, setListCards] = useState(CardData);
  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    const newData = recentFileState.map(el => {
      const format = isSameDay(new Date(), el.time) ? 'HH:mm' : 'DD-MM-YYYY';
      const time = moment(el.time).format(format);
      return {
        ...el,
        time,
        size: formatBytes(el.size),
        icon: getIcon(el.fileCopyUri),
      };
    });
    setRecentFiles(newData);
  }, [recentFileState]);

  const onCloseCard = id => {
    setListCards(listCards.filter((item, idx) => id !== idx));
  };

  const onClickCard = (goToTool = true) => {
    if (goToTool) {
      return navigation.navigate(TOOLS);
    }
    navigation.navigate(FILE_VIEWER);
  };

  return (
    <ScrollView style={{padding: 16}}>
      <SearchBar search={search} setSearch={setSearch} />
      <ScrollView horizontal={true} style={styles.listCards}>
        {listCards.map((el, id) => (
          <View style={styles.card} key={id}>
            <Icon source={el.icon} size={30} color={MD2Colors.blue700} />
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
              <TouchableOpacity
                onPress={() => onClickCard(!el.isRedirectToFile)}
                style={styles.cardBtn}>
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
            color: COLORS.black,
            marginVertical: 18,
          }}>
          Recent Files
        </Text>
        {recentFiles?.length > 0 ? (
          <View style={styles.recentFiles}>
            {recentFiles.map((el, id) => (
              <View style={styles.fileRow} key={id}>
                <View style={styles.fileDetail}>
                  {el.icon}
                  <View style={{paddingLeft: 14}}>
                    <Text style={{fontWeight: 'bold'}}>{el.name}</Text>
                    <Text>
                      {el.time} . {el.size}
                    </Text>
                  </View>
                </View>
                {/* <Icon4 name="ellipsis-vertical-sharp" size={20} /> */}
              </View>
            ))}
          </View>
        ) : (
          <Empty />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listCards: {
    marginHorizontal: -6,
  },
  card: {
    marginTop: 16,
    marginHorizontal: 6,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    backgroundColor: COLORS.neutral50,
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
    marginTop: 5,
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
  cardBtnText: {color: MD2Colors.blue700, fontWeight: '500'},
  recentFiles: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    marginBottom: 30,
  },
  fileRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray100,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 20,
    paddingRight: 14,
    paddingVertical: 14,
  },
  fileDetail: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
