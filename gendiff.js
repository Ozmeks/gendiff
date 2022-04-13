#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import compareJson from './src/compare-json.js';

const program = new Command();
program
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format')
  .helpOption('-h, --help', 'output usage information')
  .arguments('<filepath1> <filepath2>')
  .action(compareJson);

program.description('Compares two configuration files and shows a difference.');
program.parse(process.argv);
