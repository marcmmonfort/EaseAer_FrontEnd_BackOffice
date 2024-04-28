import { KnownService } from 'src/app/services/known.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  userKnown:boolean=false;
  userRole: string | any;
  securityLevel: number = 1;

  securityLevel1:boolean=false;
  securityLevel2:boolean=false;
  securityLevel3:boolean=false;
  securityLevel4:boolean=false;

  constructor(private knownService:KnownService){}

  ngOnInit(): void {
    this.knownService.getUserKnown().subscribe(userKnown => {
      this.userKnown = userKnown;
    });

    this.knownService.getSecurityLevel().subscribe(securityLevel => {
      this.securityLevel = securityLevel;

      console.log("NIVEL NAV: " + this.securityLevel);

      if (this.securityLevel==1){
        this.securityLevel1=true;
      }
      if (this.securityLevel==2){
        this.securityLevel1=true;
        this.securityLevel2=true;
      }
      if (this.securityLevel==3){
        this.securityLevel1=true;
        this.securityLevel2=true;
        this.securityLevel3=true;
      }
      if (this.securityLevel==4){
        this.securityLevel1=true;
        this.securityLevel2=true;
        this.securityLevel3=true;
        this.securityLevel4=true;
      }
    });
  }

  LogOut(): void{
    localStorage.setItem('token','');
    localStorage.setItem('ownId','');
    localStorage.setItem('role','');
    this.knownService.updateUserKnown(false);
    this.knownService.updateSecurityLevel(1);
    this.securityLevel = 1;
    this.securityLevel1 = false;
    this.securityLevel2 = false;
    this.securityLevel3 = false;
    this.securityLevel4 = false;
  }

    
}