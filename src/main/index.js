'use strict'

const path = require('path')
const { menubar } = require('menubar')
const { ipcMain } = require('electron')

const IS_DEV = process.env.NODE_ENV === 'development'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (!IS_DEV) {
  global.__static = path.join(__dirname, '/static').replace(/\\/g, '\\\\')
}

const mb = menubar({
  // Note: Create BrowserWindow instance before it is used increasing resource
  //       usage, but making the click on the menubar load faster.
  preloadWindow: true,

  browserWindow: {
    transparent: true,
    resizable: IS_DEV,
    movable: IS_DEV,
    alwaysOnTop: IS_DEV,
    width: 375,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    }
  },

  // Note: App icon downloaded from https://icons8.com/icon/1935/display
  // Note: App trail icon downloaded from https://icons8.com/icon/1935/display
  icon: path.join(IS_DEV ? process.cwd() : __dirname, '/static/favicon/icon.png'),
  index: process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`
})

mb.on('ready', () => {
  console.log('Macas app is ready!')
})

// Note: The default value of electron app.allowRendererProcessReuse is
// deprecated, it is currently "false".  It will change to be "true" in
// Electron 9.
// For more information please check https://github.com/electron/electron/issues/18397
mb.app.allowRendererProcessReuse = true

ipcMain.on('quit-app', () => mb.app.quit())

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
