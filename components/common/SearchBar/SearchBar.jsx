import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {COLORS} from '../../constants/colors';
import {SEARCH_PAGE} from '../../constants/page';

export default function SearchBar(props) {
  const {navigation} = props;

  const goToSearchPage = () => {
    navigation.navigate(SEARCH_PAGE);
  };

  return (
    <TouchableOpacity style={styles.searchBar} onPress={goToSearchPage}>
      <Icon
        name="menu"
        size={20}
        style={styles.searchIcon}
        color={COLORS.black}
      />
      <Text style={styles.input}>Search file, tools</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    position: 'absolute',
    left: 19,
    zIndex: 1,
  },
  input: {
    flex: 1,
    borderRadius: 25,
    padding: 13,
    paddingLeft: 54,
    backgroundColor: COLORS.neutral200,
    fontSize: 16,
  },
});
