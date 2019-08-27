# node-skeleton

Simply replace "node-skeleton" instances with the correct values for your project name and away you go.

## Project goals

- Long-term maintainabilty
- Scalabilty
- Extreme reliability
- Top notch UX
- Minimal dependencies
- Simple build process

## Documentation

Detailed documentation, including a [getting started guide](./docs/getting-started.md), can be found in the [./docs](./docs) folder.

## Deployment

This repository has Continuous Integration (CI) setup with [Heroku](http://heroku.com). There are 2 versions of the app, `dev` and `prod`.

**dev**
The development version of the application is integrated based off of the devlop branch and deployed automatically to [dev.node-skeleton](dev.node-skeleton)

**prod**
The production version of the application is integrated based off of the master branch and deployed automatically to [node-skeleton](node-skeleton)

## NODE_ENV Environment Variable

The app behaves slightly differently based on what you have your NODE_ENV set to.

**For Development**

In Bash
```bash
# In your ~/.bashrc (or .profile for macOS) add the following line
export NODE_ENV="development"
```

**For Production**

In Bash
```bash
# In your ~/.bashrc (or .profile for macOS) add the following line
export NODE_ENV="production"
```