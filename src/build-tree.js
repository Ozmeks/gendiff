import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.reduce((acc, key) => {
    const hasObj1 = _.has(obj1, key);
    const hasObj2 = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (hasObj1 && !hasObj2) {
      return { ...acc, [key]: { value: value1, change: 'remove' } };
    }
    if (!hasObj1 && hasObj2) {
      return { ...acc, [key]: { value: value2, change: 'add' } };
    }
    if (_.isObject(value1) && _.isObject(value2)) {
      return { ...acc, [key]: { value: buildTree(value1, value2), change: 'none' } };
    }
    if (value1 !== value2) {
      return { ...acc, [key]: { value: [value1, value2], change: 'update' } };
    }
    return { ...acc, [key]: { value: value1, change: 'none' } };
  }, {});
};

export default buildTree;
