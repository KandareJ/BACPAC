import * as RNFS from 'react-native-fs';

const path = `${RNFS.DocumentDirectoryPath}/book.txt`;

export const write = async (toWrite) => {
    let exists = await RNFS.exists(path)
    if (exists) return RNFS.write(path, toWrite, -1, 'utf8');
    else return RNFS.writeFile(path, toWrite, 'utf8');
}

export const read = async (callback) => {
  return await RNFS.readFile(path, 'utf8');
}

export const deleteFile = async () => {
  return await RNFS.unlink(path);
}
