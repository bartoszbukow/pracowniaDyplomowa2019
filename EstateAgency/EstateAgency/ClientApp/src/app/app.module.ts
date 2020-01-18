import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MDBBootstrapModule , WavesModule, InputsModule, ButtonsModule } from 'angular-bootstrap-md'

import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { AdvertisementListComponent } from './components/advertisement/advertisement-list/advertisement-list.component';
import { ApiService } from './services/api.service';
import { AdvertisementComponent } from './components/advertisement/advertisement-details/advertisement-details.component';
import { LoginComponent } from './components/user/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdvertisementEditComponent } from './components/advertisement/advertisement-edit/advertisement-edit.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { AuthResponseInterceptor } from './services/auth.response.interceptor';
import { RegisterComponent } from './components/user/register/register.component';
import { SearchComponent } from './components/advertisement/search/search.component';
import { AdvertisementCreateComponent } from './components/advertisement/advertisement-create/advertisement-create.component';
import { AdvertisementOwnerComponent } from './components/advertisement/advertisement-owner/advertisement-owner.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserMenuComponent } from './components/user/user-menu/user-menu.component';
import { UserChangePasswordComponent } from './components/user/user-change-password/user-change-password.component';
import { BackToPageComponent } from './components/back-to-page/back-to-page.component';
import { MessageCreateComponent } from './components/message/message-create/message-create.component';
import { MessageListComponent } from './components/message/message-list/message-list.component';
import { MessageDetailsComponent } from './components/message/message-details/message-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AuthGuardService } from './services/auth.guard.service';
import { AdminGuardService } from './services/admin.guard.service';
import { UserManagementComponent } from './components/admin/admin-panel/user-management/user-management.component';
import { AdvertisementManagementComponent } from './components/admin/admin-panel/advertisement-management/advertisement-management.component';
import { ModalService } from './services/modal.service';
import { ModalContainerComponent } from './components/modals/modal-container/modal-container.component';
import { AdvertisementDeleteModalComponent } from './components/modals/advertisement-delete-modal/advertisement-delete-modal.component';
import { ReservationCreateModalComponent } from './components/modals/reservation-create-modal/reservation-create-modal.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ChangePasswordModalComponent } from './components/modals/change-password-modal/change-password-modal.component';

@NgModule({
    declarations: [
        AppComponent,
        NavMenuComponent,
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
        MessageListComponent,
        MessageDetailsComponent,
        AdminPanelComponent,
        UserManagementComponent,
        AdvertisementManagementComponent,
        ModalContainerComponent,
        AdvertisementDeleteModalComponent,
        ReservationCreateModalComponent,
        PaginationComponent,
        DashboardComponent,
        ChangePasswordModalComponent,
    ],
    entryComponents: [
      ModalContainerComponent,
      AdvertisementDeleteModalComponent,
      ReservationCreateModalComponent,
      ChangePasswordModalComponent
    ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        MDBBootstrapModule.forRoot(),
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
            positionClass: 'toast-bottom-right',
        }),
        WavesModule,
        InputsModule,
        ButtonsModule,
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
        ApiService,
        AuthGuardService,
        AdminGuardService,
        ModalService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
