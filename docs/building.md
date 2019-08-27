# Building

## For development

To build and run the project in development mode:

```bash
# From the project root
npm dev
```

To build the project in development mode:

```bash
# From the project root
npm build-dev
```

**Note:** If you close the terminal window without exiting the process with control-c, the process will continue in the background. This will cause a port in use error when you go to run again. To fix this, follow these steps:
1. Open a terminal
2. Use `ps -ax | grep nodemon`. This will find the process number.
3. Kill the process with `kill <process-num>` substituting `<process-num>` with the number you found in step 2.

## For release

To build for release:

```bash
# From the project root
npm build
```

To run in production mode:

```bash
# From the project root
npm start
```