## isina-dev-environment

### Requirements

* [Yarn](https://yarnpkg.com/) package + [Node.js](https://nodejs.org/) v6.5 or
  newer

### Directory Layout

Before you start, take a moment to see how the project structure looks like:

```
.
├── /dist/                     # The folder for compiled output
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /app/                   # App entry point
│   ├── /components/            # React components
│   ├── /images/                 # App images
│   ├── /pages/                 # App pages
│   ├── /redux/                 # App redux store setup
│   ├── /utils/                 # App utils
│   ├── /client.js              # Client-side startup script
│   ├── /server.js              # Server-side startup script
│   ├── /routes.js              # App routes (one for client and server side)
│   └── ...                     # Other core framework modules
├── /internals/                 # Build automation scripts and utilities
│   ├── /webpack/               # Webpack configs (client, server)
│   ├── /build.js               # Builds the project from source to output (dist) folder
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches (or restarts) Node.js server
│   └── /start.js               # Launches the development web server with "live reload"
├── postcss.config.js           # Configuration for transforming styles with PostCSS plugins
├── package.json                # The list of 3rd party libraries and utilities
└── yarn.lock                   # Fixed versions of all the dependencies
```

### Quick Start

#### 1. Run `yarn`

This will install both run-time project dependencies and developer tools listed
in [package.json](../package.json) file.

#### 3. Run `yarn start`

This command will build the app from the source files (`/src`) into the output
`/dist` folder. As soon as the initial build completes, it will start the
Node.js server (`node dist/server/server.js`) and
[Browsersync](https://browsersync.io/) with
[HMR](https://webpack.github.io/docs/hot-module-replacement) on top of it.

> [http://localhost:3200/](http://localhost:3200/) — Node.js server
> (`dist/server/server.js`) with Browsersync and HMR enabled\

Now you can open your web app in a browser, on mobile devices and start hacking.
Whenever you modify any of the source files inside the `/src` folder, the module
bundler ([Webpack](http://webpack.github.io/)) will recompile the app on the fly
and refresh all the connected browsers.

### How to Build

If you need just to build the app, simply run:

```shell
$ yarn build
```

App build structure:

```
.
├── /client/                  # The source code of the application
│   ├── /img                  # App images
│   ├── /app.min.css          # App styles
│   ├── /client.js            # Main scripts
│   ├── /vendor.js            # Scripts coming from various third party sources
│   └── ...                   # Other client files
└── /server/                  # Build automation scripts and utilities
    ├── /assets.json          # A json file with the paths of the generated assets
    └── /server.js            # App server for ssr
```

### Other package scripts

To check the source code for syntax errors and potential issues run:

```shell
$ yarn run lint
```

To check all changed files, run:

_NOTE: it will be run automatically after commit_
```shell
$ yarn precommit
```

To clean build run:

```shell
$ yarn clean
```

To run build:

```shell
$ yarn run-dist
```


### Converting images to retina

For converting we use GraphicsMagick for node http://aheckmann.github.com/gm/

First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/).

    brew install imagemagick
    brew install graphicsmagick

Then you can run script:
```shell
$ yarn make-retina
```

A `.retinaignore` file specifies files that our converter `internals/retinaConvert.js` should ignore.
