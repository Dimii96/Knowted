const { app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');
const applicationMenu = require('./application-menu');

require('../src/message-control/main');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 680,
        minWidth: 300,
        minHeight: 200,
        //show: false,
        //frame: false,
        //fullscreenable: false,
        //resizable: false,
        //fullscreen: true,
        transparent: false,

        webPreferences: {
            nodeIntegration: true,
            // enableRemoteModule: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(
        isDev
            ? 'http://localhost:3000'
            : `file://${path.join(__dirname, '../build/index.html')}`
    );
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
    mainWindow.webContents.openDevTools();
}

app.on('ready', () => {
    Menu.setApplicationMenu(applicationMenu);
    createWindow();

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});