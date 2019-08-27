# VersaBuilt Typescript Styleguide

## Value References

If you don't need to reassign the reference use `const`.

Example:
```typescript
// Good
const x = 5;

// Bad
var x = 5;
```

If you do need to reassign the reference always use `let`. `var` is scoped weirdly, avoid it.

Example:
```typescript
// Good
let x = 4;
x *= 5;

// Bad
var x = 4;
x *= 5;
```

## Casing

Use lowerCamelCase for constants and variables. Use UpperCamelCase for class, type, enum, and interface declerations. You can also use CAPITOL_SNAKE_CASE for static constants

Example:
```typescript

/**
 * Good examples:
 */

const LINE_HEIGHT = 7;

for (const appleTrees of forrest) {
  // do work
}

let timeUntilBirthday = 365;

interface Fruit {
  seeds: number;
}

class Animal {

}

type Rack = 1 | 2;

/**
 * Bad examples:
 */

const do_work = "";
const IAmGreat = false;
let TreesBeTrees = "no";
class item { }
```

## Naming

Make sure names are clear and can easily convey their purpose to an outsider. Other than that just don't use a plural to describe an enum.

Example:
```typescript
// Good
enum Planet {
  earth, mars, venus, jupiter
}

// Bad
enum Planets {
  earth, mars, venus, jupiter
}
```

## Type annotations

Use type annotations whenever the type cannot be easily inferenced by a human (or the compiler). Avoid the `any` type like the plague.

Example:
```typescript
// Good
const x = 5;
const y: number = 4;
let z: number;

// Bad
let a;
let b: any;
```

## Indentation

Use four spaces (\s) for indentation.

## Parameters

Use function parameters sparingly. Zero parameters is best, one is good, two is fine, three is probably too many.

### Three or more parameters

If you need three or more parameters label them using an object or group some of them in a class. This greatly improves legibility for an outsider.

Example:
```typescript
// Good
function moveL(opts: {
  target: Target,
  frame: Frame,
  /** Number between 0-1 */
  speed: number,
  precision: number
}) {
  // Implementation
};

// Bad
function moveL(target: Target, frame: Frame, speed: number, precision: number) {
  // Implementation
}
```

Why?

Which function call is easier to understand?

This one?:
```typescript
moveL({target: Destination, frame: World, speed: 4, precision: 6});
```

Or this one?:
```typescript
moveL(Destination, World, 4, 5); // Which number is speed? Which one is precision?
```

### Avoid the `any` type

Avoid using any unless absolutley necessary. It defeats the purpose of static typing to begin with. Consider using generics instead of any.

Example:
```typescript
// Good
function addOne(x: number) {
  return x + 1;
}

// Also good
function concat<T extends Concatable>(one: T, two: T) {
  return one + two;
}

// Bad
function concat(a: any, b: any) {
  return a + b;
}
```

## Strings

Use double quotes (") for static strings and template tics (`) for strings with interpolation.

Example:
```typescript
// Good
const name = "VersaBuilt";
const copyright = `Copyright ${Date.now()} ${name}`';
```

## Semicolons

Always use semicolons to terminate a statement.
