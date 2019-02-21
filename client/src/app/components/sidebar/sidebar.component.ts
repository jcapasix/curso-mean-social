import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { GLOBAL } from '../../services/global';
import { Publication} from '../../models/publication';
import { PublicationService } from '../../services/publication.service';
import { UploadService } from '../../services/upload.service';


@Component({
    selector: "sidebar",
    templateUrl: './sidebar.component.html',
    providers: [UserService, PublicationService, UploadService]
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
        private _publicationService:PublicationService,
        private _uploadService:UploadService
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

    onSubmit(form){
        this._publicationService.addPublication(this.publication, this.token).subscribe(
            response =>{
                if(response.publication){
                    //subir imagen

                    this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id, [], this.filesToUpload, this.token, 'image')
                    .then((result:any) =>{
                        this.publication.file = result.image;
                        //this.publication = response.publication;
                        this.status = 'success';
                        form.reset();
                        this._router.navigate(['/timeline']);
                    });
                }
                else{
                    this.status = 'error';
                }

            },
            error =>{
                var errorMessage = <any>error;
                console.log('jordan capa');
                console.log(errorMessage);

                if(errorMessage != null){
                    this.status = 'error';
                }
            }
        );
        console.log(this.publication);
    }

    public filesToUpload: Array<File>;
    fileChangeEvent(fileInput: any){
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }


    //output
    @Output() sended = new EventEmitter();
    sendPublication(event){
        console.log(event);
        this.sended.emit({send: 'true'});
    }

}