import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication} from '../../models/publication';


@Component({
    selector: "sidebar",
    templateUrl: './sidebar.component.html',
    providers: [UserService]
})

export class SidebarComponent implements OnInit{
    
    public stats;
    public identity;
    public token;
    public status:string;
    public url:string;
    public publication:Publication;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService:UserService,
    ){
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.stats = this._userService.getStats();
        this.url = GLOBAL.url;

        this.publication = new Publication("", "", "", "", this.identity._id);
    }

    ngOnInit(){
        console.log('Componente de SidebarComponent cargado...')
    }

    onSubmit(){
        console.log(this.publication);
    }

}