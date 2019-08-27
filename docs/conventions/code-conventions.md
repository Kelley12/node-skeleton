# VersaBuilt Coding Conventions

This document outlines some basic coding conventions to follow when developing on a VersaBuilt codebase.

Some of these conventions are based on ideas from the book *Clean Code* by Robert Cecil Martin. Which is a great read and describes generally how VersaBuilt Codebases should read.

## EOL Characters

Use unix style line endings. This means no carriage returns.

## Comments

Use comments to help explain intent, leave helpful notes, todo's etc. Try not use comments to explain your code or what is happening, generally your code should be self explanatory. See chapter 4 of *Clean Code* for more information.

## Functions

Functions should be as small as possible. They should only do one thing. The contents of a function should be one level of abstraction lower than the name of the function.

Example:
```typescript
// Good
function sendEmail(to: string, body: string): Promise<void> {
  const email = new Email();
  email.setRecipient(to);
  email.setBody(body);
  return email.send();
}

// Bad, This function does more than one thing and mixes levels of abstraction
function sendEmail(to: string, body: string): Promise<void> {
  const socket = net.CreateConnection("192.0.2.2", 4003);
  return new Promise((resolve, reject) => {
    socket.on("connected", () => {
      // Perform a handshake
      // Verify connection entegrity
      // Convert email body to a buffer
      // Send buffer using smtp protocol
      // etc
      resolve()
    });
    socket.on("error", reject);
  });
}
```

## Function Parameters

Generally functions should have as little parameters as possible. No parameters is best, one is good, two is ok and if you need three or more you should probably rework the function. If you absolutley need
three or more parameters than they must be labled somehow. It is perfectly exceptable to combine parameters into a class or object instance.

Example:

```typescript
// Great
function getTime() {
  return Date.now();
}

// Also great
function addOne(to: number) {
  return to + 1;
}

// Good
function midpoint(x: number, y: number) {
  return (x + y) / 2;
}

// Bad
function offest(x: number, y: number, x_offs: number, y_offs: number) {
  return [x + x_offs, y + y_offs];
}

// Good
class Point {
  x: number;
  y: number

  constructor(x: number, y: number) {
    this.x = x; this.y = y;
  }
}

function offset(point: Point, offset: Point) {
  return new Point(point.x + offset.x, point.y + offset.y);
}

// Also good
interface Point {
  x: number;
  y: number;
}

function offset(point: Point, offset: Point): Point {
  return { x: point.x + offset.x, y: point.y + point.y }
}
```

## Indentation

Use four spaces (\s) for indentation. This applies to:
  - Javascript
  - Typescript
  - Python
  - CSS
  - HTML

### Why?

Spaces are consistent accross editors. Documents appear as they are intended regardless of the editor the viewer is using. In addition, the vast majority of javascript and typescript libraries we use are indentented with two spaces.

Resources:
- https://softwareengineering.stackexchange.com/a/657
- https://softwareengineering.stackexchange.com/questions/57/tabs-versus-spaces-what-is-the-proper-indentation-character-for-everything-in-e
- https://www.jwz.org/doc/tabs-vs-spaces.html
- https://ukupat.github.io/tabs-or-spaces/
- https://www.python.org/dev/peps/pep-0008/#indentation

## Line width

Try to keep lines as small as possible. They should be no more than 128 columns wide.

## Naming

It is important to as explicit as possible when naming something in a codebase. A long descriptive name is much better than a short name who's purpose is difficult to understand. You should not need to use a comment to explain what the name means, the name itself should explicitly state its purpose.

Example:
```typescript
// Good
const timeUntilLunarEclipse = 45600032

// Bad
const tule = 45600032
```