import words from './case/words';

export type Input = string | number | Text;
export type Fragment = string;

/**
 * Fluently build or manipulate strings.
 */
export class Text {
  private _fragments: Fragment[];

  /*
  |--------------------------------------------------------------------------
  | Constructor
  |--------------------------------------------------------------------------
  */

  /**
   * Creates a new instance of the builder.
   */
  constructor(...fragments: Input[]) {
    this._fragments = this.fragmentify(fragments);
  }

  /*
  |--------------------------------------------------------------------------
  | Static
  |--------------------------------------------------------------------------
  */

  /**
   * Creates a new instance of the builder.
   *
   * @example
   * Text.make('hello world'); // hello world
   */
  static make(...fragments: Input[]): Text {
    return new Text(...fragments);
  }

  /**
   * Generates a random alpha-numeric string.
   *
   * @example
   * Text.random(8); // 0ONCLOnZ
   */
  static random(length: number = 16): Text {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    const random = Array.apply(this, Array(length))
      .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
      .join('');

    return new Text(random);
  }

  /**
   * Converts accepted inputs into workable fragments.
   */
  protected fragmentify(input: Input[]): Fragment[] {
    return input.map(fragment => fragment.toString());
  }

  /*
  |--------------------------------------------------------------------------
  | Fluent expansion methods
  |--------------------------------------------------------------------------
  */

  /**
   * Appends a space character.
   *
   * @param count Amount of spaces to add.
   *
   * @example
   * Text.make()
   *		.append('[')
   *		.time('=', 5)
   *		.space(5)
   *		.append('] 50%');
   * // [=====     ] 50%
   */
  space(count: number = 1): Text {
    return this.times(' ', count);
  }

  /**
   * Appends a new line character.
   *
   * @param count Amount of spaces to add.
   *
   * @example
   * Text.make('Hello')
   *		.newLine()
   *		.append('world');
   * // Hello\nworld
   */
  newLine(count: number = 1): Text {
    return this.times('\n', count);
  }

  /**
   * Appends a new line character.
   *
   * @param count Amount of spaces to add.
   *
   * @example
   * Text.make('Hello')
   *		.nl()
   *		.append('world');
   * // Hello\nworld
   */
  nl(count: number = 1): Text {
    return this.times('\n', count);
  }

  /**
   * Appends an input as much times as specified.
   *
   * @param input The given input.
   * @param count Times to append.
   *
   * @example
   * Text.make('He')
   *		.times('l', 8)
   *		.append('o');
   * // Hellllllllo
   */
  times(input: Input, count: number = 1): Text {
    for (let i = 0; i < Math.max(count, 1); i++) {
      this._fragments.push(input.toString());
    }

    return this;
  }

  /**
   * Appends the given input to the builder.
   *
   * @example
   * Text.make('Hello')
   *		.append('world')
   * // Helloworld
   */
  append(...input: Input[]): Text {
    this._fragments.push(...this.fragmentify(input));

    return this;
  }

  /**
   * Appends the given input to the builder if the condition is met.
   *
   * @param condition Condition to pass.
   * @param input Input.
   *
   * @example
   * const shouldAppend = !!Math.floor((Math.random() * 2));
   * Text.make()
   * 	.appendIf(shouldAppend, 'Hello world')
   */
  appendIf(condition: boolean, ...input: Input[]): Text {
    if (condition) {
      return this.append(...input);
    }

    return this;
  }

  /**
   * Concatenates the given inputs to the current text.
   *
   * @example
   * Text.make()
   *		.concat('hello', 'world');
   * // helloworld
   */
  // @ts-ignore This if fine.
  concat(...input: Input[]): Text {
    return this.append(...input);
  }

  /**
   * Appends a new line and the given input to the builder.
   *
   * @example
   * This.make('hello')
   *		.appendLine('world');
   * // hello\nworld
   */
  appendLine(...input: Input[]): Text {
    return this.append('\n', ...this.fragmentify(input));
  }

  /**
   * Appends the given input after a new line to the builder.
   *
   * @example
   * This.make('hello')
   *		.line('world');
   * // hello\nworld
   */
  line(...input: Input[]): Text {
    return this.appendLine(...input);
  }

  /**
   * Appends the given input after a new line to the builder if the condition is met.
   *
   * @param condition Condition to pass.
   * @param input Input.
   *
   * @example
   * const shouldAppend = !!Math.floor((Math.random() * 2));
   * Text.make()
   * 	.lineIf(shouldAppend, 'Hello world')
   */
  lineIf(condition: boolean, ...input: Input[]): Text {
    if (condition) {
      return this.line(...input);
    }

    return this;
  }

  /**
   * Prepends the given input to the builder.
   *
   * @example
   * This.make('world')
   *		.prepend('hello');
   * // helloworld
   */
  prepend(...input: Input[]): Text {
    this._fragments = this.fragmentify(input).concat(this._fragments);

    return this;
  }

  /**
   * Prepends the given input after a new line to the builder if the condition is met.
   *
   * @param condition Condition to pass.
   * @param input Input.
   *
   * @example
   * const shouldAppend = !!Math.floor((Math.random() * 2));
   * Text.make()
   * 	.prependIf(shouldAppend, 'Hello world')
   */
  prependIf(condition: boolean, ...input: Input[]): Text {
    if (condition) {
      return this.prepend(...input);
    }

    return this;
  }

  /**
   * Prepends the given input to the builder.
   *
   * @example
   * This.make('world')
   *		.prependLine('hello');
   * // hello\nworld
   */
  prependLine(...input: Input[]): Text {
    return this.prepend(...this.fragmentify(input), '\n');
  }

  /**
   * Appends the given lines to the builder.
   *
   * @example
   * This.make()
   *		.appendLines('hello', 'world');
   * // \nhello\nworld
   */
  appendLines(...input: Input[]): Text {
    return this.append(...input.map(line => `\n${line}`));
  }

  /**
   * Prepends the given lines to the builder.
   *
   * @example
   * This.make()
   *		.prependLines('hello', 'world');
   * // hello\nworld
   */
  prependLines(...input: Input[]): Text {
    const lines = input.map(line => `\n${line}`);

    // If there is at least one line, we remove the line return
    // character we just added on the first, to avoid the resulted
    // string to start by a new line.
    if (lines.length > 0) {
      lines[0] = lines[0].slice(1);
    }

    // If we already have a string, we add a new line before it as well
    if (this._fragments.length > 0) {
      this._fragments[0] = '\n' + this._fragments[0];
    }

    return this.prepend(...lines);
  }

  /**
   * Appends the given input to the builder, triming each of its lines.
   *
   * @example
   * Text.make()
   * 	.template(`
   * 		Hello
   * 		from
   * 		template
   * 		literals
   * 	`)
   * // Hello\nfrom\ntemplate\nliterals
   */
  trimLines(input: string): Text {
    return this.append(
      input
        .trim()
        .split('\n')
        .map(line => line.trim())
        .join('\n')
    );
  }

  /**
   * Alias for `trimLines`.
   */
  template(input: string): Text {
    return this.trimLines(input);
  }

  /*
  |--------------------------------------------------------------------------
  | Manipulations
  |--------------------------------------------------------------------------
  */

  /**
   * Gets the portion of a string before the first occurrence of the given value.
   *
   * @example
   * Text.make('Hello world')
   * 	.before(' world');
   * // Hello
   */
  before(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    return Text.make(this.toString().split(search)[0]);
  }

  /**
   * Gets the portion of a string before the last occurrence of the given value.
   *
   * @example
   * Text.make('hello/world/foo.txt')
   * 	.beforeLast('/')
   * // hello/world
   */
  beforeLast(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    const pos = this.toString().lastIndexOf(search);

    if (-1 === pos) {
      return this;
    }

    return Text.make(this.toString().substr(0, pos));
  }

  /**
   * Return the remainder of a string after the first occurrence of a given value.
   *
   * @example
   * Text.make('hello world')
   * 	.after('hello ')
   * // world
   */
  after(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    const pos = this.toString().indexOf(search);

    if (-1 === pos) {
      return this;
    }

    return Text.make(this.toString().substr(pos + search.length));
  }

  /**
   * Return the remainder of a string after the last occurrence of a given value.
   *
   * @example
   * Text.make('hello/world/how/are/you.txt')
   * 	.afterLast('/')
   * // you.txt
   */
  afterLast(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    const pos = this.toString().lastIndexOf(search);

    if (-1 === pos) {
      return this;
    }

    return Text.make(this.toString().substr(pos + search.length));
  }

  /**
   * Get the portion of a string between two given values.
   *
   * @example
   * Text.make('blowout')
   * 	.between('l', 'u')
   * // owo
   */
  between(from: string, to: string): Text {
    return this.after(from).beforeLast(to);
  }

  /**
   * Get the portion of a string between the last occurrence of the first value
   * and the first occurence of the second one.
   *
   * @example
   * Text.make('aabbcc')
   * 	.inside('a', 'c')
   * // bb
   */
  inside(from: string, to: string): Text {
    return this.afterLast(from).before(to);
  }

  /**
   * Cap a string with a single instance of a given value.
   *
   * @example
   * Text.make('hello/world')
   * 	.finish('/')
   * // hello/world/
   *
   * Text.make('hello/world/')
   * 	.finish('/')
   * // hello/world/
   */
  finish(value: string): Text {
    return this.endsWith(value) ? this : this.append(value);
  }

  /**
   * Determines if a given string is a valid UUID.
   *
   * @example
   * Text.make('8fc5b4a2-aa85-11ea-bb37-0242ac130002')
   * 	.isUuid()
   * // true
   */
  isUuid(): Boolean {
    return (
      null !== this.match(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i)
    );
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   *
   * @example
   * Text.make('HELLO WORLD')
   * 	.lower()
   * // hello world
   */
  lower(): Text {
    return Text.make(this.toLowerCase());
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   *
   * @example
   * Text.make('hello world')
   * 	.lower()
   * // HELLO WORLD
   */
  upper(): Text {
    return Text.make(this.toUpperCase());
  }

  /**
   * Change the first character to upper case.
   *
   * @example
   * Text.make('hello world')
   * 	.lower()
   * // Hello world
   */
  upperFirst(): Text {
    return Text.make(this.toString().charAt(0).toUpperCase() + this.toString().slice(1));
  }

  /**
   * Change the first character to lower case.
   *
   * @example
   * Text.make('HELLO WORLD')
   * 	.lower()
   * // hELLO WORLD
   */
  lowerFirst(): Text {
    return Text.make(this.toString().charAt(0).toLowerCase() + this.toString().slice(1));
  }

  /**
   * Splits `string` into an array of its words.
   *
   * @example
   * Text.make('Kaguya, Komi & Holo')
   * 	.words()
   * // ['Kaguya', 'Komi', 'Holo']
   *
   * Text.make('Kaguya, Komi, & Holo')
   * 	.words(/[^, ]+/g)
   * // ['Kaguya', 'Komi', '&', 'Holo']
   */
  words(pattern?: RegExp | string): string[] {
    return words(this.toString(), pattern);
  }

  /**
   * Calls a defined callback function on each character of the string, and returns a Text that contains the results.
   *
   * @param callback Callback function that should return the new characters.
   *
   * @example
   * Text.make('Hello')
   * 	.map(char => char.upper())
   * // HELLO
   */
  map(callback: (value: Text, index: number, array: Input[]) => Text): Text {
    return Text.make(
      this.toString()
        .split('')
        .map((value, index, array) => {
          return Text.make(callback(Text.make(value), index, array));
        })
        .join('')
    );
  }

  /**
   * Performs the specified action for each character of the text.
   *
   * @param callback A function that accepts up to three arguments.
   *
   * @example
   */
  each(callback: (value: Text, index: number, array: Input[]) => void): Text {
    this.toString()
      .split('')
      .forEach((value, index, array) => {
        callback(Text.make(value), index, array);
      });

    return this;
  }

  /**
   * Converts the text to `kebab-case`.
   *
   * @example
   * Text.make('Hello world')
   * 	.kebabCase()
   * // hello-world
   */
  kebabCase(): Text {
    return this.case(
      (result, word, index) => result + (index ? '-' : '') + word.toLowerCase()
    );
  }

  /**
   * Converts the text to `snake_case`.
   *
   * @example
   * Text.make('Hello world')
   * 	.snakeCase()
   * // hello_world
   */
  snakeCase(): Text {
    return this.case(
      (result, word, index) => result + (index ? '_' : '') + word.toLowerCase()
    );
  }

  /**
   * Converts the text to `camelCase`.
   *
   * @example
   * Text.make('Hello world')
   * 	.camelCase()
   * // helloWorld
   */
  camelCase(): Text {
    return this.case((result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? Text.make(word).upperFirst() : word).toString();
    });
  }

  /**
   * Converts the text to `pascalCase`.
   *
   * @example
   * Text.make('Hello world')
   * 	.pascalCase()
   * // HelloWorld
   */
  pascalCase(): Text {
    return this.case((result, word) => {
      word = word.toLowerCase();

      return result + Text.make(word).upperFirst().str();
    });
  }

  /**
   * Converts the text to a case determined by the given reducer.
   * The reducer parameters are the current string, the current word and the
   * current word's index.
   *
   * @example
   * Text.make('Hello world')
   * 	.case((result, word) => {
   * 		word = [...word]
   * 			.map((char, i) => (i % 2 === 0 ? char.toUpperCase() : char.toLowerCase()))
   * 			.join('');
   *
   * 		return result + (result ? ' ' : '') + word;
   * 	})
   * // HeLlO WoRlD
   */
  case(reducer: (result: string, word: string, index: number) => string): Text {
    return Text.make(
      this.replace(/['\u2019]/g, '')
        .words()
        .reduce(reducer, '')
    );
  }

  /*
  |--------------------------------------------------------------------------
  | Original string methods
  |--------------------------------------------------------------------------
  */

  /**
   * Removes whitespace from the left end of a string.
   */
  trimLeft(): Text {
    return Text.make(this.toString().trimLeft());
  }

  /**
   * Removes whitespace from the right end of a string.
   */
  trimRight(): Text {
    return Text.make(this.toString().trimRight());
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  toLowerCase(): Text {
    return Text.make(this.toString().toLowerCase());
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  toUpperCase(): Text {
    return Text.make(this.toString().toUpperCase());
  }

  /**
   * Gets a substring beginning at the specified location and having the specified length.
   *
   * @param from The starting position of the desired substring. The index of the first character in the string is zero.
   * @param length The number of characters to include in the returned substring.
   */
  substr(from: number, length?: number | undefined): Text {
    return Text.make(this.toString().substr(from, length));
  }

  /**
   * Converts all alphabetic characters to lowercase, taking into account the host environment's current locale.
   */
  toLocaleLowerCase(locales?: string | string[] | undefined): Text {
    return Text.make(this.toString().toLocaleLowerCase(locales));
  }

  /**
   * Returns a string where all alphabetic characters have been converted to uppercase, taking into account the host environment's current locale.
   */
  toLocaleUpperCase(locales?: string | string[] | undefined): Text {
    return Text.make(this.toString().toLocaleUpperCase(locales));
  }

  /**
   * Returns the String value result of normalizing the string into the normalization form named by form as specified in Unicode Standard Annex #15, Unicode Normalization Forms.
   *
   * @param form Applicable values: "NFC", "NFD", "NFKC", or "NFKD", If not specified default is "NFC".
   */
  normalize(form?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'): Text {
    return Text.make(this.toString().normalize(form));
  }

  /**
   * Split a string into substrings using the specified separator and return them as an array.
   *
   * @param separator A string that identifies character or characters to use in separating the string. If omitted, a single-element array containing the entire string is returned.
   * @param limit A value used to limit the number of elements returned in the array.
   */
  split(separator: string | RegExp, limit?: number | undefined): string[] {
    return this.toString().split(separator, limit);
  }

  /**
   * Returns a section of a string.
   *
   * @param start The index to the beginning of the specified portion of stringObj.
   * @param end The index to the end of the specified portion of stringObj. The substring includes the characters up to, but not including, the character indicated by end. If this value is not specified, the substring continues to the end of stringObj.
   */
  slice(start?: number | undefined, end?: number | undefined): Text {
    return Text.make(this.toString().slice(start, end));
  }

  /**
   * Returns a String value that is made from count copies appended together. If count is 0, the empty string is returned.
   *
   * @param count Number of copies to append.
   */
  repeat(count: number): Text {
    return Text.make(this.toString().repeat(count));
  }

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length. The padding is applied from the start (left) of the current string.
   *
   * @param maxLength The length of the resulting string once the current string has been padded. If this parameter is smaller than the current string's length, the current string will be returned as it is.
   * @param fillString The string to pad the current string with. If this string is too long, it will be truncated and the left-most part will be applied. The default value for this parameter is " " (U+0020).
   */
  padStart(maxLength: number, fillString?: string | undefined): Text {
    return Text.make(this.toString().padStart(maxLength, fillString));
  }

  /**
   * Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length. The padding is applied from the end (right) of the current string.
   *
   * @param maxLength The length of the resulting string once the current string has been padded. If this parameter is smaller than the current string's length, the current string will be returned as it is.
   * @param fillString The string to pad the current string with. If this string is too long, it will be truncated and the left-most part will be applied. The default value for this parameter is " " (U+0020).
   */
  padEnd(maxLength: number, fillString?: string | undefined): Text {
    return Text.make(this.toString().padEnd(maxLength, fillString));
  }

  /**
   * Replaces text in a string, using an object that supports replacement within a string.
   *
   * @param searchValue A object can search for and replace matches within a string.
   * @param replaceValue A string containing the text to replace for every successful match of searchValue in this string.
   */
  replace(
    searchValue: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
    replaceValue: string
  ): Text {
    return Text.make(this.toString().replace(searchValue, replaceValue));
  }

  /**
   * Returns the character at the specified index.
   *
   * @param position The zero-based index of the desired character.
   */
  charAt(position: number): Text {
    return Text.make(this.toString().charAt(position));
  }

  /**
   * Returns the Unicode value of the character at the specified location.
   *
   * @param index The zero-based index of the desired character. If there is no character at the specified index, NaN is returned.
   */
  charCodeAt(index: number): number {
    return this.toString().charCodeAt(index);
  }

  /**
   * Matches a string an object that supports being matched against, and returns an array containing the results of that search.
   *
   * @param matcher An object that supports being matched against.
   */
  match(regexp: string | RegExp): RegExpMatchArray | null {
    return this.toString().match(regexp);
  }

  /**
   * Returns true if searchString appears as a substring of the result of converting this object to a String, at one or more positions that are greater than or equal to position; otherwise, returns false.
   *
   * @param searchString search string
   * @param position If position is undefined, 0 is assumed, so as to search all of the String.
   */
  includes(searchString: string, position?: number | undefined): Boolean {
    return this.toString().includes(searchString, position);
  }

  /**
   * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at position. Otherwise returns false.
   */
  startsWith(searchString: string, position?: number | undefined): Boolean {
    return this.toString().startsWith(searchString, position);
  }

  /**
   * Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at endPosition – length(this). Otherwise returns false.
   */
  endsWith(searchString: string, endPosition?: number | undefined): Boolean {
    return this.toString().endsWith(searchString, endPosition);
  }

  /*
  |--------------------------------------------------------------------------
  | Serialization
  |--------------------------------------------------------------------------
  */

  /**
   * Returns each fragment of this builder as a string, separated by the given string.
   *
   * @example
   * Text.make('Hello', 'world')
   * 	.join(', ')
   * // Hello, world
   */
  join(separator: string = ''): string {
    return this._fragments.join(separator);
  }

  /**
   * Shortcut for `.toString()`.
   *
   * @example
   * Text.make('Hello world')
   * 	.str()
   * // Hello world
   */
  str(): string {
    return this.toString();
  }

  /**
   * Returns the builder as a string.
   *
   * @example
   * Text.make('Hello world')
   * 	.toString()
   * // Hello world
   */
  toString(): string {
    return this.join();
  }
}
