#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import compareJson from './src/compare-json.js';
import stylish from './src/stylish.js';

const program = new Command();
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.6')
  .option('-f, --format [type]', 'output format', 'stylish')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .parse(process.argv);

const { args } = program;
const { format } = program.opts();
if (format === 'stylish') {
  compareJson(...args, stylish);
}
