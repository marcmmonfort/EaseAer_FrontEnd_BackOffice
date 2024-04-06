import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './frontpage.component.html',
  styleUrls: ['./frontpage.component.css']
})

export class FrontPageComponent {

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(){ }

}
