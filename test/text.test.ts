import { Text } from '../src';

const tests = {
  'can be stringified': [
    {
      expected: 'Hello there!',
      builder: () => Text.make('Hello there!'),
    },
  ],

  'can be appended text to': [
    {
      expected: 'Hello!',
      builder: () => Text.make('Hel').append('lo!'),
    },
  ],

  'can be prepended text to': [
    {
      expected: 'Hello world',
      builder: () => Text.make('world').prepend('Hello '),
    },
  ],

  'can be appended a line to': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 1').appendLine('Line 2'),
    },
  ],

  'can be prepended a line to': [
    {
      expected: 'Line 2\nLine 1',
      builder: () => Text.make('Line 1').prependLine('Line 2'),
    },
  ],

  'can be appended multiple lines to': [
    {
      expected: 'Line 1\nLine 2\nLine 3',
      builder: () => Text.make('Line 1').appendLines('Line 2', 'Line 3'),
    },
  ],

  'adds a line return between the existing text and the prepended lines': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 2').prependLines('Line 1'),
    },
  ],

  'does not add a line return when prepending a line on an empty text': [
    {
      expected: 'Line 1',
      builder: () => Text.make().prependLines('Line 1'),
    },
  ],

  'can be prepended multiple lines to': [
    {
      expected: 'Line 1\nLine 2\nLine 3',
      builder: () => Text.make('Line 3').prependLines('Line 1', 'Line 2'),
    },
  ],

  'can be concatenated': [
    {
      expected: 'Hello there',
      builder: () => Text.make('Hello').concat(' there'),
    },
  ],

  'can be added spaces to': [
    {
      expected: 'Hello !',
      builder: () => Text.make('Hello').space().append('!'),
    },
  ],

  'can be added new lines to': [
    {
      expected: 'Line 1\nLine 2',
      builder: () => Text.make('Line 1').nl().append('Line 2'),
    },
  ],

  'can be added the specified amount of characters': [
    {
      expected: 'aaa',
      builder: () => Text.make().times('a', 3),
    },
  ],

  'returns the content before the first occurrence': [
    {
      expected: 't',
      builder: () => Text.make('test').before('e'),
    },
  ],

  'returns the content before the last occurrence': [
    {
      expected: 'hel',
      builder: () => Text.make('hello').beforeLast('l'),
    },
  ],

  'returns the content after the first occurrence': [
    {
      expected: 'lo',
      builder: () => Text.make('hello').after('l'),
    },
  ],

  'returns the content after the last occurrence': [
    {
      expected: 'o',
      builder: () => Text.make('hello').afterLast('l'),
    },
  ],

  'returns the content between two values': [
    {
      expected: 'ell',
      builder: () => Text.make('hello').between('h', 'o'),
    },
  ],

  'returns the same when calling `between` if one value is empty': [
    {
      expected: 'ello',
      builder: () => Text.make('hello').between('h', 'p'),
    },
    {
      expected: 'lo',
      builder: () => Text.make('hello').between('l', 'p'),
    },
    {
      expected: 'h',
      builder: () => Text.make('hello').between('p', 'e'),
    },
  ],

  'finishes a string with the given value': [
    {
      expected: 'hello',
      builder: () => Text.make('hell').finish('o'),
    },
    {
      expected: 'hello',
      builder: () => Text.make('hello').finish('o'),
    },
  ],
};

describe('Text Builder', () => {
  Object.entries(tests).forEach(([title, tests]) => {
    test(title, () => {
      tests.forEach(({ builder, expected }) => {
        expect(builder().toString()).toBe(expected);
      });
    });
  });
});
