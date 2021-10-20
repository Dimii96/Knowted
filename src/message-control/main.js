const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./public/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error('Database opening error: ', err);
});

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

// const { ipcMain } = require('electron');
// const db = require('better-sqlite3')('./public/db.sqlite3', options);


// ipcMain.on('asynchronous-message', (event, arg) => {
//     try {
//         const sql = arg;
//         const rows = db.prepare(sql);
//         alert(JSON.stringify(rows[0]))
//         // event.reply('asynchronous-reply', (err && err.message) || rows);
//         var data = [
//             {
//                 id: 1,
//                 title: "1 - Title",
//                 content: "1 - This is content"
//             },
//             {
//                 id: 2,
//                 title: "2 - Title",
//                 content: "2 - This is content"
//             },
//             {
//                 id: 3,
//                 title: "3 - Title",
//                 content: "3 - This is content"
//             },
//             {
//                 id: 4,
//                 title: "4 - Title",
//                 content: "4 - This is content"
//             },
//         ]
//         event.reply('asynchronous-reply', data);


//     } catch (error) {
//     }
// });
