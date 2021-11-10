const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');
const options = {
    name: "Knowted",
}
//encryptionKey: "aes-256-cbc"

const database = new sqlite3.Database('./src/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error('Database opening error: ', err);
});

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
