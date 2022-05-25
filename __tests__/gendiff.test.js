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

const expectedPlainResult = readFile('expected_plain.md').toString();
const plainResultJson = gendiff(fileJson1, fileJson2, 'plain');
test('Compare JSON files and check plain format', () => {
  expect(plainResultJson).toBe(expectedPlainResult);
});
const plainResultYaml = gendiff(fileYaml1, fileYaml2, 'plain');
test('Compare YAML files and check plain format', () => {
  expect(plainResultYaml).toBe(expectedPlainResult);
});

const expectedStylishResult = readFile('expected_stylish.md').toString();
const stylishResultJson = gendiff(fileJson1, fileJson2, 'stylish');
test('Compare JSON files and check stylsih format', () => {
  expect(stylishResultJson).toBe(expectedStylishResult);
});

const stylishResultYaml = gendiff(fileYaml1, fileYaml2, 'stylish');
test('Compare YAML files and check stylsih format', () => {
  expect(stylishResultYaml).toBe(expectedStylishResult);
});

const expectedJsonStyleResult = readFile('expected_json.json').toString();
const jsonStyleResultJson = gendiff(fileJson1, fileJson2, 'json');
test('Compare JSON files and check json format', () => {
  expect(jsonStyleResultJson).toBe(expectedJsonStyleResult);
});

const jsonStyleResultYaml = gendiff(fileYaml1, fileYaml2, 'json');
test('Compare YAML files and check json format', () => {
  expect(jsonStyleResultYaml).toBe(expectedJsonStyleResult);
});
