const electron = window.require('electron');
const { ipcRenderer } = electron;

export default function send(type, sql, paramaters = []) {
  return new Promise((resolve, reject) => {
    ipcRenderer.send('asynchronous-message', type, sql, paramaters);
  
    ipcRenderer.on('asynchronous-reply' + type, (event, result) => {
      resolve(result);
    });
  });
}


  