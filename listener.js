
const fs = require('fs');
const initialBuffSize = 256;
module.exports = class Listener
{
  
    constructor(file,callback){
        
        this.file = file;
        this.current = 0;
        this.encoding = 'utf8';
        this.callback = callback;
        this.buffer = "";
        this._generateFirstChunk();
        
       
    }
    _beginWatch(){
      
         fs.watch(this.file,(e,f)=>{
            var size = fs.statSync(this.file).size;
            if( size > this.current ){
                 let tmp = this.current;
                 this.current = size;
                 this._read(tmp,size-tmp,()=>this.callback());
                 
            }

        });
    }
    _generateFirstChunk(file){
        var size = fs.statSync(this.file).size;
        this.current = size;
       
        if(size<=this.initialBuffSize)
        {
           this._read(0,size-1,this.callback,()=>this._beginWatch);
        }else{
            this._read(size-initialBuffSize,size-1,this.callback,()=>this._beginWatch());
        }
    }
   
    _read(from,howmany,callback,then){
        
        let stream = fs.createReadStream(this.file,{start:from,end:from+howmany-1});
        stream.encoding = this.encoding;
        stream.on('data',(data)=>{
                this.callback(data.toString(this.encoding));
                stream.close();
               
                if(then !== undefined){
                    
                    then();
                }
            }
            );
        
    }

}