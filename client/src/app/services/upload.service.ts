import { Injectable, inject } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class UploadService{
    public url:String;

    constructor(){
        this.url = GLOBAL.url;
    }

    makeFileRequest(url:string, params:Array<string>, files:Array<File>, token:string, name:string){
        
        return new Promise(function(resolve, reject){
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();
            console.log('jordan');
            console.log(files.length);
            for(var i=0; i < files.length; i++){
                console.log(name);
                console.log(files[i]);
                console.log(files[i].name);
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4){
                    if(xhr.status == 200){
                        resolve(JSON.parse(xhr.response));
                    }
                    else{
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            console.log(formData);
            xhr.send(formData)
        }); 

    }

}

