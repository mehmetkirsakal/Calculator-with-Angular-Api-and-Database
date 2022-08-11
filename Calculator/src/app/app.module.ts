import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Route} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { WallComponent } from './components/wall/wall.component';
import { HttpClientModule} from '@angular/common/http'
import { PostService } from './services/post.service';
import { LoginComponent } from './components/login/login.component';
import { LoginGuardService } from './services/login-guard.service';
const routeConfig: Route[] = [
  {
    path: '',
    component: WallComponent,
    canActivate: [LoginGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '**',
    redirectTo: "",
    pathMatch: 'full'
    
  }

]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WallComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routeConfig),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
