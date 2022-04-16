import _ from 'lodash';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import getObj from './parser.js';

const getFile = (path) => {
  const currentPath = process.cwd();
  const filepath = resolve(currentPath, path);
  return readFileSync(filepath);
};

const compareJson = (path1, path2) => {
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const extFile1 = extname(path1).slice(1).toUpperCase();
  const extFile2 = extname(path2).slice(1).toUpperCase();

  const obj1 = getObj(file1, extFile1);
  const obj2 = getObj(file2, extFile2);
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  const str = sortedKeys
    .map((key) => {
      const hasObj1 = _.has(obj1, key);
      const hasObj2 = _.has(obj2, key);
      const value1 = obj1[key];
      const value2 = obj2[key];
      if (hasObj1 && hasObj2) {
        return (value1 === value2) ? ` ${key} : ${value1}` : ` - ${key} : ${value1}\n + ${key} : ${value2}`;
      }
      return (_.has(obj1, key) ? ` - ${key} : ${value1}` : ` + ${key} : ${value2}`);
    })
    .join('\n');

  console.log(`{\n${str}\n}`);
  return `{\n${str}\n}`;
};

export default compareJson;
