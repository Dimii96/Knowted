const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./src/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, sqlQuery, parameters) => {
    try {
        //const sql = arg;
        console.log("parameters: ", parameters)
        database.all(sqlQuery, parameters, (err, rows) => {
            event.reply('asynchronous-reply', (err && err.message) || rows);
        });

    } catch (error) {
        event.reply('asynchronous-reply', null);

    }
});
