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
    //File
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
    },
    //View
    {
        label:'View',
        submenu:[
            {
                label:"Clear"
            }
        ]
    }
];

if(process.env.NODE_ENV!=='production'){
    mainMenuTemlate[1].submenu.push(
        {
            label:'Toggle Dev Tools',
            accelerator:'F12',
            click:(item,focusedWindow)=>focusedWindow.toggleDevTools()
        }
    );
    mainMenuTemlate[1].submenu.push(
        {
            role:'reload'
        }
    );
}