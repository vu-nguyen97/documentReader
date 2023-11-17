import {registerSheet} from 'react-native-actions-sheet';
import DetailFile from './DetailFile';
import {SHEETS} from '../../components/constants/sheets';

registerSheet(SHEETS.detailFile, DetailFile);

export {};
