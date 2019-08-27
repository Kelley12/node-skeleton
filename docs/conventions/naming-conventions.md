# VersaBuilt Naming Conventions

This document outlines the conventions for naming project's, their packages and their exported members.

## Packages

Packages published on the registry should be prefixed with the namespace `@vb/`. This means
that the name in your package.json must start with `@vb/`. For example, the CNC interface
package is named `@vb/cnc`.

Note: This only applies to the name in package.json, do not add `@vb` to the project name in
git or the folder it lives in.

Packages must use kebab-case

## Files and Folders

All files and folders must use kebab-case

## Git Projects

Git projects must use kebab-case

## Interfaces

Interface act as a contract for the methods and properties an object should expose. For VersaBuilt
this is usually a TypeScript interface. Interfaces do not provide implementations.

Interfaces should share the name of whatever common interface they are describing.
For example the interface all cnc drivers should implement is called `CNC`.

Other examples include:
- `IO`
- `Robot`
- `Vise`

Interfaces should all be in UpperCamelCase.

### Interface Projects

In many cases an interface should be housed in it's own project. An example is the `CNC` interface.
These projects belong in the interfaces subgroup of the VersaBuilt group on gitlab. The projects
must be the share the name of the interface they export, but converted to kebab-case.

## Drivers

Driver names have the following defualt rules:
1. They must start with the specific brand name of what they are based off of (I.E. Modbus or Haas).
2. They must end with the name of the interface they are implementing.

Examples:
- `haas-cnc`
- `modbus-io`
- `sim-robot`
- `io-vise` (IO vise is an implementation of the vise interface that mainly uses the IO interface to work)

Exceptions:
If you have an easily understood and recognizeable name for an important project. For example, Rosetta
is the name of a library that implements the Robot interface.
