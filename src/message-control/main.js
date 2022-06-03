const { ipcMain } = require('electron');
const sqlite3 = require('sqlite3');

const database = new sqlite3.Database('./src/db.sqlite3', sqlite3.OPEN_READWRITE, (err) => {
    if (err) console.error('Database opening error: ', err);
});

ipcMain.on('asynchronous-message', (event, type, sql, paramaters) => {

    const reply = 'asynchronous-reply' + type; 
    console.log("DB call: ", sql, paramaters)
    database.all(sql, paramaters, (err, rows) => {
        if(err) {
            //console.log("DB error", err)
            event.sender.send(reply, { status: 0,  message: err && err.message, data: {} });
        } else {
            // console.log("DB Result:", rows)
            event.sender.send(reply, { status: 1, message: '', data: rows });
        }
    });
  });

// ipcMain.on('asynchronous-message', (event, sqlQuery, parameters = []) => {
//     try {
//         console.log("Query: ", sqlQuery);
//         console.log("parameters: ", parameters);
        
//         database.all(sqlQuery, parameters, (err, rows) => {
//             if(err)
//                 console.log("Err", err)
//             else
//                 console.log("Result:", rows)
//             event.reply('asynchronous-reply', (err && err.message) || rows);
//         });

//     } catch (error) {
//         console.log("SQL err:", error)

//         event.reply('asynchronous-reply', null);

//     }
// });

