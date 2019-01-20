# Developing

This application is built using React Native.

## Setup

```
  npm install
```

## Running

```
  npm start
```

### Running an Android emulator
To list available emulators, use `emulator -list-avds`.

```
  emulator -avd pixel2_api28
```

## Troubleshooting

If you're running Linux and you get an error with ENOSPC somewhere in the stack trace, it's probably from the plugin that enables switching the screen from portrait to landscape orientation. Follow the instructions here to resolve it:

https://stackoverflow.com/questions/22475849/node-js-what-is-enospc-error-and-how-to-solve/32600959#32600959
