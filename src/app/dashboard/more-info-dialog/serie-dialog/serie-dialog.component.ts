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
  selector: 'app-serie-dialog',
  standalone: true,
  imports: [],
  templateUrl: './serie-dialog.component.html',
  styleUrl: './serie-dialog.component.css'
})
export class SerieDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<SerieDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

}
