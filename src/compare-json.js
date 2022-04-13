import { readFileSync } from 'fs';
import { resolve } from 'path';
import _ from 'lodash';

const compareJson = (path1, path2) => {
  const currentPath = process.cwd();
  const filepath1 = resolve(currentPath, path1);
  const filepath2 = resolve(currentPath, path2);

  const file1 = readFileSync(filepath1);
  const obj1 = JSON.parse(file1);
  const file2 = readFileSync(filepath2);
  const obj2 = JSON.parse(file2);
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
