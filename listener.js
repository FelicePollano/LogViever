
const fs = require('fs');
module.exports = class Listener
{
    constructor(file){
        this.file = file;
        fs.watch(this.file,(e,f)=>{
            console.log(e+" on "+f);
        });
    }

}