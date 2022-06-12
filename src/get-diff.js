import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import getObj from './parser.js';
import buildTree from './build-tree.js';

const getFileExt = (path) => extname(path).slice(1).toLowerCase();

const getDiff = (path1, path2, formatter) => {
  const fileContent1 = readFileSync(resolve(path1), 'utf-8');
  const fileContent2 = readFileSync(resolve(path2), 'utf-8');
  const fileExt1 = getFileExt(path1);
  const fileExt2 = getFileExt(path2);
  const obj1 = getObj(fileContent1, fileExt1);
  const obj2 = getObj(fileContent2, fileExt2);

  const mergedObj = buildTree(obj1, obj2);
  return formatter(mergedObj);
};

export default getDiff;
