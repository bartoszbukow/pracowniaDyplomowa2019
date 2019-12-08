import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { ApiService } from './api.service';
import { ToastrService } from 'ngx-toastr';
import { responseNumbers } from './../constants/responseNumbers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authKey: string = "auth";
    clientId: string = "TestMakerFree";
    redirectTo: string = "";

    constructor(@Inject(PLATFORM_ID) private platformId: any,
        private api: ApiService,
        private toastr: ToastrService) { }

    login(username: string, password: string): Observable<any> {
        var data = {
            username: username,
            password: password,
            clientId: this.clientId,
            grant_type: "password",
            scope: "offline_access profile email"
        };
        return this.getAuthFromServer(data);
    }

    refreshToken(): Observable<boolean> {
        var data = {
            clientId: this.clientId,
            grant_type: "refresh_token",
            refresh_token: this.getAuth().refresh_token,
        };
        return this.getAuthFromServer(data);
    }

    getAuthFromServer(data: any): Observable<any> {
        return this.api.postAuthFromServer(data)
            .pipe(map((res) => {
                let token = res && res.token;
                if (token) {
                    this.setAuth(res);
                    return true;
                }
                return Observable.throw('Unauthorized');
            }),
                catchError((error) => {
                    return new Observable<any>(error);
                }));
    }

    logout(): boolean {
        this.setAuth(null);
        this.toastr.success(responseNumbers[109], "Sukces!");
        return true;
    }

    setAuth(auth: ITokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(
                    this.authKey,
                    JSON.stringify(auth));
            } else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    getAuth(): ITokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) {
                return JSON.parse(i);
            }
        }
        return null;
    }

    isLoggedIn(): boolean {
        if (isPlatformBrowser(this.platformId)) {
            return localStorage.getItem(this.authKey) != null;
        }
        return false;
    }

    isAdmin() {
        let token = this.getAuth().token;
        let tokenData = token.split('.')[1];
        let decodedTokenJsonData = window.atob(tokenData);
        let decodedTokenData = JSON.parse(decodedTokenJsonData);

        for (let role of decodedTokenData.roles) {
            if (role === "Administrator") {
                return true;
            }
        }
        return false;
    }
}
