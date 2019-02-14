import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule} from '@angular/common/http';

import {routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
//Componentes
import { AppComponent } from './app.component';
import { LoginComponent} from './components/login/login.component';
import { RegisterComponent} from './components/register/register.component';
import { HomeComponent} from './components/home/home.component';

import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    //AppRoutingModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
