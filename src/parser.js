import { load } from 'js-yaml';

const mapping = {
  yaml: load,
  yml: load,
  json: JSON.parse,
};

export default (fileContent, extFile) => {
  if (Object.hasOwn(mapping, extFile)) {
    return mapping[extFile](fileContent);
  }
  throw new Error(`Unknown format file: '${extFile}'!`);
};
