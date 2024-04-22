import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookingService } from 'src/app/services/booking.service';
import { Router } from '@angular/router';
import { Shop } from 'src/app/interfaces/shop.interface';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.css']
})

export class BookingCreateComponent {
    bookingForm: FormGroup | any;
    isModalOpen:boolean=false;
    isNotificationOpen: boolean = false;
    modalText: string = '';
    scheduleBooking: string = '';
    typeBooking: string = '';
    idBooking: string = '';
    showAdditionalOption: boolean = true;

    constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private router: Router) { }

    ngOnInit(): void {

        this.bookingForm = this.formBuilder.group({
            "idUserBooking": ['', Validators.required],
            "idOfferServiceBooking": ['', Validators.required],
            "typeBooking": ['', Validators.required],
            "fromBooking": ['', Validators.required],
            "toBooking": ['', Validators.required],
            "commentsBooking": ['', Validators.required],
            "deletedBooking": [false, Validators.required]
        });
    }

    get f() {
        return this.bookingForm.controls;
    }

    onSubmit(): void {
        if (this.bookingForm.valid) {
            // Nada.
        }
        if (this.bookingForm.invalid) {
            this.openNotificationModal("¡Información Incorrecta!");
        }
        this.openModal();
    }

    confirmChanges(): void {
        const bookingData = this.bookingForm.value;

        console.log("INFO FORMULARIO:", JSON.stringify(bookingData));
        
        const scheduleBooking = `${bookingData.fromBooking}|${bookingData.toBooking}`;
        this.scheduleBooking = scheduleBooking;

        this.typeBooking = bookingData.typeBooking;
        this.idBooking = bookingData.idOfferServiceBooking;

        // Borrar Campos:
        this.bookingForm.removeControl('fromBooking');
        this.bookingForm.removeControl('toBooking');
        this.bookingForm.removeControl('idOfferServiceBooking');
        const newBookingData = this.bookingForm.value;

        // Añadir Campos
        newBookingData.scheduleBooking = this.scheduleBooking;
        newBookingData.statusBooking = "sent";
        newBookingData.idOfferBooking = this.idBooking;
        newBookingData.idServiceBooking = this.idBooking;

        console.log("INFO EDITADA:", JSON.stringify(newBookingData));

        this.bookingService.createBooking(newBookingData).subscribe(
        (response) => {
            this.openNotificationModal("¡Reserva Creada!");
        },
        (error) => {
            this.openNotificationModal("¡Error!");
        }
        );

        this.closeModal();
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
        if (this.modalText == "¡Reserva Creada!"){
            this.modalText = "";
            this.router.navigate(['/bookings']);
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
