import { load } from 'js-yaml';
import _ from 'lodash';

const mapping = {
  yaml: load,
  yml: load,
  json: JSON.parse,
};

export default (fileContent, extFile) => {
  if (_.has(mapping, extFile)) {
    return mapping[extFile](fileContent);
  }
  throw new Error(`Unknown format file: '${extFile}'!`);
};
