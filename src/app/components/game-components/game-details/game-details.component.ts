import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from 'src/app/services/game.service';

@Component({
    selector: 'app-game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})

export class GameDetailsComponent {
    gameData: any;
    gameId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private gameService: GameService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.gameId = parts[parts.length - 1];
        this.gameService.getGameById(this.gameId).subscribe(gameData=>{
        this.gameData = gameData;
        });
    }
}
