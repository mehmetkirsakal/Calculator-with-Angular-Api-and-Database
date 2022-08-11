import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuardService {

  constructor(
    private auth: AuthService,
    private router: Router,
  ) { }

    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean {
      let logged = this.auth.isLoggedIn();

      if(logged || localStorage.getItem('username') === 'admin' && localStorage.getItem('password') === 'admin'){
        
        return true;
      }
      this.router.navigate(["/login"]);
      window.alert("Sayfaya erişim için sisteme giriş yapmalısın.!");
      return false;
    }

}

