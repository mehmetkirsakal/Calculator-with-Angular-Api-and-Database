import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  auth: boolean

  logIn(id,pass){
    if(id === 'admin' && pass === 'admin'){
      sessionStorage.setItem('username', id)
      localStorage.setItem('username',id)
      localStorage.setItem('password',pass)
      this.auth = true;
      console.log("Giriş yapıldı")
      this.router.navigate([""]);
    }else{
      console.log(id,pass)
      this.auth = false;
    }
  }
  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.auth = false;
  }
  isLoggedIn(){
    if(this.auth === true){
      return true;
    } else{
      return false;
    }
  }
}
