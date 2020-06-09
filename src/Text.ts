import words from './case/words';

export type Input = string | number | Text;
export type Fragment = string;

/**
 * Builds a string, fluently.
 */
export class Text extends String {
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
    super('');

    this._fragments = this.fragmentify(fragments);
  }

  /**
   * Creates a new instance of the builder.
   */
  static make(...fragments: Input[]): Text {
    return new Text(...fragments);
  }

  /**
   * Generates a random alpha-numeric string.
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

  // /**
  //  * Returns a Text that contains the concatenation of the given string.
  //  */
  // concat(...input: Input[]): this {
  //   return this.append(...input);
  // }

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

  /**
   * Return the remainder of a string after the first occurrence of a given value.
   */
  after(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    const pos = this.toString().indexOf(search);

    if (-1 === pos) {
      return this;
    }

    return Text.make(this.toString().substr(pos + 1));
  }

  /**
   * Return the remainder of a string after the last occurrence of a given value.
   */
  afterLast(search: string): Text {
    if (0 === search.length) {
      return this;
    }

    const pos = this.toString().lastIndexOf(search);

    if (-1 === pos) {
      return this;
    }

    return Text.make(this.toString().substr(pos + 1));
  }

  /**
   * Get the portion of a string between two given values.
   */
  between(from: string, to: string): Text {
    return this.after(from).beforeLast(to);
  }

  /**
   * Get the portion of a string between two given values.
   */
  inside(from: string, to: string): Text {
    return this.between(from, to);
  }

  /**
   * Cap a string with a single instance of a given value.
   */
  finish(value: string): Text {
    return this.endsWith(value) ? this : this.append(value);
  }

  /**
   * Determines if a given string is a valid UUID.
   */
  isUuid(): Boolean {
    return (
      null !== this.match(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/i)
    );
  }

  /**
   * Converts all the alphabetic characters in a string to lowercase.
   */
  lower(): Text {
    return Text.make(this.toLowerCase());
  }

  /**
   * Converts all the alphabetic characters in a string to uppercase.
   */
  upper(): Text {
    return Text.make(this.toUpperCase());
  }

  /**
   * Change the first character to upper case.
   */
  upperFirst(): Text {
    return Text.make(this.toString().charAt(0).toUpperCase() + this.toString().slice(1));
  }

  /**
   * Change the first character to lower case.
   */
  lowerFirst(): Text {
    return Text.make(this.toString().charAt(0).toLowerCase() + this.toString().slice(1));
  }

  /**
   * Splits `string` into an array of its words.
   *
   * words('fred, barney, & pebbles')
   * // => ['fred', 'barney', 'pebbles']
   *
   * words('fred, barney, & pebbles', /[^, ]+/g)
   * // => ['fred', 'barney', '&', 'pebbles']
   */
  words(pattern?: RegExp | string): string[] {
    return words(this.toString(), pattern);
  }

  /**
   * Converts the text to `kebab-case`.
   */
  kebabCase(): Text {
    return this.case(
      (result, word, index) => result + (index ? '-' : '') + word.toLowerCase()
    );
  }

  /**
   * Converts the text to `snake_case`.
   */
  snakeCase(): Text {
    return this.case(
      (result, word, index) => result + (index ? '_' : '') + word.toLowerCase()
    );
  }

  /**
   * Converts the text to `camelCase`.
   */
  camelCase(): Text {
    return this.case((result, word, index) => {
      word = word.toLowerCase();
      return result + (index ? Text.make(word).upperFirst() : word).toString();
    });
  }

  /**
   * Converts the text to `pascalCase`.
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
   */
  case(reducer: (result: string, word: string, index: number) => string): Text {
    return Text.make(words(this.replace(/['\u2019]/g, '')).reduce(reducer, ''));
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
   * Shortcut for `.toString()`.
   */
  str(): string {
    return this.toString();
  }

  /**
   * Returns the builder as a string.
   */
  toString(): string {
    return this.join();
  }
}
