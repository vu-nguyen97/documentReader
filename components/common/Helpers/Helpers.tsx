import moment from 'moment';
import RNFS from 'react-native-fs';
import {VIEWER} from '../../constants/page';
import {FILE_TYPES} from '../../constants/constants';

export const viewFile = (fileName: string, navigation: any, allFiles: any) => {
  const activedPath = allFiles?.length
    ? allFiles.find((el: any) => el.endsWith(fileName))
    : fileName;
  const fileExtension = getFileExtension(fileName);
  let type;

  switch (fileExtension) {
    case 'txt':
      type = FILE_TYPES.txt;
      break;
    case 'pdf':
      type = FILE_TYPES.pdf;
      break;
    case 'docx':
      type = FILE_TYPES.word;
      break;
    case 'xlsx':
      type = FILE_TYPES.xlsx;
      break;
    case 'xls':
      type = FILE_TYPES.xls;
      break;

    default:
      break;
  }
  navigation.navigate(VIEWER, {file: {fileCopyUri: activedPath, type}});
};

export function getFileExtension(filename: string) {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(filename)?.[1];
}

export function getFileName(filename: string) {
  return filename?.split('/')?.pop();
}

export function formatBytes(bytes: number, decimals = 0, space = true) {
  // https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
  const spaceStr = space ? ' ' : '';

  if (!+bytes) return '0' + spaceStr + 'B';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}${spaceStr}${
    sizes[i]
  }`;
}

export function isSameDay(d1: string | Date, d2: string) {
  const moment1 = moment(d1);
  const moment2 = moment(d2);

  return (
    moment1.year() === moment2.year() &&
    moment1.month() === moment2.month() &&
    moment1.date() === moment2.date()
  );
}

export function getFileTime(time: string) {
  const format = isSameDay(new Date(), time) ? 'HH:mm' : 'DD-MM-YYYY';
  return moment(time).format(format);
}

export const getFileLocation = (filePath: string) => {
  if (!filePath) return '';

  // https://github.com/itinance/react-native-fs
  // CachesDirectoryPath
  // ExternalCachesDirectoryPath
  // TemporaryDirectoryPath
  // ExternalDirectoryPath

  if (filePath.includes(RNFS.DownloadDirectoryPath)) {
    return 'Download';
  } else if (filePath.includes(RNFS.DocumentDirectoryPath)) {
    return 'Documents';
  } else if (filePath.includes(RNFS.ExternalStorageDirectoryPath)) {
    return 'External storage';
  }

  return '';
};
