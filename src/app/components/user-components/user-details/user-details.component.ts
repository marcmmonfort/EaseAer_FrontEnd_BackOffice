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
  
  constructor(private route: ActivatedRoute, private userService: UserService,private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
    console.log(this.userId);
    this.userService.getUser(this.userId).subscribe(userData=>{
      this.userData=userData;
      console.log(userData);
      console.log(userData.appUser);
      console.log(userData.nameUser);
    });
  }
  getRolText(rol: string): string {
    switch (rol) {
      case 'admin':
        return 'Administrador/a';
      case 'common':
        return 'Cuenta común';
      case 'verified':
        return 'Cuenta verificada';
      case 'business':
        return 'Cuenta de Empresa';
      default:
        return rol;
    }
  }

  showFollowers(user:any):void{
    this.router.navigate(['user-details/followers',user.uuid])
  }
  showFollowed(user:any):void{
    this.router.navigate(['user-details/followed',user.uuid])
  }
}
