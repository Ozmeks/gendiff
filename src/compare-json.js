import getObj from './parser.js';
import _ from 'lodash';

const compareJson = (path1, path2) => {
  const obj1 = getObj(path1);
  const obj2 = getObj(path2);
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
