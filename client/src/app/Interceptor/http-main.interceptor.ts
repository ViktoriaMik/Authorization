import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services";

@Injectable()
export class HttpMainInterceptor implements HttpMainInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        console.log(this.authService.getAccessToken())
        const isAuthentificated = this.authService.isAuthentificted();
        if (isAuthentificated) {
            request = this.addToken(request, this.authService.getAccessToken())
        } else {
            console.log(this.authService.getAccessToken())

        }
        return next.handle(request);
    }

    addToken(request: HttpRequest<any>, token: string | null): HttpRequest<any> {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${token}`}
        })
    }

    private refreshToken(request: HttpRequest<any>, next: HttpHandler): any {
        return request.clone({
            setHeaders: {Authorization: `Bearer ${''}`}
        })
    }
}
