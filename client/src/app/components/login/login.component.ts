import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Component({
    selector: "login",
    templateUrl: './login.component.html',
    providers: [UserService]
})

export class LoginComponent implements OnInit{
    
    public title:string;
    public user:User;
    public status:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService:UserService
    ){
        this.title = 'Identificate';
        this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('Componente de login cargado...')
    }

    onSubmit(){
        this._userService.register(this.user).subscribe(
            response => {
                if(response.user && response.user._id){
                    console.log('success');
                    this.status = 'success';
                }
                else{
                    console.log('error')
                    this.status = 'error';
                }
            },
            error => {
                console.log(<any>error);
            }
        );
    }
}