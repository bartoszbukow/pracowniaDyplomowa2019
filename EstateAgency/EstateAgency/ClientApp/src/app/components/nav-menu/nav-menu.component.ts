import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {

    @Output() sidenavToggle = new EventEmitter();

    constructor(public auth: AuthService, private router: Router) { }

    logout(): boolean {
        if (this.auth.logout()) {
            this.router.navigate(["home"]);
        }
        return false;
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }

    sidenavCloce() {
        this.sidenavToggle.next();
    }
}
