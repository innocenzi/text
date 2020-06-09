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

A very simple string builder. I sometimes found myself writting code like the following examples:

```js
// Huh
const text = `Some text
with new lines`;

// Hugh
const text = `Some text\nwith new lines`;

// Huugh
let text = `Some text`;
text += `with new lines`;
```

I wish there was a better way to build strings, but there is no clean method. That is why I made this fluent string builder, which I will update according to my own needs.

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

## `make`

Creates a new instance of the builder. The builder can be used to fluently chain methods, in order to pleasantly manipulate text.

```js
Text.make('hello world');
```

## `random`

Generates a random alpha-numeric string.

```js
Text.random(8);
// => AM5Ysvv8
```

## Notes

- Other methods from the base `String` object are available. For the ones that return `string`, an instance of `Text` is returned instead.

```js
import { Text } from '@innocenzi/text';

const text = Text.make('Hello ').trimRight().line('there!');

console.log(text.toString()); // Hellothere!
```

- Since `toString` is implemented, you can use `Text` into template strings.

```js
import { Text } from '@innocenzi/text';

const text = Text.make('thirty-one').toUpperCase();

console.log(`John is ${text} years old`); // John is THIRTY-ONE years old
```

- Some methods are undocumented. Use your IDE to find them.

## Contributions

Contributions are welcome, if you want to add useful methods. If you contribute, make sure to:

- Only add one feature per pull request
- Respect the style, there is a `.prettierrc` and a `.editorconfig`
- Write meaningful tests

Thank you!
