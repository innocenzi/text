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
import { Text } from '@hawezo/text';

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
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .append(' there!');

console.log(text.toString()); // Hello there!
```

**Alias**: `concat`

### `prepend`

Prepends the given input to the text.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('there!')
    .prepend('Hello ');

console.log(text.toString()); // Hello there!
```


### `line`

Appends the given input to the text, as a new line.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .line('there!');

console.log(text.toString()); 
// Hello
// there!
```

**Alias**: `appendLine`


### `space`

Adds a space.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .space() // you can specify the amount of spaces
    .line('there!');

console.log(text.toString()); // Hello there!
```


### `nl`

Adds a new line.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .nl() // you can specify the amount of new lines
    .line('there!);

console.log(text.toString()); 
// Hello
// there!
```

**Alias**: `newLine`


### `times`

Adds a string the amount of times specified.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .times('o', 3);

console.log(text.toString()); // Helloooo
```


### `before`

Gets the portion of a string before the first occurrence of the given value.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .before('l');

console.log(text.toString()); // He
```


### `beforeLast`

Gets the portion of a string before the last occurrence of the given value.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .beforeLast('l');

console.log(text.toString()); // Hel
```


### `after`

Return the remainder of a string after the first occurrence of a given value.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .after('l');

console.log(text.toString()); // lo
```


### `afterLast`

Return the remainder of a string after the last occurrence of a given value.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .afterLast('l');

console.log(text.toString()); // o
```


### `between`

Get the portion of a string between two given values.

**Example**

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello')
    .between('h', 'o);

console.log(text.toString()); // ell
```

**Alias**: `inside`


## Notes

- Other methods from the base `String` object are available. For the ones that return `string`, an instance of `Text` is returned instead.

```js
import { Text } from '@hawezo/text';

const text = Text.make('Hello ')
    .trimRight()
    .line('there!');

console.log(text.toString()); // Hellothere!
```

- Since `toString` is implemented, you can use `Text` into template strings.


```js
import { Text } from '@hawezo/text';

const text = Text.make('thirty-one')
    .toUpperCase();

console.log(`John is ${text} years old`); // John is THIRTY-ONE years old
```

- Some methods are undocumented. Use your IDE to find them.


## Contributions

Contributions are welcome, if you want to add useful methods. If you contribute, make sure to:

- Only add one feature per pull-request
- Respect the style, there is a `.prettierrc` and a `.editorconfig`
- Write meaningful tests

Thank you!
