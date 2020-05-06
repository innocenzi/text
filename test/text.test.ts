import { Text } from '../src';

const tests = {
  'can be stringified': {
    expected: 'Hello there!',
    builder: () => Text.make('Hello there!'),
  },

  'can be added spaces to': {
    expected: 'Hello !',
    builder: () => Text.make('Hello').space().append('!'),
  },

  'can be appended text to': {
    expected: 'Hello!',
    builder: () => Text.make('Hel').append('lo!'),
  },

  'can be prepended text to': {
    expected: 'Hello world',
    builder: () => Text.make('world').prepend('Hello '),
  },

  'can be appended a line to': {
    expected: 'Line 1\nLine 2',
    builder: () => Text.make('Line 1').appendLine('Line 2'),
  },

  'can be prepended a line to': {
    expected: 'Line 2\nLine 1',
    builder: () => Text.make('Line 1').prependLine('Line 2'),
  },
};

describe('Text Builder', () => {
  Object.entries(tests).forEach(([title, { expected, builder }]) => {
    test(title, () => expect(builder().toString()).toBe(expected));
  });
});
