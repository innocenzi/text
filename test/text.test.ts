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
};

describe('Text Builder', () => {
  Object.entries(tests).forEach(([title, { expected, builder }]) => {
    test(title, () => expect(builder().toString()).toBe(expected));
  });
});
