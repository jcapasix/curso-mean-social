import { Component, OnInit, Input} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Publication } from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { $ } from 'protractor';


@Component({
    selector: "publications",
    templateUrl: './publications.component.html',
    providers: [PublicationService, UserService]
})

export class PublicationsComponent implements OnInit{
    
    public title:string;
    public url:string;
    public identity;
    public token;
    public page = 1;

    public status:string;
    public publications: Publication[];
    public total;
    public pages;
    public itemsPerPage;

    @Input() user:string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _publicationService: PublicationService,
        private _userService:UserService

    ){ 
        this.title = 'Publications';
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    ngOnInit(){
        console.log('Componente TimelineComponent cargado...')
        this.getPublications(this.user, this.page);
    }

    getPublications(user, page, adding=false){
        this._publicationService.getPublicationsUser(this.token, user, page).subscribe(
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
        
        this.getPublications(this.user, this.page, true);
    }

 
}