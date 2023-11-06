import {useEffect} from 'react';
import {AppState} from 'react-native';

// react-navigation v6 dùng useIsFocused thay thế
// import { useIsFocused } from '@react-navigation/native'
// https://stackoverflow.com/questions/50290818/react-navigation-detect-when-screen-tabbar-is-activated-appear-focus-blu

export const useFocusScreen = (navigation: any, callback: () => any) => {
  useEffect(() => {
    if (!navigation) return;

    const unsubscribe = navigation.addListener('focus', () => {
      callback && callback();
    });

    return unsubscribe;
  }, [navigation]);
};

export const useChangeScreen = (callback: () => any) => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState: any) => {
      if (nextAppState === 'active') {
        callback && callback();
      }
    };
    const appStateSubscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );
    return () => {
      appStateSubscription.remove();
    };
  }, []);
};
