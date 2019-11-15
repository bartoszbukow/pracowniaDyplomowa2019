import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/advertisement/home.component';
import { AdvertisementComponent } from './components/advertisement/advertisement-details/advertisement-details.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdvertisementEditComponent } from './components/advertisement/advertisement-edit/advertisement-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { AdvertisementCreateComponent } from './components/advertisement/advertisement-create/advertisement-create.component';
import { AdvertisementOwnerComponent } from './components/advertisement/advertisement-owner/advertisement-owner.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'advertisement/my', component: AdvertisementOwnerComponent },
    { path: 'advertisement/create', component: AdvertisementCreateComponent },
    { path: 'advertisement/edit/:id', component: AdvertisementEditComponent },
    { path: 'advertisement/:id', component: AdvertisementComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            { enableTracing: false } // <-- debugging purposes only
        )
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }
