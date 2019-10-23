import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { HttpHandler, HttpEvent, HttpInterceptor, HttpRequest, HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { throwError, Observable, BehaviorSubject, of } from "rxjs";
import { catchError, filter, take, switchMap, finalize } from "rxjs/operators";

@Injectable()
export class AuthResponseInterceptor implements HttpInterceptor {

    private AUTH_HEADER = "Authorization";
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(private router: Router, private auth: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler, ): Observable<any> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({
                //headers: req.headers.set('Content-Type', 'application/json')
            });
        }

        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error && error.status === 401) {
                    if (req.url.includes("token")) {
                        this.auth.logout();
                        this.router.navigateByUrl('login');
                    }

                    if (this.refreshTokenInProgress) {
                        return this.refreshTokenSubject.pipe(
                            filter(result => result !== null),
                            take(1),
                            switchMap(() => next.handle(this.addAuthenticationToken(req)))
                        );
                    } else {
                        this.refreshTokenInProgress = true;

                        this.refreshTokenSubject.next(null);

                        return this.refreshAccessToken().pipe(
                            switchMap((success: boolean) => {
                                this.refreshTokenSubject.next(success);
                                return next.handle(this.addAuthenticationToken(req));
                            }),
                            finalize(() => this.refreshTokenInProgress = false)
                        );
                    }
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private refreshAccessToken(): Observable<any> {
        var response = this.auth.refreshToken();

        return response;
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        if (!this.auth.getAuth()) {
            return request;
        }

        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, "Bearer " + this.auth.getAuth().token)
        });
    }
}
