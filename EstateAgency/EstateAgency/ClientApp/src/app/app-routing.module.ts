import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/advertisement/home.component';
import { AdvertisementComponent } from './components/advertisement/advertisement-details/advertisement-details.component';
import { LoginComponent } from './components/user/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AdvertisementEditComponent } from './components/advertisement/advertisement-edit/advertisement-edit.component';
import { RegisterComponent } from './components/user/register/register.component';
import { AdvertisementCreateComponent } from './components/advertisement/advertisement-create/advertisement-create.component';
import { AdvertisementOwnerComponent } from './components/advertisement/advertisement-owner/advertisement-owner.component';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';
import { UserChangePasswordComponent } from './components/user/user-change-password/user-change-password.component';
import { MessageCreateComponent } from './components/message/message-create/message-create.component';
import { MessageListComponent } from './components/message/message-list/message-list.component';
import { MessageDetailsComponent } from './components/message/message-details/message-details.component';
import { AdminPanelComponent } from './components/admin/admin-panel/admin-panel.component';
import { AuthGuardService } from './services/auth.guard.service';
import { AdminGuardService } from './services/admin.guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'advertisement/my', component: AdvertisementOwnerComponent, canActivate: [AuthGuardService] },
    { path: 'advertisement/create', component: AdvertisementCreateComponent, canActivate: [AuthGuardService] },
    { path: 'advertisement/edit/:id', component: AdvertisementEditComponent, canActivate: [AuthGuardService] },
    { path: 'advertisement/:id', component: AdvertisementComponent },
    { path: 'user/edit', component: UserEditComponent, canActivate: [AuthGuardService] },
    { path: 'user/change-password', component: UserChangePasswordComponent, canActivate: [AuthGuardService] },
    { path: 'message/create', component: MessageCreateComponent, canActivate: [AuthGuardService] },
    { path: 'message/my', component: MessageListComponent, canActivate: [AuthGuardService] },
    { path: 'message/conversation/:id', component: MessageDetailsComponent, canActivate: [AuthGuardService] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'administration', component: AdminPanelComponent, canActivate: [AdminGuardService]},
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
