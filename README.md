# cfuse

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]
[![javascript_code style][code-style-image]][code-style-url]

> A utility for constructing `className` strings conditionally.

This module is available in the following formats:

* **ES Module**: `dist/cfuse.mjs`
* **CommonJS**: `dist/cfuse.cjs`

## Install

```
$ npm install --save cfuse
```

## Usage

```js
import cfuse from "cfuse";

// Concatenates multiple strings, including only truthy values
console.log(cfuse("Introduction", true && "Chapter 1", "Chapter 2"));
// result: "Introduction Chapter 1 Chapter 2"

// Extracts keys from objects where the values are truthy
console.log(cfuse({ title: "Learning", subtitle: false, section: true }));
// result: "title section"

// Flattens and concatenates elements from arrays, ignoring falsy values
console.log(cfuse(["Introduction", null, false, "Chapter 1"]));
// result: "Introduction Chapter 1"

// Handles nested arrays, flattening and concatenating truthy values
console.log(cfuse(["Introduction"], ["Part A", null, false, "Chapter 1"], [["Appendix", [["Section 1"], "Section 2"]]]));
// result: "Introduction Part A Chapter 1 Appendix Section 1 Section 2"

// Combines various input types, including strings, objects, and arrays
console.log(cfuse(
  "Start",
  [true && "Middle", { key1: false, key2: true }, ["Subsection", ["Detail"]]],
  "End"
// result: "Start Middle key2 Subsection Detail End"
));

// Processes all types of truthy and falsy values, including null, empty strings, NaN, zero, and more
console.log(cfuse({
  nullValue: null,
  emptyString: "",
  invalidNumber: Number.NaN,
  zeroValue: 0,
  negativeZeroValue: -0,
  falseValue: false,
  undefinedValue: undefined,
  nonEmptyString: "Valid String",
  whitespaceString: " ",
  functionValue: Object.prototype.toString,
  emptyObject: {},
  nonEmptyObject: { a: 1, b: 2 },
  emptyList: [],
  nonEmptyList: [1, 2, 3],
  positiveNumber: 1,
}));
// result: "Valid String  functionValue emptyObject nonEmptyObject emptyList nonEmptyList positiveNumber"
```

## API

### cfuse(...inputs)
**Returns:** `String`

#### Parameters
- **`inputs`**: `Mixed`
    - The `cfuse` function accepts any number of arguments. Each argument can be of type `Object`, `Array`, `Boolean`, `String`, `Number`, `null`, or `undefined`.

#### Description
The `cfuse` function concatenates values from the provided arguments into a single string. Falsy values (e.g., `false`, `null`, `undefined`, `0`, `NaN`, `""`, and empty arrays/objects) are ignored. The function processes the arguments in the following manner:
- **Strings**: Included directly.
- **Objects**: Includes the keys where the corresponding values are truthy.
- **Arrays**: Flattens nested arrays and includes all truthy elements.
- **Other types (Boolean, Number)**: Converts truthy values to strings and ignores falsy values.

#### Examples

```js
// Examples with different types of inputs

console.log(cfuse(true, false, "", null, undefined, 0, Number.NaN));
// => ''

console.log(cfuse("Hello", "World", 123, { key: "value" }, [true, "Array"]));
// => 'Hello World 123 key Array'
```

## License

[MIT](./LICENSE) License &copy; 2023-PRESENT [Kirk Lin](https://github.com/kirklin)

This project is inspired by and related to [clsx](https://github.com/lukeed/clsx), licensed under the [MIT License](https://github.com/lukeed/clsx/blob/master/license).

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/cfuse?style=flat&colorA=080f12&colorB=3491fa
[npm-version-href]: https://npmjs.com/package/cfuse
[npm-downloads-src]: https://img.shields.io/npm/dm/cfuse?style=flat&colorA=080f12&colorB=3491fa
[npm-downloads-href]: https://npmjs.com/package/cfuse
[bundle-src]: https://img.shields.io/bundlephobia/minzip/cfuse?style=flat&colorA=080f12&colorB=3491fa&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=cfuse
[license-src]: https://img.shields.io/github/license/kirklin/cfuse.svg?style=flat&colorA=080f12&colorB=3491fa
[license-href]: https://github.com/kirklin/cfuse/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=3491fa
[jsdocs-href]: https://www.jsdocs.io/package/cfuse
[code-style-image]: https://img.shields.io/badge/code__style-%40kirklin%2Feslint--config-3491fa?style=flat&colorA=080f12&colorB=3491fa
[code-style-url]: https://github.com/kirklin/eslint-config/
