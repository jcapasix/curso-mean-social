import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { UserService } from '../../services/user.service';
import { PublicationService } from '../../services/publication.service';
import { GLOBAL } from '../../services/global';
import { $ } from 'protractor';


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
    public itemsPerPage;
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

    getPublications(page, adding=false){
        this._publicationService.getPublications(this.token, page).subscribe(
            response => {
                if(response.publications){
                    this.status = 'success';
                    
                    this.total = response.total_items;
                    this.pages = response.pages;
                    this.itemsPerPage = response.items_per_page;

                    if(!adding){
                        this.publications = response.publications
                    }
                    else{
                        var arrayA = this.publications;
                        var arrayB = response.publications;
                        this.publications = arrayA.concat(arrayB);

                        // $("html, body").animate({scrollTop: $('body').prop('scrollHeight')}, 500);
                    }

                    // if(page > this.pages){
                    //     this._router.navigate(['/home']);
                    // }

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

    public noMore = false


    viewMore(){
        console.log('viewmore');
        this.page += 1;

        if(this.page == this.pages){
            this.noMore = true;
        }
        this.getPublications(this.page, true);
    }

    refresh(event){
        this.getPublications(1);
        console.log(event);
    }

 
}