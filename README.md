# Knowted
#### Note the things you want to know

My take of a basic note editor for Windows and Mac.
This project is in early developement and is still in a WIP state.
I do not recommend using this program as a note taker during this stage as you may lost any notes written.

## Features

  - Write notes separated in sections 
  - Notes saved locally
  - Delete notes

#### Future Features
###### * These fure plans are not guaranteed.
  - WYSIWYG editing  
  - Cloud saving 
  - Tabs
  - More intuitive UI (drag and drop notes within section and to different tabs etc.) 
  - and more

## Tech

Knowted uses a number of open source projects to work properly:

* [Electron] - Build GUI applications using web technologies
* [React] -  For building user interfaces or UI components 
* [SQLite] - For saving data locally
* [Bootstrap] - Great UI boilerplate for modern web apps
* [Node.js] - evented I/O for the backend
* [TinyMCE]- HTML to Markdown converter
* and more

## Installation

Install the dependencies and devDependencies and start the server.

```sh
$ cd knowted
$ npm install -d
```

Run on Windows OS
```sh
$ npm run electron-win
```

Run on MacOS
```sh
$ npm run electron-mac
```

License
----

MIT



   [Electron]: <https://www.electronjs.org/>
   [Node.js]: <http://nodejs.org>
   [React]: <https://reactjs.org/>
   [Bootstrap]: <https://getbootstrap.com/>
   [SQLite]: <https://www.sqlite.org/>
   [TinyMCE]: <https://www.tiny.cloud/>

