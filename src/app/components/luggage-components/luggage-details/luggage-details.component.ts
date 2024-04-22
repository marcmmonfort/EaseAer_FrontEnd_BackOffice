import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LuggageService } from 'src/app/services/luggage.service';

@Component({
  selector: 'app-luggage-details',
  templateUrl: './luggage-details.component.html',
  styleUrls: ['./luggage-details.component.css']
})

export class LuggageDetailsComponent {
    luggageData: any;
    luggageId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private luggageService: LuggageService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.luggageId = parts[parts.length - 1];
        this.luggageService.getLuggageById(this.luggageId).subscribe(luggageData=>{
        this.luggageData=luggageData;
        });
    }
}
