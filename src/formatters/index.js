import _ from 'lodash';
import compareFiles from '../compare-files.js';
import stylish from './stylish.js';
import plain from './plain.js';

const mapping = {
  plain,
  stylish,
  json: JSON.stringify,
};

export default (file1, file2, format = 'stylish') => {
  if (_.has(mapping, format)) {
    return compareFiles(file1, file2, mapping[format]);
  }

  throw new Error(`Unknown format: '${format}'!`);
};
