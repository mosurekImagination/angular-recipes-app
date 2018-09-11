import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromApp from '../store/app.reduters';
import * as fromAuth from '../auth/store/auth.reducers';
import {map} from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromApp.AppState>,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isAuth = this.store.select('auth').pipe(map( (authState: fromAuth.State) => {
      return authState.authenticated;
    }));
    if (!isAuth) {
      this.router.navigate(['/signin']);
    }
    return isAuth;
  }

}
