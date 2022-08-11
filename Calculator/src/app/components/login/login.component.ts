import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public auth: AuthService,
    private router: Router
  ) { }
    
  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      window.alert("Zaten giriş yapıldı!!!")
      this.router.navigate([""])
    }
  }

}
