import { Component, OnInit } from '@angular/core';
import { IncidentService } from 'src/app/services/incident.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css'],
})

export class IncidentComponent implements OnInit {
    incidents: any[] = [];
    filteredIncidents: any[] = [];

    searchIncidentByUser: string = '';
    searchIncidentByCollective: string = '';
    searchIncidentByStatus: string = '';

    numPage: string = '';
    printeado: boolean = false;

    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private incidentService: IncidentService, private router: Router) {}
    
    ngOnInit(): void {
        this.incidentService.listIncidents().subscribe((incidents) => {
        this.incidents = incidents;
        });
        this.printeado = false;
        this.numPage="1";
    }

    showDetails(card: any): void {
        this.router.navigate(['/incidents/details/', card.uuid]);
    }

    showEdit(card: any): void {
        this.router.navigate(['/incidents/edit/', card.uuid]);
    }

    searchByUserId() {
        if (this.searchIncidentByUser.trim() !== '') {
        this.filteredIncidents = this.incidents.filter((incident) =>
            incident.idUserIncident
            .toLowerCase()
            .includes(this.searchIncidentByUser.toLowerCase())
        );
        } 
    }

    searchByCollective() {
        if (this.searchIncidentByCollective.trim() !== '') {
        this.filteredIncidents = this.incidents.filter((incident) =>
            incident.collectivesIncident
            .toLowerCase()
            .includes(this.searchIncidentByCollective.toLowerCase())
        );
        } 
    }

    searchByStatus() {
        if (this.searchIncidentByStatus.trim() !== '') {
        this.filteredIncidents = this.incidents.filter((incident) =>
            incident.statusIncident
            .toLowerCase()
            .includes(this.searchIncidentByStatus.toLowerCase())
        );
        } 
    }

    printeaTodos() {
        this.incidentService.listIncidentsPag(this.numPage).subscribe((incidents) => {
        if(incidents.length==0){
            this.numPage = (parseInt(this.numPage, 10) - 1).toString();
            
            if(parseInt(this.numPage, 10) < 1){
            this.numPage = '1';
            }

            this.openNotificationModal("¡No hay más páginas!");
        }
        else{
            this.filteredIncidents = incidents;
            if (!this.printeado){
            this.openNotificationModal("Incidentes Cargados");
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
        if (this.modalText == "Incidentes Cargados"){
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
