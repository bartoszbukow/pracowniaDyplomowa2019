import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from "@angular/router";

@Component({
  selector: 'app-back-to-page',
  templateUrl: './back-to-page.component.html',
  styleUrls: ['./back-to-page.component.less']
})
export class BackToPageComponent {

  @Input() dateToReturn: { title: string, pathToReturn: string };

  constructor(
    private router: Router,
    private _location: Location) { }

  backClicked = (): void => {
    if (this.dateToReturn.pathToReturn === "locationBack") {
      this._location.back();
    } else {
      this.router.navigate([this.dateToReturn.pathToReturn]);
    }
  }
}
