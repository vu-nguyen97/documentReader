export function getFileExtension(filename: string) {
  const re = /(?:\.([^.]+))?$/;
  return re.exec(filename)?.[1];
}
