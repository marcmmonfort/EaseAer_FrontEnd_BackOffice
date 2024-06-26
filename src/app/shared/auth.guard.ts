import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KnownService } from '../services/known.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  userRole: string | any;

  constructor(private auth:AuthService, private router:Router){  }

  canActivate(){
    if (this.auth.isLoggedIn()) {
      console.log(this.auth.isLoggedIn());
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}

/*
isUserAPax(){
    this.userRole = localStorage.getItem('role');
    if (this.userRole=='pax') {
      return true;
    } else {
      return false;
    }
  }
*/
