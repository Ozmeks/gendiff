import _ from 'lodash';

const buildTree = (obj1, obj2) => {
  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.reduce((acc, key) => {
      const hasObj1 = _.has(obj1, key);
      const hasObj2 = _.has(obj2, key);
      const value1 = obj1[key];
      const value2 = obj2[key];
      const changedValue = {};
      if (hasObj1 && !hasObj2) {
        changedValue.value = value1;
        changedValue.change = 'remove';
      } else if (!hasObj1 && hasObj2) {
        changedValue.value = value2;
        changedValue.change = 'add';
      } else if (_.isObject(value1) && _.isObject(value2)) {
        changedValue.value = buildTree(value1, value2);
        changedValue.change = 'none';
      } else if (value1 !== value2) {
        changedValue.value = [value1, value2];
        changedValue.change = 'update';
      } else {
        changedValue.value = value1;
        changedValue.change = 'none';
      }
      
      return { ...acc, [key]: changedValue };
    }, {});
};

export default buildTree;
