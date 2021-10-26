const electron = window.require('electron');
const { ipcRenderer } = electron;



export default function sendAsync(sql) {
    return new Promise((resolve) => {
        ipcRenderer.once('asynchronous-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('asynchronous-message', sql);
    });
}

export function storeGet(name) {
   
    return new Promise((resolve) => {
        ipcRenderer.once('get-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('store-get', name);
    });
}


export function storeSet(name, data) {
    return new Promise((resolve) => {
        ipcRenderer.once('store-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('store-set', name, data);
    });
}


export function storeDelete(id) {
    return new Promise((resolve) => {
        ipcRenderer.once('store-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('store-delete', id);
    });
}

export function storeCount() {
    return new Promise((resolve) => {
        ipcRenderer.once('store-reply', (_, arg) => {
            resolve(arg);
        });
        ipcRenderer.send('store-count');
    });
}





