import moment from 'moment';

export function getFileExtension(filename: string) {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(filename)?.[1];
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

export function isSameDay(d1: string, d2: string) {
  const moment1 = moment(d1);
  const moment2 = moment(d2);

  return (
    moment1.year() === moment2.year() &&
    moment1.month() === moment2.month() &&
    moment1.date() === moment2.date()
  );
}
