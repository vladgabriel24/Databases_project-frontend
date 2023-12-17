import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';

import {PeriodicElement} from '../tabel/tabel.component'

@Component({
  selector: 'app-add-data-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './add-data-dialog.component.html',
  styleUrl: './add-data-dialog.component.css'
})
export class AddDataDialogComponent {

  formData : any = {};

  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>
  ) {}

  @Output() addData = new EventEmitter<any>();

  onSubmit(): void {
    this.dialogRef.close(this.formData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
