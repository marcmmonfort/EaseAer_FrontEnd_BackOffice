import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from 'src/app/services/news.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})

export class NewsCreateComponent {
  newsForm: FormGroup | any;
  isModalOpen:boolean=false;
  isNotificationOpen: boolean = false;
  modalText: string = '';
  showAdditionalOption: boolean = true;

  constructor(private formBuilder: FormBuilder, private newsService: NewsService, private router: Router) { }

  ngOnInit(): void {

    this.newsForm = this.formBuilder.group({
        "titleNews": ['', Validators.required],
        "subtitleNews": ['', Validators.required],
        "descriptionNews": ['', Validators.required],
        "deletedNews": [false, Validators.required],
    });
  }

  get f() {
    return this.newsForm.controls;
  }

  onSubmit(): void {
    console.log(this.newsForm);
    if (this.newsForm.invalid) {
      this.openNotificationModal("¡Información Incorrecta!");
    }
    this.openModal();
  }
  
  confirmChanges(): void {
    const newsData = this.newsForm.value;

    // Añadir UUID Creador:
    newsData.idUserAuthorNews = localStorage.getItem('ownId');

    // Añadir Fecha Actual:
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();
    newsData.dateNews = formattedDate;

    console.log("NOTÍCIA: " + JSON.stringify(newsData));

    this.newsService.createNews(newsData).subscribe(
      (response) => {
        console.log("ENTRA AQUÍ (A)");
        this.openNotificationModal("¡Noticia Creada!");
      },
      (error) => {
        console.log("ENTRA AQUÍ (B)");
        this.openNotificationModal("¡Error!");
      }
    );
    this.closeModal();
    // this.router.navigate(['/cards']);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  onAcceptChanges(): void {
    if (this.modalText == ""){
      this.confirmChanges();
      this.ngOnInit();
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    if (this.modalText == "¡Noticia Creada!"){
      this.modalText = "";
      this.router.navigate(['/news']);
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
    else {
      this.modalText = "";
      this.isModalOpen = false;
      this.isNotificationOpen = false;
    }
  }

  onCancelChanges(): void {
    this.isModalOpen = false;
    this.isNotificationOpen = false;
  }
  
  // Notification Modal:

  openNotificationModal(text: string): void {
    this.modalText = text;
    this.isNotificationOpen = true;
  }

  // Método para cerrar el modal
  closeNotificationModal(): void {
    this.isNotificationOpen = false;
  }
}
