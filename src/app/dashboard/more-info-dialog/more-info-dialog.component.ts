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

import { DisciplineDialogComponent } from './discipline-dialog/discipline-dialog.component';
import { ProfesorDialogComponent } from './profesor-dialog/profesor-dialog.component';
import { SerieDialogComponent } from './serie-dialog/serie-dialog.component';
import { GrupaDialogComponent } from './grupa-dialog/grupa-dialog.component';

@Component({
  selector: 'app-more-info-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    DisciplineDialogComponent,
    ProfesorDialogComponent,
    SerieDialogComponent,
    GrupaDialogComponent
  ],
  templateUrl: './more-info-dialog.component.html',
  styleUrl: './more-info-dialog.component.css'
})
export class MoreInfoDialogComponent {

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  clickDisciplina() {
    // un API call
    console.log('bau');

    const dialogRef = this.dialog.open(DisciplineDialogComponent, {
      width: '400px',
      data: 'Discipline' // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The discipline dialog was closed');
      console.log(result);
    });
    
  }

  clickProfesori() {
    // un API call
    console.log('bau');

    const dialogRef = this.dialog.open(ProfesorDialogComponent, {
      width: '400px',
      data: 'Profesor' // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The profesor dialog was closed');
      console.log(result);
    });
    
  }

  clickSerie() {
    // un API call
    console.log('bau');

    const dialogRef = this.dialog.open(SerieDialogComponent, {
      width: '400px',
      data: 'Serie' // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The serie dialog was closed');
      console.log(result);
    });
    
  }

  clickGrupa() {
    // un API call
    console.log('bau');

    const dialogRef = this.dialog.open(GrupaDialogComponent, {
      width: '400px',
      data: 'Grupa' // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The grupa dialog was closed');
      console.log(result);
    });
    
  }
}
