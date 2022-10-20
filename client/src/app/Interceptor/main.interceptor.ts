import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {switchMap} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthService} from '../services';

@Injectable()
export class MainInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): any {
        if (request.url === 'http://localhost:5000/auth/reset-password') {
            return next.handle(request);
        }
        const isAuthentificated = this.authService.isAuthentificted();
        if (isAuthentificated) {
            const token =this.authService.getAccessToken()
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
        })}
        return next.handle(request).pipe(
            catchError((err: HttpErrorResponse): any => {
                if (err.status === 401) {
                    return this.handle401(request, next);
                }

            })
        );
    }

    addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        });
    }

    private handle401(request: HttpRequest<any>, next: HttpHandler): any {
        return this.authService.refresh().pipe(
            switchMap((res) => {

                return next.handle(this.addToken(request, res.access_token));
            })
        );
    }
}
