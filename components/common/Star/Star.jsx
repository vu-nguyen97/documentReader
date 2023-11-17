import React, {useEffect, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useDispatch} from 'react-redux';
import {updateStar} from '../../redux/files/files';

export default function Star({file}) {
  const dispatch = useDispatch();

  const [star, setStar] = useState();

  useEffect(() => {
    setStar(file?.star);
  }, [file]);

  const toggleStar = file => {
    dispatch(updateStar({...file, icon: undefined}));
    setStar(!star);
  };

  return (
    <TouchableOpacity
      onPress={() => toggleStar(file)}
      style={{marginRight: 10}}>
      {star ? (
        <Icon name="heart-sharp" size={22} color="#ff2121" />
      ) : (
        <Icon name="heart-outline" size={22} />
      )}
    </TouchableOpacity>
  );
}
