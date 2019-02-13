import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { User } from '../models/user';

@Injectable()
export class UserService{
    public url:String;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    register(user: User): Observable<any>{
        console.log('Register Service')
        let params = JSON.stringify(user)
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this._http.post(this.url + 'register', params, {headers: headers});
    }
}

