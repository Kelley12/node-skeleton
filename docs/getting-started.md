# Getting Started

## Installation

**Requirements:**
- NodeJS v8+
- NPM v5+

1. Install NodeJS and NPM.
    1. Install NodeJS using homebrew
        1. Install Homebrew
        ```bash
        ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
        ```
        2. Install NodeJS
        ```bash
        brew install node
        ```
    2. Verify NodeJS is installed
        ```bash
        node -v
        ```
    3. Verify NPM is installed
        ```bash
        npm -v
        ```
    4. Ensure NPM is up to date
        ```bash
        npm i -g npm
        ```
2. Clone the node-skeleton repo
    ```bash
    git clone git@github.com:node-skeleton.git
    cd node-skeleton
    ```
3. Install dependencies
    ```bash
    npm i
    ```
4. You're done

## Contributing

Please read through the [Contributing](../CONTRBIBUTING.md) documentation for conventions and guidelines used in the project.

## Developing

Open a teminal and cd into this directory.

Run `npm run dev`. This will do the following:

- Build the server in watch mode
- Build the app (client) in watch mode
- Run the server in watch mode (Server will restart on each update)

This will take a minute or so to get started. You may see the server restart a bunch. This is normal.

Note that you will need to manually refresh the browser.

For more information, view the document on [building](./building.md)
