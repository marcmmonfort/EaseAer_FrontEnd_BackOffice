import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.css']
})

export class NotificationModalComponent {
  @Input() isOpen: boolean = false;
  @Output() acceptChanges = new EventEmitter();
  @Output() cancelChanges = new EventEmitter();
  @Input() modalText: string = '';

  onOk(): void {
    this.acceptChanges.emit();
  }

}
