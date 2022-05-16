import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators'
import {AppConfigService, AuthService} from "../services";
import {UserService} from "../services/user.service";

@Injectable()
export class HttpMainInterceptor implements HttpMainInterceptor {

    constructor(private authService: AuthService, private userService: UserService, private configService: AppConfigService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(this.authService.getAccessToken())
        const isAuthentificated = this.authService.isAuthentificted();
        if (isAuthentificated) {
            request = this.addToken(request, this.authService.getAccessToken())
            // @ts-ignore
            return next.handle(request).pipe(
                catchError((err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 401) {
                            this.authService.refresh().subscribe(res => {
                                request = this.addToken(request, res.access_token)
                                this.userService.getUser().subscribe(responce => this.configService.userSubject.next(responce))
                            })
                        } else if (err.status) {
                        }
                    }
                    return next.handle(request)
                })
            );
        }
        return next.handle(request)
    }

    addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        })
    }

    handdle401(request: HttpRequest<any>, next: HttpHandler): HttpRequest<any> {
        this.authService.refresh().subscribe(res => {
            request = this.addToken(request, res.access_token)
        })
        return request.clone()
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): any {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${''}`}
        })
    }
}
