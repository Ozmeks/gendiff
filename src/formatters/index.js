import compareFiles from '../compare-files.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (file1, file2, format = 'stylish') => {
  switch (format) {
    case 'plain':
      return compareFiles(file1, file2, plain);
    case 'stylish':
      return compareFiles(file1, file2, stylish);
    case 'json':
      return compareFiles(file1, file2, JSON.stringify);
    default:
      throw new Error(`Unknown format: '${format}'!`);
  }
};
