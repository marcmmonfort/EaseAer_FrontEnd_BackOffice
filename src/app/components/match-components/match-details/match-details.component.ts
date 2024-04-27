import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatchService } from 'src/app/services/match.service';

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})

export class MatchDetailsComponent {
    matchData: any;
    matchId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private matchService: MatchService, private router:Router) {}

    ngOnInit(): void {
        this.loadMatchData();
    }

    loadMatchData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.matchId = parts[parts.length - 1];
        this.matchService.getMatchById(this.matchId).subscribe(matchData=>{
        this.matchData = matchData;
        });
    }
}
