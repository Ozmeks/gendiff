import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import { load } from 'js-yaml';

const getObj = (path) => {
    const currentPath = process.cwd();
    const filepath = resolve(currentPath, path);
    const extName = extname(path).toUpperCase();
    const file = readFileSync(filepath);
    if (extName === '.JSON') {
        return JSON.parse(file);
    }
    return load(file);
};

export default getObj;
