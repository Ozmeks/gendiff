import compareJson from '../src/compare-files.js';
import stylish from './stylish.js';
import plain from './plain.js';

export default (file1, file2, format) => {
  switch (format) {
    case 'plain':
      return compareJson(file1, file2, plain);
    case 'stylish':
      return compareJson(file1, file2, stylish);
    case 'json':
      return compareJson(file1, file2, JSON.stringify);
    default:
      return `Unknown format: '${format}'!`;
  }
};
