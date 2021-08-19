# Overview

Your new desktop app to convert HEIC files (iOS photos) to PNG or JPG. 

👉 [Download it here.](https://github.com/a133xz/electron-heic-png/releases/tag/v1.0.11) for Windows and Mac.

<img src="https://github.com/a133xz/electron-vuejs-parcel-boilerplate/blob/master/real-world-example.gif?raw=true" width="400">

This project is a wrapper of [this npm package](https://www.npmjs.com/package/heic-convert) using Electron. It was inspired by fellow Electron desktop app, [Image shrinker](https://github.com/stefansl/image-shrinker).

🚀 **An important achievement** of this project is the boilerplate I've developed to create small **apps with Vue.js 3, Parcel 2, and Electron** very easily and quickly. There are powerful projects around, but no super simple approach.

👉 So [check out the boilerplate](https://github.com/a133xz/electron-vuejs-parcel-boilerplate) if you're interested in creating a similar project.

App designed by [Antonio Lozano](https://dribbble.com/panglozano).

## 💻 Scripts

Make sure you have Yarn installed and clone the repository `git clone https://github.com/a133xz/electron-heic-png.git`

- `yarn` to install dependencies
- `yarn serve` to run locally Vue.js + electron
- `yarn vue:serve` to run locally only Vue.js
- `yarn build:local` to build the project locally
- `yarn patch` to add a patch version and push the changes

**Troubleshooting**

If you've installled the dependencies with Yarn or NPM and it's still not working, reinstall Parcel:

`yarn add -D parcel@next`

Or when using NPM, run:

`npm install -D parcel@next`

## 🛶 Contribution

Issues and PRs are much appreciated. Please create a new branch and a PR to submit your suggestions.

For example:

- Tests
- Translations (i18n plugin or whatever)
- Electron auto-update

## 🤓 Learn more

To learn how to develop apps with Electron, Vuejs 3 and Parcel 2, visit [the boilerplate project](https://github.com/a133xz/electron-vuejs-parcel-boilerplate). There's also more details about the tools.

## ✨ Big thanks

- to [Image shrinker](https://github.com/stefansl/image-shrinker) for the inspiration
- and [heic-convert](https://www.npmjs.com/package/heic-convert) for creating the script to convert the files
