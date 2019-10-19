import { EventEmitter, Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { map, catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class AuthService {
    authKey: string = "auth";
    clientId: string = "TestMakerFree";
    redirectTo: string = "";

    constructor(private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: any) { }

    // performs the login
    login(username: string, password: string): Observable<any> {
        var url = "api/token/auth";
        var data = {
            username: username,
            password: password,
            clientId: this.clientId,
            grant_type: "password",
            scope: "offline_access profile email"
        };
        return this.getAuthFromServer(url, data);
    }

    refreshToken(): Observable<boolean> {
        var url = "api/token/auth";
        var data = {
            clientId: this.clientId,
            grant_type: "refresh_token",
            refresh_token: this.getAuth()!.refresh_token,
        };
        return this.getAuthFromServer(url, data);
    }

    getAuthFromServer(url: string, data: any): Observable<any> {
        return this.http.post<ITokenResponse>(url, data)
            .pipe(map((res) => {
                let token = res && res.token;
                if (token) {
                    this.setAuth(res);
                    return true;
                }
                return Observable.throw('Unauthorized');
            }),
                catchError((error) => {
                    console.log(error);
                    return new Observable<any>(error);
                }));
    }

    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    setAuth(auth: ITokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(this.authKey, JSON.stringify(auth));
            } else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    getAuth(): ITokenResponse | null {
        if (isPlatformBrowser(this.platformId)) {
            var i = localStorage.getItem(this.authKey);
            if (i) { return JSON.parse(i); }
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
