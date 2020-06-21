# Electron + Vue.js + Parcel boilerplate

If you ever feel like building a very simple multi-platform desktop app with your favourite tools: [Electron](https://electronjs.org/), [Vue.js](https://vuejs.org/) and [Parcel](https://parceljs.org/), this is your boilerplate.

## Overview

I wanted to build a small ready-to-production app with Electron and Vue.js, and since Parcel.js is my to-go for building anything small with Vue.js, I thought it would be a good idea to bring all the technologies together.

This boilerplate uses Typescript in the Vue.js components and SCSS. It will build your app every time you create a PR and release it if you tag your commit. More details about the relase below.

**This is a very basic boilerplate**, if you want to use Electron and Vue.js I'd advise using [Electron-vue](https://github.com/SimulatedGREG/electron-vue).

## 📚 Project structure

- `src/index.js` is the entry point for our Vue.js app
- `src/electron.js` is the entry point for our Electron app
- `src/App.vue` is the entry point for the main App component
- `src/components/Example.vue` is a component example
- `package.json` is where you'll add your config settings for the Electron app

And the stantard config files for ESLint or Typescript

## 💻 Scripts

Make sure you have Yarn installed and clone the repository `git clone https://github.com/a133xz/electron-vuejs-parcel-boilerplate.git`

- `yarn` to install dependencies
- `yarn serve` to run locally Vue.js + electron
- `yarn vue-serve` to run locally only Vue.js
- `yarn build:local` to build the project locally
- `yarn patch` to add a patch version and push the changes

## 🚀 Release

I'm using Github actions for the release, specifically [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder) with a few tweaks; following [https://github.com/samuelmeuli/action-electron-builder/issues/9](https://github.com/samuelmeuli/action-electron-builder/issues/9) I've updated the action to cache the build.

I divided the build-release process in two workflows:

- `build.yml` build the app everytime you create a PR
- `release-electron-app.yml` build & release the app everytime you tag your commit. This action will create a new draft of the release and then you'll have to publish it.

Right now it will only release the app for MacOS but you can change it anytime. Go to the workflow template and add/remove the platform you want:

`os: [macos-latest]` : `os: [macos-latest, ubuntu-latest, windows-latest]`

### Creating a new release

I've added an example script to create a new release using `npm version patch`. A bit more of explanation when you run `yarn patch`:

- `npm version patch` bump your your package.json version to the next one
- `-m \"v%s\"` creates a commit and tag with your version following this format `v*.*.*`
- `postversion` script will be run right after you bump the version to push your tag

You can learn more about it on the [npm version docs](https://docs.npmjs.com/cli/version)

### Manually

When you want to create a new release, follow these steps:

1. Update the version in your project's `package.json` file (e.g. `1.2.3`)
2. Commit that change (`git commit -am v1.2.3`)
3. Tag your commit (`git tag v1.2.3`). Make sure your tag name's format is `v*.*.*`. Your workflow will use this tag to detect when to create a release
4. Push your changes to GitHub (`git push && git push --tags`)

> This piece of documentation is from [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder) where you can learn more about creating a new release.

## 🛶 Contribuition

Issues and PRs are much appreciated. Please create a new branch and a PR to submit your suggestions.

## 🤓 Inspiration

- [electron-react-parcel-boilerplate](https://github.com/kumarryogeshh/electron-react-parcel-boilerplate)
- [action-electron-builder](https://github.com/samuelmeuli/action-electron-builder)
- [Electron-vue](https://github.com/SimulatedGREG/electron-vue)

I'm using Electron-vue icons, big thanks 🙏