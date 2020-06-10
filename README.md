<p align="center">
  <h1 align="center">Text</h1>
  <p align="center">
    <img alt="Continuous Integration" src="https://github.com/innocenzi/text/workflows/CI/badge.svg"> 
  &nbsp;
    <img alt="npm" src="https://img.shields.io/npm/v/@innocenzi/text?color=32c854">
  &nbsp;
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/@innocenzi/text?label=size&color=32c854"> 
  </p>
<p>

A simple string builder. I sometimes found myself writting code like the following example:

```js
// Huh
const text = `
  Report for ${projectName}:
  [${'='.repeat(progress)}${' '.repeat(rest)}] (${percent}%)

  Time spent: ${timeSpent}
  Lines: ${lines}
`;
```

The issue with this will be the broken indentation and the spaces at the start and the end. I wish there was a better way to build strings, but there is no clean method.

That is why I made this fluent string builder, which I will update according to my needs. With `Text`, you can do this:

```js
// Do this
const text = Text.make(`Report for ${projectName}:`)
  .append('[')
  .append('='.repeat(progress))
  .append(' '.repeat(rest))
  .append(']')
  .append('(', percent, '%)')
  .line()
  .line('Time spent: ', timeSpent)
  .line('Lines: ', lines);

// Or just this
const text = Text.make()
  .template(`
    Report for ${projectName}:
    [${'='.repeat(progress)}${' '.repeat(rest)}] (${percent}%)

    Time spent: ${timeSpent}
    Lines: ${lines}
  `);
```

Additionally, the library offer a few more useful string manipulation methods, inspired by the [Str](https://laravel.com/docs/7.x/helpers) utilities of the Laravel framework.

# Usage

Install it via the NPM registry:

```bash
# Yarn
$ yarn add @innocenzi/text

# NPM
$ npm i @innocenzi/text
```

The library exposes a single `Text` object, which is the string builder. You can either instantiate it normally, or call the static `make` method.

```js
import { Text } from '@innocenzi/text';

// This is the same
const text = Text.make('some optional text');

// as this
const text = new Text('some optional text');
```

## Static

### `make`

Creates a new instance of the builder. The builder can be used to fluently chain methods, in order to pleasantly manipulate text.

```js
Text.make('hello world');
```

### `random`

Generates a random alpha-numeric string.

```js
Text.random(8);
// => AM5Ysvv8
```

## Public

There are a lot of methods available, each of them are documented with examples. Until I find a way to generate a nice documentation website based on the TSDoc comments, you will have to refer to them in the [source](src/Text.ts). Though, for convenience, I added their names below.

### Builder methods

- space
- newLine
- times
- append
- appendIf
- concat
- appendLine
- line
- lineIf
- prepend
- prependIf
- prependLine
- appendLines
- prependLines
- trimLines

### Manipulation methods

- before
- beforeLast
- after
- afterLast
- between
- inside
- finish
- start
- lower
- lowerFirst
- upper
- upperFirst
- words
- kebabCase
- snakeCase
- camelCase
- pascalCase
- case
- isUuid
- map
- each

### Original string methods

- trimLeft
- trimRight
- toLowerCase
- toUpperCase
- substr
- toLocaleLowerCase
- toLocaleUpperCase
- normalize
- split
- slice
- repeat
- padStart
- padEnd
- replace
- charAt
- charCodeAt
- match
- includes
- startsWith
- endsWith
- length

## Contributions

Contributions are welcome, if you want to add useful methods. If you contribute, make sure to:

- Only add one feature per pull request
- Respect the style, there is a `.prettierrc` and a `.editorconfig`
- Write meaningful tests

Thank you!
