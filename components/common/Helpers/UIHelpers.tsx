import React from 'react';
import {Platform} from 'react-native';
import {getFileExtension} from './Helpers';
import {LIST_FILES} from '../../../screens/FileViewer/AllFile';
import {FILE_IDS} from '../../../components/constants/constants';
import {Icon} from 'react-native-paper';

export const MORE_ICON =
  Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

export const getFileIcon = (filePath: string) => {
  const fileExtension = getFileExtension(filePath);
  const activedEl = LIST_FILES.find(
    (el: any) => el.format && el.format.includes(fileExtension),
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
