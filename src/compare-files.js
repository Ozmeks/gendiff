import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import getObj from './parser.js';
import buildTree from './build-tree.js';

const getFileContent = (path) => {
  const currentPath = process.cwd();
  const filepath = resolve(currentPath, path);
  return readFileSync(filepath);
};

const getFileExt = (path) => extname(path).slice(1).toLowerCase();

const compareFiles = (path1, path2, formatter) => {
  const fileContent1 = getFileContent(path1);
  const fileContent2 = getFileContent(path2);
  const fileExt1 = getFileExt(path1);
  const fileExt2 = getFileExt(path2);
  const obj1 = getObj(fileContent1, fileExt1);
  const obj2 = getObj(fileContent2, fileExt2);

  const mergedObj = buildTree(obj1, obj2);
  const result = formatter(mergedObj);

  return result;
};

export default compareFiles;
