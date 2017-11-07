"option strict";
const electron = require("electron");
const url = require("url");
const path = require("path");
const Listener = require("./listener");


const {app,BrowserWindow,Menu,dialog} = electron;

let mainWindow;
let listeners = [];


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

function listenTo(data){
    console.log(data);
}

function listenToFiles(files){
    for(let k in files){
        listeners.push(new Listener(files[k],listenTo));
    }
}


var showOpen = function() {
	dialog.showOpenDialog({ properties: [ 'openFile'], filters: [{ extensions: ['txt','log','*'] }]},(files)=>listenToFiles(files));
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


//append