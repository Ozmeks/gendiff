#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import gendiff from '../src/formatters/index.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('1.0')
  .option('-f, --format [type]', 'output format: stylish, plain, json', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(gendiff(filepath1, filepath2, format));
  })
  .parse(process.argv);
