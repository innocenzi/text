# Text

A very simple string builder. I sometimes found myself writting code like the following examples:

```js
const text = `Some text
with new lines`;
```

```js
const text = `Some text\nwith new lines`;
```

```js
let text = `Some text`;
text += `with new lines`;
```

Or other unpleasant methods. I wish there was a better way to build strings, but there is no clean method. That is why I made this opinionated fluent string builder, which I will update according to my needs.

# Usage

Install it via the NPM registry:

```bash
$ npm i @hawezo/text
$ yarn add @hawezo/text
```

The library only exposes a `Text` object, which is the string builder. You can either instantiate it normally, or call the static `make` method.

```js
import { Text } from '@hawezo/text`;

// This is the same
const text = new Text('some optional text');

// as this
const text = Text.make('some optional text');
```

## Methods

### `append`

Appends the given input to the text.

**Example**

```js
import { Text } from '@hawezo/text`;

const text = Text.make('Hello')
    .append(' there!);

console.log(text.toString()); // Hello there!
```

**Alias**: `concat`

### `prepend`

Prepends the given input to the text.

**Example**

```js
import { Text } from '@hawezo/text`;

const text = Text.make('there!')
    .prepend('Hello ');

console.log(text.toString()); // Hello there!
```


### `line`

Appends the given input to the text, as a new line.

**Example**

```js
import { Text } from '@hawezo/text`;

const text = Text.make('Hello')
    .line('there!);

console.log(text.toString()); 
// Hello
// there!
```

**Alias**: `appendLine`


### `space`

Adds a space.

**Example**

```js
import { Text } from '@hawezo/text`;

const text = Text.make('Hello')
    .space()
    .line('there!);

console.log(text.toString()); // Hello there!
```

## Notes

- Other methods from the base `String` object are available. For the ones that return `string`, an instance of `Text` is returned instead.

```js
import { Text } from '@hawezo/text`;

const text = Text.make('Hello ')
    .trimRight()
    .line('there!');

console.log(text.toString()); // Hellothere!
```

- Since `toString` is implemented, you can use `Text` into template strings.


```js
import { Text } from '@hawezo/text`;

const text = Text.make('thirty-one')
    .toUpperCase();

console.log(`John is ${text} years old`); // John is THIRTY-ONE years old
```