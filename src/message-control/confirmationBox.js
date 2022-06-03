const { ipcRenderer } = window.require('electron');

// Always use await when calling these methods.

export default async function MessageBox(message) {
  var dialogOptions = 
    {
    message,
    buttons: ["OK" ],
    title: "Knowted",
    defaultId: 1
  };

  return new Promise((resolve, reject) => {   
    ipcRenderer.send('show-dialog', dialogOptions);

    ipcRenderer.on('show-dialog-result', (event, result) => {
        resolve(result);
      });
  
  });
}

export async function OkayCancel(message) {
  var dialogOptions = 
    {
    message,
    buttons: ["Cancel", "OK" ],
    title: "Knowted",
    defaultId: 1
  };
  return new Promise((resolve, reject) => {   
    ipcRenderer.send('show-dialog', dialogOptions);
    ipcRenderer.on('show-dialog-result', (event, result) => {
        resolve(result);
      });
  });
}

export async function MessageDisplayCustom(dialogOptions) {

  return new Promise((resolve, reject) => {
    console.log("Options:", dialogOptions)
    
    ipcRenderer.send('show-dialog', dialogOptions);

    ipcRenderer.on('show-dialog-result', (event, result) => {
        resolve(result);
      });
    // ipcRenderer.send('asynchronous-message', type, sql, paramaters);
  
    // ipcRenderer.on('asynchronous-reply' + type, (event, result) => {
    // });
  });
}

