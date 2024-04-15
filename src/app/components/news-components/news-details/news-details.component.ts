import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.css']
})

export class NewsDetailsComponent {
    newsData: any;
    newsId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private newsService: NewsService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.newsId = parts[parts.length - 1];
        this.newsService.getNewsById(this.newsId).subscribe(newsData=>{
        this.newsData = newsData;
        });
    }
}
