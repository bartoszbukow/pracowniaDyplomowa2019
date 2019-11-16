import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-user-menu',
    templateUrl: './user-menu.component.html',
    styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

    constructor(public auth: AuthService, private router: Router) { }

    ngOnInit() {
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
