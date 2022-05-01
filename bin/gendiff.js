#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../formatters/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.8')
  .option('-f, --format [type]', 'output format: stylish, plain, json', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);

const { args } = program;
const [file1, file2] = args;
const { format } = program.opts();
console.log(gendiff(file1, file2, format));
