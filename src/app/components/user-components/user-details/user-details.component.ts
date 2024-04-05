import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { format } from 'date-fns';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-details', 
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit{

  userData!: User;
  userId!: string;
  
  constructor(private route: ActivatedRoute, private userService: UserService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
    this.userService.getUser(this.userId).subscribe(userData=>{
    this.userData=userData;
    });
  }

  getRolText(rol: string): string {
    switch (rol) {
      case 'admin':
        return 'Administración';
      case 'pax':
        return 'Pasajer@';
      case 'company':
        return 'Compañía';
      case 'tech':
        return 'Equipo Técnico';
      default:
        return rol;
    }
  }
}
