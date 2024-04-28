import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KnownService {
  private userKnown = new BehaviorSubject<boolean>(false);
  private securityLevel = new BehaviorSubject<number>(1);

  getUserKnown(): Observable<boolean> {
    return this.userKnown.asObservable();
  }
  updateUserKnown(userKnown: boolean): void {
    this.userKnown.next(userKnown);
  }

  getSecurityLevel(): Observable<number> {
    return this.securityLevel.asObservable();
  }
  updateSecurityLevel(securityLevel: number): void {
    this.securityLevel.next(securityLevel);
    console.log("NIVEL ACTUALIZADO");
  }

}
