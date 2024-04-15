import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})

export class NewsComponent implements OnInit {
    news: any[] = [];
    filteredNews: any[] = [];

    searchNewsByAuthor: string = '';
    searchNewsByTitle: string = '';

    numPage: string = '';
    printeado: boolean = false;

    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private newsService: NewsService, private router: Router) {}
    
    ngOnInit(): void {
        this.newsService.listNews().subscribe((news) => {
        this.news = news;
        });
        this.printeado = false;
        this.numPage="1";
    }

    showDetails(card: any): void {
        this.router.navigate(['/news/details/', card.uuid]);
    }

    showEdit(card: any): void {
        this.router.navigate(['/news/edit/', card.uuid]);
    }

    searchNewsByAuthorId() {
        if (this.searchNewsByAuthor.trim() !== '') {
        this.filteredNews = this.news.filter((news) =>
            news.idUserAuthorNews
            .toLowerCase()
            .includes(this.searchNewsByAuthor.toLowerCase())
        );
        } 
    }

    searchByTitle() {
        if (this.searchNewsByTitle.trim() !== '') {
        this.filteredNews = this.news.filter((news) =>
            news.titleNews
            .toLowerCase()
            .includes(this.searchNewsByTitle.toLowerCase())
        );
        } 
    }

    printeaTodos() {
        this.newsService.listNewsPag(this.numPage).subscribe((news) => {
        if(news.length==0){
            this.numPage = (parseInt(this.numPage, 10) - 1).toString();
            
            if(parseInt(this.numPage, 10) < 1){
            this.numPage = '1';
            }

            this.openNotificationModal("¡No hay más páginas!");
        }
        else{
            this.filteredNews = news;
            if (!this.printeado){
            this.openNotificationModal("Noticias Cargadas");
            }
            this.printeado = true;
            
        }
        });
    }

    paginateNext() {
        if (this.printeado) {
        this.numPage = (parseInt(this.numPage, 10) + 1).toString();
        this.printeaTodos();
        }
    }

    paginatePrevious() {
        if (this.printeado) {
        if (this.numPage == '1') {

            this.openNotificationModal("¡Estás en la primera página!");

            return;
        } else {
            this.numPage = (parseInt(this.numPage, 10) - 1).toString();
            this.printeaTodos();
        }
        }
    }

    // Notification Modal:

    onAcceptChanges(): void {
        this.isNotificationOpen = false;
        if (this.modalText == "Noticias Cargadas"){
        this.modalText = "";
        // this.router.navigate(['/cards']);
        }
    }

    onCancelChanges(): void {
        this.isNotificationOpen = false;
    }

    openNotificationModal(text: string): void {
        this.modalText = text;
        this.isNotificationOpen = true;
    }

    closeNotificationModal(): void {
        this.isNotificationOpen = false;
    }

}
