import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }
  showSuccess(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 3000,
      verticalPosition: 'top'
    });
  }
  showError(message: string): void {
    this.snackBar.open(message, 'X', {
      duration: 5000,
      verticalPosition: 'top'
    });
  }
}
