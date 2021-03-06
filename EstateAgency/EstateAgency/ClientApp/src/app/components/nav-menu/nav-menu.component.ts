import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../../constants/responseNumbers';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  @Output() sidenavToggle = new EventEmitter();

  constructor(
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  logout = (): boolean => {
    if (this.auth.logout()) {
      this.router.navigate(["home"]);
      this.toastr.success(responseNumbers[109], "Sukces!");
    }
    return false;
  }

  isLoggedIn = (): boolean => {
    return this.auth.isLoggedIn();
  }

  sidenavCloce = (): void => {
    this.sidenavToggle.next();
  }

  isAdmin = (): boolean => {
    return this.auth.isAdmin();
  }
}
