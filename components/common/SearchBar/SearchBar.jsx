import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {COLORS} from '../../constants/colors';

export default function SearchBar(props) {
  const {search, setSearch} = props;

  return (
    <View style={styles.searchBar}>
      <Icon name="search1" size={20} style={styles.searchIcon} />
      <TextInput
        style={styles.input}
        placeholder="Search file, tools"
        onChangeText={setSearch}
        value={search}
      />
    </View>
  );
}

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
    backgroundColor: COLORS.neutral200,
    fontSize: 16,
  },
});
