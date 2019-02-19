import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { Follow } from '../../models/follow';
import { UserService } from '../../services/user.service';
import { FollowService } from '../../services/follow.service';
import { GLOBAL } from '../../services/global';



@Component({
    selector: "profile",
    templateUrl: './profile.component.html',
    providers: [UserService, FollowService]
})

export class ProfileComponent implements OnInit{
    
    public title:string;
    public user:User;
    public status:string;
    public identity;
    public token;
    public stats;
    public url;
    public follow;
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService:UserService,
        private _followService:FollowService
    ){
        this.title = 'Profile';
        this.identity = this._userService.getIdentity()
        this.token = this._userService.getToken()
        this.url = GLOBAL.url;
        // this.user = new User("", "", "", "", "", "", "ROLE_USER", "");
    }

    ngOnInit(){
        console.log('ProfileComponent cargado...')
        this.loadPage();
    }

    loadPage(){
        this._route.params.subscribe( params =>{
            let id = params['id'];
            this.getUser(id);
            //this.getCounters(id);
        });
    }

    getUser(id){

        console.log('XXXX!!!!')
        console.log(id)
        this._userService.getUser(id).subscribe(
            response =>{
                console.log(response);
                if(response.user){
                    
                    this.user = response.user;
                }
            },
            error =>{
                console.log(<any>error);
                this._router.navigate(['/profile', this.identity._id])
            }
        );
    }

    getCounters(id){
        this._userService.getCounters(id).subscribe(
            response =>{
                if(response.user){
                    console.log('pepsi')
                    this.stats = response;
                }
            },
            error =>{
                console.log(<any>error);
            }
        );
    }
}