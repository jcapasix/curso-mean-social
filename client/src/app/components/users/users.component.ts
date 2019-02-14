import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';


@Component({
    selector: "users",
    templateUrl: './users.component.html',
    providers: [UserService]
})

export class UsersComponent implements OnInit{
    
    public title:string;
    public user:User;
    public identity;
    public token;
    public status:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService:UserService
    ){
        this.title = 'Gente';
        this.user = this._userService.getIdentity();
        this.identity = this.user;
        this.token = this._userService.getToken();
    }

    ngOnInit(){
        console.log('Componente de users cargado...')
    }
}