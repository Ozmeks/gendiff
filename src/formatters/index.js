import _ from 'lodash';
import compareFiles from '../compare-files.js';
import fStylish from './stylish.js';
import fPlain from './plain.js';

const mapping = {
  plain: fPlain,
  stylish: fStylish,
  json: JSON.stringify,
};

export default (file1, file2, format = 'stylish') => {
  if (_.has(mapping, format)) {
    return compareFiles(file1, file2, mapping[format]);
  }

  throw new Error(`Unknown format: '${format}'!`);
};
