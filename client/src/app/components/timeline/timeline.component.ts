import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';


@Component({
    selector: "timeline",
    templateUrl: './timeline.component.html',
    providers: [UserService, PublicationService]
})

export class TimelineComponent implements OnInit{
    
    public title:string;
    public url:string;
    public identity;
    public token;
    public page = 1;

    public status:string;
    public publications: Publication[];

    // public page;
    // public next_page;
    // public prev_page;

    public total;
    public pages;
    // public users:[User];
    // public follows;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _publicationService: PublicationService
    ){ 
        this.title = 'Timeline';
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Componente TimelineComponent cargado...')
        this.getPublications(this.page);
    }

    getPublications(page){
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                if(response.publications){
                    this.status = 'success';
                    this.publications = response.publications
                    this.total = response.total_items;
                    this.pages = response.pages;

                    if(page > this.pages){
                        this._router.navigate(['/home']);
                    }
                    
                    console.log(response);
                }
                else{
                    this.status = 'error';
                }
            },
            error => {
                var errorMessage = <any>error;
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
    }

 
}