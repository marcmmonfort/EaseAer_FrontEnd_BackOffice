import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent {
  users: any[] = [];
  filteredUsers: any[] = [];
  searchTerm: string = '';
  userId!:string;
  numPage: string = '';
  printeado: boolean = false;

  constructor(private route: ActivatedRoute,private userService: UserService, private router: Router){}

  ngOnInit():void{
    this.loadUserData();
    this.printeado = false;
    this.numPage="1";
  }
  loadUserData(): void{
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.userId = parts[parts.length - 1];
  }
  showDetails(user: any): void {
    this.router.navigate(['/user-details', user.id]);
  }
  showEdit(user: any): void {
    this.router.navigate(['/user-edit', user.id]);
  }

  search() {
    if (this.searchTerm.trim() !== '') {
      this.filteredUsers = this.users.filter((user) =>
        user.mailUser.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  printeaTodos() {
    this.userService.getFollowers(this.userId, this.numPage).subscribe((users) => {
      if(users.length==0){
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        if(parseInt(this.numPage, 10) < 1){
          this.numPage = '1';
        }
        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'There are not more followers!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
      }
      else{
        this.filteredUsers = users;
        if (!this.printeado){
          Swal.fire({
            position: 'center',
            icon: 'success',
            customClass: {
              icon: 'swal-icon-color'
            },
            title: 'Followers Loaded',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
            backdrop: `
            rgba(0,0,0,0.8)
            `
          })
        }
        this.printeado = true;
      }
    });
  }
  paginatenext() {
    if (this.printeado) {
      this.numPage = (parseInt(this.numPage, 10) + 1).toString();
      this.printeaTodos();
    }
  }
  paginateprevious() {
    if (this.printeado) {
      if (this.numPage == '1') {
        // Poner aquí el alert ...
        Swal.fire({
          position: 'center',
          icon: 'info',
          customClass: {
            icon: 'swal-icon-color'
          },
          title: 'You are in the first page!',
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
          backdrop: `
          rgba(0,0,0,0.8)
          `
        })
        return;
      } else {
        this.numPage = (parseInt(this.numPage, 10) - 1).toString();
        this.printeaTodos();
      }
    }
  }

}
