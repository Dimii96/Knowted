const { app, Menu, BrowserWindow } = require('electron');

const template = [
    {
        label: 'File',
        submenu: [
            {
              label: 'Reload',
              accelerator: 'CommandOrControl+R',
              role: 'forceReload',
            },
            {
              type: 'separator'
            },
            {
              label: 'Quit',
              accelerator: 'CommandOrControl+Q',
              role: 'quit',
            },
        ]
      },
  {
    label: 'Edit',
    submenu: [
      {
        label: 'Copy',
        accelerator: 'CommandOrControl+C',
        role: 'copy',
      },
      {
        label: 'Paste',
        accelerator: 'CommandOrControl+V',
        role: 'paste',
      },
    ]
  }
];

module.exports = Menu.buildFromTemplate(template);

