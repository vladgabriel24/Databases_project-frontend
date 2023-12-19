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

@Component({
  selector: 'app-edit-data-dialog',
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
  templateUrl: './edit-data-dialog.component.html',
  styleUrl: './edit-data-dialog.component.css'
})
export class EditDataDialogComponent {
  

  constructor(
    public dialogRef: MatDialogRef<EditDataDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  formData = this.data;

  onSubmit(): void {
    this.dialogRef.close(this.formData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
