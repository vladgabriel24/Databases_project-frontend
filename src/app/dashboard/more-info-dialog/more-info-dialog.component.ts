import { Component, EventEmitter, Output, Inject, OnInit } from '@angular/core';
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

import { ServerService } from '../../services/server.service';

interface Disciplina {
  nume: string;
  puncteCredit: number;
}

interface Profesor {
  nume: string;
  prenume: string;
  email: string;
}

interface Serie {
  denumireSerie: string;
  specializare: string;
  an: number;
}

interface Grupa {
  denumireGrupa: string;
  numarGrupa: number;
}

interface Student {
  nume: string;
  prenume: string;
  email: string
}

interface Examen {
  punctaj: number;
  prag: number;
  durata: number;
}


@Component({
  selector: 'app-more-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogActions,
    DisciplineDialogComponent,
    ProfesorDialogComponent,
    SerieDialogComponent,
    GrupaDialogComponent
  ],
  templateUrl: './more-info-dialog.component.html',
  styleUrl: './more-info-dialog.component.css'
})
export class MoreInfoDialogComponent implements OnInit{

  constructor(
    private server: ServerService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<MoreInfoDialogComponent>
    ,@Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  info_disciplina!:Disciplina;
  info_profesor!:Profesor;
  info_serie!:Serie;
  info_grupa!:Grupa;

  studenti_serie!:Student[];
  studenti_grupa!:Student[];

  info_examen!:Examen;

  isDataLoaded=0;

  ngOnInit(): void {
    const formatedData = this.data['Data'].split('/')[2]+"-"+this.data['Data'].split('/')[0]+"-"+this.data['Data'].split('/')[1];
    this.data['Data'] = formatedData;

    console.log(this.data);
    
    this.server.get_more_info_disciplina(this.data).then((respose: any) => {

      this.info_disciplina = respose[0];
      console.log(this.info_disciplina);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })  

    this.server.get_more_info_profesor(this.data).then((respose: any) => {

      this.info_profesor = respose[0]; //valoare HARDCODATA
      console.log(this.info_profesor);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })

    this.server.get_more_info_serie(this.data).then((respose: any) => {

      this.info_serie = respose[0];
      console.log(this.info_serie);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })

    this.server.get_more_info_grupa(this.data).then((respose: any) => {

      this.info_grupa = respose[0];
      console.log(this.info_grupa);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })

    this.server.get_studenti_serie(this.data).then((respose: any) => {

      this.studenti_serie = respose;
      console.log(this.studenti_serie);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })

    this.server.get_studenti_grupa_serie(this.data).then((respose: any) => {

      this.studenti_grupa = respose;
      console.log(this.studenti_grupa);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })

    this.server.get_more_info_examen(this.data).then((respose: any) => {

      this.info_examen = respose[0];
      console.log(this.info_examen);
      
      this.isDataLoaded=this.isDataLoaded+1;
    })


  }

  clickDisciplina() {
    const dialogRef = this.dialog.open(DisciplineDialogComponent, {
      width: '400px',
      data: this.info_disciplina // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The discipline dialog was closed');
      console.log(result);
    });
    
  }

  clickProfesori() {
    const dialogRef = this.dialog.open(ProfesorDialogComponent, {
      width: '400px',
      data: this.info_profesor // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The profesor dialog was closed');
      console.log(result);
    });
    
  }

  clickSerie() {
    const dialogRef = this.dialog.open(SerieDialogComponent, {
      width: '600px',
      data: [this.info_serie, this.studenti_serie] // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The serie dialog was closed');
      console.log(result);
    });
    
  }

  clickGrupa() {
    const dialogRef = this.dialog.open(GrupaDialogComponent, {
      width: '600px',
      data: [this.info_grupa, this.studenti_grupa] // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The grupa dialog was closed');
      console.log(result);
    });
    
  }
}
