# macas

[![Build Status](https://travis-ci.com/ndelvalle/macas.svg?branch=master)](https://travis-ci.com/ndelvalle/macas)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/46f938260d504732ad37a553f2b02f1e)](https://www.codacy.com/manual/ndelvalle/macas?utm_source=github.com&utm_medium=referral&utm_content=ndelvalle/macas&utm_campaign=Badge_Grade)
[![dependencies Status](https://david-dm.org/ndelvalle/macas/status.svg)](https://david-dm.org/ndelvalle/macas)
[![devDependencies Status](https://david-dm.org/ndelvalle/macas/dev-status.svg)](https://david-dm.org/ndelvalle/macas?type=dev)

Electron app to easily spoof your MAC address.

MAC spoofing is a technique for changing a factory-assigned Media Access Control (MAC) address of a network interface on a networked device.
The changing of the assigned MAC address may allow the bypassing of access control lists on servers or routers, either hiding a computer on a network or allowing it to impersonate another network device. [Read More](https://en.wikipedia.org/wiki/MAC_spoofing).

## Download

- [MacOS](https://github.com/ndelvalle/macas/releases)
- Linux and Windows: Current build has MacOS support only, should be pretty easy to create a linux and windows build but I need to test those environment first, check how the UI looks, create their icons etc.

## Development

### Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# lint all JS/Vue component files in `src/`
npm run lint

```

## Acknowledgments

Core packages used to build this library are:

- [spoof](https://github.com/feross/spoof)
- [electron-vue](https://github.com/SimulatedGREG/electron-vue)

## TODOs

- [ ] Automatic updates
- [ ] Create Linux build
- [ ] Create Windows build
- [ ] Allow to specify a MAC address, not just using a randomized one
- [ ] Reset all button to set all interfaces to their default MAC address
