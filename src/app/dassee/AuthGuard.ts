import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {DasseeService} from './services/dassee.service';
import {User} from './shared/models';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private dasseeService: DasseeService
  ) {
  
  }
  
  canActivate = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> => {
    const currentUser: User = await this.dasseeService.isLogged();
    if (currentUser) {
      // logged in so return true
      return true;
    }
    
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
    return false;
  };
}
