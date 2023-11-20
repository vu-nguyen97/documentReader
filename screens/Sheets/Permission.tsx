import React, {useRef} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  NativeModules,
} from 'react-native';
import ActionSheet, {
  ActionSheetRef,
  SheetProps,
  useScrollHandlers,
} from 'react-native-actions-sheet';
import {COLORS} from '../../components/constants/colors';
// @ts-ignore
import unlock from '../../components/assets/images/unlock.png';
// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome6';
import {Button} from 'react-native-paper';
import {useChangeScreen} from '../../components/common/Hooks/Hooks';
import {useDispatch} from 'react-redux';
import {updateFilePermission} from '../../components/redux/app/app';
import {useSelector} from 'react-redux';
import {RootState} from '../../components/redux/store';

const {PermissionModule} = NativeModules;

function Permission(props: SheetProps<any>) {
  const {sheetId, payload} = props;
  const dispatch = useDispatch();
  const permission = useSelector(
    (state: RootState) => state.app.filePermission,
  );
  const actionSheetRef = useRef<ActionSheetRef>(null);
  const scrollHandlers = useScrollHandlers<ScrollView>('1', actionSheetRef);

  useChangeScreen(() => checkPermission());

  const checkPermission = () => {
    PermissionModule.getPermission().then((hasPermission: boolean) => {
      dispatch(updateFilePermission(hasPermission));
      if (hasPermission) {
        actionSheetRef.current!.hide();
      }
    });
  };

  const goToSetting = () => {
    PermissionModule.requestPermission();
  };

  return (
    // https://snack.expo.dev/@ammarahmed/github.com-ammarahm-ed-react-native-actions-sheet:expo-example
    <ActionSheet
      id={sheetId}
      ref={actionSheetRef}
      closable={permission}
      gestureEnabled={true}>
      <View style={{paddingHorizontal: 12, maxHeight: '100%'}}>
        <ScrollView {...scrollHandlers} style={styles.scrollview}>
          <Image
            source={unlock}
            style={{height: 160, width: '100%', resizeMode: 'contain'}}
          />
          <Text style={styles.title}>Permission Required</Text>
          <Text style={styles.content}>
            To read and edit documents on your device, please allow
            <Text style={{color: COLORS.wraning, fontWeight: '500'}}>
              {' '}
              Document Reader{' '}
            </Text>
            to access all your files.
          </Text>
          <View style={styles.guide}>
            <Text style={styles.guideText}>
              Allow access to manage all files
            </Text>
            <Icon
              name="toggle-switch"
              size={48}
              color="#3b82f6"
              style={{marginLeft: 6}}
            />
            <Icon2
              name="arrow-pointer"
              size={40}
              color="#fb923c"
              style={styles.handIcon}
            />
          </View>
          <Button
            mode="contained"
            onPress={goToSetting}
            style={{marginTop: 16}}>
            ALLOW
          </Button>
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
    fontWeight: '600',
    fontSize: 18,
    color: COLORS.black,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 14,
  },
  content: {
    color: COLORS.gray800,
    textAlign: 'center',
  },
  guide: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: COLORS.gray300,
    borderRadius: 10,
    padding: 4,
    marginTop: 14,
  },
  guideText: {
    color: COLORS.gray800,
  },
  handIcon: {
    position: 'absolute',
    bottom: '-16%',
    right: '50%',
    transform: [{translateX: 138}, {skewY: '-13deg'}],
  },
});

export default Permission;
