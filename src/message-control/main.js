const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const options = {
    name: "Knowted",
}
//encryptionKey: "aes-256-cbc"

const Store = require('electron-store');
const store = new Store(options);

// const database = new sqlite3.Database('./public/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
//     if (err) console.error('Database opening error: ', err);
// });

ipcMain.on('asynchronous-message', (event, arg) => {
    try {
        const sql = arg;
        database.all(sql, (err, rows) => {
            event.reply('asynchronous-reply', (err && err.message) || rows);
        });

    } catch (error) {
        event.reply('asynchronous-reply', null);
    }
});


ipcMain.on('store-get', (event, arg) => {
    try {
        var data = store.get(arg)
        event.reply('get-reply', data);
    } catch (error) {
        console.log("Get error: " + error)
        var newNote = [{
            id: 0,
            title: "Error retreving notes",
            content: error,
            order: 1,
            tab: 1
        }]
        event.reply('get-reply', newNote);
    }
});

ipcMain.on('store-set', (event, name, data) => {
    try {
        store.set(name, data)
        event.reply('store-reply', true);
    } catch (error) {
        console.log("store-set err: \n" + error)
        event.reply('store-reply', null);
    }
});


ipcMain.on('store-delete', async (event, id) => {
    try {
        console.log("Deleting: " + id)
        var result = await store.delete("notes")
        event.reply('store-reply', result);
    } catch (error) {
        console.log("store-delete err: \n" + error)
        event.reply('store-reply', null);
    }
});

ipcMain.on('store-count', (event) => {
    try {
        let count = store.count()
        event.reply('store-reply', count);
    } catch (error) {
        console.log("store-count err: \n" + error)
        event.reply('store-reply', null);
    }
});




