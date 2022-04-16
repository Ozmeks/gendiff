import { load } from 'js-yaml';

const getObj = (file, extFile) => {
  if (extFile === 'JSON') {
    return JSON.parse(file);
  }
  if (extFile === 'YAML' || extFile === 'YML') {
    return load(file);
  }
  return 'Unknown format file';
};

export default getObj;
