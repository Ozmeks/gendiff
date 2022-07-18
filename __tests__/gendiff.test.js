import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import gendiff from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const fileJson1 = getFixturePath('file1.json');
const fileJson2 = getFixturePath('file2.json');
const fileYaml1 = getFixturePath('file1.yml');
const fileYaml2 = getFixturePath('file2.yml');

const formats = ['plain', 'stylish', 'json'];

test.each(formats)('Test %s format', (format) => {
  const expectedResult = readFile(`expected_${format}.md`).toString();
  const receivedJson = gendiff(fileJson1, fileJson2, format);
  expect(receivedJson).toEqual(expectedResult);
  const receivedYaml = gendiff(fileYaml1, fileYaml2, format);
  expect(receivedYaml).toEqual(expectedResult);
});
