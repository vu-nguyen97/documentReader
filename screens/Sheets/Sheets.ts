import {registerSheet} from 'react-native-actions-sheet';
import DetailFile from './DetailFile';
import Permission from './Permission';
import {SHEETS} from '../../components/constants/sheets';

registerSheet(SHEETS.detailFile, DetailFile);
registerSheet(SHEETS.permission, Permission);

export {};
