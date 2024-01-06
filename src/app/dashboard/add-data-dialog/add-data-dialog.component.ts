import { Component, EventEmitter, Output, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
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
  selector: 'app-add-data-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './add-data-dialog.component.html',
  styleUrl: './add-data-dialog.component.css'
})
export class AddDataDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  formData : any = {};

  onSubmit(): void {

    for (let i = 0; i<this.data.length; i=i+1) {
      if(this.data[i].nume == this.formData.Disciplina)
      {
        this.formData.puncte_credit = this.data[i].puncteCredit;
      }
    }

    console.log(this.formData.Data);
    

    this.dialogRef.close(this.formData);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
