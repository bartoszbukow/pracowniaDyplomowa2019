import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvertisementListComponent } from './components/advertisement-list/advertisement-list.component';
import { ApiService } from './services/api.service';
import { AdvertisementComponent } from './components/advertisement/advertisement.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdvertisementEditComponent } from './components/advertisement/advertisement-edit/advertisement-edit.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AdvertisementListComponent,
        AdvertisementComponent,
        LoginComponent,
        PageNotFoundComponent,
        AdvertisementEditComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        AppRoutingModule
    ],
    providers: [
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
