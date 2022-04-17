import _ from 'lodash';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import getObj from './parser.js';
import stringify from './stringify.js';

const getFile = (path) => {
  const currentPath = process.cwd();
  const filepath = resolve(currentPath, path);
  return readFileSync(filepath);
};

const makeMergedObj = (obj1, obj2) => {
  const makeObj = (acc, key) => {
    const hasObj1 = _.has(obj1, key);
    const hasObj2 = _.has(obj2, key);
    const value1 = (_.isObject(obj1[key])) ? obj1[key] : `${obj1[key]}`;
    const value2 = (_.isObject(obj2[key])) ? obj2[key] : `${obj2[key]}`;

    if (_.isObject(value1) && _.isObject(value2)) {
      acc[key] = makeMergedObj(value1, value2);
    } else {
      if (hasObj1 && hasObj2) {
        if (value1 === value2) {
          acc[key] = value1;
        } else {
          acc[`- ${key}`] = value1;
          acc[`+ ${key}`] = value2;
        }
      }
      if (hasObj1 && !hasObj2) {
        acc[`- ${key}`] = value1;
      }
      if (!hasObj1 && hasObj2) {
        acc[`+ ${key}`] = value2;
      }
    }
    return acc;
  };

  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.reduce(makeObj, {});
};

const compareJson = (path1, path2) => {
  const file1 = getFile(path1);
  const file2 = getFile(path2);
  const extFile1 = extname(path1).slice(1).toUpperCase();
  const extFile2 = extname(path2).slice(1).toUpperCase();
  const obj1 = getObj(file1, extFile1);
  const obj2 = getObj(file2, extFile2);

  const mergedObj = makeMergedObj(obj1, obj2);
  const result = stringify(mergedObj);

  console.log(result);
  return result;
};

export default compareJson;
