// const { app, BrowserWindow } = require('electron')
import { app, BrowserWindow, ipcMain } from 'electron';
const path = require('path')

require('electron-debug')({ showDevTools: true })

const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:3000`
  : `file://${__dirname}/index.html`
const dialogURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:3001/dialog.html`
  : `file://${__dirname}/dialog.html`

let mainWin: BrowserWindow
let dialogWin: BrowserWindow | null

async function createWindow () {
  const win = new BrowserWindow({
    width: 1100,
    height: 600,
    // webPreferences: {
    //   preload: path.join(__dirname, 'preload.js')
    // },
    frame: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  win.loadURL(winURL)
  win.on('ready-to-show', function () {
    win.show() // 初始化后再显示
  })
  mainWin = win
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.on('minimize', () => {
    mainWin?.minimize()
  })
  ipcMain.on('maximize', () => {
    if (mainWin?.isMaximized()) {
      mainWin?.unmaximize()
    } else {
      mainWin?.maximize()
    }
    
  })
  ipcMain.on('close', () => {

    if (dialogWin && dialogWin.isVisible()) {
      dialogWin?.close()
      mainWin?.close()
    } else {
      dialogWin = new BrowserWindow({
        parent: mainWin, 
        modal: true, 
        width: 500,
        height: 300,
        frame: false,
        resizable: false,
        show: false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
      });
      dialogWin.loadURL(dialogURL)
      dialogWin.on('ready-to-show', function () {
        dialogWin?.show() // 初始化后再显示
      })
    }
  })
  ipcMain.on('dialog-close', () => {
    dialogWin?.close()
    dialogWin = null
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

