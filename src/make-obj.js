import _ from 'lodash';

const makeObj = (value, change) => ({ value, change });

const makeMergedObj = (obj1, obj2) => {
  const makeNode = (acc, key) => {
    const hasObj1 = _.has(obj1, key);
    const hasObj2 = _.has(obj2, key);
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (hasObj1 && !hasObj2) {
      acc[key] = makeObj(value1, 'remove');
      return acc;
    }

    if (!hasObj1 && hasObj2) {
      acc[key] = makeObj(value2, 'add');
      return acc;
    }

    if (_.isObject(value1) && _.isObject(value2)) {
      acc[key] = makeObj(makeMergedObj(value1, value2), 'none');
      return acc;
    }

    if (value1 === value2) {
      acc[key] = makeObj(value1, 'none');
    } else {
      acc[key] = makeObj([value1, value2], 'update');
    }

    return acc;
  };

  const keys = Object.keys({ ...obj1, ...obj2 });
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.reduce(makeNode, {});
};

export default makeMergedObj;
