import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { HomeComponent } from './components/advertisement/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AdvertisementListComponent } from './components/advertisement/advertisement-list/advertisement-list.component';
import { ApiService } from './services/api.service';
import { AdvertisementComponent } from './components/advertisement/advertisement-details/advertisement-details.component';
import { LoginComponent } from './components/user/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdvertisementEditComponent } from './components/advertisement/advertisement-edit/advertisement-edit.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthResponseInterceptor } from './services/auth.response.interceptor';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule} from '@angular/material';
import { SearchComponent } from './components/advertisement/search/search.component';
import { AdvertisementCreateComponent } from './components/advertisement/advertisement-create/advertisement-create.component';
import { AdvertisementOwnerComponent } from './components/advertisement/advertisement-owner/advertisement-owner.component';
import { ToastrModule } from 'ngx-toastr';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserMenuComponent } from './components/user/user-menu/user-menu.component';
import { UserChangePasswordComponent } from './components/user/user-change-password/user-change-password.component';
import { BackToPageComponent } from './components/back-to-page/back-to-page.component';
import { MessageCreateComponent } from './components/message/message-create/message-create.component';
import { MessageListComponent } from './components/message/message-list/message-list.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
        HomeComponent,
        AdvertisementListComponent,
        AdvertisementComponent,
        LoginComponent,
        PageNotFoundComponent,
        AdvertisementEditComponent,
        RegisterComponent,
        SearchComponent,
        AdvertisementCreateComponent,
        AdvertisementOwnerComponent,
        UserEditComponent,
        UserMenuComponent,
        UserChangePasswordComponent,
        BackToPageComponent,
        MessageCreateComponent,
        MessageListComponent
    ],
    entryComponents: [],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ToastrModule.forRoot({
            timeOut: 5000,
            preventDuplicates: true,
        }),
    ],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ],
    providers: [
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthResponseInterceptor,
            multi: true
        },
        ApiService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
