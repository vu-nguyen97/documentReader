import React from 'react';
import {Dimensions} from 'react-native';
// @ts-ignore
import Icon from 'react-native-vector-icons/Ionicons';
// @ts-ignore
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
// @ts-ignore
import Icon2 from 'react-native-vector-icons/FontAwesome5';
// @ts-ignore
import Icon3 from 'react-native-vector-icons/FontAwesome';
// @ts-ignore
import Icon4 from 'react-native-vector-icons/FontAwesome6';
import {FILE_IDS} from '../../components/constants/constants';

const screenWidth = Dimensions.get('screen').width;

const iconSize = (screenWidth * 6.5) / 54;
const iconSize2 = (screenWidth * 7.5) / 54;

export const LIST_FILES = [
  {
    id: FILE_IDS.all,
    name: 'All Files',
    iconEl: <Icon name="file-tray-full" size={iconSize + 1} color="#5a44de" />,
    bgStart: 'rgba(90, 68, 222, 0.3)',
    bgEnd: 'rgba(90, 68, 222, 0.1)',
  },
  {
    id: FILE_IDS.pdf,
    name: 'Pdf Files',
    format: 'pdf',
    iconEl: <Icon2 name="file-pdf" size={iconSize} color="#b8201e" />,
    bgStart: 'rgba(184, 32, 30, 0.3)',
    bgEnd: 'rgba(184, 32, 30, 0.15)',
  },
  {
    id: FILE_IDS.word,
    name: 'Word Files',
    format: 'doc, docx',
    iconEl: <Icon1 name="microsoft-word" size={iconSize2} color="#4e8bed" />,
    bgStart: 'rgba(111,151,237, 0.3)',
    bgEnd: 'rgba(111,151,237, 0.2)',
  },
  {
    id: FILE_IDS.excel,
    name: 'Excel Files',
    format: 'xlsx',
    iconEl: <Icon1 name="microsoft-excel" size={iconSize2} color="#3ec431" />,
    bgStart: 'rgba(159,219,151, 0.3)',
    bgEnd: 'rgba(159,219,151, 0.15)',
  },
  {
    id: FILE_IDS.powerpoint,
    name: 'Pptx Files',
    format: 'pptx, ppt',
    iconEl: (
      <Icon1 name="microsoft-powerpoint" size={iconSize2} color="#e86701" />
    ),
    bgStart: 'rgba(255, 168, 99, 0.3)',
    bgEnd: 'rgba(255, 168, 99, 0.1)',
  },
  {
    id: FILE_IDS.text,
    name: 'Text Files',
    format: 'txt',
    iconEl: <Icon1 name="script-text-outline" size={iconSize + 2} />,
    bgStart: 'rgba(136,212,247, 0.3)',
    bgEnd: 'rgba(136,212,247, 0.1)',
  },
  {
    id: FILE_IDS.screenshot,
    name: 'Screenshot',
    format: 'jpg, png',
    iconEl: <Icon3 name="camera" size={iconSize - 4} color="#008000" />,
    bgStart: 'rgba(0, 128, 0, 0.3)',
    bgEnd: 'rgba(0, 128, 0, 0.1)',
  },
  {
    id: FILE_IDS.favorite,
    name: 'Favorite Files',
    iconEl: <Icon name="heart-half-outline" size={iconSize2} color="#ec5688" />,
    bgStart: 'rgba(255,192,203, 0.4)',
    bgEnd: 'rgba(255,192,203, 0.2)',
  },
  {
    id: FILE_IDS.others,
    name: 'Other Files',
    format: 'rar, zip',
    iconEl: <Icon4 name="file-zipper" size={iconSize} color="#003a8c" />,
    bgStart: 'rgba(65,105,225, 0.4)',
    bgEnd: 'rgba(65,105,225, 0.2)',
  },
];

export const SUPPORTED_FORMATS = LIST_FILES.map(el => el.format).join(', ');
