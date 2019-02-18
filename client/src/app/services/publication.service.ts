import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Publication } from '../models/publication';

@Injectable()
export class PublicationService{
    public url:String;
    // public identity;
    // public token;
    // public stats;

    constructor(public _http: HttpClient){
        this.url = GLOBAL.url;
    }

    addPublication(publication:Publication, token): Observable<any>{
 
        let params = JSON.stringify(publication);
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this._http.post(this.url + 'publication', params, {headers: headers});

    }

}

