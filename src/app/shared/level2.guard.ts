import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { KnownService } from '../services/known.service';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class Level2Guard implements CanActivate {
  userRole: string | any;

  constructor(private auth:AuthService, private router:Router){  }

  canActivate(){
    this.userRole = localStorage.getItem('role');
    if (this.userRole=='company' || this.userRole=='admin' || this.userRole=='tech') {
      return true;
    } else {
      return false;
    }
  }
}