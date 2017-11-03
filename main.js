"option strict";
const electron = require("electron");
const url = require("url");
const path = require("path");

const {app,BrowserWindow,Menu,dialog} = electron;

let mainWindow;

app.on("ready",()=>{
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(url.format(
        {
            pathname:path.join(__dirname,"main.html"),
            protocol:'file',
            slashes: true
        }
    ));

    mainWindow.on('close',()=>app.quit());

    const mainMenu = Menu.buildFromTemplate(mainMenuTemlate);
    Menu.setApplicationMenu(mainMenu);
});

var showOpen = function() {
	dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ extensions: ['txt','log','*'] }]});
};

const mainMenuTemlate=[
    {
        label:"File",
        submenu:[
            {
                label:"Add log",
                click:()=>showOpen()
            },
            {
                label:"Remove all"
            },
            {
                label:"Exit",
                accelerator:process.platform=="darwin"?'Command+Q':'Ctrl+Q',
                click:()=>app.quit()
            }
        ]
    }
];