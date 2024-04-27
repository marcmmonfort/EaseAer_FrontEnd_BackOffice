import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.component.html',
  styleUrls: ['./question-details.component.css']
})

export class QuestionDetailsComponent {
    questionData: any;
    questionId!: string;
    isModalOpen:boolean=false;
    
    constructor(private route: ActivatedRoute, private questionService: QuestionService, private router:Router) {}

    ngOnInit(): void {
        this.loadUserData();
    }

    loadUserData(): void {
        const url = this.route.snapshot.url.join('/');
        const parts = url.split('/');
        this.questionId = parts[parts.length - 1];
        this.questionService.getQuestionById(this.questionId).subscribe(questionData=>{
        this.questionData = questionData;
        });
    }
}
