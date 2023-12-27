import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';
import { EditDataDialogComponent } from '../edit-data-dialog/edit-data-dialog.component';
import { DeleteDataDialogComponent } from '../delete-data-dialog/delete-data-dialog.component';
import { MoreInfoDialogComponent } from '../more-info-dialog/more-info-dialog.component';

import { ServerService } from '../../services/server.service';

import { Programare, Table_DATA } from '../dashboard.component';

@Component({
  selector: 'app-tabel',
  standalone: true,
  imports: [
    CommonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AddDataDialogComponent,
    EditDataDialogComponent,
    MoreInfoDialogComponent
  ],
  templateUrl: './tabel.component.html',
  styleUrl: './tabel.component.css'
})
export class TabelComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatMenuTrigger) contextMenuTrigger!: MatMenuTrigger;

  currentMenu!: string;

  displayedColumns: string[] = ['Select', 'Examen', 'Sala', 'Data', 'Ora', 'Actions'];

  /*
    Aici la dataSource, vom avea un API call care ne va intoarce tabelul final
    pe care vrem sa il vizionam in aplicatie
  */
  dataSource = new MatTableDataSource(Table_DATA);

  selection = new SelectionModel<Programare>(true, []);

  filters = { Examen: '', Sala: '', Data: '', Ora: '' };

  row_actioned:any = {};
  index_row_actioned:number = -1;

  constructor(public dialog: MatDialog, 
              private route: ActivatedRoute,
              private server: ServerService) { }

  ngOnInit(): void {
    this.route.url.subscribe((segments) => {
      this.currentMenu = segments[0].path;
      console.log('Current Menu:', this.currentMenu);
    });

    if (this.currentMenu !== 'edit-menu') {
      this.displayedColumns = ['Examen', 'Sala', 'Data', 'Ora', 'Actions'];
    }

    this.dataSource.data = Table_DATA;
    // this.getInfo();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.data = Table_DATA;
  }

  // getInfo() {
  //   this.server.get_tblGED().then((respose: any) => {

  //     Table_DATA = respose.map((item: Programare) => ({
  //       ...item,
  //       Data: parseInt(item.Data.split("T")[0].split("-")[1]).toString()+"/"+parseInt(item.Data.split("T")[0].split("-")[2]).toString()+"/"+item.Data.split("T")[0].split("-")[0],
  //     }));
      
  //   })

  //   console.log(Table_DATA);
    
  // }

  applyFilter() {
    this.dataSource.data = Table_DATA;

    if (this.filters.Examen !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Examen.toString().includes(this.filters.Examen));
    }

    if (this.filters.Sala !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Sala.includes(this.filters.Sala));
    }

    if (this.filters.Data !== "") {
      console.log(this.filters.Data);

      
      this.dataSource.data = this.dataSource.data.filter((item) => item.Data.toString().includes(this.filters.Data));
    }

    if (this.filters.Ora !== "") {
      this.dataSource.data = this.dataSource.data.filter((item) => item.Ora.toString().includes(this.filters.Ora));
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The add dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa INSERT in baza de date
      */
      if (result !== '' && undefined) {
        this.dataSource.data = [...this.dataSource.data, result];
      }

    });
  }

  /*
    Aici practic voi marca cu o variabila ce date am "selectat" (deoarece randurile in tabel vor fi unice), adica in ce rand am apasat butonul de actions
    pe baza acestor date fac comparatie in baza de date si pot sterge/edita tuplul respectiv.

    M-am bazat pe faptul ca nu putem apasa butonul de actions si apoi da edit/delete la alt rand.
    Este imposibil dpdv al UI.
  */
  actionOnSpecRow(row:{}) {
    this.row_actioned = row;
    this.index_row_actioned = this.dataSource.data.indexOf(this.row_actioned);
    console.log(this.row_actioned);
    console.log(this.index_row_actioned);
  }

  openEditDialog(): void {
    const dialogRef = this.dialog.open(EditDataDialogComponent, {
      width: '400px',
      data: (JSON.parse(JSON.stringify(this.row_actioned)))
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The edit dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa ALTER in baza de date
      */
      
      if (result !== "" && undefined) {
        this.dataSource.data[this.index_row_actioned] = result;
      }
      this.dataSource.data = this.dataSource.data;

    });

  }

  openDeleteDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.row_actioned
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delete dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa DELETE in baza de date
      */
      
      if(result !== null && undefined) {
        let index = this.dataSource.data.indexOf(result);
        for(let i=index; i<this.dataSource.data.length-1; i++) {
          this.dataSource.data[i] = this.dataSource.data[i+1];
        }

        this.dataSource.data.pop();
      }

      this.dataSource.data = this.dataSource.data;
      console.log(this.dataSource.data);
    });

  }

  openDelSelDialog(): void {
    const dialogRef = this.dialog.open(DeleteDataDialogComponent, {
      width: '400px',
      data: this.selection.selected
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The delsel dialog was closed');
      console.log(result);

      /*
        Aici va fi un API call ce va avea ca parametru variabila "result"
        si prin API se va executa DELETE in baza de date
      */

      if(result !== null && undefined) {

        this.dataSource.data = this.dataSource.data.filter((item) => {
          if(result.indexOf(item) == -1) {
            return true;
          }
          else {
            return false;
          }
        });

        this.selection.clear();
        
        this.dataSource.data = this.dataSource.data;
      }
    });

  }

  openMoreInfoDialog(): void {
    /*
      Un API care sa ne returneze informatii suplimentare
    */

    const dialogRef = this.dialog.open(MoreInfoDialogComponent, {
      width: '400px',
      data: 'informatii suplimentare' // aici vom pune ce va returna API-ul
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The more info dialog was closed');
      console.log(result);
    });

  }


}
