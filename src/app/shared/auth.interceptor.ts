import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reduters';
import * as fromAuth from '../auth/store/auth.reducers';
import {switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private store: Store<fromApp.AppState>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.store.select('auth').pipe(take(1)).pipe(switchMap( (state: fromAuth.State) => {
      const copiedReq = req.clone( {
        params: req.params.set('auth', state.token )
      });
      return next.handle(copiedReq);
    }));
  }

}
