import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/services/booking.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})

export class BookingComponent implements OnInit {
    bookingForm: FormGroup | any;
    bookings: any[] = [];
    filteredBookings: any[] = [];

    searchName: string = '';
    searchPrizePoints: string = '';

    numPage: string = '';
    printeado: boolean = false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    
    constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private router: Router) {}
    
    ngOnInit(): void {

        this.bookingForm = this.formBuilder.group({
            "ID_User": ['', Validators.required],
            "ID_Shop": ['', Validators.required],
            "ID_Service": ['', Validators.required],
        });
        this.printeado = false;

    }

    showDetails(flight: any): void {
        this.router.navigate(['/bookings/details/', flight.uuid]);
    }

    showEdit(flight: any): void {
        this.router.navigate(['/bookings/edit/', flight.uuid]);
    }

    // LIST TIPO 1 (GET BY USER) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByUser() {
        const bookingsData = this.bookingForm.value;
        if (bookingsData.ID_User.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Usuario)");
        }
        else{
            console.log("ID USUARIO" + bookingsData.ID_User);
            this.bookingService.getBookingsByUser(bookingsData.ID_User).subscribe((bookings) => {
                if(bookings.length==0){
                    this.openNotificationModal("¡No hay reservas!");
                    this.filteredBookings = [];
                }
                else{
                    this.filteredBookings = bookings;
                    if (!this.printeado){
                        this.openNotificationModal("Reservas Cargadas");
                    }
                    this.printeado = true;
                }
            });
        }
    }

    // LIST TIPO 2 (GET BY COMPANY) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByShop() {
        const bookingsData = this.bookingForm.value;
        if (bookingsData.ID_Shop.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Tienda)");
        }
        else{
        this.bookingService.getBookingsByCompany(bookingsData.ID_Shop).subscribe((bookings) => {
            if(bookings.length==0){
                this.openNotificationModal("¡No hay reservas!");
                this.filteredBookings = [];
            }
            else{
                this.filteredBookings = bookings;
                if (!this.printeado){
                    this.openNotificationModal("Reservas Cargadas");
                }
                this.printeado = true;
            }
        });
        }
    }

    // LIST TIPO 3 (GET BY SERVICE) - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    printeaByService() {
        const bookingsData = this.bookingForm.value;
        if (bookingsData.ID_Service.length==0){
            this.openNotificationModal("Input Incompleto (Falta ID Servicio)");
        }
        else{
        this.bookingService.getBookingsByService(bookingsData.ID_Service).subscribe((bookings) => {
            if(bookings.length==0){
                this.openNotificationModal("¡No hay reservas!");
                this.filteredBookings = [];
            }
            else{
                this.filteredBookings = bookings;
                if (!this.printeado){
                    this.openNotificationModal("Reservas Cargadas");
                }
                this.printeado = true;
            }
        });
        }
    }

    // Notification Modal:

    onAcceptChanges(): void {
        this.isNotificationOpen = false;
        if (this.modalText == "¡Reserva Creada!"){
        this.modalText = "";
        this.router.navigate(['/bookings']);
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
