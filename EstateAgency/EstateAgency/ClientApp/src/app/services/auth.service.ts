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
            client_id: this.clientId,
            grant_type: "password",
            scope: "offline_access profile email"
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
                    return new Observable<any>(error);
                }));
    }

    logout(): boolean {
        this.setAuth(null);
        return true;
    }

    setAuth(auth: TokenResponse | null): boolean {
        if (isPlatformBrowser(this.platformId)) {
            if (auth) {
                localStorage.setItem(this.authKey, JSON.stringify(auth));
            } else {
                localStorage.removeItem(this.authKey);
            }
        }
        return true;
    }

    getAuth(): TokenResponse | null {
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

}
