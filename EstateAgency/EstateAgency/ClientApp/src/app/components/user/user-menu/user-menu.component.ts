import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from './../../../services/api.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {
    currentUser: ICurrentUser;

    constructor(
        public auth: AuthService,
        private router: Router,
        private api: ApiService
    ) { }

    ngOnInit() {
        if (this.isLoggedIn()) {
            this.api.getCurrentUser().subscribe(res => {
                this.currentUser = res;
            });
        }
    }

    logout(): boolean {
        if (this.auth.logout()) {
            this.router.navigate(["home"]);
        }
        return false;
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }
}
