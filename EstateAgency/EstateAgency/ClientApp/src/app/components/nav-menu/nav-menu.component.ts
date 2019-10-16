import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-nav-menu',
    templateUrl: './nav-menu.component.html',
    styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
    isExpanded = false;

    constructor(public auth: AuthService, private router: Router) { }

    collapse() {
        this.isExpanded = false;
    }

    toggle() {
        this.isExpanded = !this.isExpanded;
    }

    logout(): boolean {
        if (this.auth.logout()) {
            this.router.navigate([""]);
        }
        return false;
    }

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn();
    }
}
