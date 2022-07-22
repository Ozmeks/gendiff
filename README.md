### Hexlet tests and linter status:
[![Actions Status](https://github.com/Ozmeks/backend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/Ozmeks/backend-project-lvl2/actions)
[![Linter and tests](https://github.com/Ozmeks/backend-project-lvl2/actions/workflows/github-action-lint.yml/badge.svg)](https://github.com/Ozmeks/backend-project-lvl2/actions/workflows/github-action-lint.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/bc4d407767da099888bf/maintainability)](https://codeclimate.com/github/Ozmeks/backend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/bc4d407767da099888bf/test_coverage)](https://codeclimate.com/github/Ozmeks/backend-project-lvl2/test_coverage)

# Annotation
CLI application that shows the difference between two JSON or YAML files. It supports multiple output formats: "stylish", "plain" and "json".

### How to install:
```sh
$ make install
```

### How to use:
You can use the utility as a console application or as a as a library in your JavaScript project.

In terminal:

```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format: stylish (default), plain, json
  -h, --help           output usage information
```

In project:

```
import genDiff from 'gendiff';
const diff = genDiff(filepath1, filepath2, format);
```

#### An example of working with JSON files in a default format:
[![asciicast](https://asciinema.org/a/491264.svg)](https://asciinema.org/a/491264)

#### An example of working with JSON files in a plain format:
[![asciicast](https://asciinema.org/a/491265.svg)](https://asciinema.org/a/491265)

#### An example of working with JSON files in a json format:
[![asciicast](https://asciinema.org/a/491267.svg)](https://asciinema.org/a/491267)
