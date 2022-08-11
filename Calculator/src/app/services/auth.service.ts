import { Injectable } from '@angular/core';
import { Route, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }
  auth: boolean
  error: string

  logIn(id,pass){
    if(id === 'admin' && pass === 'admin'){
      sessionStorage.setItem('username', id)
      localStorage.setItem('username',id)
      localStorage.setItem('password',pass)
      this.auth = true;
      console.log("Giriş yapıldı")
      this.error = '';
      this.router.navigate([""]);
    }else{
      console.log(id,pass)
      this.error = "Kullanıcı adı veya şifre hatalı! (admin,admin)";
      this.auth = false;
    }
  }
  logOut(){
    sessionStorage.clear();
    localStorage.clear();
    this.auth = false;
    window.alert("Çıkış Yapıldı!!!");
    this.error = '';
  }
  isLoggedIn(){
    if(this.auth === true || localStorage.getItem('username') === 'admin' && localStorage.getItem('password') === 'admin'){
      return true;
    } else{
      return false;
    }
  }
}
