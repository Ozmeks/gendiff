import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import getObj from './parser.js';
import makeMergedObj from './make-obj.js';

const getFile = (path) => {
  const currentPath = process.cwd();
  const filepath = resolve(currentPath, path);
  return readFileSync(filepath);
};

const compareJson = (path1, path2, formatter) => {
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const extFile1 = extname(path1).slice(1).toUpperCase();
  const extFile2 = extname(path2).slice(1).toUpperCase();
  const obj1 = getObj(file1, extFile1);
  const obj2 = getObj(file2, extFile2);

  const mergedObj = makeMergedObj(obj1, obj2);
  const result = formatter(mergedObj);

  return result;
};

export default compareJson;
