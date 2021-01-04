SonarK Interview Task
=====================

# Interview Task
See [task.md](./task.md) for task description.

# Requirements
Install the following:
* [NodeJS](https://nodejs.org/en/download/)
* [nvm](https://github.com/nvm-sh/nvm): Node version manager.
* [yarn](https://classic.yarnpkg.com/en/docs/install/): A better npm.

# Directory Structure
* `client`: This directory hosts the client code. This is created via `npx create-react-app`.
* `server`: This is a basic express server. This also contains the sqlite and sqlite database.

# Setting Up
To run the application:
```shell script
nvm install # Reads the .nvmrc's specified node version, and install it.
nvm use # Use the installed node version in .nvmrc

yarn # Install dependencies of both server and client.
yarn start # Starts the server and client.
```

To play with sqlite:
```shell script
cd server
node ./sqlite_sandbox.js
```

This just performs a basic `SELECT` statement which you will
use on your REST API you will have todo in on this tasks.

# Advice
We don't prescribe anything but do try to:
* Practice modular code. Simplify by splitting.
* We encourage OOP and we would love to see how you would structure things.
* Have fun! I had fun writing this interview-task. It's nice getting dirty with
  setting up a Node project which I can rarely do these days. I hope you feel the
  same working on this.
