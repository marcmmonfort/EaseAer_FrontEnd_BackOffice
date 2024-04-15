import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncidentService } from 'src/app/services/incident.service';

@Component({
  selector: 'app-incident-details',
  templateUrl: './incident-details.component.html',
  styleUrls: ['./incident-details.component.css']
})
export class IncidentDetailsComponent {
  incidentData: any;
  incidentId!: string;
  isModalOpen:boolean=false;
  
  constructor(private route: ActivatedRoute, private incidentService: IncidentService, private router:Router) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const url = this.route.snapshot.url.join('/');
    const parts = url.split('/');
    this.incidentId = parts[parts.length - 1];
    this.incidentService.getIncidentById(this.incidentId).subscribe(incidentData=>{
      this.incidentData=incidentData;
    });
  }

}
