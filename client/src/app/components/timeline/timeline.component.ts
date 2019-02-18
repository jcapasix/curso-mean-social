import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
// import { UploadService } from '../../services/upload.service';
import { GLOBAL } from '../../services/global';


@Component({
    selector: "timeline",
    templateUrl: './timeline.component.html',
    providers: [UserService]
})

export class TimelineComponent implements OnInit{
    
    public title:string;
    public url:string;
    public identity;
    public token;

    // public status:string;
    // public page;
    // public next_page;
    // public prev_page;

    // public total;
    // public pages;
    // public users:[User];
    // public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
    ){
        this.title = 'Timeline';
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Componente TimelineComponent cargado...')
    }

 
}