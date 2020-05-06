export type Input = string | number | Text;
export type Fragment = string;

/**
 * Builds a string, fluently.
 */
export class Text {
  private _fragments: Fragment[];

  /*
  |--------------------------------------------------------------------------
  | Constructors
  |--------------------------------------------------------------------------
  */

  /**
   * Creates a new instance of the builder.
   */
  constructor(...fragments: Input[]) {
    this._fragments = this.fragmentify(fragments);
  }

  /**
   * Creates a new instance of the builder.
   */
  static make(...fragments: Input[]): Text {
    return new Text(...fragments);
  }

  /**
   * Converts accepted inputs into workable fragments.
   */
  private fragmentify(input: Input[]): Fragment[] {
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
   */
  space(count: number = 1): this {
    return this.times(' ', count);
  }

  /**
   * Appends a new line character.
   *
   * @param count Amount of spaces to add.
   */
  newLine(count: number = 1): this {
    return this.times('\n', count);
  }

  /**
   * Appends a new line character.
   *
   * @param count Amount of spaces to add.
   */
  nl(count: number = 1): this {
    return this.times('\n', count);
  }

  /**
   * Appends an input as much times as specified.
   *
   * @param input The given input.
   * @param count Times to append.
   */
  times(input: Input, count: number = 1): this {
    for (let i = 0; i < Math.max(count, 1); i++) {
      this._fragments.push(input.toString());
    }

    return this;
  }

  /**
   * Appends the given input to the builder.
   */
  append(...input: Input[]): this {
    this._fragments.push(...this.fragmentify(input));

    return this;
  }

  /**
   * Returns a Text that contains the concatenation of the given string.
   */
  concat(...input: Input[]): this {
    return this.append(...input);
  }

  /**
   * Appends the given input to the builder.
   */
  appendLine(...input: Input[]): this {
    return this.append('\n', ...this.fragmentify(input));
  }

  /**
   * Appends the given input to the builder.
   */
  line(...input: Input[]): this {
    return this.appendLine(...input);
  }

  /**
   * Prepends the given input to the builder.
   */
  prepend(...input: Input[]): this {
    this._fragments = this.fragmentify(input).concat(this._fragments);

    return this;
  }

  /**
   * Prepends the given input to the builder.
   */
  prependLine(...input: Input[]): this {
    return this.prepend(...this.fragmentify(input), '\n');
  }

  /**
   * Appends the given lines to the
   */
  appendLines(...input: Input[]): this {
    return this.append(...input.map(line => `\n${line}`));
  }

  /**
   * Prepends the given lines to the
   */
  prependLines(...input: Input[]): this {
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

  /*
  |--------------------------------------------------------------------------
  | Manipulations
  |--------------------------------------------------------------------------
  */

  /**
   * Gets the portion of a string before the first occurrence of the given value.
   */
  before(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    return Text.make(this.toString().split(search)[0]);
  }

  /**
   * Gets the portion of a string before the last occurrence of the given value.
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
   * Matches a string an object that supports being matched against, and returns an array containing the results of that search.
   *
   * @param matcher An object that supports being matched against.
   */
  match(matcher: {
    [Symbol.match](string: string): RegExpMatchArray | null;
  }): RegExpMatchArray | null {
    return this.toString().match(matcher);
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
   */
  join(separator: string = ''): string {
    return this._fragments.join(separator);
  }

  /**
   * Returns the builder as a string.
   */
  toString(): string {
    return this.join();
  }
}
