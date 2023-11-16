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
import {TOOLS, FILES} from '../../components/constants/page';
import SearchBar from '../../components/common/SearchBar/SearchBar';
import Empty from '../../components/common/Empty/Empty';
import {useSelector} from 'react-redux';
import {getFileTime, viewFile} from '../../components/common/Helpers/Helpers';
import {getFileIcon} from '../../components/common/Helpers/UIHelpers';

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

const Home = ({navigation}) => {
  const theme = useTheme();
  const recentFileState = useSelector(state => state.files.recent);
  const [listCards, setListCards] = useState(CardData);
  const [recentFiles, setRecentFiles] = useState([]);

  useEffect(() => {
    const newData = recentFileState.map(el => {
      return {
        ...el,
        time: getFileTime(el.time),
        icon: getFileIcon(el.path),
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
    navigation.navigate(FILES);
  };

  const onPressFile = file => {
    viewFile(file.path, navigation);
  };

  return (
    <ScrollView style={{padding: 16}}>
      <SearchBar navigation={navigation} />
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
              <TouchableOpacity
                onPress={() => onPressFile(el)}
                style={styles.fileRow}
                key={id}>
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
              </TouchableOpacity>
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
